onst fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

/**
* Export trending videos to a JSON file.
*
* @param {Array<Object>} data
* @param {string} filePath
* @returns {Promise<void>}
*/
async function exportToJson(data, filePath) {
const dir = path.dirname(filePath);
await fs.mkdir(dir, { recursive: true });

const serialized = JSON.stringify(data, null, 2);
await fs.writeFile(filePath, serialized, 'utf8');

logger.info('JSON export finished', { filePath, records: data.length });
}

module.exports = {
exportToJson,
};