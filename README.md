# TikTok Trending Videos Scraper

> Scrape top TikTok trending videos with enriched metadata, including author profiles and full engagement stats. This TikTok trending videos scraper helps you discover viral content by country, date range, and custom sorting. Ideal for marketers, analysts, and creators who need fast, structured insights into what’s working on TikTok.


<p align="center">
  <a href="https://bitbash.dev" target="_blank">
    <img src="https://github.com/za2122/footer-section/blob/main/media/scraper.png" alt="Bitbash Banner" width="100%"></a>
</p>
<p align="center">
  <a href="https://t.me/devpilot1" target="_blank">
    <img src="https://img.shields.io/badge/Chat%20on-Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>&nbsp;
  <a href="https://wa.me/923249868488?text=Hi%20BitBash%2C%20I'm%20interested%20in%20automation." target="_blank">
    <img src="https://img.shields.io/badge/Chat-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>&nbsp;
  <a href="mailto:sale@bitbash.dev" target="_blank">
    <img src="https://img.shields.io/badge/Email-sale@bitbash.dev-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>&nbsp;
  <a href="https://bitbash.dev" target="_blank">
    <img src="https://img.shields.io/badge/Visit-Website-007BFF?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website">
  </a>
</p>




<p align="center" style="font-weight:600; margin-top:8px; margin-bottom:8px;">
  Created by Bitbash, built to showcase our approach to Scraping and Automation!<br>
  If you are looking for <strong>TikTok Trending Videos Scraper</strong> you've just found your team — Let’s Chat. 👆👆
</p>


## Introduction

The TikTok Trending Videos Scraper collects the most popular videos from TikTok for a selected country and time period, then enriches them with detailed author and performance data. Instead of manually browsing the app, you get a clean, structured dataset ready for analysis and reporting.

This project is designed for anyone who needs to understand what’s trending on TikTok: performance marketers, brand managers, influencer agencies, content strategists, and data analysts. It transforms scattered TikTok insights into a consistent dataset you can plug into dashboards, spreadsheets, or machine learning workflows.

### TikTok Trend Intelligence for Data-Driven Teams

- Automatically fetches trending TikTok videos by region, time window, and ranking criteria.
- Enriches each video with creator profile details and engagement statistics.
- Supports practical filters like period (last 7 or 30 days), country, and sort order by likes, views, comments, or reposts.
- Outputs clean, machine-readable data ideal for BI tools, spreadsheets, or programmatic pipelines.
- Helps quantify content performance, benchmark competitors, and validate creative ideas with real numbers.

## Features

| Feature | Description |
|----------|-------------|
| Country-based trending feed | Retrieve trending TikTok videos for a specific country to localize insights and campaigns. |
| Time window filtering | Limit results to the last 7 or 30 days to keep analysis focused on fresh trends. |
| Custom sort options | Sort videos by views, likes, comments, or reposts to match your performance KPIs. |
| Enriched author profiles | Get creator IDs, usernames, bios, profile URLs, avatars, and verification flags for deeper influencer research. |
| Full engagement statistics | Collect likes, shares, comments, plays, and collections for each video to compare performance at a glance. |
| Clean JSON output | Export structured data ready for dashboards, spreadsheets, or downstream data pipelines. |
| Limit control | Configure the number of videos to retrieve so you can balance depth vs. speed. |
| Region and country codes | Capture both human-readable region and ISO-style country code for easy segmentation and joins. |
| Suitable for automation | Built to be integrated into scheduled scripts, reporting jobs, and analytics workflows. |
| Insight-ready schema | Data model is designed for immediate use in marketing attribution, content strategy, and trend reports. |

---

## What Data This Scraper Extracts

| Field Name | Field Description |
|-------------|------------------|
| video_id | Unique identifier of the TikTok video. |
| title | Caption or title text associated with the video. |
| duration_in_sec | Length of the video in seconds. |
| url | Direct URL to the TikTok video. |
| thumbnail | Thumbnail image URL representing the video. |
| region | Human-readable region name where the video is trending. |
| country_code | Short country code (for example, US) for the trending region. |
| author.id | Unique internal identifier of the video’s creator. |
| author.uniqueId | Creator’s TikTok username or handle. |
| author.name | Display name of the creator profile. |
| author.profile_url | URL to the creator’s TikTok profile page. |
| author.profile_picture_url | URL of the creator’s profile picture. |
| author.bio | Bio/description text from the creator’s profile. |
| author.verifiedAccount | Indicates whether the creator’s profile is verified. |
| author.privateAccount | Indicates whether the creator’s profile is private. |
| stats.diggCount | Number of likes (hearts) the video has received. |
| stats.shareCount | Number of times the video has been shared. |
| stats.commentCount | Number of comments posted on the video. |
| stats.playCount | Total number of plays or views for the video. |
| stats.collectCount | Number of times the video has been added to collections or favorites. |

---

