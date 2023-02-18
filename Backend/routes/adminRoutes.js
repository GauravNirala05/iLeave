const express = require(`express`)
const router = express.Router()

const { getAllData,
    getSingleData,
    createData,
    updateData,
    deleteData } = require(`../Controller/task`)

// Admin routes
router.route('/').get(getAllData).post(createData)
router.route(`/update/:id`).patch(updateData)
router.route(`/delete/:id`).patch(deleteData)

//normal routes
router.route(`/login`).post(createData)
router.route('/profile/:id').get(getSingleData)
router.route(`/update`).patch(updateData)

module.exports = router