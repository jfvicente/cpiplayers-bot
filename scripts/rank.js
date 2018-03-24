// Description:
//   Controle de Rank CPI - BF1
//
// Commands:
//   c-3po atualiza rank bf1 - atualiza o rank bf1
//   c-3po meu rank bf1 - mostra a sua posição no rank bf1
//	 c-3po rank bf1 [classe ou geral] - mostra todo o rank bf1 geral ou da classe escolhida
//	 c-3po rank pubg - mostra todo o rank PUBG
//	 c-3po stats pubg - mostra as estatisticas do PUBG

const http = require('http');
var data_members = require("../app/data/rankpubg.json");
const Util = require("../app/services/util");
const URL_RANK = "http://claprimeiroimperio.com.br/cpi/search_rank.php";
const URL_STATS_PUBG = "http://ec2-52-34-157-203.us-west-2.compute.amazonaws.com:3000/getProfileData/";

module.exports = (robot) => {
	robot.respond(/meu rank bf1/i, (msg) =>{
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
                    message += rank_class.sort((a, b) => a.rank - b.rank).map((x) => { return `*${translateClassName(x.classe)}:* ${parseInt(x.rank) + 1}º` }).join("\n");
                    message += `\n\nTemos ${response.rank_general.length} membros no Rank BF1.`

                    msg.reply(message);
                }
				else
					msg.reply("Parece que você não faz parte do rank CPI, Mestre!");
			});
	});
	
	robot.respond(/rank bf1 (.*)/i, (msg) => {
		var cpitag = msg.envelope.user.profile.display_name;
		
		if(cpitag == ""){
			msg.reply("Ops!... seu perfil não está configurado corretamente. No perfil do slack, preencha o campo [Display Name] com sua GamerTag e tente novamente.");
			return;
		}else{
			var $class = Util.removeAccents(msg.match[1]);
			showRank($class, msg, cpitag);
		}
    });
    
    robot.respond(/rank pubg/i, (msg) =>{
        var cpitag = msg.envelope.user.profile.display_name;

        robot.adapter.client.web.chat.postEphemeral(msg.message.room, "Aguarde um minuto estou calculando o rank...", msg.envelope.user.id, {as_user: true}); 
              
        getRankPubg(msg)
            .then((result) =>{
                var message = "Rank PUBG\n\n";
                message += result.sort((a, b) => b.total - a.total).map((x, idx, arr) => { return `${idx + 1}º - ${x.gamertag} - Pontos: ${x.total.toFixed(2)} ${x.gamertag.toLowerCase() == cpitag.toLowerCase() ? ':sunglasses:' : ''}`}).join("\n");
                message += "\n\nCálculo do Rank PUBG:\nPontos = PV + KD + EP + (VS / 100)\nPV = Percentual de Vitória\nKD = Eliminações/Morte\nEP = Eliminações por partida\nVS = Vitorias com Squad";
                msg.reply(message);
            })
            .catch(error => msg.reply("Ops!! deu ruim, não consegui calcular o rank. tente novamente."));
    });

    robot.respond(/stats pubg/i, (msg) =>{
        var cpitag = msg.envelope.user.profile.display_name;
        getRankPubgIndividual(msg,cpitag)
            .then(result =>{
                var message = "\nSuas Estatisticas no PUBG\n\n";
                message += `*PARTIDAS*\nTotal: ${getValueData(result.stats[0], 'Matches Played')} | Vitorias: ${getValueData(result.stats[0], 'Matches Won')} | Perc: ${getValueData(result.stats[0], 'Win Percentage')}%\n\n`
                message += `*ELIMINAÇÕES*\nKills: ${getValueData(result.stats[1], 'Total Kills')} | KD: ${getValueData(result.stats[1], 'KDA')}\n\n`
                message += `*SOLO*\nPartidas: ${getValueData(result.stats[3], 'Solo Matches Played')} | Vitorias: ${getValueData(result.stats[3], 'Solo Wins')}\n\n`
                message += `*EQUIPE*\nVitorias Dupla: ${getValueData(result.stats[4], 'Duo Wins')} | Vitorias Squad: ${getValueData(result.stats[4], 'Squad Wins')}\n\n`
                message += `*HEADSHOTS*\nTotal: ${getValueData(result.stats[2], 'Total Headshots')} | Acerto: ${getValueData(result.stats[2], 'Headshot Percentage')}%\n\n`
                message += `*TEMPO DE JOGO*\nDias: ${getValueData(result.stats[5], 'Days')} | Horas: ${getValueData(result.stats[5], 'Hours')} | Minutos: ${getValueData(result.stats[5], 'Minutes')}\n\n`
                msg.reply(message);
            }).catch(error => msg.reply("Ops!! deu ruim, não consegui encontrar suas estatisticas."));
    });

    getRankPubg = (msg) =>{
        return new Promise((resolve, reject) =>{      
            var tags = data_members.map(x => {  return encodeURIComponent(x.gamertag) }).join(",");
            http.get(URL_STATS_PUBG+tags, (resp) => {        
                let rawData = '';
                resp.on('data', (chunk) => { rawData += chunk; });

                resp.on('end', () => {
                    var stats = JSON.parse(rawData);
                    var resultArr = [];
                    data_members.forEach((membro, idx, arr) => {
                        var cpitag = membro.gamertag;
                        var stats_pubg = statsPubg(stats, cpitag);
                        if(stats_pubg)
                            resultArr.push(stats_pubg);
    
                        if(idx == (arr.length - 1))
                            resolve(resultArr);
                    });                                        
                });
            }).on('error', (e) => {
                reject(e);
                return;
            });
        });
    }

    statsPubg = (result, cpitag) =>{
        var stats_pubg = null;

        if(result[cpitag]){
            var stats = result[cpitag].stats;
            
            var resultStats = [] 
            
            var match = stats.find(x => x.title == "Match Stats").data;
            var kd = stats.find(x => x.title == "KDA").data;
            var hs = stats.find(x => x.title == "Headshot Stats").data;
            var solo = stats.find(x => x.title == "Solo").data;
            var team = stats.find(x => x.title == "Team").data;
            var totalTime = stats.find(x => x.title == "Total Time Played").data;                            
            
            if(getValueData(match, 'Matches Played') > 0){
                resultStats.push(match);
                resultStats.push(kd);
                resultStats.push(hs);
                resultStats.push(solo);
                resultStats.push(team);
                resultStats.push(totalTime);

                var total = (getValueData(kd, 'Total Kill')/getValueData(match, 'Matches Played')) + getValueData(kd, 'KDA') + getValueData(match, 'Win Percentage') + (getValueData(team, 'Squad Wins') / 100)

                if(total > 0)
                    stats_pubg = {gamertag: cpitag, total:total, stats: resultStats};
            }
        }

        return stats_pubg;
    }

    getRankPubgIndividual = (msg, cpitag) => {
        return new Promise((resolve, reject) =>{      
            http.get(URL_STATS_PUBG+encodeURIComponent(cpitag), (resp) => {        
                let rawData = '';
                resp.on('data', (chunk) => { rawData += chunk; });

                resp.on('end', () => {
                    var stats = JSON.parse(rawData);                                                
                    var stats_pubg = statsPubg(stats, cpitag);
                    resolve(stats_pubg);                                               
                });
            }).on('error', (e) => {
                //console.log(cpitag);
                reject(e);
                return;
            });
        });
    }

    getValueData = (arr, field)=>{
        var data = arr.find(x => x.name == field);
        if(data)
            return parseFloat(data.value);
        else
            return 0;
    }

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