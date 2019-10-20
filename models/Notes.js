var mongoose = require("mongoose");

var Schema = mongoose.Schema;
 var NotesSchema = new Schema ({
     type: Schema.Types.ObjectsId
 });

 var Notes = mongoose.model("Notes", NotesSchema);
 module.exports = Notes;