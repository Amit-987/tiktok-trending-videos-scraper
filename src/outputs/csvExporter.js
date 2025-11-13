onst fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

/**
* Flatten nested author/stats object into a flat record with dotted keys.
*
* @param {Object} item
* @returns {Object}
*/
function flattenRecord(item) {
const flat = {
video_id: item.video_id,
title: item.title,
duration_in_sec: item.duration_in_sec,
url: item.url,
thumbnail: item.thumbnail,
region: item.region,
country_code: item.country_code,
};

if (item.author) {
flat['author.id'] = item.author.id;
flat['author.uniqueId'] = item.author.uniqueId;
flat['author.name'] = item.author.name;
flat['author.profile_url'] = item.author.profile_url;
flat['author.profile_picture_url'] = item.author.profile_picture_url;
flat['author.bio'] = item.author.bio;
flat['author.verifiedAccount'] = item.author.verifiedAccount;
flat['author.privateAccount'] = item.author.privateAccount;
}

if (item.stats) {
flat['stats.diggCount'] = item.stats.diggCount;
flat['stats.shareCount'] = item.stats.shareCount;
flat['stats.commentCount'] = item.stats.commentCount;
flat['stats.playCount'] = item.stats.playCount;
flat['stats.collectCount'] = item.stats.collectCount;
}

return flat;
}

function escapeCsvValue(value) {
if (value === null || typeof value === 'undefined') {
return '';
}
const str = String(value);
if (/[,"\n]/.test(str)) {
return `"${str.replace(/"/g, '""')}"`;
}
return str;
}

/**
* Export trending videos to a CSV file.
*
* @param {Array<Object>} data
* @param {string} filePath
* @returns {Promise<void>}
*/
async function exportToCsv(data, filePath) {
const dir = path.dirname(filePath);
await fs.mkdir(dir, { recursive: true });

const flatRecords = data.map(flattenRecord);
const headers = Array.from(
flatRecords.reduce((set, record) => {
Object.keys(record).forEach((key) => set.add(key));
return set;
}, new Set()),
);

const lines = [];
lines.push(headers.join(','));

for (const record of flatRecords) {
const row = headers.map((header) => escapeCsvValue(record[header]));
lines.push(row.join(','));
}

const csvContent = `${lines.join('\n')}\n`;
await fs.writeFile(filePath, csvContent, 'utf8');

logger.info('CSV export finished', { filePath, records: data.length });
}

module.exports = {
exportToCsv,
flattenRecord,
};