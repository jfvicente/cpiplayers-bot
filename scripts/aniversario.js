// Description:
//   Agendamento pra mostrar as ultimas noticias as 8h, 14h e 20h
//
// Commands:
//   c-3po noticias - Mostra as ultimas 5 noticias sobre games


var data = require("../app/data/cpiplayers.json");
var cronJob = require('cron').CronJob

module.exports = (robot) => {

    _getNiver = (msg) => {
        var aniversariantes = [];
        data.forEach(membro => {
            if(membro.Data_Aniversario){
                var date = membro.Data_Aniversario.split('-');
                var dateNow = new Date();
                var niverDate = new Date(dateNow.getFullYear(), parseInt(date[1]) - 1, date[0]);

                if(dateNow.setHours(0,0,0,0) == niverDate.setHours(0,0,0,0)){
                    aniversariantes.push(membro.Gamer_Tag);
                }
            }
        });

        if(aniversariantes.length > 0){
            var plural = aniversariantes.length > 1;
            if(plural)
                var saudacao = ['R2-D2 me falou que é aniversario dessa galera:', 'Oh! Ceus, quase esqueci, é aniversario dos nossos amigos Jedi:', 'Hoje tem festa em Tatooine, olhem os aniversariantes:'];
            else
                var saudacao = ['R2-D2 me falou que é aniversario do:', 'Oh! Ceus, quase esqueci, é aniversario do nosso amigo Jedi:', 'Hoje tem festa em Tatooine, olhe o aniversariante:'];

            var message = "\n:tada::tada::tada::confetti_ball::confetti_ball::confetti_ball:\n\n";
            var randomIndex = Math.floor(Math.random() * saudacao.length); 
            message += saudacao[randomIndex]+"\n\n";
            message += aniversariantes.join("\n");
            if(plural)
                message += "\n\nParabéns pessoal, que a força esteja com vocês!!!"
            else
                message += "\n\nParabéns mestre, que a força esteja com você!!!"

            msg.messageRoom('geral', message);
        }
    }

    new cronJob('0 11 * * *', () => _getNiver(robot), null, true, 'America/Sao_Paulo');

}

