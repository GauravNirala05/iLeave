const mongoose = require(`mongoose`)
const leaveType = new mongoose.Schema({
    casual_leave:{
        type:Number,
        default:12
    },
    extra_leave:{
        type:Number,
        default:20
    },
    medical_leave:{
        type:Number,
        default:6
    },
    optional_leave:{
        type:Number,
        default:3
    }
})

const schema = new mongoose.Schema({
    name: {
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
    mob_no:{
        type:Number,
        required:[true,'Must provide Your name'],
    },
    designation:{
        type:String,
        enum:['faculty','HOD','principal'],
        required:[true,'Must provide'],
    },
    contect_type:{
        type:String,
        default:"contract"
    },
    department:{
        type:String,
        required:[true,'Must provide'],
        enum:['CSE','IT','ET&T']
    },
    password:{
        type:String,
        required:[true,'Must provide'],
    },
    leave_type:{type:leaveType,default:{}}
})
module.exports =mongoose.model('UserData',schema)