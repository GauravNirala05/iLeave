const userData=require('../model/schema')
const getAllData=()=>{
    console.log(`here is all data`);
}
const getSingleData=()=>{
    console.log(`get single data`);
}
const createData=async (req,res)=>{
    console.log(req.body);
    try {
        const data=await userData.create(req.body)
        console.log(`data created`);
        res.send(data)
    } catch (error) {
        console.log(`error==>${error}`);
    }
}
const updateData=()=>{
    console.log(`data updated`);
}
const deleteData=()=>{
    console.log(`data deleted`);
}

module.exports={getAllData,getSingleData,createData,updateData,deleteData}