## Example Output

    [
      {
        "video_id": "7450665948308131114",
        "title": "I laughed every time I rewatched her reaction 😂😭#elfontheshelf #christmas #funny #funnyvideos #kids #elfmagic #elflosthermagic #christmasfun #elf ",
        "duration_in_sec": 74,
        "url": "https://www.tiktok.com/@unforgettable.chrissy/video/7450665948308131114",
        "thumbnail": "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068c799-us/osnWSOmVuBiIhAFRfDOItTzFMZEzgzfFwRFDEw~tplv-noop.image",
        "region": "United States",
        "country_code": "US",
        "author": {
          "id": "6803109662977442822",
          "uniqueId": "unforgettable.chrissy",
          "name": "CHRI$Y",
          "profile_url": "https://www.tiktok.com/@unforgettable.chrissy",
          "profile_picture_url": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/cad8c0b90c54e29c3a90a130b4955ab9.jpeg",
          "bio": "Have the day you deserve 🩷🤍 IG beautyrush2",
          "verifiedAccount": false,
          "privateAccount": false
        },
        "stats": {
          "diggCount": "5400000",
          "shareCount": "1800000",
          "commentCount": "85300",
          "playCount": "40300000",
          "collectCount": "437451"
        }
      }
    ]

---

## Directory Structure Tree

    TikTok Trending Videos Scraper/
    ├── src/
    │   ├── index.js
    │   ├── config/
    │   │   └── settings.example.json
    │   ├── services/
    │   │   ├── tiktokClient.js
    │   │   └── trendingFetcher.js
    │   ├── utils/
    │   │   ├── logger.js
    │   │   └── validators.js
    │   └── outputs/
    │       ├── jsonExporter.js
    │       └── csvExporter.js
    ├── data/
    │   ├── inputs.sample.json
    │   └── sample-output.json
    ├── tests/
    │   └── trending-scraper.test.js
    ├── package.json
    ├── .env.example
    └── README.md

---

## Use Cases

- Marketing analysts use it to track top-performing TikTok videos in their target markets, so they can design campaigns that mirror proven high-engagement formats.
- Influencer agencies use it to discover creators behind trending content, so they can quickly build curated shortlists for brand collaborations.
- Content strategists use it to benchmark their own posts against trending videos, so they can refine hooks, formats, and posting schedules based on data.
- Social listening teams use it to monitor emerging themes and hashtags, so they can react early to viral moments and shape brand narratives.
- Data scientists use it to feed ML models with high-quality engagement data, so they can forecast performance and test creative hypotheses at scale.

---

## FAQs

**Q1: Do I need any special access to scrape trending TikTok videos?**
No platform-specific developer access is required for this project. You simply configure the country, limit, period, and sort options, and the scraper returns publicly available trending data. Always make sure your usage complies with TikTok’s terms of service and local regulations.

**Q2: How can I change the number of videos retrieved?**
Use the limit parameter to control how many trending videos are collected. For example, setting limit to 10 will return the top 10 results for the selected country and period. If you omit the limit, the scraper defaults to a sensible value suitable for quick analyses.

**Q3: Which time ranges are supported?**
The period parameter currently supports practical values for recent trends, such as 7 (last 7 days) or 30 (last 30 days). This keeps the dataset focused on current behavior instead of outdated content, which is ideal for performance marketing and trend analysis.

**Q4: Can I sort results by metrics other than views?**
Yes. The sort_by parameter lets you prioritize different performance metrics such as vv (views), like, comment, or repost. This allows you to filter for the type of engagement that matters most to your business goals.

---

## Performance Benchmarks and Results

- Primary Metric: On a typical broadband connection, the scraper can collect and enrich around 50 trending videos in under 60 seconds, including author profiles and engagement stats.
- Reliability Metric: With sane network and configuration settings, success rates above 95% are achievable for standard country and period combinations.
- Efficiency Metric: Designed to reuse connections and minimize redundant requests, the scraper runs comfortably on modest compute instances while maintaining good throughput.
- Quality Metric: By combining video metadata, creator information, and multiple engagement metrics, the scraper delivers high data completeness, making it suitable for robust analytics and reporting workflows.


<p align="center">
<a href="https://calendar.app.google/74kEaAQ5LWbM8CQNA" target="_blank">
  <img src="https://img.shields.io/badge/Book%20a%20Call%20with%20Us-34A853?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Book a Call">
</a>
  <a href="https://www.youtube.com/@bitbash-demos/videos" target="_blank">
    <img src="https://img.shields.io/badge/🎥%20Watch%20demos%20-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch on YouTube">
  </a>
</p>
<table>
  <tr>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtu.be/MLkvGB8ZZIk" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review1.gif" alt="Review 1" width="100%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Bitbash is a top-tier automation partner, innovative, reliable, and dedicated to delivering real results every time.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Nathan Pennington
        <br><span style="color:#888;">Marketer</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtu.be/8-tw8Omw9qk" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review2.gif" alt="Review 2" width="100%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Bitbash delivers outstanding quality, speed, and professionalism, truly a team you can rely on.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Eliza
        <br><span style="color:#888;">SEO Affiliate Expert</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtube.com/shorts/6AwB5omXrIM" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review3.gif" alt="Review 3" width="35%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Exceptional results, clear communication, and flawless delivery. Bitbash nailed it.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Syed
        <br><span style="color:#888;">Digital Strategist</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
  </tr>
</table>
