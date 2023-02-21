const userData = require('../model/User')
const leaves = require('../model/applyLeave')
const allUsers=async(req,res)=>{
    try {
        const data=await userData.find({Department:"CSE"})
        res.status(200).json({data})
        
    } catch (error) {
        res.json({msg:error})
    }
}
const approveLeave=async(req,res)=>{
    try {
        const leaves=await leaves.find({FacultyApproval:true})
        res.status(200).json({data})
        
    } catch (error) {
        res.json({msg:error})
    }
}

module.exports = {approveLeave,allUsers}

