const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema= new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name: String,
    plateNumber: String,
    sacco: String

})

module.exports = mongoose.model("Riders", riderSchema);