const mongoose = require('mongoose')


 const dbconnect= ()=>{
    try{
       mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, 
             useUnifiedTopology: true,

            
        })
        console.log("Connected")
    }
    catch (error)
    {
        console.log(error);
        process.exit(1);

    }
}
module.exports = dbconnect;