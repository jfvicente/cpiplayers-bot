// Description:
//   Mostra quando um membro começa uma transmissão no mixer
//

var data = require("../app/data/cpiplayers.json");
const Carina = require('carina').Carina;
const ws = require('ws');
const https = require('https');

Carina.WebSocket = ws;
const ca = new Carina({ isBot: true }).open();
const channelName = 'c-3po-learning'; 

process.removeAllListeners();
ca.setMaxListeners(Infinity);
process.setMaxListeners(Infinity);

module.exports = (robot) =>{        
    //let i = 0;
    data.filter(x => x.Status == "CPI").forEach((membro, idx, arr) => {
        let cpitag = membro.Gamer_Tag;
        let URL = `https://mixer.com/api/v1/channels/${cpitag.replace(" ", "_")}?fields=id`;
        https.get(URL, (response) =>{
            let rawData = '';
            response.on('data', (chunk) => { rawData += chunk; });

            response.on('end', () => {            
                if(response.statusCode == 200){
                    var obj = JSON.parse(rawData);
                    if(obj){
                        ca.subscribe(`channel:${obj.id}:update`, data => {
                            //console.log(data);
                                if(data.online != undefined){
                                    if(data.online)
                                        robot.messageRoom(channelName, `\nO Mestre ${cpitag} está fazendo uma transmissão pelo Mixer, acompanhem!!!\n<https://mixer.com/${cpitag.replace(" ", "_")}|https://mixer.com/${cpitag.replace(" ", "_")}>`);
                                    
                                    if(data.online == false)
                                        robot.messageRoom(channelName, `:disappointed: Ah! que pena... ${cpitag} terminou a transmissão no Mixer. Mas vocês podem ver as ultimas transmissões gravadas.\n<https://mixer.com/${cpitag.replace(" ", "_")}|https://mixer.com/${cpitag.replace(" ", "_")}>`);
                                }
                            });
                    }
                }
            });
        }).on('error', error => console.log(error));
    })

}