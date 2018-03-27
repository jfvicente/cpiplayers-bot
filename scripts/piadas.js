// Description:
//   Piadas e termos internos para ajudar a interação com @c-3po
//
// Commands:
//   c-3po noticias - Mostra as ultimas 5 noticias sobre games

module.exports = (robot) =>{

    robot.hear(/azeite/ig, (msg)=>{
        msg.reply("Ai Pai Paaaaaaaaaara!!!!.. :dancer:")
    });

    robot.hear(/ban|banir|banido/ig, (msg) =>{
        msg.reply("O Imperador está aguardando a sua visita.... hahahahahahaha....\nhttps://gph.is/2pe183G")
    });

    robot.hear(/abraao/ig, (msg) =>{
        var termos = ["Boa Tiiiiiime!!! :clap::clap::clap:", "Hater é você! :rage:"]
        msg.reply(msg.random(termos));
    });

    robot.respond(/obrigado|tanks/ig, (msg) =>{
        //var termos = ["Boa Tiiiiiime!!!", "Hater é você!"]
        msg.reply("Não agradeça a este simpático Droid, Agradeça ao Mestre CPI LeoLiraRJ, que me programou!!! :c3po::c3po::c3po:");
    });

    robot.hear(/milharal/i, (msg) =>{
        msg.reply("Oh! Ceus, esse termo me faz lembrar das histórias do CPI VinceMaul... \n_Crianças do milho tem que morreeeeeerrr!!!_  :skull: \nhttps://media.giphy.com/media/NQAd7YLSctrvW/giphy.gif")
    });

    robot.hear(/lebaccan|lebacan/i, (msg) =>{
        var termos = ["https://cdn.cnn.com/cnnnext/dam/assets/140721120124-lionel-messi-0721-horizontal-large-gallery.jpg", "Lebaccan! Lebaccan! Lebaccan!"]
        msg.reply(msg.random(termos));
    });
}