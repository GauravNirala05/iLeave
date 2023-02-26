const User = require('../model/User')
const Leave = require('../model/Leave')

const approve = async (req, res) => {
    const { id: userID, targetid: targetID } = req.params
    const user = await User.findById(userID)
    if (user) {
        if (await Leave.exists({ employee_id: targetID })) {
            if (user.designation === 'faculty') {
                const { refer, approval } = req.body
                const approveObject = {}
                if (refer == 1) {
                    approveObject.reference1 = {}
                    approveObject.reference1.name = user.name
                    approveObject.reference1.approved = approval
                    if (approval === 'true') {
                        approveObject.status = 'applied'
                    }
                    else {
                        approveObject.status = 'rejected'
                    }

                }
                if (refer == 2) {
                    approveObject.reference2 = {}
                    approveObject.reference2.name = user.name
                    approveObject.reference2.approved = approval
                    if (approval === 'true') {
                        approveObject.status = 'applied'
                    }
                    else {
                        approveObject.status = 'rejected'
                    }

                }
                if (refer == 3) {
                    approveObject.reference3 = {}
                    approveObject.reference3.name = user.name
                    approveObject.reference3.approved = approval
                    if (approval === 'true') {
                        approveObject.status = 'applied'
                    }
                    else {
                        approveObject.status = 'rejected'
                    }

                }
                if (refer == 4) {
                    approveObject.reference4 = {}
                    approveObject.reference4.name = user.name
                    approveObject.reference4.approved = approval
                    if (approval === 'true') {
                        approveObject.status = 'applied'
                    }
                    else {
                        approveObject.status = 'rejected'
                    }

                }
                const data = await Leave.findOneAndUpdate({ employee_id: targetID }, approveObject, { new: true })
                res.status(200).json({ status: 'SUCCESS', data: data })
            }


            if (user.designation === 'HOD') {
                const { approval } = req.body
                const approveObject = {}
                if (approval === 'true') {
                    approveObject.HOD_approval = approval
                    approveObject.status = 'applied'
                }
                else {
                    approveObject.HOD_approval = approval
                    approveObject.status = 'rejected'
                }

                const data = await Leave.findOneAndUpdate({ employee_id: targetID }, approveObject, { new: true })
                res.status(200).json({ status: 'SUCCESS', data: data })
            }
            if (user.designation === 'principal') {
                const { approval } = req.body
                const approveObject = {}
                if (approval === 'true') {
                    approveObject.principal_approval = approval
                    approveObject.status = 'approved'
                }
                else {
                    approveObject.principal_approval = approval
                    approveObject.status = 'rejected'
                }

                const data = await Leave.findOneAndUpdate({ employee_id: targetID }, approveObject, { new: true })
                res.status(200).json({ status: 'SUCCESS', data: data })
            }
        }
        else {
            return res.status(404).json({ msg: `no leaves of user with id ${targetID}` })
        }
    }
    else {
        return res.status(404).json({ msg: `no user with id ${userID}` })
    }
}

module.exports = { approve } 