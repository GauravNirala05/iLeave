//dependencies
const jwt = require('jsonwebtoken');
const {StatusCodes}=require('http-status-codes')
//models
const User = require('../model/User')
const Leave = require('../model/Leave')
//Errors
const { NotFound, BadRequestError,UnAuthorizedError } = require('../errors');


const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    
    const data = await User.findOne({ email })
    if (!data) {
        throw new BadRequestError(`No user with email ${email}`)
    }
    // if (!data.verified) {
    //     throw new BadRequestError(`Your email ${email} is not verified`)
    // }
    const match =await data.CompPass(password)
    if (!match) {
        throw new UnAuthorizedError(`incorrect password`)
    }
    const token = data.generateJWT()
    res.status(StatusCodes.OK).json({ status: 'SUCCESS',data, msg: `You are successfully Logged In`, token })


}
const getSingleData = async (req, res) => {
    console.log(req.user);
    const { userID, userName } = req.user
    const data =await User.findOne({_id:userID,name:userName})
    res.status(StatusCodes.OK).json({ status: 'SUCCESS',data })
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


const applyLeave = async (req, res) => {
    const { userID, userName } = req.user
    console.log(req.user);
    const user = await User.findOne({ _id: userID })
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
module.exports = { applyLeave, getSingleData,login, updateProfile, deleteProfile }
