const mongoose = require(`mongoose`)
const leaveTypeSchema = new mongoose.Schema({
    casual_leave: {
        type: Number,
        default: 10
    },
    earned_leave: {
        type: Number,
        default: 10
    },
    medical_leave: {
        type: Number,
        default: 10
    },
    ordinary_leave: {
        type: Number,
        default: 10
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Must provide Your name'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Must provide Your name'],
    },
    mob_no: {
        type: Number,
        required: [true, 'Must provide Your name'],
    },
    designation: {
        type: String,
        immutable:true,
        enum: ['faculty', 'HOD', 'principal'],
        required: [true, 'Must provide'],
    },
    contect_type: {
        type: String,
        enum:['contract','parmanent'],
        default: "contract"
    },
    department: {
        type: String,
        required: [true, 'Must provide'],
        enum: ['Computer Science', 'Information Tecnology', 'ET & T','Mechanical','Mining','Electrical','Civil']
    },
    password: {
        type: String,
        required: [true, 'Must provide'],
    },
    leave_type: {
        type: leaveTypeSchema,
        default: {}
    }
})
module.exports = mongoose.model('UserData', userSchema)