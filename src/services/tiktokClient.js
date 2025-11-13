onst axios = require('axios');
const logger = require('../utils/logger');

class TikTokClient {
/**
* @param {Object} options
* @param {string} [options.baseUrl]
* @param {string} [options.userAgent]
* @param {number} [options.timeout]
* @param {Object} [options.httpClient] Optional custom axios instance for testing.
*/
constructor(options = {}) {
const {
baseUrl = process.env.TIKTOK_BASE_URL || 'https://www.tiktok.com',
userAgent = process.env.TIKTOK_USER_AGENT
|| 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TikTokTrendingScraper/1.0',
timeout = 15000,
httpClient,
} = options;

this.baseUrl = baseUrl.replace(/\/+$/, '');
this.userAgent = userAgent;
this.timeout = timeout;

this.http = httpClient || axios.create({
baseURL: this.baseUrl,
timeout: this.timeout,
headers: {
'User-Agent': this.userAgent,
Accept: 'application/json,text/html;q=0.9,*/*;q=0.8',
},
});
}

/**
* Fetch trending TikTok videos.
* NOTE: The exact endpoint parameters may need adjustment depending on your proxy or integration.
*
* @param {Object} params
* @param {string} params.country
* @param {number} params.period
* @param {number} params.limit
* @param {string} params.sort_by
* @returns {Promise<Array<Object>>}
*/
async getTrending(params) {
const { country, period, limit, sort_by: sortBy } = params;

const query = {
country,
period,
limit,
sort_by: sortBy,
};

logger.debug('Fetching trending videos from TikTok', { query, baseUrl: this.baseUrl });

try {
// This assumes you have a proxy or API that exposes trending data in JSON format.
// Adjust the endpoint path as needed for your actual integration.
const response = await this.http.get('/trending', { params: query });

if (!response || typeof response.data === 'undefined') {
throw new Error('Empty response from TikTok');
}

// Accept either an array or a wrapped object.
const data = Array.isArray(response.data)
? response.data
: response.data.items || response.data.data || [];

if (!Array.isArray(data)) {
throw new Error('Unexpected TikTok response shape: expected array of items');
}

logger.info(`Received ${data.length} trending items from TikTok`);
return data;
} catch (err) {
logger.error('Error while fetching trending videos from TikTok', {
message: err.message,
stack: err.stack,
});
throw err;
}
}
}

module.exports = TikTokClient;