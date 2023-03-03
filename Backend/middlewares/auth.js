const jwt =require('jsonwebtoken')
const {BadRequestError,NotFound}=require('../errors')

const auth=(req,res,next)=>{
    console.log(req.headers)
    const {authorization}=req.headers
    console.log(authorization);
    if(!authorization||!authorization.startsWith('Bearer ')){
        throw new BadRequestError(`please provide token`)
    }
    const token =authorization.split(' ')[1]
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
        next()
    } catch (error) {
        throw new BadRequestError('Not a good request')
    }
}
module.exports=auth