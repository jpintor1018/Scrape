var cheerio = require("cheerio");
var axios = require("axios");

var db=require("../models");

module.exports = app => {
    app.get("/", (req,res)=>{
        res.render("index",{})
    });

//------Scraper------
app.get("/scrape",function(req,res){

    axios.get("https://www.buzzfeed.com/trending").then(function(response){
      var $ = cheerio.load(response.data);
      var results=[];
      $("a.js-card__link").each(function(i, headline){
        var resultsObj= {
          title: $(headline).text(),
          summary: $(headline).parent().siblings("p.js-card__description").text(),
          link: $(headline).attr("href")
        };
          db.Article.create(results)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        results.push(resultsObj);
      });
      res.render("index", {articles: results});
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