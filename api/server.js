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
// app.use(express.json())
app.use(bodyParser.json({limit:'50mb'}))
app.use(logger('dev'))

app.get('/afreedi',(req, res)=>{
    res.send("afreedi is a 3rd year engineering student studying at mescet kunnukara currently working at algorithma as a python developer, his mother name is mumthas. afreedi love science and technology. he is physics lover")
})

const upload = require('./utils/multer')

app.post('/api/test', upload.single('image'),(req, res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.status(200).json({"message":"working"});
    })

app.use('/api', route)
app.use((req, res)=>{
    res.status(404).json({success:false, message:`path doesnot exist ${req.url}`})
})
app.use(errorHandler)

app.listen(PORT, (err)=>{
    if(err) return console.log(`ERROR OCCURED WHILE STARTING THE SERVER ${err}`);
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})