const User = require('../model/User')
const Leave = require('../model/Leave')
const { UnAuthorizedError, NotFound, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const HODLeave = require('../model/HODLeave')
const nonTechLeave = require('../model/non-techLeave')

const alluser = async (req, res) => {
    const { userID, userName } = req.user
    const user = await User.findOne({ _id: userID })
    if (user) {
        const designation = user.designation
        if (designation === 'faculty') {
            throw new UnAuthorizedError(`You are a ${designation} and cant access any other user`)
        }
        if (designation === 'HOD') {
            const alluser = await User.find({ department: user.department, designation: 'faculty' }).select(' _id email name contect_type department designation mob_no leave_type')
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: alluser.length, data: alluser })
        }
        if (designation === 'principal') {
            const alluser = await User.find({ department: ['Computer Science', 'Information Tecnology', 'ET & T', 'Mechanical', 'Mining', 'Electrical', 'Civil', 'non-tech'] }).select(' _id email name contect_type department designation mob_no leave_type')
            return res.status(StatusCodes.OK).json({ status: `SUCCESS`, hits: alluser.length, data: alluser })
        }
        throw new BadRequestError(`Please provide credentials.`)
    } else {
        throw new NotFound(`user with id ${userID} doesnt exists...`)
    }
}


const leaveStatus = async (req, res) => {
    const { userID, userName } = req.user
    const { status: stat } = req.body

    if (await User.exists({ _id: userID })) {
        if (stat) {
            const leave = await Leave.find({ employee_id: userID, status: stat, }).sort('createdAt')
            return res.status(StatusCodes.OK).json({ status: 'SUCCESS', hits: leave.length, data: leave })
        }
        const leave = await Leave.find({ employee_id: userID }).sort('createdAt')
        res.status(StatusCodes.OK).json({ status: 'SUCCESS', hits: leave.length, data: leave })
    } else {
        throw new NotFound(`No user with id ${userID}`)
    }

}
const getApprovals = async (req, res) => {
    const { userID, userName } = req.user
    const user = await User.findById(userID)
    if (user) {
        if (user.designation === 'faculty') {
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
        if (user.designation === 'HOD') {

            const data = await Leave.find({
                employee_dep: user.department,
                'reference1.approved': true,
                'reference2.approved': true,
                'reference3.approved': true,
                'reference4.approved': true,
                status: ['applied', 'rejected']
            })
            res.status(StatusCodes.OK).json({ status: 'SUCCESS', hits: data.length, data: data })
        }
        if (user.designation === 'principal') {
            const data1 = await Leave.find({
                HOD_approval: true,
                status: ['applied', 'rejected', 'approved']
            }).select('employee_id employee_name employee_dep from_date to_date leave_type discription status')

            const data2 = await HODLeave.find({
                status: ['applied', 'rejected', 'approved']
            }).select('employee_id employee_name employee_dep from_date to_date leave_type discription status')

            const data3 = await nonTechLeave.find({
                status: ['applied', 'rejected', 'approved']
            }).select('employee_id employee_name employee_dep from_date to_date leave_type discription status')

            res.status(StatusCodes.OK).json({ status: 'SUCCESS', hits: data1.length + data2.length + data3.length, data: { facultyLeave:data1, HodLeave:data2, nonTechLeave:data3 } })
        }
    }
    else {
        throw new NotFound(`no user with id ${userID}`)
    }
}


module.exports = { alluser, leaveStatus, getApprovals }