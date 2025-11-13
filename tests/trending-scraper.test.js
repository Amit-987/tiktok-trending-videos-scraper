onst { fetchTrendingVideos, mapToNormalizedSchema } = require('../src/services/trendingFetcher');
const { validateOptions } = require('../src/utils/validators');
const { flattenRecord } = require('../src/outputs/csvExporter');

describe('validators', () => {
  test('validateOptions normalizes and validates input', () => {
    const options = validateOptions({
      country: 'us',
      period: '30',
      limit: '10',
      sort_by: 'like',
    });

    expect(options).toEqual({
      country: 'US',
      period: 30,
      limit: 10,
      sort_by: 'like',
    });
  });

  test('validateOptions falls back to defaults for invalid values', () => {
    const options = validateOptions({
      country: 'USA',
      period: '999',
      limit: '-5',
      sort_by: 'unknown',
    });

    expect(options.country).toBe('US');
    expect(options.period).toBe(7);
    expect(options.limit).toBe(20);
    expect(options.sort_by).toBe('vv');
  });
});

describe('mapToNormalizedSchema', () => {
  test('maps raw item with alternative property names', () => {
    const raw = {
      id: '123',
      desc: 'Test video',
      duration: 15,
      share_url: 'https://www.tiktok.com/@user/video/123',
      cover: { url: 'https://example.com/thumb.jpg' },
      country: 'United States',
      country_code: 'US',
      user: {
        uid: '999',
        unique_id: 'testuser',
        nickname: 'Test User',
        avatarThumb: 'https://example.com/avatar.jpg',
        signature: 'Hello world',
        verified: true,
        is_private: false,
      },
      statistics: {
        likeCount: 100,
        shareCount: 5,
        commentCount: 3,
        playCount: 1000,
        collectCount: 2,
      },
    };

    const normalized = mapToNormalizedSchema(raw);
    expect(normalized.video_id).toBe('123');
    expect(normalized.title).toBe('Test video');
    expect(normalized.duration_in_sec).toBe(15);
    expect(normalized.url).toContain('/video/123');
    expect(normalized.region).toBe('United States');
    expect(normalized.country_code).toBe('US');
    expect(normalized.author.uniqueId).toBe('testuser');
    expect(normalized.stats.diggCount).toBe('100');
    expect(normalized.stats.playCount).toBe('1000');
  });
});

describe('csv flattenRecord', () => {
  test('flattens nested record', () => {
    const item = {
      video_id: '1',
      title: 'hello',
      duration_in_sec: 10,
      url: 'https://example.com',
      thumbnail: 'https://example.com/t.jpg',
      region: 'US',
      country_code: 'US',
      author: {
        id: 'a1',
        uniqueId: 'user1',
        name: 'User 1',
        profile_url: 'https://example.com/u1',
        profile_picture_url: 'https://example.com/u1.jpg',
        bio: 'bio',
        verifiedAccount: true,
        privateAccount: false,
      },
      stats: {
        diggCount: '1',
        shareCount: '2',
        commentCount: '3',
        playCount: '4',
        collectCount: '5',
      },
    };

    const flat = flattenRecord(item);
    expect(flat['author.uniqueId']).toBe('user1');
    expect(flat['stats.playCount']).toBe('4');
  });
});

describe('fetchTrendingVideos', () => {
  test('uses injected client and returns normalized records', async () => {
    const mockItems = [
      {
        video_id: 'abc',
        title: 'Hello',
        duration_in_sec: 30,
        url: 'https://www.tiktok.com/@user/video/abc',
        thumbnail: 'https://example.com/thumb.jpg',
        region: 'United States',
        country_code: 'US',
        author: {
          id: '1',
          uniqueId: 'user',
          name: 'User',
          profile_url: 'https://www.tiktok.com/@user',
          profile_picture_url: 'https://example.com/avatar.jpg',
          bio: 'bio',
          verifiedAccount: false,
          privateAccount: false,
        },
        stats: {
          diggCount: '10',
          shareCount: '2',
          commentCount: '1',
          playCount: '100',
          collectCount: '5',
        },
      },
    ];

    const client = {
      getTrending: jest.fn().mockResolvedValue(mockItems),
    };

    const results = await fetchTrendingVideos(
      { country: 'US', period: 7, limit: 5, sort_by: 'vv' },
      client,
    );

    expect(client.getTrending).toHaveBeenCalledTimes(1);
    expect(results).toHaveLength(1);
    expect(results[0].video_id).toBe('abc');
    expect(results[0].author.uniqueId).toBe('user');
  });
});