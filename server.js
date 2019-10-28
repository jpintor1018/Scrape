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
//================================================

require("./routes/html.js")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})
