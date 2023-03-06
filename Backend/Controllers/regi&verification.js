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

    } else {
        console.log("its ready")
        console.log(success)
    }
})

const register = async (req, res) => {
    console.log(req.body);

    if (await User.exists({ email: req.body.email })) {
        throw new BadRequestError(`User with this email already exists...${req.body.email}`)
    }
    else {
        const data = await User.create(req.body)
        data.verified = false
        data.save()
        console.log(`User created`);
        sendVerificationEmail(data, res)
        res.status(StatusCodes.CREATED).json({ status: 'PENDING', msg: `Email has been sent to your email: ${req.body.email}`})
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
        expiresAt: Date.now() +1000
    })
    await transporter.sendMail(mailOptions)

}

const verify = async (req, res) => {
    const { userid, uniquestring } = req.params
    const userverify = await UserVerification.findOne({ userID: userid })

    if (userverify) {
        const { expiresAt } = userverify

        if (expiresAt < Date.now()) {
            await UserVerification.deleteOne({ userID: userid })
            await User.deleteOne({ _id: userid })
            throw new BadRequestError(`Link has been expired. Please sign up again...`)
        }
        else {
            const result = await userverify.compString(uniquestring)
            if (result) {
                const user = await User.updateOne({ _id: userid }, { verified: true }, { new: true })
                await UserVerification.deleteOne({ userID: userid })
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