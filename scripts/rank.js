
// Description:
//   Controle de Rank CPI - BF1
//
// Commands:
//   c-3po atualiza rank bf1 - atualiza o rank bf1
//   c-3po meu rank bf1 - mostra a sua posição no rank bf1
//	 c-3po rank bf1 [classe ou geral] - mostra todo o rank bf1 geral ou da classe escolhida
//
// Autor:
// Leonardo Oliveira

const URL_RANK = "http://claprimeiroimperio.com.br/cpi/search_rank.php";

module.exports = (robot) => {
	robot.hear(/meu rank bf1/i, (msg) =>{
        var cpitag = msg.envelope.user.profile.display_name;
        //var cpitag = "CPI LeoLiraRJ";
		msg.http(URL_RANK)
			.get()((err, res, body) =>{
				var response = JSON.parse(body);
                var rank_general = response.rank_general.find((x) => x.gamertag.toLowerCase() == cpitag.toLowerCase());
                var rank_class = response.rank_class.filter((x) => x.gamertag.toLowerCase() == cpitag.toLowerCase());
                
                if(rank_general){
                    var message = "\nMestre, seu rank como pediu:\n\n";
                    message += `*RANK GERAL:* ${rank_general.rank}º\n\n`; 
                    message += rank_class.map((x) => { return `*${translateClassName(x.classe)}:* ${parseInt(x.rank) + 1}º` }).join("\n");
                    message += `\n\nTemos ${response.rank_general.length} membros no Rank BF1.`

                    msg.reply(message);
                }
				else
					msg.reply("Parece que você não faz parte do rank CPI, Mestre!");
			});
	});
	
	robot.respond(/rank bf1 (.*)/i, (msg) => {
        //var cpitag = msg.envelope.user.profile.display_name;
        var cpitag = "CPI LeoLiraRJ"
		var $class = msg.match[1];
		showRank($class, msg, cpitag);
	});

	showRank = ($class, msg, cpitag) =>{
		msg.http(URL_RANK)
			.get()((err, res, body) =>{
				var response = JSON.parse(body);
				var rank = [];
				if($class == "geral")
					rank = response.rank_general;
				else
                	rank = response.rank_class.filter((x) => x.classe.toLowerCase() == translateClassNameReverse($class).toLowerCase());
                
                if(rank.length > 0){
                    var message = `\nMestre, olha como está o rank ${$class}:\n\n`;
					//message += `*RANK GERAL:* ${rank_general.rank}º\n\n`;
					message += rank.map((x) => { return `*${$class == 'geral' ? x.rank : parseInt(x.rank) + 1}º* - ${x.gamertag} ${x.gamertag.toLowerCase() == cpitag.toLowerCase() ? ':sunglasses:' : ''}` }).join("\n");

                    msg.reply(message);
                }
				else
					msg.reply("Parece que rank CPI não esta disponivel, Mestre!");
			});
	}
    
    translateClassName = ($class) =>{
        switch($class){
			case "ASSAULT":
				return "ASSALTO";
				break;
			case "MEDIC":
                return "MÉDICO";
				break;
			case "SUPPORT":
                return "SUPORTE";
				break;
			case "SCOUT":
                return "BATEDOR";
				break;
			case "PILOT":
                return "PILOTO";
				break;
			case "TANKER":
                return "TANQUEIRO";
				break;
			case "CAVALRY":
                return "CAVALARIA";
				break;								
		};
	}
	
	translateClassNameReverse = ($class) =>{
        switch($class.toUpperCase()){
			case "ASSALTO":
				return "ASSAULT";
				break;
			case "MEDICO":
                return "MEDIC";
				break;
			case "SUPORTE":
                return "SUPPORT";
				break;
			case "BATEDOR":
                return "SCOUT";
				break;
			case "PILOTO":
                return "PILOT";
				break;
			case "TANQUEIRO":
                return "TANKER";
				break;
			case "CAVALARIA":
                return "CAVALRY";
				break;								
		};
    }
};