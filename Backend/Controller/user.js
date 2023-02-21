const userData = require('../model/User')

const getSingleData = async (req, res) => {
    console.log(`get single data`);
    try {
        if (await userData.exists({ Name: req.body.name })) {
            const data = await userData.findOne({ Name: req.body.name, password: req.body.password })
            if (data==null) {
                res.status(200).json({msg:`Wrong password`})
            }
            res.status(200).json({ data })
        }
        else {
            res.status(200).json({ msg: `No userName with name ${req.body.name}` })
        }
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}
const createData = async (req, res) => {
    console.log(req.body.password);
    try {
        if (await userData.exists({ Name: req.body.name })) {
            res.status(200).json({ msg: `Username ${req.body.name} already Exists ...` })
        }
        else {
            const data = await userData.create(
                {
                    Name: req.body.name,
                    email: req.body.email,
                    Mob_no: req.body.mob_no,
                    Designation: req.body.designation,
                    password: req.body.password,
                    LeaveType: {}
                }
            )
            console.log(`data created`);
            res.send(data)
        }
    } catch (error) {
        console.log(`error==>${error}`);
    }
}

module.exports = { getSingleData, createData }
