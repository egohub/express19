var request = require('request');
var moment = require('moment');
var today = moment().format('YYYY-MM-DD'); //2017-01-24
var time = Math.round(((new Date()).getTime() - Date.UTC(1970, 0, 1)) / 1000);

var sessions = [
    {id:0 , title:"Introduction to Ionic", speaker:"CHRISTOPHE COENRAETS", time:"9:40am", room:"Ballroom A", description: "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."},
    {id:1 , title:"AngularJS in 50 Minutes", speaker:"LISA SMITH", time:"10:10am", room:"Ballroom B", description: "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."},
    {id:2 , title:"Contributing to Apache Cordova", speaker:"JOHN SMITH", time:"11:10am", room:"Ballroom A", description: "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."},
    {id:3 , title:"Mobile Performance Techniques", speaker:"JESSICA WONG", time:"3:10Pm", room:"Ballroom B", description: "In this session, you will learn performance techniques to speed up your mobile application."},
    {id:4 , title:"Building Modular Applications", speaker:"LAURA TAYLOR", time:"2:00pm", room:"Ballroom A", description: "Join Laura to learn different approaches to build modular JavaScript applications."}
];

exports.findAll = function (req, res, next) {
    res.send(sessions);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(sessions[id]);
};

exports.hmone = function (req, res) {
  var games = {}, data= [];
  var liveurl = "https://drhmonegyi.net/wp-json/wp/v2/posts";

  var option = {url : liveurl,json : true,method: 'GET'};
  request(option, function (error, resp, body) {
       var sofa = body;
       for (var i = 0; i < sofa.length; i++) {
         data.push({
                 title: sofa[i].title.rendered
         });
       }
       res.send(data);
   })
};

exports.liveScore = function (req, res) {
  var games = {}, data= [];
  var liveurl = "https://www.sofascore.com/football/livescore/json";

  var option = {url : liveurl,json : true,method: 'GET'};
  request(option, function (error, resp, body) {
       var sofa = body.sportItem.tournaments;
       res.send(sofa);
   })
};

exports.liveById = function (req, res, next) {
    var id = req.params.id;
    var matches = 'https://www.sofascore.com/event/'+id+'/json?_='+time ;
    var option = {url : matches, json : true, method: 'GET'};
    request(option, function (error, resp, body) {
         var lineups = body;
         res.send(lineups);
     })
};

exports.video = function (req, res, next) {
  var videos = [];
  var filter = 'https://www.reddit.com/r/soccer/search.json?q=flair_css_class%3Amedia%2C+site%3Astreamable.com&restrict_sr=on&sort=new&t=day';
  request({url:filter,  json: true}, function (err, resp, body) {
    var json=  body.data.children;
    for (var i = 0; i < json.length; i++) {
      var url = json[i].data.url;
      var apiurl = url.replace('https://streamable.com/', 'https://api.streamable.com/videos/');
      videos.push({
              url: apiurl,
              title: json[i].data.title
      });
    }
    res.send(videos);
    });
}
