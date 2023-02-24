const express = require(`express`)
const router = express.Router()

const { allUsers,approveLeave,appliedUsers } = require(`../Controller/admin`)

// routes
router.route('/alluser').get(allUsers)
router.route('/applieduser').get(appliedUsers)
router.route('/:id/approv').patch(approveLeave)


module.exports = router