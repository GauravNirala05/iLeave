const mongoose = require(`mongoose`)

const schema = new mongoose.Schema({
    Name: {
        type: String,
        required:[true,'Must provide Your name'],
    },
    Mob_no:{
        type:Number,
        required:[true,'Must provide Your name'],
    },
    Designation:{
        type:String,
        required:[true,'Must provide'],
    },
    contect_type:{
        type:String,
        default:"contract"
    },
    Department:{
        type:String,
        default:"CSE"
    },
    password:{
        type:String,
        required:[true,'Must provide'],
    },

})
module.exports =mongoose.model('UserData',schema)