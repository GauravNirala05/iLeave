//most Essentials
const mongoose=require('mongoose')
require('dotenv').config()
require(`express-async-errors`)
const notFound=require(`./middlewares/notFound`)
const errorHandlerMiddleware=require(`./middlewares/errorhandler`)
const express = require('express')
const app = express()

//middlewares
app.use(express.json())
app.use(express.static('../frontend'))


//All Routes
const deanRoute = require(`./routes/AdminRoutes`)
const adminRoute= require(`./routes/HODRoutes`)
const userRoute = require(`./routes/userRoutes`)
const facultyRoute = require(`./routes/facultyRoutes`)
app.use('/principal', deanRoute)
app.use('/HOD', adminRoute)
app.use('/Faculty', facultyRoute)
app.use('/', userRoute)



app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT||4000
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useFindAndModify:false
        })
        console.log(`connected to db`);
        app.listen(port, () =>console.log(`Server is listning at ${port}...`))
        
    } catch (error) {
        console.log(`error occur ${error}` );
    }
}
start()