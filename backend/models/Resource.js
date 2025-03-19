const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type:String,
    quantity: {
        type:Number,
        required: true,
    },
    supplierInfo: String
});
module.exports = mongoose.model("resource",resourceSchema);