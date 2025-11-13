onst fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const logger = require('./utils/logger');
const { fetchTrendingVideos } = require('./services/trendingFetcher');
const { exportToJson } = require('./outputs/jsonExporter');
const { exportToCsv } = require('./outputs/csvExporter');

function parseArgs(argv) {
const args = {};
for (let i = 0; i < argv.length; i += 1) {
const arg = argv[i];
if (arg === '--config' && argv[i + 1]) {
args.config = argv[i + 1];
i += 1;
} else if (arg === '--output' && argv[i + 1]) {
args.outputFile = argv[i + 1];
i += 1;
} else if (arg === '--format' && argv[i + 1]) {
args.format = argv[i + 1];
i += 1;
} else if (arg.startsWith('--')) {
const [key, value] = arg.replace(/^--/, '').split('=');
if (value !== undefined) {
args[key] = value;
}
}
}
return args;
}

function loadConfigFile(configPath) {
const resolved = path.resolve(configPath);
if (!fs.existsSync(resolved)) {
throw new Error(`Config file not found at: ${resolved}`);
}
const raw = fs.readFileSync(resolved, 'utf8');
return JSON.parse(raw);
}

async function main() {
try {
const cliArgs = parseArgs(process.argv.slice(2));

let config = {};
if (cliArgs.config) {
logger.info(`Loading config from ${cliArgs.config}`);
config = loadConfigFile(cliArgs.config);
} else {
const defaultConfigPath = path.resolve(__dirname, '..', 'data', 'inputs.sample.json');
if (fs.existsSync(defaultConfigPath)) {
logger.info('No --config provided. Using ./data/inputs.sample.json');
config = loadConfigFile(defaultConfigPath);
} else {
logger.info('No config file found. Using environment variables / defaults only.');
}
}

// CLI overrides config
if (cliArgs.country) config.country = cliArgs.country;
if (cliArgs.period) config.period = Number(cliArgs.period);
if (cliArgs.limit) config.limit = Number(cliArgs.limit);
if (cliArgs.sort_by) config.sort_by = cliArgs.sort_by;
if (cliArgs.format) config.format = cliArgs.format;
if (cliArgs.outputFile) config.outputFile = cliArgs.outputFile;

const videos = await fetchTrendingVideos(config);

const format = (config.format || 'json').toLowerCase();
const outputDir = process.env.OUTPUT_DIR || path.resolve(__dirname, '..', 'data');

if (!fs.existsSync(outputDir)) {
fs.mkdirSync(outputDir, { recursive: true });
}

let outputFile = config.outputFile;
if (!outputFile) {
const fileName = `trending-${Date.now()}.${format === 'csv' ? 'csv' : 'json'}`;
outputFile = path.join(outputDir, fileName);
} else if (!path.isAbsolute(outputFile)) {
outputFile = path.resolve(outputFile);
}

if (format === 'csv') {
await exportToCsv(videos, outputFile);
} else {
await exportToJson(videos, outputFile);
}

logger.info(`Export completed. File saved at: ${outputFile}`);
} catch (err) {
logger.error(`Fatal error: ${err.message}`, { stack: err.stack });
process.exitCode = 1;
}
}

if (require.main === module) {
// eslint-disable-next-line no-console
main().catch((err) => {
console.error(err);
process.exitCode = 1;
});
}

module.exports = {
main,
};