//dependencies
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
//models
const User = require('../model/User')
const Leave = require('../model/Leave')
//Errors
const { NotFound, BadRequestError, UnAuthorizedError } = require('../errors');


const signin = async (req, res) => {
    const { email, password } = req.body
    const data = await User.findOne({ email })
    if (!data) {
        throw new BadRequestError(`No user with email ${email}`)
    }
    if (!data.verified) {
        throw new BadRequestError(`Your email ${email} is not verified. Go to register page and verify your email.`)
    }
    const match = await data.CompPass(password)
    if (!match) {
        throw new UnAuthorizedError(`incorrect password`)
    }
    const token = data.generateJWT()
    res.status(StatusCodes.OK).json({ status: 'SUCCESS', msg: `You are successfully Sign In`, token})


}
const getSingleData = async (req, res) => {
    const { userID, userName } = req.user
    const data = await User.findOne({ _id: userID}).select('profileCompleted _id email name contect_type department designation mob_no leave_type')
    if(!data){
        throw new BadRequestError(`Invalid credential passed..(token)`)
    }
    res.status(StatusCodes.OK).json({ status: 'SUCCESS', data })
}

const completeProfile = async (req, res) => {
    const { userID, userName } = req.user
    const { mob_no, contect_type, department, designation } = req.body
    const user=await User.findOne({ _id: userID})
    if (!mob_no || !contect_type || !department || !designation) {
        throw new BadRequestError(`Provide all the credentials...mob_no,contect_type,department,designation...`)
    }
    if (!user) {
        throw new BadRequestError(`No user with given id ${userID} or`)
    }
    if (user.profileCompleted==false ) {
        try {
    
            const user = await User.findOneAndUpdate({_id:userID}, { mob_no, contect_type, department, designation, profileCompleted: true }, { new: true})
            await user.leaveSchema()
            user.save()
            res.status(200).json({ status: 'SUCCESS', msg:`Account is successfully initailized.` })
        } catch (error) {
            throw error
        }
    }
    else {
        throw new NotFound(`User ${userName} Account records is already initially updated`)
    }

}
const updateProfile = async (req, res) => {
    const { userID, userName } = req.user

    if (await User.exists({ _id: userID,profileCompleted:true })) {
        const user = await User.findOneAndUpdate({_id:userID,profileCompleted:true},req.body, { new: true, runValidators: true })
        res.status(200).json({ status: 'SUCCESS', msg:`Profile updated.` })
    }
    else {
        throw new NotFound(`User doesn't exixts or profile is initially not completed`)
    }

}

const deleteProfile = async (req, res) => {
    const { userID, userName } = req.user
    const { id: targetID } = req.params
    const user = await User.findOne({ _id: userID })
    if (user) {
        if (userID === targetID) {
            await User.findOneAndDelete({ _id: userID })
            return res.json({
                status: `SUCCESS`,
                msg: `Your account is successfully deleted...`
            })
        }
        else{
            const designation = user.designation
            if (designation === 'faculty') {
               throw new BadRequestError(`You are a Faculty and can't delete anyone else account`)
            }
            if (designation === 'HOD') {
                const targetUser=await User.findOne({ _id: targetID, department: user.department })
                if (targetUser) {
                    await User.findOneAndDelete({ _id: targetID})
                    res.json({ status: `SUCCESS`, msg: `user ${targetUser.name}'s account is deleted` })
                }
                else {
                    throw new UnAuthorizedError(`You can't delete the account...`)
                }
            }
            if (designation === 'principal') {
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

module.exports = {getSingleData, signin,completeProfile, updateProfile, deleteProfile }
