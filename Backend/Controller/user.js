
const userData = require('../model/User')

const getSingleData = async (req, res) => {
    console.log(`get single data`);

    if (await userData.exists({ name: req.body.name })) {
        const data = await userData.findOne({ name: req.body.name, password: req.body.password })
        if (!data) {
            res.status(401).json({ msg: `Wrong password` })
        }
        res.status(200).json({ data })
    }
    else {
        return res.status(200).json({ msg: `No username with name ${req.body.name}` })
    }

}
const createData = async (req, res) => {
    console.log(req.body.password);

    if (await userData.exists({ name: req.body.name })) {
        return res.status(200).json({ msg: `Username ${req.body.name} already Exists ...` })
    }
    else {
        const data = await userData.create(req.body)
        console.log(`data created`);
        res.send(data)
    }

}
const updateProfile = async (req, res) => {
    const { id: userID } = req.params
    console.log(req.params);

    if (await userData.exists({ _id: userID })) {
        const user = await userData.findByIdAndUpdate(userID, req.body, { new: true, runValidators: true })
        res.status(200).json({ user })
    }
    else {
        return res.status(404).json({ msg: `No user with given id ${userID}` })
    }

}

module.exports = { getSingleData, createData, updateProfile }
