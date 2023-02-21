const userData = require('../model/User')
const applyLeave = require('../model/applyLeave')

const getleaveStatus = async (req, res) => {
    try {
        const { name } = req.params
        if (await applyLeave.exists({ EmployeeName: name })) {
            const data = await applyLeave.find({ EmployeeName: name})
            res.status(200).json({ data })
        }
        else {
            res.status(200).json({ msg: `No Leave applied by ${name}` })
        }
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}
const getReplacements = async (req, res) => {
    try {
        const { name } = req.params
        const user = await userData.findOne({ Name: name })

        if (await applyLeave.exists({ Replacement: { FirstYear: name } })) {
            const data = await applyLeave.find({ Replacement: { FirstYear: name } })
            res.status(200).json({ data })
        }
        else {
            res.status(200).json({ msg: `No replacement requested for ${name}` })
        }
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}
const approveReplacements = async (req, res) => {
    res.send('approving....')
}
const getAllLeave = async (req, res) => {
    res.send('All leave....')
}
const createleave = async (req, res) => {
    console.log(`user hits`);
    const { name: userName } = req.params
    try {
        if (await userData.findOne({ Name: userName })) {

            const data = await applyLeave.create(
                {
                    EmployeeName: userName,
                    fromDate: req.body.fromDate,
                    toDate: req.body.toDate,
                    Discription: req.body.Discription,
                    contect_no: req.body.contect_no,
                    leaveType: req.body.type,
                    Replacement:{
                        FirstYear:req.body.refrence1,
                        SecondYear:req.body.refrence2,
                        ThirdYear:req.body.refrence3,
                        ForthYear:req.body.refrence4
                    }

                }
            )
            console.log(`leave created`);
            res.send(data)
        }
        else {
            res.status(200).json({ msg: `no user with name ${userName}` })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { getleaveStatus, createleave, getReplacements, approveReplacements ,getAllLeave}
