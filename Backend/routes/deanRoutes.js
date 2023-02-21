const express = require(`express`)
const router = express.Router()

const { allUsers,approveLeave } = require(`../Controller/dean`)

// routes
router.route('/alluser').get(allUsers)
router.route('/approve').patch(approveLeave)


module.exports = router