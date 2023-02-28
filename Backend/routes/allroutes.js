const express = require(`express`)
const router = express.Router()

const {
    alluser,
    leaveStatus,
    getApprovals
} = require('../Controllers/allcontrol')
const {approve} = require('../Controllers/approvals')
const {
    applyLeave,
    getSingleData,
    createData,
    updateProfile,
    deleteProfile
} = require('../Controllers/basicControl')


// routes
router.route('/login').post(getSingleData)
router.route('/registration').post(createData)
router.route('/updateProfile/:id').patch(updateProfile)
router.route('/deleteProfile/:id').delete(deleteProfile)
router.route('/alluser/:id').get(alluser)
router.route('/applyLeave/:id').post(applyLeave)
router.route('/leaveStatus/:id').get(leaveStatus)
router.route('/approvals/:id').get(getApprovals)
router.route('/approvals/:id/:targetid').patch(approve)
router.route('/allUsers/:id').get(alluser)
module.exports = router