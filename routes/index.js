var request = require('sync-request'),
    cheerio = require('cheerio'),
    skip = process.env.skipUrl,
    allMovie = process.env.allMovie;

function skipUrl(url) {
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

      var get = request('GET',allMovie)
      var data =  JSON.parse(get.getBody('utf8'));
      console.log(data);
      res.json(data);

    },
    post: function(req, res){
    
      const id = req.params.id;
      const url = allMovie+id;
      var get = request('GET',url)
      var data =  JSON.parse(get.getBody('utf8'));
      var $ = cheerio.load(data.content.rendered);
      var  href = $('a').attr('href');
      var getHref = request('GET',skip+href);
      var json = {
            title : data.title.rendered,
            url : skipUrl(href),
            skipUrl : getHref.getBody('utf8'),
            img  : $('img').attr('src')

      };
      console.log('done  haha ');
      res.json(json);
    }
}
