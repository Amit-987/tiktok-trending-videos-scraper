onst TikTokClient = require('./tiktokClient');
const logger = require('../utils/logger');
const { validateOptions } = require('../utils/validators');

/**
* Normalize a raw TikTok trending entry into the documented schema.
*
* @param {Object} item Raw record from TikTok or your proxy.
* @returns {Object} Normalized video record.
*/
function mapToNormalizedSchema(item) {
// Support different shapes by probing and falling back.
const videoId = item.video_id || item.id || item.aweme_id || item.awemeId || '';
const title = item.title || item.desc || item.caption || '';
const durationSec = typeof item.duration_in_sec === 'number'
? item.duration_in_sec
: item.duration
|| (item.video && item.video.duration)
|| 0;
const url = item.url || item.share_url || item.shareUrl || '';
const thumbnail = item.thumbnail
|| (item.cover && (item.cover.url || item.cover.url_list && item.cover.url_list[0]))
|| (item.video && item.video.cover && (item.video.cover.url || item.video.cover.url_list && item.video.cover.url_list[0]))
|| '';

const region = item.region || item.country || '';
const countryCode = item.country_code || item.countryCode || item.country_code_iso || '';

const rawAuthor = item.author || item.user || {};
const author = {
id: rawAuthor.id || rawAuthor.uid || rawAuthor.user_id || '',
uniqueId: rawAuthor.uniqueId || rawAuthor.unique_id || rawAuthor.username || '',
name: rawAuthor.name || rawAuthor.nickname || rawAuthor.display_name || '',
profile_url: rawAuthor.profile_url || rawAuthor.url || (rawAuthor.uniqueId
? `https://www.tiktok.com/@${rawAuthor.uniqueId}`
: ''),
profile_picture_url: rawAuthor.profile_picture_url
|| rawAuthor.avatarThumb
|| rawAuthor.avatar_url
|| '',
bio: rawAuthor.bio || rawAuthor.signature || '',
verifiedAccount: Boolean(
rawAuthor.verifiedAccount
|| rawAuthor.verified
|| rawAuthor.is_verified,
),
privateAccount: Boolean(
rawAuthor.privateAccount
|| rawAuthor.privateAccount
|| rawAuthor.is_private,
),
};

const rawStats = item.stats || item.statistics || {};
const stats = {
diggCount: String(rawStats.diggCount || rawStats.likeCount || rawStats.digg_count || 0),
shareCount: String(rawStats.shareCount || rawStats.share_count || 0),
commentCount: String(rawStats.commentCount || rawStats.comment_count || 0),
playCount: String(rawStats.playCount || rawStats.play_count || rawStats.viewCount || 0),
collectCount: String(rawStats.collectCount || rawStats.collect_count || rawStats.favoriteCount || 0),
};

return {
video_id: videoId,
title,
duration_in_sec: durationSec,
url,
thumbnail,
region,
country_code: countryCode,
author,
stats,
};
}

/**
* Fetch and normalize TikTok trending videos based on input options.
*
* @param {Object} rawOptions
* @param {TikTokClient} [client] Optional client instance for dependency injection / testing.
* @returns {Promise<Array<Object>>}
*/
async function fetchTrendingVideos(rawOptions = {}, client) {
const options = validateOptions(rawOptions);

const tiktokClient = client || new TikTokClient({
baseUrl: process.env.TIKTOK_BASE_URL,
});

logger.info('Fetching TikTok trending videos', {
country: options.country,
period: options.period,
limit: options.limit,
sort_by: options.sort_by,
});

const items = await tiktokClient.getTrending(options);

const mapped = items.map(mapToNormalizedSchema);

logger.info('Mapped TikTok trending videos to normalized schema', {
inputCount: items.length,
outputCount: mapped.length,
});

return mapped;
}

module.exports = {
fetchTrendingVideos,
mapToNormalizedSchema,
};