//  Description:
//    Checks the behavior of the Agile Promoters
//  Commands:

//    fala bixo

// o que está ouvindo
const COMMANDS = {
  HELLO: /passo a passo slack/i,
};

// Lógica da ação do bot
const _msgInicial = (msg) => {
  msg.reply(`https://drive.google.com/file/d/19GQAgREbvTE9Sa08Q0jLJdjyzOWTdvRm/view?usp=sharing`);
}


// Como e o que a gente passa para a função
const _saudacao = msg => _msgInicial(msg);

//const _link = msgLink => _msgLink(msgLink);

module.exports = (robot) => {
  robot.respond(COMMANDS.HELLO, _saudacao);
};
