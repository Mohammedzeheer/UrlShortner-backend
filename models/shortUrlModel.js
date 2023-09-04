const mongoose=require('mongoose')
const shortId= require('shortid')


const shortUrlSchema=new mongoose.Schema({
    // full:{type:String,required:true},
    // user:{type:ObjectId}
    // full:{type:String},
    // short:{type:String,required:true},
    // // short:{type:String,required:true,default:shortId.generate},
    // clicks:{type:Number,required:true,default:0}
    userId: { type: mongoose.Types.ObjectId, ref: 'users' },
    Url:[{ rating:{type:Number},
        full:{type:String},
        short:{type:String,required:true},
        createdAt:{type:Date,default:Date.now()}}]
})

module.exports = mongoose.model('ShortUrl',shortUrlSchema)