var mongoose  = require("mongoose");

var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    link:{
        type:{
            type: String,
            required:true
        }
    },
    saved: {
        type: Boolean,
        default:false
    },
    notes: [{
    type:  Schema.Types.ObjectId,
    ref: "Note"
    }]
});

var Article = mongoose.model("Articles", ArticleSchema);

module.exports = Article;

