const rp = require('request-promise');
const $ = require('cheerio');

var liveurl = "https://drhmonegyi.net/wp-json/wp/v2/posts";

const parse = function(url) {
  return rp(url)
    .then(function(html) {
      return {
        title : $('.postbodyh').text(),
        img: $('.singdis img', html).attr('src'),
        link: 'https://killer.suchcrypto.co/kill?'+$('.singdis a', html).attr('href'),
      };
    })
    .catch(function(err) {
      //handle error
    });
};

exports.xParse = function (req, res) {

rp(liveurl)
  .then(function(html) {
    //success!
    const wikiUrls = [];
    console.log(JSON.parse(html));
    var init   = JSON.parse(html)
    for (var i = 0; i < init.length; i++) {
      wikiUrls.push(init[i].link)
      console.log(init[i].link);
    }
    // for (let i = 0; i < 45; i++) {
    //   wikiUrls.push($('big > a', html)[i].attribs.href);
    // }
    return Promise.all(
      wikiUrls.map(function(url) {
        return parse(url);
        // return potusParse('https://en.wikipedia.org' + url);
      })
    );
  })
  .then(function(presidents) {
    console.log(presidents);
    res.send(presidents)
  })
  .catch(function(err) {
    //handle error
    console.log(err);
  });

}
// module.exports = xParse;
