const express = require(`express`)
const router = express.Router()

const {allUsers,approveLeave,usersAppliedLeave,applyLeave } = require(`../Controller/hod`)

// Admin routes
router.route('/:department/alluser').get(allUsers)
router.route('/:department/appliedLeaves').get(usersAppliedLeave)
router.route('/:department/applyLeave').post(applyLeave)
router.route(`/:department/:id/approve`).patch(approveLeave)

module.exports = router