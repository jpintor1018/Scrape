const path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");

var db=require("../models");
module.exports = app => {
    app.get("/", function(req,res){
        db.Article.find({"saved": false}).then(function(result){
            var hbsObject = { articles: result };
            res.render("index",hbsObject);
        }).catch(function(err){ res.json(err) });
    });

//------Scraper------
app.get("/scrape",function(req,res){

    axios.get("https://www.buzzfeed.com/trending").then(function(response){
      var $ = cheerio.load(response.data);
      var results= {};
      $("a.js-card__link").each(function(i, headline){
          var title = $(headline).text();
          var summary = $(headline).parent().siblings("p.js-card__description").text()
          var link = $(headline).attr("href");
          results.push({
              title: title,
              summary: summary,
              link: link
          });
          db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
          res.send("Scrape Complete");
      });
      console.log(results);
    

    
    })
    })

    app.get("/articles", function (req, res) {
        db.Article.find({})
          .populate("note")
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });
}