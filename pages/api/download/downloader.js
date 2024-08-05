import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { url } = req.body;
      const videoStream = ytdl(url, { quality: 'highest' });

      const videoInfo = await ytdl.getInfo(url);
      const title = videoInfo.videoDetails.title;

      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp4"`);

      videoStream.pipe(res);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

