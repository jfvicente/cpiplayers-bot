//  Description:
//    Checks the behavior of the Agile Promoters
//  Commands:

//    fala bixo

// o que está ouvindo
const COMMANDS = {
  HELLO: /informe as regras/i,
};

// Lógica da ação do bot
const _msgInicial = (msg) => {
  msg.reply(`Não são permitidas mensagens políticas, religiosas ou com qualquer tipo de preconceito! O não cumprimento das regras acarretará em notificações e até mesmo expulsões do clã!`);
}


// Como e o que a gente passa para a função
const _saudacao = msg => _msgInicial(msg);

//const _link = msgLink => _msgLink(msgLink);

module.exports = (robot) => {
  robot.respond(COMMANDS.HELLO, _saudacao);
};
