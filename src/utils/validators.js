onst logger = require('./logger');

const ALLOWED_PERIODS = [7, 30];
const ALLOWED_SORT = ['vv', 'like', 'comment', 'repost'];

function coerceNumber(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return fallback;
}

/**
 * Validate and normalize user options.
 *
 * @param {Object} raw
 * @returns {Object}
 */
function validateOptions(raw = {}) {
  const options = { ...raw };

  const country = (options.country || options.country_code || 'US').toUpperCase().trim();
  if (!/^[A-Z]{2}$/.test(country)) {
    throw new Error(`Invalid country code: ${country}. Expected 2-letter ISO code, e.g. US`);
  }

  let period = coerceNumber(options.period, 7);
  if (!ALLOWED_PERIODS.includes(period)) {
    logger.warn(`Unsupported period "${period}", falling back to 7`);
    period = 7;
  }

  let limit = coerceNumber(options.limit, 20);
  if (limit <= 0) {
    logger.warn(`Non-positive limit "${limit}", falling back to 20`);
    limit = 20;
  }
  if (limit > 500) {
    logger.warn(`Limit "${limit}" too high, capping at 500`);
    limit = 500;
  }

  let sortBy = options.sort_by || options.sortBy || 'vv';
  sortBy = String(sortBy).toLowerCase();
  if (!ALLOWED_SORT.includes(sortBy)) {
    logger.warn(`Unsupported sort_by "${sortBy}", falling back to "vv" (views)`);
    sortBy = 'vv';
  }

  return {
    country,
    period,
    limit,
    sort_by: sortBy,
  };
}

module.exports = {
  validateOptions,
  ALLOWED_PERIODS,
  ALLOWED_SORT,
};