const notFound = (req, res) => { res.status(404).json({ msg: `not found the resources...(No Routes available)` }) }
module.exports = notFound

