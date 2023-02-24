const userData = require('../model/User')
const leaves = require('../model/applyLeave')

const allUsers = async (req, res) => {
    const data = await leaves.find({})
    res.status(200).json({ data })
}
const appliedUsers = async (req, res) => {
    const data = await leaves.find({HOD_approval: true})
    res.status(200).json({ data })
}
const approveLeave = async (req, res) => {

    const{id:userID}=req.params
    const leave = await leaves.findAndUpdate({ _id:userID,HOD_approval: true },{principal_approval:true},{new:true})
    // let num=leaves.from_date-leaves.to_date
    // let ty=leaves.leave_type

    // const user = await User.findAndUpdate({name:leaves.emmployee_name},)

    res.status(200).json({ leave })

}

module.exports = { allUsers, approveLeave,appliedUsers }

