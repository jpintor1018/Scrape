var mongoose = require("mongoose");

var Schema = mongoose.Schema;
 var notesSchema = new Schema ({
     type: Schema.Types.ObjectId
 });

 var Notes = mongoose.model("Notes", notesSchema);
 module.exports = Notes;