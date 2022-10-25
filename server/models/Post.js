// Name: Zhihao Yu
// ID: 301305633

// collection schema
const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        require:false
    },
    message:{
        type:String,
        required:true
    }
},{
    collection: "contacts"
})
module.exports = mongoose.model('contact' , PostSchema)
