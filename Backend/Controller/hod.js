const leaves = require('../model/applyLeave')
const userData = require('../model/User')

const allUsers = async (req, res) => {
    const { department: dep } = req.params
    const user = await userData.find({ department: dep })
    res.status(200).json({ hits: user.length,data: user  })
}
const usersAppliedLeave = async (req, res) => {
    const { department: dep } = req.params
    const user = await userData.find({ department: dep, 'refrence1.approved': true, 'refrence2.approved': true, 'refrence3.approved': true, 'refrence4.approved': true })
    res.status(200).json({ data: user, hits: user.length })
}
const applyLeave = async (req, res) => {
    const { department: dep } = req.params
    if (await userData.exists({ department: dep, designation: "HOD" })) {
        const user = await leaves.create(req.body)
        user.HOD_approval = true
        await user.save()
        res.status(200).json({ data: user })
    }
    else{
        return res.status(404).json({msg:`no user with department ${dep} and designation `})
    }
}
const approveLeave = async (req, res) => {
    const { department: dep, id } = req.params
    const data = await leaves.findOneAndUpdate({ department: dep, _id: id }, { HOD_approval: true }, { new: true })
    res.status(200).json({ data })

}

module.exports = { approveLeave, allUsers, usersAppliedLeave, applyLeave }

