// Description:
//   mostra a captura de video do xbox
//
// Commands:
//   c-3po meu clipe xbox - mostra a captura de video do xbox

const fs = require('fs');
const http = require('http');
const download = require('download-file')
const xboxapiv2 = require('node-xboxapiv2')('22b5b246433cb8ca7c60efe1dc2b45be37f24711');

const dirFiles = "./temp/";
const urlTreta = "http://ec2-52-34-157-203.us-west-2.compute.amazonaws.com:3000/getProfileData/";

module.exports = (robot) =>{

    robot.respond(/meu clipe xbox/ig, (res) =>{
        res.reply("Oh! Ceus, tenho que procurar nos meus registros. um minuto por favor....");
        var cpitag = res.envelope.user.profile.display_name;
        http.get(urlTreta+encodeURIComponent(cpitag), (response) => {        
            let rawData = '';
            response.on('data', (chunk) => { rawData += chunk; });

            response.on('end', () => {
                var obj = JSON.parse(rawData);
                var xuid = obj[cpitag].xuid;
                if(xuid)
                    getClips(xuid, cpitag, res);
                else
                    throw new Error();
              });                
        }).on('error', (e) => {
            res.reply("Mestre, acho que estou com mal funcionamento, não consegui completar sua solicitação. Tente novamente.")
        });              
    });

    getClips = (xuid, cpitag, res) => {
        xboxapiv2.get('GameClips', {xuid: xuid}, 
            (err, clips) =>{
                //handle response
                if(clips){
                    res.reply("Encontrei seu clipe, assim que o download terminar mando pra você...");
                    var urlClip = clips[0].gameClipUris[0].uri;
                    var filename = `${xuid}.MP4`;
                    var title = clips[0].titleName;
                    //console.log(urlClip);
                    downloadClip(urlClip, filename, (err) =>{
                        if(!err)
                            uploadFileSlack(title, filename, cpitag, res);
                        else
                            res.reply("Desculpa mestre, mas houve um erro no download do arquivo. Tente novamente.");
                    })
                }                    
            }
        ); 
    }

    uploadFileSlack = (title, filename, cpitag, res) =>{
        const filess = fs.createReadStream(`${dirFiles}${filename}`);
        var upload = robot.adapter.client.web.files.upload(title, {file: filess, channels: res.message.room, initial_comment: "Pronto! seu clipe do Xbox @"+cpitag});

        if(upload){
            fs.unlinkSync(`${dirFiles}${filename}`);
        };        
    }

    downloadClip = (url, filename, cb) =>{
        var options = {
            directory: dirFiles,
            filename: filename,
            timeout: 300000
        }
        
        download(url, options, cb);
    }
}