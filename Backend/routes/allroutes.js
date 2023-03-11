const express = require(`express`)
const router = express.Router()

//authentication Middleware JWT token
const auth = require('../middlewares/auth')

//All controllers
const {
    register,
    verifyEmail,
    forgotPassword,
    verifyOTP,
    updatePass
} = require('../Controllers/regi&verification')
const {
    getSingleData,
    login,
    completeProfile,
    updateProfile,
    deleteProfile,
} = require('../Controllers/basicControl')
const {applyLeave,getReferenceName} = require('../Controllers/applyLeave')
const approve = require('../Controllers/approvals')

const {
    alluser,
    leaveStatus,
    getApprovals
} = require('../Controllers/allcontrol')


// routes

router.route('/registration').post(register)
router.route('/user/verify/:userid/:uniquestring').get(verifyEmail)
router.route('/login').post(login)
router.route('/getUserData').get(auth, getSingleData)
router.route('/completeProfile').patch(auth, completeProfile)
router.route('/updateProfile').patch(auth, updateProfile)


router.route('/forgotPassword').post(forgotPassword)
router.route('/forgotPassword/verifyOTP').post(verifyOTP)
router.route('/forgotPassword/verifyOTP/resetPass').patch(auth,updatePass)


router.route('/applyLeave').post(auth, applyLeave)
router.route('/getReferenceUser').get(auth, getReferenceName)
router.route('/leaveStatus').get(auth, leaveStatus)


router.route('/approvals').get(auth, getApprovals)
router.route('/approvals/:targetid').patch(auth, approve)


router.route('/alluser').get(auth, alluser)
router.route('/deleteProfile/:id').delete(auth, deleteProfile)

module.exports = router