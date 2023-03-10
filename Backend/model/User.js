const mongoose = require(`mongoose`)
const bcrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)


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
        enum: ['faculty', 'HOD', 'principal'],
    },
    contect_type: {
        type: String,
        enum: ['contract', 'parmanent'],
        default: "contract"
    },
    department: {
        type: String,
        enum: ['Computer Science', 'Information Tecnology', 'ET & T', 'Mechanical', 'Mining', 'Electrical', 'Civil','non-tech']
    },
    password: {
        type: String,
        required: [true, 'Must provide'],
    },
    profileCompleted: {
        type: Boolean,
        default: false
    },
    leave_type:Object,
    verified: {
        type: Boolean,
        default: false
    },
})


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.leaveSchema= async function(){
    console.log(`leave schema running`)
    if(this.department=="non-tech"){
        this.leave_type={
            casual_leave:10,
            earned_leave:10,
            medical_leave:10,
            ordinary_leave:10
        }
    }
    else{
        this.leave_type={
            casual_leave:20,
            earned_leave:20,
            medical_leave:20,
            ordinary_leave:20
        }
    }
}

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ userID: this._id, userName: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE })
    return token
}
userSchema.methods.CompPass = async function (userPassword) {
    const match = await bcrypt.compare(userPassword, this.password)
    return match
}
module.exports = mongoose.model('UserData', userSchema)
    //it will not work
    
    
    // userSchema.pre('save', async function () {
    //     const designation = this.designation
    //     console.log(designation);
    //     console.log(`its running`);
    //     if (designation) {
    //         if (designation == 'non-tech') {
    
    //             this.leave_type = techLeaveSchema
    //         }
    //         else {
    //             this.leave_type = nonTechLeaveSchema
    
    //         }
    //     }
    // })
    // const techLeaveSchema = new mongoose.Schema({
    //     casual_leave: {
    //         type: Number,
    //         default: 10
    //     },
    //     earned_leave: {
    //         type: Number,
    //         default: 10
    //     },
    //     medical_leave: {
    //         type: Number,
    //         default: 10
    //     },
    //     ordinary_leave: {
    //         type: Number,
    //         default: 10
    //     }
    // })
    // const nonTechLeaveSchema = new mongoose.Schema({
        
    // })