var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs")
var db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", {})
  });

  //------Scraper------
  app.get("/scrape", function (req, res) {

    axios.get("https://www.buzzfeed.com/trending").then(function (response) {
      var $ = cheerio.load(response.data);
      var results = [];
      $("div.js-card__content").each(function (i, headline) {
        var resultsObj = {
          title: $(headline).find("a").text(),
          summary: $(headline).find("p").text(),
          link: $(headline).find("a").attr("href")
        };
        db.Article.create(resultsObj)
          .then(function (dbArticle) {
            console.log(dbArticle);
            results.push(dbArticle);
          })
      });
      res.status(200).end()
    })
  })

  app.get("/articles", function (req, res) {
    db.Article.find({})
      .populate("note")
      .then(function (dbArticle) {
        console.log(dbArticle)
        res.render("index", {
          articles: dbArticle
        });
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.put("/save", (req, res) => {
    db.Article.update({
      _id: mongojs.ObjectId(req.body.id)
    }, {
      $set: {
        saved: true
      }
    }, (err, updated) => {
      if (err) {
        console.log(err)
      } else {
        console.log(updated)
        res.status(200).end()
      }
    })
  })

  app.post("/save", (req, res) => {

    db.Article.find({
      title: req.body.title
    }, (err, found) => {
      if (found.length > 0) {
        res.send("already saved")
      } else {
        const newArticle = {
          title: req.body.title,
          teaser: req.body.teaser,
          link: req.body.link
        }

        db.Article.create(newArticle, (err, inserted) => {
          if (err) {
            console.log(err)
          } else {
            console.log("INSERTED: " + inserted)
            res.status(200).end()
          }
        })
      }
    })
  })

  app.get("/articles-saved", (req, res) => {
    db.Article.find({saved:true})
        .then(dbArticle => {
            const hbsObject = {
                articles: dbArticle
            }
            res.render("savedArticles", hbsObject)
        })
})

app.delete("/del-article/:id", (req,res)=>{
  db.Article.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, (err,del)=>{
    if(err){
      console.log(err)
    }else{
      console.log(del)
      res.status(200).end()
    }
  })
})


}