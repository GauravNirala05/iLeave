const mongoose = require(`mongoose`)
// const refrence=new mongoose.Schema(
//     {
//         first_year:String,
//         second_year:String,
//         third_year:String,
//         forth_year:String
//     }
// )
const applyLeave = new mongoose.Schema({
    employee_name: {
        type: String,
        trim: true,
    },
    from_date: {
        type: Date,
        required: [true, 'must provide Starting Date']
    },
    to_date: {
        type: Date,
        required: [true, 'must provide Ending Date']
    },
    total_days: {
        type: Number,
        required: [true, 'must total Day']
    },
    discription: {
        type: String,
        required: [true, 'must provide ']
    },
    contect_no: {
        type: Number,
        required: [true, 'must provide']
    },
    appliedDate: {
        type: Date,
        default: () => Date.now()
    },
    leave_type: {
        type: String,
        enum:['medical_leave','casual_leave','optional_leave','extra_leave']
    },
    // replacement:refrence,
    reference1: {
        name: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    reference2: {
        name: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    reference3: {
        name: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    reference4: {
        name: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    HOD_approval: {
        type: Boolean,
        default: false
    },
    principal_approval: {
        type: Boolean,
        default: false
    },
    // status:{
    //     type:Boolean,
    //     validate:{
    //         validator:(v)=>v>to_date,
    //         mass
    //     }
    // }


})
module.exports = mongoose.model('leave', applyLeave)