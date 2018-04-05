//  Description:
//    Mostra os comandos que o @c-3po suporta
//  Commands: 
// 		@c-3po ajuda - Mostra todos os comandos que o bot pode fazer

var data = require("../app/data/cpiplayers.json");
var moment = require("moment");

const URL_BASE = "https://api-content.ingresso.com/v0";


module.exports = (robot) => {

    robot.respond(/cinema$/ig, (msg) =>{
        getMovies(msg, "highlights");
    });

    robot.respond(/cinema em breve|cinema breve/ig, (msg) =>{
        getMovies(msg, "soon");
    });

    robot.respond(/cinema em cartaz|cinema cartaz/ig, (msg) =>{
        getMovies(msg, "nowplaying");
    });

    getMovies = (msg, category) =>{
        var cpitag = msg.envelope.user.profile.display_name;
        var member = data.find(x => x.Gamer_Tag.toLowerCase() == cpitag.toLowerCase());
        var city_name = member.Cidade.split("-")[0];
        msg.http(`${URL_BASE}/states/city/name/${city_name.replace(" ", "-").toLowerCase()}`)
            .get()((err, res, body) =>{
                if(err){
                    msg.reply("Ops!... Erro ao buscar a sua cidade...");
                    return;
                }

                var city = JSON.parse(body);
                console.log(category);
                msg.http(`${URL_BASE}/templates/${category}/${city.id}`)
                    .get()((err, res, body) =>{
                        if(err){
                            msg.reply("Ops!... não consegui buscar as sessões de cinema da sua cidade");
                            return;
                        }

                        var movies = JSON.parse(body); 
                        var att = createMessage(movies, category == "highlights");
                        var categoryName = category == "highlights" ?  "Destaque" : category == "soon" ? "Breve" : "Cartaz";  
                        robot.adapter.client.web.chat.postMessage(msg.message.room, "Filmes em "+categoryName+" da cidade "+city.name+"\nObs.: _Informações fornecidas pelo <http://ingresso.com|ingresso.com>_", {as_user:true, attachments: att}); 
                        //console.log(attachements);                      
                    });
            });
    }



    createMessage = (movies, isHighlight) =>{
        var att = movies.map(x => {
            var event = isHighlight ? x.event : x;
            var movieDate = moment(event.premiereDate.localDate, moment.HTML5_FMT.DATETIME_LOCAL_MS, 'pt-BR');
            var isAfterToday = movieDate.isAfter();
            var item = {
                        "fallback": event.title,
                        "color": "#36a64f",                                         
                        "title": event.title, 
                        "title_link": event.siteURL,
                        "text": ((event.premiereDate.isToday || isAfterToday) ? "Estreia " : "Estreou ") + (event.premiereDate.isToday ? "Hoje" : movieDate.format("DD [de] MMM [de] YYYY")) + (isAfterToday && event.inPreSale == true ? " - Pré-Venda" : "") +"\n```Sinopse: "+event.synopsis.trimRight()+"```",// + "\n" + x.showtimes.map(y => { return "<"+y.siteURL+"|_"+y.name+"_>"}).join(" | "),
                        "image_url": event.images[0].url,                                 
                        "mrkdwn_in": ["text", "pretext"]
                       };
            return item;                       
        });

        return att;
    }
}