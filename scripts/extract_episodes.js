const fs = require('fs');
const path = require('path');
const https = require('https');

const SERIES_ID = '6a57868b5bf57c474cc00a50';
const API_KEY = 'ak_37515186786306625012043079404171';
const API_BASE = 'https://be.aryplus.tv';
const WEB_BASE = 'https://aryplus.tv';
const IMAGE_BASE = 'https://images.aryplus.tv/';

function formatDuration(secondsStr) {
  const total = parseInt(secondsStr, 10);
  if (isNaN(total)) return 'N/A';
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

async function fetchPage(page) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v2/cdn/pg/${SERIES_ID}?page=${page}&limit=10&sort=asc`;
    const req = https.get(url, { headers: { 'x-api-key': API_KEY } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response from page ${page}: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
  });
}

async function extractAll() {
  console.log(`Starting episode extraction for series: ${SERIES_ID}...`);
  let page = 1;
  let hasNext = true;
  const episodes = [];
  let seriesInfo = null;

  while (hasNext) {
    console.log(`Fetching page ${page}...`);
    const data = await fetchPage(page);
    if (!seriesInfo && data) {
      seriesInfo = {
        totalEpisodes: data.totalEpisodes,
        totalPages: data.totalPages,
        limit: data.limit
      };
    }

    if (Array.isArray(data.episode)) {
      episodes.push(...data.episode);
    }

    hasNext = data.hasNextPage && page < data.totalPages;
    page++;
  }

  console.log(`Successfully fetched ${episodes.length} episodes.`);

  const mapped = episodes.map((ep, idx) => {
    const epNum = ep.videoEpNumber || (idx + 1);
    const watchUrl = `${WEB_BASE}/video/v2/3/${ep._id}/${SERIES_ID}`;
    const watchUrlDrm = `${WEB_BASE}/video/v2/drm/3/${ep._id}/${SERIES_ID}`;
    const directHlsUrl = ep.videoSource || 'N/A';
    const thumbnailUrl = ep.imagePath ? `${IMAGE_BASE}${ep.imagePath}` : 'N/A';

    return {
      episodeNumber: epNum,
      title: ep.title || `Episode ${epNum}`,
      episodeId: ep._id,
      seriesId: SERIES_ID,
      durationSeconds: parseInt(ep.videoLength, 10) || 0,
      durationFormatted: formatDuration(ep.videoLength),
      drmEnabled: !!ep.drmEnabled,
      webWatchUrl: ep.drmEnabled ? watchUrlDrm : watchUrl,
      hlsStreamUrl: directHlsUrl,
      spriteVttUrl: ep.spriteUrl || null,
      thumbnailUrl: thumbnailUrl,
      introTimeStamp: ep.introTimeStamp ?? null,
      nextEpisodeId: ep.nextEpId || null
    };
  });

  // Write episodes.json
  const jsonPath = path.resolve(__dirname, '../episodes.json');
  fs.writeFileSync(jsonPath, JSON.stringify(mapped, null, 2));
  console.log(`Saved JSON dataset: ${jsonPath}`);

  // Write DAR_E_NIJAAT_EPISODES.md
  let md = `# Dar-E-Nijaat (Episodes Catalog)

**Series ID:** \`${SERIES_ID}\`  
**Total Episodes:** ${mapped.length}  
**Platform:** [ARY Plus](https://aryplus.tv/series/${SERIES_ID})  
**Extraction Date:** ${new Date().toISOString().split('T')[0]}  

---

## Episodes List

| Ep # | Title | Duration | DRM | Web Watch Link | Direct HLS Stream (.m3u8) |
| :---: | :--- | :---: | :---: | :--- | :--- |
`;

  mapped.forEach(ep => {
    md += `| **${ep.episodeNumber}** | ${ep.title} | ${ep.durationFormatted} | ${ep.drmEnabled ? 'Yes' : 'No'} | [Watch on ARY Plus](${ep.webWatchUrl}) | [HLS Stream](${ep.hlsStreamUrl}) |\n`;
  });

  md += `\n---\n\n## Complete Metadata Reference\n\n`;
  mapped.forEach(ep => {
    md += `### ${ep.title} (Episode ${ep.episodeNumber})
- **Episode ID:** \`${ep.episodeId}\`
- **Duration:** ${ep.durationFormatted} (${ep.durationSeconds}s)
- **Web Watch URL:** [${ep.webWatchUrl}](${ep.webWatchUrl})
- **Direct HLS Stream:** \`${ep.hlsStreamUrl}\`
- **Thumbnail:** [View Image](${ep.thumbnailUrl})
${ep.spriteVttUrl ? `- **Storyboard Sprite (VTT):** \`${ep.spriteVttUrl}\`\n` : ''}${ep.nextEpisodeId ? `- **Next Episode ID:** \`${ep.nextEpisodeId}\`\n` : ''}
`;
  });

  const mdPath = path.resolve(__dirname, '../DAR_E_NIJAAT_EPISODES.md');
  fs.writeFileSync(mdPath, md);
  console.log(`Saved Markdown catalog: ${mdPath}`);

  return mapped;
}

extractAll().catch(err => {
  console.error('Extraction failed:', err);
  process.exit(1);
});

