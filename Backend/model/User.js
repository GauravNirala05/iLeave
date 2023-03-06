const mongoose = require(`mongoose`)
const bcrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)

const techLeaveSchema = new mongoose.Schema({
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
const nonTechLeaveSchema = new mongoose.Schema({
    casual_leave: {
        type: Number,
        default: 5
    },
    earned_leave: {
        type: Number,
        default: 5
    },
    medical_leave: {
        type: Number,
        default: 5
    },
    ordinary_leave: {
        type: Number,
        default: 5
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
        unique: true,
        required: [true, 'Must provide Your name'],
    },
    mob_no: {
        type: Number,
        min: 10
    },
    designation: {
        type: String,
        immutable: true,
        enum: ['faculty', 'HOD', 'principal', 'non-tech'],
    },
    contect_type: {
        type: String,
        enum: ['contract', 'parmanent'],
        default: "contract"
    },
    department: {
        type: String,
        enum: ['Computer Science', 'Information Tecnology', 'ET & T', 'Mechanical', 'Mining', 'Electrical', 'Civil']
    },
    password: {
        type: String,
        required: [true, 'Must provide'],
    },
    profileCompleted: {
        type: Boolean,
        default: false
    },
    leave_type: Object,
    verified: {
        type: Boolean,
        default: false
    },
})


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.pre('save', async function () {
    const designation = this.designation
    if (designation) {
        if (designation == 'non-tech') {

            this.leave_type = techLeaveSchema
        }
        else {
            this.leave_type = nonTechLeaveSchema

        }
    }
})
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ userID: this._id, userName: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE })
    return token
}
userSchema.methods.CompPass = async function (userPassword) {
    const match = await bcrypt.compare(userPassword, this.password)
    return match
}
module.exports = mongoose.model('UserData', userSchema)