const User = require('../model/User')
const Leave = require('../model/Leave')
const { UnAuthorizedError, NotFound, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const alluser = async (req, res) => {
    const { userID, userName } = req.user
    const user = await User.findOne({ _id: userID })
    if (user) {
        const designation = user.designation
        if (designation === 'faculty') {
            throw new UnAuthorizedError( `You are a ${designation} and cant access any other user`)
        }
        if (designation === 'HOD') {
            const alluser = await User.find({ department: user.department, designation: 'faculty' })
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: alluser.length, data: alluser })
        }
        if (designation === 'principal') {
            const alluser = await User.find({ designation: ['faculty', 'HOD','non-tech'] })
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: alluser.length, data: alluser })
        }
        throw new BadRequestError(`Please provide credentials.`)
    } else {
        throw new NotFound( `user with id ${userID} doesnt exists...` )
    }
}
const getReferenceName = async (req, res) => {
    const { userID, userName } = req.user
    const user = await User.findOne({ _id: userID })
    if (user) {
        const designation = user.designation
        if (designation == 'faculty') {
            const getuser = await User.find({ department: user.department, designation: 'faculty' }).select('name')
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: getuser.length, data: getuser })
        }
        if (designation == 'HOD') {
            const getuser = await User.find({ department: user.department}).select('name')
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: getuser.length, data: getuser })
        }
        if (designation == 'principal') {
            const getuser = await User.find({ designation: ['faculty', 'HOD'] }).select('name')
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: getuser.length, data: getuser })
        }

    } else {
        throw new UnAuthorizedError(`user with id ${userID} doesnt exists...`)
    }
}

const leaveStatus = async (req, res) => {
    const { userID, userName } = req.user
    const { status: stat } = req.body

    if (await User.exists({ _id: userID })) {
        if (stat) {
            const leave = await Leave.find({ employee_id: userID, status: stat, })
            return res.status(200).json({ status: 'SUCCESS', hits: leave.length, data: leave })
        }
        const leave = await Leave.find({ employee_id: userID })
        res.status(StatusCodes.OK).json({ status: 'SUCCESS', hits: leave.length, data: leave })
    } else {
        throw new NotFound(`No user with id ${userID}`)
    }

}
const getApprovals = async (req, res) => {
    const { userID, userName } = req.user
    const user = await User.findById(userID)
    if (user) {
        if (user.designation =='faculty') {
            const data1 = await Leave.find({
                'reference1.name': user.name,
                status: ['applied', 'rejected']
            }).select('employee_id employee_dep employee_name from_date to_date reference1 leave_type')
            const data2 = await Leave.find({
                'reference2.name': user.name,
                status: ['applied', 'rejected']
            }).select('employee_id employee_dep employee_name from_date to_date reference2 leave_type')
            const data3 = await Leave.find({
                'reference3.name': user.name,
                status: ['applied', 'rejected']
            }).select('employee_id employee_dep employee_name from_date to_date reference3 leave_type')
            const data4 = await Leave.find({
                'reference4.name': user.name,
                status: ['applied', 'rejected']
            }).select('employee_id employee_dep employee_name from_date to_date reference4 leave_type')

            res.status(StatusCodes.OK).json({
                status: 'SUCCESS',
                data: {
                    first: { hits: data1.length, data1: data1 },
                    second: { hits: data2.length, data2: data2 },
                    third: { hits: data3.length, data3: data3 },
                    forth: { hits: data4.length, data4: data4 }
                }
            })
        }
        if (user.designation =='HOD') {

            const data = await Leave.find({
                employee_dep: user.department,
                'reference1.approved': true,
                'reference2.approved': true,
                'reference3.approved': true,
                'reference4.approved': true,
                status: ['applied', 'rejected']
            })
            res.status(200).json({ status: 'SUCCESS', hits: data.length, data: data })
        }
        if (user.designation =='principal') {
            const data = await Leave.find({
                HOD_approval: true,
                status: ['applied', 'rejected', 'approved']
            }).select('employee_id employee_name employee_dep from_date to_date leave_type discription status')
            res.status(200).json({ status: 'SUCCESS', hits: data.length, data: data })
        }
    }
    else {
        return res.status(404).json({ msg: `no user with id ${userID}` })
    }
}


module.exports = { alluser, leaveStatus, getApprovals,getReferenceName }