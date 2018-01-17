const http = require('https');
const Promise = require('bluebird');

const YoutubeService = {
  API_KEY: '',

  searchTrailer: movieName => new Promise((resolve, reject) => {
    const query = encodeURI(`${movieName} trailer`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${query}&type=video&key=${YoutubeService.API_KEY}`;

    const req = http.get(url, (res) => {
      const status = res.statusCode;
      if (status !== 200) {
        reject(new Error('Mestre, não consegui buscar o trailer! Desculpe!'));
      } else {
        let body = '';

        res.on('end', () => {
          const json = JSON.parse(body);
          const firstTrailer = json.items[0];
          const videoId = firstTrailer.id.videoId;

          resolve(`https://www.youtube.com/watch?v=${videoId}`);
        });

        return res.on('data', (chunk) => {
          body += chunk;
        });
      }
    });

    req.on('error', () => {
      reject(new Error('Sem internet?!'));
    });

    return req;
  }),

};

module.exports = YoutubeService;