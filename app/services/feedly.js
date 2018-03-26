const ACCESS_TOKEN = process.env.FEEDLY_ACCESS_TOKEN;
const STREAM_ID = "user/c7e22790-a4cb-46f4-b602-06117af18929/category/Games";
var hour = new Date().getHours();
const URL = `https://feedly.com/v3/mixes/contents?streamId=${STREAM_ID}&count=5&hours=${hour}&backfill=true&boostMustRead=true&unreadOnly=true`;


const Feedly = {
    getNews: msg => new Promise((resolve, reject) =>{   
        msg.http(URL)
            .header("Authorization", `OAuth ${ACCESS_TOKEN}`)
            .get()((err, res, body) => { 
                var result = JSON.parse(body);
                resolve(result);
                /*results.items.forEach(item => {
                    var link = item.originId;
                    if(link)
                        msg.messageRoom('noticias', link);
                });*/
            });             
    })
}

module.exports = Feedly;