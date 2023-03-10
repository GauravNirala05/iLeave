//dependencies
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
//models
const User = require('../model/User')
const Leave = require('../model/Leave')
//Errors
const { NotFound, BadRequestError, UnAuthorizedError } = require('../errors');


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
    const match = await data.CompPass(password)
    if (!match) {
        throw new UnAuthorizedError(`incorrect password`)
    }
    const token = data.generateJWT()
    res.status(StatusCodes.OK).json({ status: 'SUCCESS', data, msg: `You are successfully Logged In`, token })


}
const getSingleData = async (req, res) => {
    console.log(req.user);
    const { userID, userName } = req.user
    const data = await User.findOne({ _id: userID, name: userName })
    res.status(StatusCodes.OK).json({ status: 'SUCCESS', data })
}

const updateProfile = async (req, res) => {
    const { userID, userName } = req.user
    const { mob_no, contect_type, department, designation } = req.body
    if (!mob_no || !contect_type || !department || !designation) {
        throw new BadRequestError(`Provide all the credentials...mob_no,contect_type,department,designation...`)
    }
    if (await User.exists({ _id: userID,profileCompleted:true })) {
        const user = await User.findOneAndUpdate({_id:userID,profileCompleted:true}, { mob_no, contect_type, department, designation}, { new: true, runValidators: true })
        res.status(200).json({ status: 'SUCCESS', data: user })
    }
    else {
        throw new NotFound(`User doesn't exixts or profile is initially not completed`)
    }

}

const updatePass = async (req, res) => {
    const { userID, userName } = req.user
    const { password } = req.body
    if (!password) {
        throw new BadRequestError(`Provide all the credentials...password...`)
    }
    if (await User.exists({ _id: userID })) {
        const user = await User.findOneAndUpdate({_id:userID}, {password}, { new: true, runValidators: true })
        res.status(200).json({ status: 'SUCCESS', data: user })
    }
    else {
        throw new NotFound(`User doesn't exixts...`)
    }
}


const completeProfile = async (req, res) => {
    const { userID, userName } = req.user
    const { mob_no, contect_type, department, designation } = req.body
    if (!mob_no || !contect_type || !department || !designation) {
        throw new BadRequestError(`Provide all the credentials...mob_no,contect_type,department,designation...`)
    }
    if (await User.exists({ _id: userID })) {
        const user = await User.findByIdAndUpdate(userID, { mob_no, contect_type, department, designation, profileCompleted: true }, { new: true, runValidators: true })
        await user.leaveSchema()
        user.save()
        res.status(200).json({ status: 'SUCCESS', data: user })
    }
    else {
        throw new NotFound(`No user with given id ${userID}`)
    }

}

const deleteProfile = async (req, res) => {
    const { userID, userName } = req.user
    const { id: targetID } = req.params
    const user = await User.findOne({ _id: userID })
    if (user) {
        if (userID == targetID) {
            await User.findOneAndDelete({ _id: userID })
            return res.json({
                status: `SUCCESS`,
                msg: `Your account is successfully deleted...`
            })
        }
        else{
            const designation = user.designation
            if (designation == 'faculty') {
               throw new BadRequestError(`You are a Faculty and can't delete anyone else account`)
            }
            if (designation == 'HOD') {
                const targetUser=await User.findOne({ _id: targetID, department: user.department })
                if (targetUser) {
                    await User.findOneAndDelete({ _id: targetID})
                    res.json({ status: `SUCCESS`, msg: `user ${targetUser.name}'s account is deleted` })
                }
                else {
                    throw new UnAuthorizedError(`You can't delete the account...`)
                }
            }
            if (designation == 'principal') {
                if (await User.exists({ _id: targetID })) {
                    await User.findOneAndDelete({ _id: targetID })
                    res.json({ status: `SUCCESS`, msg: `user deleted with id ${targetID}` })
                } else {
                   throw new BadRequestError(`User doesn't exists...`)
                }
            }
        }
    } else {
        throw new BadRequestError(`please provide credentials`)
    }
}

module.exports = {getSingleData, login,completeProfile, updateProfile, deleteProfile,updatePass }
