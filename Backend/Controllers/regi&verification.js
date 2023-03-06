const User = require('../model/User')
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const UserVerification = require('../model/UserVerification')
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
            return res.status(StatusCodes.CREATED).json({ status: 'PENDING', msg: `Email has been sent to your email: ${email}` })
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

const verify = async (req, res) => {
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
module.exports = { register, verify }