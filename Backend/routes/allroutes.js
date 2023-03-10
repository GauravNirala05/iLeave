const express = require(`express`)
const router = express.Router()

//authentication Middleware
const auth = require('../middlewares/auth')

//All controllers
const {
    register,
    verifyEmail,
    verifyOTP,
    forgotPassword
} = require('../Controllers/regi&verification')
const {
    getSingleData,
    login,
    completeProfile,
    updateProfile,
    deleteProfile,
    updatePass
} = require('../Controllers/basicControl')
const applyLeave = require('../Controllers/applyLeave')
const approve = require('../Controllers/approvals')

const {
    alluser,
    leaveStatus,
    getApprovals,
    getuser
} = require('../Controllers/allcontrol')

//for without Email validation
const createData = require('../Controllers/registration')



// routes
// router.route('/registration').post(createData)
router.route('/registration').post(register)
router.route('/user/verify/:userid/:uniquestring').get(verifyEmail)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/forgotPassword/verifyOTP').post(verifyOTP)
router.route('/forgotPassword/verifyOTP/resetPass').post(updatePass)
router.route('/loginUser').get(auth, getSingleData)
router.route('/completeProfile').patch(auth, completeProfile)
router.route('/updateProfile').patch(auth, updateProfile)
router.route('/deleteProfile/:id').delete(auth, deleteProfile)
router.route('/getuser').get(auth, getuser)
router.route('/applyLeave').post(auth, applyLeave)
router.route('/leaveStatus').get(auth, leaveStatus)
router.route('/approvals').get(auth, getApprovals)
router.route('/approvals/:targetid').patch(auth, approve)
router.route('/alluser').get(auth, alluser)

module.exports = router