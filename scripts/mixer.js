// Description:
//   Mostra quando um membro começa uma transmissão no mixer
//

var data = require("../app/data/cpiplayers.json");
const Carina = require('carina').Carina;
const ws = require('ws');
const https = require('https');

Carina.WebSocket = ws;
const ca = new Carina({ isBot: true }).open();
const channelName = 'geral'; 

process.removeAllListeners();
ca.setMaxListeners(Infinity);
process.setMaxListeners(Infinity);

module.exports = (robot) =>{        

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
                                        robot.messageRoom(channelName, `\n${cpitag} está transmitindo pelo Mixer...\n<https://mixer.com/${cpitag.replace(" ", "_")}|Assistir a transmissão :tv:>`);
                                    
                                    if(data.online == false)
                                        robot.messageRoom(channelName, `${cpitag} terminou a transmissão pelo Mixer... :disappointed:\n<https://mixer.com/${cpitag.replace(" ", "_")}|https://mixer.com/${cpitag.replace(" ", "_")}>`);
                                }
                            });
                    }
                }
            });
        }).on('error', error => console.log(error));
    })
}