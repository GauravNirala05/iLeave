//dependencies
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
//models
const User = require('../model/User')
const Leave = require('../model/Leave')
//Errors
const { NotFound, BadRequestError, UnAuthorizedError } = require('../errors');


const applyLeave = async (req, res) => {
    const { userID, userName } = req.user
    console.log(req.user);
    const user = await User.findOne({ _id: userID })
    const userDep = user.department
    if (user) {
        const designation = user.designation
        if (designation === 'faculty') {
            const leave = await Leave.create(req.body)
            leave.appliedBy = userID
            await leave.save()
            return res.status(StatusCodes.CREATED).json({ leave: leave, status: 'SUCCESS' })

        }
        if (designation === 'HOD') {
            const leave = await Leave.create(req.body)
            leave.employee_id = userID
            leave.employee_dep = userDep
            leave.employee_name = userName
            leave.HOD_approval = true
            await leave.save()
            return res.status(StatusCodes.CREATED).json({ leave: leave, status: 'SUCCESS' })

        }
        if (designation === 'principal') {
            return res.send('you are principal')
        }

        throw new NotFound(`the credential ${user.designation} doesnt exists...` )

    } else {
        throw new NotFound(`Provide the valid credentials while authorization...` )
    }
}
module.exports =applyLeave