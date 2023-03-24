// 1. server monogodb integration 

// import 
const mongoose=require('mongoose')

// state connection string usiing mongoose    (connecting mogodb with server)
mongoose.connect('mongodb://localhost:27017/bankserver',{useNewUrlParser:true}) //to remove warnings
//URL parsing is the process of breaking down a URL (Uniform Resource Locator) into its 
//individual components, such as the protocol, hostname, path, and query parameters. 
//Parsing a URL is important because it allows you to extract information
// from the URL and use it for various purposes,
// such as making an HTTP request, routing in a web application, or connecting to a database.

//2. define db(bankserver)  model(collection) 
//collection name -- users    model name should be-- User     use first letter capital or use--- User ,  for clarity 
const User= mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})
// export model to use  in server 
module.exports={
    User
}