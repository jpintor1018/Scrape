var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require("mongoose");
var path =require("path");
var bodyparser = require("body-parser");
var PORT =  process.env. PORT || 3000;

// Initialize Express
var app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//set handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

//connect mongo DB to mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);





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
        //   db.Article.create(results)
        // .then(function(dbArticle) {
        //   console.log(dbArticle);
        // })
        results.push(resultsObj);
      });
      res.render("index", {articles: results});
      console.log(results);

    
    })
    })
//================================================

require("./routes/html.js")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})
