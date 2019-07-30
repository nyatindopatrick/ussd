const mongoose = require('mongoose');

const riderSchema= mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name: String,
    plateNumber: String,
    sacco: String

})

module.exports = mongoose.model("Riders", riderSchema);