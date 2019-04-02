var request = require('sync-request'),
    cheerio = require('cheerio'),
    skip = 'https://killer.suchcrypto.co/kill?';


function skipUrl(url) {
    console.log('This  env ==> '+ process.env.skipUrl);
  var get = request('GET',skip+url);
  var  getResult = get.getBody('utf8');
  var again = request('GET',getResult);
  var $=cheerio.load(again.getBody('utf8'), {xmlMode: true});
  var data = $('.container .row');
  var downloadLink = $(data).find('a').attr('href');
  return downloadLink;
};

module.exports = {
    posts: function(req, res){

      const url = 'https://allmoviemm.com/wp-json/wp/v2/posts/';

      var get = request('GET',url)
      var data =  JSON.parse(get.getBody('utf8'));
      console.log(data);
      res.json(data);

    },
    post: function(req, res){
      const id = req.params.id;
      const url = 'https://allmoviemm.com/wp-json/wp/v2/posts/'+id;
      var get = request('GET',url)
      var data =  JSON.parse(get.getBody('utf8'));
      var $ = cheerio.load(data.content.rendered);
      var  href = $('a').attr('href');
      var getHref = request('GET',skip+href);
      var json = {
            title : data.title.rendered,
            url : skipUrl(href),
            img  : $('img').attr('src')

      };
      console.log(json);
      res.json(json);
    }
}
