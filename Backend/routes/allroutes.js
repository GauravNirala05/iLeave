const express = require(`express`)
const router = express.Router()
const auth=require('../middlewares/auth')
const {
    alluser,
    leaveStatus,
    getApprovals
} = require('../Controllers/allcontrol')
const {
    approve
} = require('../Controllers/approvals')
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
router.route('/updateProfile').patch(auth,updateProfile)
router.route('/deleteProfile').delete(auth,deleteProfile)
router.route('/alluser').get(auth,alluser)
router.route('/applyLeave').post(auth,applyLeave)
router.route('/leaveStatus').get(auth,leaveStatus)
router.route('/approvals').get(auth,getApprovals)
router.route('/approvals/:targetid').patch(auth,approve)
router.route('/allUsers').get(auth,alluser)

module.exports = router