var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    // sessions        = require('./routes/sessions'),
    api        = require('./routes'),
    app = express();
    var request = require('request');
    var moment = require('moment');
    var today = moment().format('YYYY-MM-DD'); //2017-01-24
    var time = Math.round(((new Date()).getTime() - Date.UTC(1970, 0, 1)) / 1000);

    app.use(express.static(__dirname + '/www'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app.get('/api', api.findAll);
// app.get('/api/:id', api.findById);
app.get('/hmone', api.hmone);
app.get('/hmone/:id', api.hmoneId);

// app.get('/livescore/:id', api.liveById);
// app.get('/video', api.video);

app.get('/live', function (req, res) {
  var games = {}, data= [];
  var live = 'http://www.sofascore.com/football/livescore/json';
  var option = {url : live,json : true,method: 'GET'};
  request(option, function (error, resp, body) {
       var sofa = body.sportItem.tournaments;
      data.push(sofa)
      res.send(data);
   })
});

app.get('/today', function (req, res) {
  var games = {}, data= [];
  var todayUrl = 'http://www.sofascore.com/football//'+moment().format('YYYY-MM-DD')+'/json?_='+time;
  var option = {url : todayUrl,json : true,method: 'GET'};
  request(option, function (error, resp, body) {
       var sofa = body.sportItem.tournaments;
       console.log(sofa);
      data.push(sofa)
      res.send(sofa);
   })
  // res.send(todayUrl);
});
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
