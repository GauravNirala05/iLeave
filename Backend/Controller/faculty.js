const userData = require('../model/User')
const applyLeave = require('../model/applyLeave')

const getleaveStatus = async (req, res) => {

    const { name } = req.params
    if (await applyLeave.exists({ employee_name: name })) {
        const data = await applyLeave.find({ employee_name: name }).limit(1)
        res.status(200).json({ hits: data.length, data: data })
    }
    else {
        return res.status(404).json({ msg: `No Leave applied by ${name}` })
    }
}
const getReplacements = async (req, res) => {
    const { name } = req.params
    const user = await userData.findOne({ name: name })
    if (user) {
        const data1 = await applyLeave.where({ 'reference1.name': name })
        const data2 = await applyLeave.where({ 'reference2.name': name })
        const data3 = await applyLeave.where({ 'reference3.name': name })
        const data4 = await applyLeave.where({ 'reference4.name': name })
        res.status(200).json({ first: data1, second: data2, third: data3, forth: data4 })
    } else {
        return res.status(404).json({ msg: `no user with name ${name}` })
    }

}
const approveReplacements = async (req, res) => {
    const { name, id } = req.params
    const user = await userData.findOne({ name: name })
    console.log(name);
    if (user) {
        const data = await applyLeave.findOneAndUpdate({ _id: id }, req.body,{new:true,runValidators:true})
        if (!data) {
            return res.status(404).json({ msg: `no leaves with id ${id}` })
        }
        res.status(200).json({ data })

    } else {
        return res.status(404).json({ msg: `no user with name ${name}` })
    }
}
const getAllLeave = async (req, res) => {
    const { name } = req.params
    if (await applyLeave.exists({ employee_name: name })) {
        const data = await applyLeave.find({ employee_name: name })
        res.status(200).json({ hits: data.length, data: data })
    }
    else {
        return res.status(404).json({ msg: `No Leave applied by ${name}` })
    }
}
const createleave = async (req, res) => {
    console.log(`user hits`);
    const { name: userName } = req.params
    if (await userData.findOne({ name: userName })) {
        const data = await applyLeave.create(req.body,)
        data.employee_name = userName
        data.reference1.name = req.body.reference1
        data.reference2.name = req.body.reference2
        data.reference3.name = req.body.reference3
        data.reference4.name = req.body.reference4
        await data.save()
        console.log(`leave created`);
        res.status(200).json({ data })
    }
    else {
        res.status(200).json({ msg: `no user with name ${userName}` })
    }
}

module.exports = { getleaveStatus, createleave, getReplacements, approveReplacements, getAllLeave }
