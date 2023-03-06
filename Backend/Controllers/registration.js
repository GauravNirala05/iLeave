const User = require('../model/User')
const jwt = require('jsonwebtoken')
const UserVerification = require('../model/UserVerification')
const { StatusCodes } = require('http-status-codes')
const { NotFound, BadRequestError, UnAuthorizedError } = require('../errors');

const createData = async (req, res) => {
    console.log(req.body);
    if (await User.exists({ email: req.body.email })) {
        throw new BadRequestError(`User with this email already exists...${req.body.email}`)
    }
    else {
        const data = await User.create(req.body)
        console.log(`User created...`);
        const token = data.generateJWT()
        res.status(StatusCodes.CREATED).json({ status: 'SUCCESS', msg: `You are registred Now`, token })
    }
}
module.exports = createData



