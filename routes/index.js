var request = require('request');
var cheerio = require('cheerio');

var fullHd = 'https://hmonegyi.club/wp-json/wp/v2/posts?categories=7';
exports.hmone = function (req, res) {
  var games = {}, data= [];

  var liveurl = "https://drhmonegyi.net/wp-json/wp/v2/posts";
  var url = "https://hmonegyi.club/wp-json/wp/v2/posts";

  var option = {url : url,json : true,method: 'GET'};
  request(option, function (error, resp, body) {
       var sofa = body;
       for (var i = 0; i < sofa.length; i++) {
         data.push({
                 id : sofa[i].id,
                 link : sofa[i]._links.self[0].href,
                 title: sofa[i].title.rendered
         });
       }
       res.send(data);
   })
};

exports.hmoneId = function (req, res) {
    var id = req.params.id, data =[];
    var matches = 'https://hmonegyi.club/wp-json/wp/v2/posts/'+id;
    var option = {url : matches, json : true, method: 'GET'};
    request(option, function (error, resp, body) {
         var lineups = body;
         var $ = cheerio.load(body.content.rendered);
         console.log($('a').attr('href'));
         data.push({
           title  : lineups.title.rendered,
           content : lineups.content.rendered,
           video : $('a').attr('href')
         })
         res.send(data);
     })
};
