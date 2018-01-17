//  Description:
//    Checks the behavior of the Agile Promoters
//  Commands:

//    fala bixo

// o que está ouvindo
const COMMANDS = {
  HELLO: /link cpi/i,
};

// Lógica da ação do bot
const _msgInicial = (msg) => {
  msg.reply(`Aqui esta seu Link mestre : https://docs.google.com/spreadsheets/d/1YVczSOoyoHFJe6bFuP1G38-BdWMkMaBn3nVxfNcCk-I/edit#gid=1391240432`);
}


// Como e o que a gente passa para a função
const _saudacao = msg => _msgInicial(msg);

//const _link = msgLink => _msgLink(msgLink);

module.exports = (robot) => {
  robot.respond(COMMANDS.HELLO, _saudacao);
};
