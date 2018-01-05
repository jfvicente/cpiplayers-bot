//  Description:
//    Checks the behavior of the Agile Promoters
//  Commands:

//    fala bixo

// o que está ouvindo
const COMMANDS = {
  HELLO: /fala bixo (.*)/i,
};

// Lógica da ação do bot
const _xingaNoob = (msg, nome) => {
  msg.reply(`Fala ai o ${nome}, tu é altos n00b na real`)
}


// Como e o que a gente passa para a função
const _saudacao = msg => _xingaNoob(msg, msg.match[1].trim());


module.exports = (robot) => {
  robot.respond(COMMANDS.HELLO, _saudacao);
};