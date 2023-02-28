const User = require('../model/User')
const Leave = require('../model/Leave')

const createData = async (req, res) => {
    console.log(req.body);
    if (await User.exists({ email: req.body.email })) {
        return res.status(401).json({
            status: 'FAILED',
            msg: `user with Email address ${req.body.email} already Exists ...`
        })
    }
    else {
        const data = await User.create(req.body)
        console.log(`User created`);
        res.status(200).json({ status: 'SUCCESS', data: data })
    }
}

const applyLeave = async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID })
    const userName = user.name
    const userDep = user.department
    if (user) {
        const designation = user.designation
        if (designation === 'faculty') {
            const leave = await Leave.create(req.body)
            leave.employee_id = userID
            leave.employee_dep = userDep
            leave.employee_name = userName
            await leave.save()
            return res.status(200).json({ leave: leave, status: 'SUCCESS' })

        }
        if (designation === 'HOD') {
            const leave = await Leave.create(req.body)
            leave.employee_id = userID
            leave.employee_dep = userDep
            leave.employee_name = userName
            leave.HOD_approval = true
            await leave.save()
            return res.status(200).json({ leave: leave, status: 'SUCCESS' })

        }
        if (designation === 'principal') {
            return res.send('you are principal')
        }

        res.status(404).json({ status: 'FAILED', msg: `the credential ${user.designation} doesnt exists...` })

    } else {
        res.status(404).json({ status: 'FAILED', msg: `user with id ${userID} doesnt exists...` })
    }
}

const getSingleData = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    console.log(email,password);
    if (email === "" || password === "") {
        return res.json({ status: 'FAILED', msg: `please provide credentials...` })
    }
    if (await User.exists({ email: email })) {
        const data = await User.findOne({ email: email, password: password })
        if (!data) {
            return res.status(401).json({ status: 'FAILED', msg: `Wrong password` })
        }
        res.status(200).json({ status: 'SUCCESS', data: data })
    }
    else {
        return res.status(200).json({ status: 'FAILED', msg: `No user with email... ${req.body.email}` })
    }

}

const updateProfile = async (req, res) => {
    const { id: userID } = req.params
    console.log(req.params);

    if (await User.exists({ _id: userID })) {
        const user = await User.findByIdAndUpdate(userID, req.body, { new: true, runValidators: true })
        res.status(200).json({ status: 'SUCCESS', data: user })
    }
    else {
        return res.status(404).json({ status: 'FAILED', msg: `No user with given id ${userID}` })
    }

}

const deleteProfile = async (req, res) => {
    const { id: userID } = req.params
    const { id: targetID } = req.body
    const user = await User.findOne({ _id: userID })
    if (user) {
        const designation = user.designation
        if (designation === 'faculty') {
            if (userID === targetID) {
                await User.findOneAndDelete({ _id: userID })
                return res.json({
                    status: `SUCCESS`,
                    msg: `user deleted with id ${userID}`
                })
            }
            else {
                return res.status(404).json({
                    status: 'FAILED',
                    msg: `the provided credentials are not similar... id ${userID} and id ${targetID}`
                })
            }
        }
        if (designation === 'HOD') {
            if (await User.exists({ _id: targetID, department: user.department })) {
                await User.findOneAndDelete({ _id: targetID, department: user.department })
                res.json({ status: `SUCCESS`, msg: `user deleted with id ${targetID}` })
            }
            else {
                return res.status(404).json({ status: 'FAILED', msg: `provide valid credential id ${targetID}` })
            }
        }
        if (designation === 'principal') {
            if (await User.exists({ _id: targetID })) {
                await User.findOneAndDelete({ _id: targetID })
                res.json({ status: `SUCCESS`, msg: `user deleted with id ${targetID}` })
            } else {
                return res.status(404).json({ status: 'FAILED', msg: `provide valid credential id ${targetID}` })
            }
        }
        return res.status(401).json({ status: 'FAILED', msg: `plz provide credentials` })

    } else {
        res.status(404).json({ status: 'FAILED', msg: `user with id ${userID} doesnt exists...` })
    }
}


module.exports = { applyLeave, getSingleData, createData, updateProfile, deleteProfile }
