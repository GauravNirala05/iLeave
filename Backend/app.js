const express = require('express')
const app = express()
const getdata = require(`./routes/adminRoutes`)
const userroutes = require(`./routes/userRoutes`)
const userDefine = require(`./routes/basic`)
const mongoose=require('mongoose')
require('dotenv').config()

//middlewares
app.use(express.json())

app.use(express.static('../frontend'))

app.use('/api/v1/peoples', getdata)
app.use('/', userDefine)



const port = 4000
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser:true,
        })
        console.log(`connected to db`);
        app.listen(port, () =>console.log(`Server is listning at ${port}...`))
        
    } catch (error) {
        console.log(`error occur ${error}` );
    }
}
start()