const ACCESS_TOKEN = "A1szYsVI2yswz7-9e2pU0QMh85pSDYrjC88xkBE0l-GfXDQ6Vt_94Tb7aLAq6Ho4SE-ok_iyEekR0I8qjhp-bPDhnYf0k_fj-R-ilAKQDArxqCOfRGTFmjkNrk3-bvKvCT3bwrCrglqbff5U7-3iroKKsJKHR7kM7jC1j2SW2OBg-GGWmDiqxv0z7p41HSQEFOHNaA1T6RpTp9fOAq43YWntU8JDJtOVl3ckZwqSdZaMkC7vPrTWP2zj4BSvxPs:feedly";
const STREAM_ID = "user/c7e22790-a4cb-46f4-b602-06117af18929/category/Games";
const URL = `https://cloud.feedly.com/v3/streams/contents?streamId=${STREAM_ID}&count=5`;

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