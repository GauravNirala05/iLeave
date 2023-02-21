const mongoose=require(`mongoose`)
const refrence=new mongoose.Schema(
    {
        FirstYear:String,
        SecondYear:String,
        ThirdYear:String,
        ForthYear:String
    }
)
const applyLeave=new mongoose.Schema({
    EmployeeName:{
        type:String,
        trim:true,
        required:[true,'must provide Your Name']
    },
    fromDate:{
        type:Date,
        required:[true,'must provide Starting Date']
    },
    toDate:{
        type:Date,
        required:[true,'must provide Ending Date']
    },
    Discription:{
        type:String,
        required:[true,'must provide ']
    },
    contect_no:{
        type:Number,
        required:[true,'must provide']
    },
    appliedDate:{
        type:Date,
        default:()=>Date.now()
    },
    leaveType:{
        type:String,
        required:[true,`must provide`]
    },
    Replacement:refrence,
    facultyApproval:{
        type:Boolean,
        default:false
    },
    HODApproval:{
        type:Boolean,
        default:false
    },
    PrincipalApproval:{
        type:Boolean,
        default:false
    }
    
    
})
module.exports=mongoose.model('leave',applyLeave)