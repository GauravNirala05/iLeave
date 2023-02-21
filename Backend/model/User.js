const mongoose = require(`mongoose`)
const leaveType = new mongoose.Schema({
    casualLeave:{
        type:Number,
        default:12
    },
    extraLeave:{
        type:Number,
        default:20
    },
    meducalLeave:{
        type:Number,
        default:6
    },
    optionalLeave:{
        type:Number,
        default:3
    }
})

const schema = new mongoose.Schema({
    Name: {
        type: String,
        trim:true,
        required:[true,'Must provide Your name'],
    },
    email: {
        type: String,
        trim:true,
        lowercase:true,
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
    LeaveType:leaveType

})
module.exports =mongoose.model('UserData',schema)