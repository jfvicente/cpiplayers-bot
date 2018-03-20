// Description:
// Dependencies:
//   "htmlparser": "1.7.7"
//   "soupselect": "0.2.0"
//
//
// Commands:
//   hubot trailer <movie> - Shows the trailer for that movie

const YoutubeService = require('../app/services/youtube');

const COMMANDS = {
  TRAILER: /trailer (.*)/i,
};

const _getTrailer = (msg) => {
  const movieName = `${msg.match[1]} trailer`;
  YoutubeService.API_KEY = process.env.GOOGLE_API_KEY;

  YoutubeService
    .searchTrailer(movieName)
    .then(trailer => msg.reply(`${trailer}`))
    .catch(err => msg.reply(err));
};

module.exports = (robot) => {
  robot.respond(COMMANDS.TRAILER, _getTrailer);
};