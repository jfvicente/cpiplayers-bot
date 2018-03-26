//  Description:
//    Mostra os comandos que o @c-3po suporta
//  Commands: 
// 		@c-3po ajuda

module.exports = (robot) => {
  robot.respond(/ajuda/i, (msg) =>{

		var comands = [
				{
						"color": "#36a64f",                  
						"title": "Mostra o ultimo trailer do filme consultado no youtube",           
						"text": "`@c-3po trailer [nome_do_filme]`\nExemplo: `@c-3po trailer vingadores guerra infinita`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra as regras basicas do clã",           
						"text": "`@c-3po informe as regras`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra a planilha com todos os membros do clã",           
						"text": "`@c-3po informe o link`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra o link do PDF com as principais funções do SLACK",           
						"text": "`@c-3po passo a passo slack`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra as 5 últimas noticias sobre games",           
						"text": "`@c-3po noticias`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra a sua posição no RANK CPI - BF1",           
						"text": "`@c-3po meu rank bf1`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra o RANK CPI - BF1",           
						"text": "`@c-3po rank bf1 [nome_classe ou geral]`\nnome_classe = [assalto | medico | suporte | batedor | cavalaria | piloto | tanqueiro]\nExemplo:`@c-3po rank bf1 geral` ou `@c-3po rank bf1 assalto`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra o RANK CPI - PUBG",           
						"text": "`@c-3po rank pubg`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra suas estatisticas no PUBG",           
						"text": "`@c-3po stats pubg`",
						"mrkdwn_in": ["text", "pretext"]
				},
				{
						"color": "#36a64f",                  
						"title": "Mostra o último clipe do xbox",           
						"text": "`@c-3po meu clipe xbox`",
						"mrkdwn_in": ["text", "pretext"]
				}				
			];

		robot.adapter.client.web.chat.postMessage(msg.message.room, "Aqui estão todos os comandos que você pode usar:", {as_user:true, attachments: comands});
	});
};
