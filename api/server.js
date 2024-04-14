const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const errorHandler = require('./middlewares/errorHandler')
const bodyParser = require('body-parser')

require('dotenv').config({
    path:"./config/.env"
})
require('./config/connection')

const PORT = process.env.PORT || 3001
const route = require('./routes/index')

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/api', route)

app.get('/test',(req, res)=>{
    return res.status(200).json({"message":"working"});
})
app.use((req, res)=>{
    res.status(404).json({success:false, message:`path doesnot exist ${req.url}`})
})
app.use(errorHandler)

app.listen(PORT, (err)=>{
    if(err) return console.log(`ERROR OCCURED WHILE STARTING THE SERVER ${err}`);
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})