const User = require('../model/User')
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const UserVerification = require('../model/UserVerification')
const otpVerification = require('../model/otpVerification')
const { StatusCodes } = require('http-status-codes')
const { NotFound, BadRequestError, UnAuthorizedError } = require('../errors');

const config = {
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    },

}
const transporter = nodemailer.createTransport(config);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
        console.log("Mail service Not Working...")
    }
    if (success) {
        console.log("Mail service activated...")
        console.log("Ready to send messages...")
    }
})

const register = async (req, res) => {
    console.log(req.body);
    const { email, name, password } = req.body
    if (await User.exists({ email })) {
        const data = await User.findOne({ email })
        if (data.verified == false) {
            sendVerificationEmail(data, res)
            return res.status(StatusCodes.CREATED).json({ status: 'PENDING', msg: `Again email has been sent to your email: ${email}` })
        }
        throw new BadRequestError(`User with this email ${email} already exists and verified.Please go to sign in... `)
    }
    else {
        const data = await User.create({ email, name, password })
        console.log(`User created`);
        sendVerificationEmail(data, res)
        res.status(StatusCodes.CREATED).json({ status: 'PENDING', msg: `Email has been sent to your email: ${email}` })
    }
}
const sendVerificationEmail = async ({ _id, email }, res) => {
    const currentUrl = "http://localhost:4000/"
    const uniquestring = uuidv4() + _id
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<p>Verify your email to complete your signup and login to your account.</p>This link <b>expires in 6 hour</b><p>Press <b><a href=${currentUrl + "user/verify/" + _id + "/" + uniquestring}>here</a></b> to proceed...</p>`
    }
    await UserVerification.create({
        userID: _id,
        uniqueString: uniquestring,
        createdAt: Date.now(),
        expiresAt: Date.now() + (1000 * 60 * 60 * 6)
    })
    await transporter.sendMail(mailOptions)
}

const verifyEmail = async (req, res) => {
    const { userid, uniquestring } = req.params
    const userToBeVerify = await UserVerification.find({ userID: userid })

    if (userToBeVerify.length > 0) {

        const userverify = userToBeVerify[userToBeVerify.length - 1]
        const { expiresAt } = userverify

        if (expiresAt < Date.now()) {
            await UserVerification.deleteOne({ userID: userid })
            await User.deleteMany({ _id: userid })
            throw new BadRequestError(`Link has been expired. Please sign up again...`)
        }
        else {
            const result = await userverify.compString(uniquestring)
            if (result) {
                const user = await User.findOneAndUpdate({ _id: userid }, { verified: true }, { new: true })
                await UserVerification.deleteMany({ userID: userid })
                res.status(StatusCodes.OK).json({ user, msg: `you are verified now` })
            }
            else {
                throw new BadRequestError(`Invalid verification datails passed. Check your inbox...`)
            }

        }
    }
    else {
        throw new NotFound(`Account record doesn't exist or have been verified already. Please signup or login`)
    }
}

const forgotPassword = async (req, res) => {
    console.log(req.body);
    const { email } = req.body
    if (await User.exists({ email })) {

        const data = await User.findOne({ email })
        sendOTP(data, res)
        return res.status(StatusCodes.CREATED).json({status: 'PENDING', msg: `OTP has been sent to your email: ${email}`,userid:data._id })

    }
    else {
        throw new BadRequestError(`User with this email ${email} not exists.`)
    }
}
const sendOTP = async ({ _id, email }, res) => {
    const otp = Math.floor(1000 + Math.random() * 9000)
    console.log(otp);
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "OTP Verification",
        html: `<p>Verify your OTP,<b>  ${otp}  </b>.</p><p>This OTP <b>expires in 5 min</b></p>`
    }
    await otpVerification.create({
        userID: _id,
        OTP: otp,
        createdAt: Date.now(),
        expiresAt: Date.now() + (1000 * 60 * 6)
    })
    await transporter.sendMail(mailOptions)
}

const verifyOTP = async (req, res) => {

    const { id: userid, OTP } = req.body

    const otpVerificationUser = await otpVerification.find({ userID: userid })
    const otpverify = otpVerificationUser[otpVerificationUser.length - 1]

    if (otpverify) {
        const { expiresAt } = otpverify
        if (expiresAt < Date.now()) {
            await otpVerification.deleteMany({ userID: userid })
            throw new BadRequestError(`OTP has been expired...`)
        }
        else {
            const result = await otpverify.compOTP(OTP)
            if (result) {
                
                const userverifyotp=await otpVerification.deleteMany({ userID: userid })
                const user=await User.findOne({ _id:userid })
                const token=await user.generateJWT()
                // sent to change password page
                res.status(StatusCodes.OK).json({user, status:"SUCCESS",token, msg: `you are verified now and sent to password updation page` })
            }
            else {
                throw new BadRequestError(`Invalid OTP datails passed. Check your inbox...`)
            }

        }
    }
    else {
        throw new NotFound(`Account record doesn't exist.`)
    }
}
module.exports = { register, verifyEmail, verifyOTP, forgotPassword }