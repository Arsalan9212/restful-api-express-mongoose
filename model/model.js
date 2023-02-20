const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
name:{
    require: true,
    type: String
},
age:{
    require: true,
    type: Number
}
})

//module.exports = mongoose.model.data || mongoose.model('data', dataSchema)
 const Data = mongoose.model('data' , dataSchema)
module.exports.Data = Data;