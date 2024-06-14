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

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(logger('dev'))

app.use('/api', route)

app.use((req, res)=>{
    res.status(404).json({success:false, message:`path doesnot exist ${req.url}`})
})
app.use(errorHandler)

app.listen(PORT, (err)=>{
    if(err) return console.log(`ERROR OCCURED WHILE STARTING THE SERVER ${err}`);
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})