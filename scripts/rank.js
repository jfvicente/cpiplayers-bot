
module.exports = (robot) => {
	robot.respond(/meu rank bf1 (.*)/i, (msg) =>{
		var cpitag = msg.match[1];
		msg.http("http://claprimeiroimperio.com.br/cpi/search_rank.php")
			.get()((err, res, body) =>{
				var response = JSON.parse(body);
				var obj = response.rank.find((x) => x.gamertag.toLowerCase() == cpitag.toLowerCase());
				
				if(obj)
					msg.send("Mestre, você é o " + obj.rank + "º no rank geral CPI. Parabéns!!!");
				else
					msg.send("não encontrei seu rank mestre!!!");
			});
	});
};