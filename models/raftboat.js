const mongoose = require("mongoose");
const raftboatSchema = mongoose.Schema({
    substance: String,
    size: String,
    price: Number
});
module.exports = mongoose.model("raftboat", raftboatSchema);