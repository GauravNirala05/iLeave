const express = require(`express`)
const router = express.Router()

const auth=require('../middlewares/auth')
const {register,verify}=require('../Controllers/regi&verification')
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
    login,
    updateProfile,
    deleteProfile
} = require('../Controllers/basicControl')
const createData = require('../Controllers/registration')



// routes
router.route('/registration').post(createData)
// router.route('/registration').post(register)
// router.route('/user/verify/:userid/:uniquestring').get(verify)
router.route('/login').post(login)
router.route('/loginUser').get(auth,getSingleData)
router.route('/updateProfile').patch(auth,updateProfile)
router.route('/deleteProfile').delete(auth,deleteProfile)
router.route('/alluser').get(auth,alluser)
router.route('/applyLeave').post(auth,applyLeave)
router.route('/leaveStatus').get(auth,leaveStatus)
router.route('/approvals').get(auth,getApprovals)
router.route('/approvals/:targetid').patch(auth,approve)
router.route('/allUsers').get(auth,alluser)

module.exports = router