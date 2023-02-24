const express = require(`express`)
const router = express.Router()

const {
    getSingleData,
    createData,
    updateProfile
} = require(`../Controller/user`)

//User routes
router.route('/registration').post(createData)
router.route(`/login`).get(getSingleData)
router.route(`/profile/:id`).patch(updateProfile)

module.exports = router