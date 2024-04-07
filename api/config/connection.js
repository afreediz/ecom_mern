const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`DATABASE CONNECTED : ${process.env.MONGO_URL}`);
}).catch((err)=>{
    console.log(`ERROR OCCURED WHILE CONNECTING TO DATABASE \n ${err.message}`);
})