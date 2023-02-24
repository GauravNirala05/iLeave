const userData = require('../model/User')
const leaves = require('../model/applyLeave')

const allUsers = async (req, res) => {
    const data = await leaves.find({})
    res.status(200).json({ data :data,hits:data.length})
}
const appliedUsers = async (req, res) => {
    const data = await leaves.find({HOD_approval: true})
    res.status(200).json({ data })
}
const approveLeave = async (req, res) => {

    const{id:userID}=req.params
    const leave = await leaves.findOneAndUpdate({ _id:userID,HOD_approval: true },{principal_approval:true},{new:true})
    let num=leave.total_days
    
    const user = await User.findOneAndUpdate({name:leaves.emmployee_name},req.body,{new:true})

    res.status(200).json({ leave })

}

module.exports = { allUsers, approveLeave,appliedUsers }

