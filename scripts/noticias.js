// Description:
//   Agendamento pra mostrar as ultimas noticias as 8h, 14h e 20h
//
// Commands:
//   c-3po noticias - Mostra as ultimas 5 noticias sobre games


var cronJob = require('cron').CronJob
const Feedly = require('../app/services/feedly');

const _getNews = (msg) =>{
    Feedly.getNews(msg)
        .then(result => {
            result.items.forEach(item => {
                var link = item.originId;
                if(link)
                    msg.reply(link);
            });
        })
        .catch(error => msg.reply("Mestre, houve um erro na busca das noticias."));
}

const _getNewsCron = (msg) =>{
    Feedly.getNews(msg)
        .then(result => {
            result.items.forEach(item => {
                var link = item.originId;
                if(link)
                    msg.messageRoom('noticias', link);
            });
        })
        .catch(error => msg.messageRoom('noticias', 'Mestre, houve um erro na busca das noticias.'));
}

module.exports = (robot) =>{
    robot.respond(/noticias/i,_getNews);

    new cronJob('0 8,12,18,22 * * *', () => _getNewsCron(robot), null, true, 'America/Sao_Paulo');
}