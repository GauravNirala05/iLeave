const mongoose = require(`mongoose`)

const leaveSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Types.ObjectId,
        ref: 'UserData',
        required: [true, `please provide the user`]
    },
    employee_dep: String,
    employee_name: String,
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
    leave_type: {
        type: String,
        enum: ['medical_leave', 'casual_leave', 'ordinary_leave', 'earned_leave']
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
    status: {
        type: String,
        enum: ['applied', 'rejected', 'approved', 'completed'],
        default: 'applied'
    }


}, { timestamps: true })
module.exports = mongoose.model('leave', leaveSchema)