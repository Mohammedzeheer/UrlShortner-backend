const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    email:{type:String},
    username:{type:String}
})

module.exports = mongoose.model('users',UserSchema)