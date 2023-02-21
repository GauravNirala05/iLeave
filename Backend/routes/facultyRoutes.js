const express = require(`express`)
const router = express.Router()

const {
    getleaveStatus,
    createleave,
    getReplacements,
    approveReplacements,
    getAllLeave
} = require(`../Controller/faculty`)

router.route(`/:name/leaveApply`).post(createleave)
router.route(`/:name/leaveStatus`).get(getleaveStatus)
router.route(`/:name/getReplacements`).get(getReplacements).post(approveReplacements)
router.route(`/:name/leaveHistory`).get(getAllLeave)
module.exports = router