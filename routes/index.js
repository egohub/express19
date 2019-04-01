var request = require('request');
var cheerio = require('cheerio');
var liveurl = "https://drhmonegyi.net/wp-json/wp/v2/posts";


exports.hmone = function (req, res) {
  var games = {}, data= [];

  var url = "https://hmonegyi.club/wp-json/wp/v2/posts";

  var option = {url : liveurl,json : true,method: 'GET'};
  request(option, function (error, resp, body) {
       var sofa = body;
       for (var i = 0; i < sofa.length; i++) {
         data.push({
                 id : sofa[i].id,
                 link : sofa[i]._links.self[0].href,
                 title: sofa[i].title.rendered
         });
       }
       console.log(data);
       res.send(sofa);
   })
};

exports.hmoneId = function (req, res) {
    var id = req.params.id, url  = {},  data =[];
    var matches = liveurl+'/'+id;
    var option = {url : matches, json : true, method: 'GET'};
    request(option, function (error, resp, body) {
         var lineups = body;
         var $ = cheerio.load(body.content.rendered);
         // console.log($('a').attr('href'));
         var img  = $('img').attr('src');
         var ads  = $('a').attr('href');
         request('https://killer.suchcrypto.co/kill?'+ads, function (error, resp, body) {
           url.link = body;

         data.push({
           title  : lineups.title.rendered,
           image : img,
           content : lineups.content.rendered,
           video : url.link
         })
         res.send(data);
     })
   })

};
