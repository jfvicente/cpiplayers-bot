// Description:
//   Piadas e termos internos para ajudar a interação com @c-3po
//

module.exports = (robot) =>{

    robot.hear(/azeite/ig, (msg)=>{
        msg.reply("Ai Pai Paaaaaaaaaara!!!!.. :dancer:")
    });

    robot.hear(/ban\b|banir|banido/ig, (msg) =>{
        msg.reply("Sua solicitação foi enviada ao Imperador... hahahahahahaha....\nhttps://gph.is/2pe183G")
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
        msg.reply("\n_Crianças do milho tem que morreeeeeerrr!!!_  :skull: \nhttps://media.giphy.com/media/NQAd7YLSctrvW/giphy.gif")
    });

    robot.hear(/lebaccan|lebacan/i, (msg) =>{
        var termos = ["https://cdn.cnn.com/cnnnext/dam/assets/140721120124-lionel-messi-0721-horizontal-large-gallery.jpg", "Lebaccan! Lebaccan! Lebaccan!"]
        msg.reply(msg.random(termos));
    });

    robot.hear(/bom dia/ig, (msg) =>{
        var termos = ["Bom dia Mestre!..", "Bom dia!", "Tenha um otimo dia padawan.", "Já Chega de BOM DIAAAA!!!!... \nBrincadeira, Bom dia! "];
        msg.reply(msg.random(termos));
    });

    robot.hear(/ferreira/i, (msg) =>{
        var termos = ["https://media.giphy.com/media/e8ojIgE5pyr2U/giphy.gif", "http://gph.is/2sXCTMi", "http://gph.is/2x4VGrM"];
        msg.reply("Oh! Céus mais um acidente\n"+msg.random(termos));
    });    
}