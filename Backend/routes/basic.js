const express = require(`express`)
const router = express.Router()

const { getAllData,
    getSingleData,
    createData,
    updateData,
    deleteData } = require(`../Controller/task`)

// routes
router.route('/login').get(getAllData)
router.route(`/registration`).post(createData)

module.exports = router