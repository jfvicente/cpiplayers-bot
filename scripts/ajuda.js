//  Description:
//    Checks the behavior of the Agile Promoters
//  Commands:

//    fala bixo

// o que está ouvindo
const COMMANDS = {
  HELLO: /ajuda/i,
};

// Lógica da ação do bot
const _msgInicial = (msg) => {
	msg.reply(`Comandos:
		*trailer [nome do filme]* : Retorna trailer do Filme
		*informe as regras* : Retorna as regras do clã
		*informe o link* : Retorna o link com a planilha do clã
		*passo a passo slack* : Retorna o link do PDF com o passo a passo
		*noticias* : Retorna as ultimas 5 noticias sobre games
		*meu rank bf1* : mostra a sua posição no rank bf1 geral e nas classes
		*rank bf1 [classe ou geral]* : mostra todo o rank bf1 geral ou da classe [assalto | medico | suporte | batedor | cavalaria | piloto | tanqueiro]
		*rank pubg* : mostra o rank CPI do PUBG
		*stats pubg* : mostra suas estatisticas no PUBG
		*meu clipe xbox* : mostra a ultima captura de video do xbox`);
}


// Como e o que a gente passa para a função
const _saudacao = msg => _msgInicial(msg);

//const _link = msgLink => _msgLink(msgLink);

module.exports = (robot) => {
  robot.respond(COMMANDS.HELLO, _saudacao);
};
