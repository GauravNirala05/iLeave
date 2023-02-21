const express = require(`express`)
const router = express.Router()

const {
    getSingleData,
    createData,
} = require(`../Controller/user`)

//User routes
router.route('/registration').post(createData)
router.route(`/login`).get(getSingleData)

module.exports = router