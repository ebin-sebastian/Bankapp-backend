//server creation
// 1. import express and store in a constant variable
const express = require('express')

const jwt= require('jsonwebtoken')

const cors= require('cors')

//2. app creation using express
const app= express()

// give commmand to share datas via cors
app.use(cors({origin:['http://localhost:4200','http://127.0.0.1:8080','http://192.168.56.1:8080']}))

// to parse json datas from req body
app.use(express.json())

//3. create port number      3000 series number....server runs on 3000 series 
app.listen(3001,()=>{console.log('server listening on port 3001');})

//import dataservice file from service folder to use register funciton
const dataService=require('./service/dataservice')

//register- post request as we are storing data in server
app.post('/register',(req,res)=>{
    console.log(req.body);
    // its a asynchronous request so we cant store the output in a variable so we use then to access the object
    dataService.register(req.body.acno,req.body.username,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
        //status is used to change statuscode
    })
})


//middleware creation to check token is valid   ---verify()
const jwtmiddleware=(req,res,next)=>{
    try{
    console.log('router specific middlware started ------')
    token=req.headers['token']     //the token from client 
    const data=jwt.verify(token,'secretkey')
    console.log(data)

    //to take next request after the working of  middleware
    next()
    }
    
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login'
        })
    }
    
}

//login
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })  
})


//withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.w_amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})
//deposit
app.post('/deposit',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.d_amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})
//transaction
app.post('/transaction',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

//delete
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})




















// resolve http request
// Get request
// app.get('/',(req,res)=>{
//     res.send('Get method......')
// })

// //post request
// app.post('/',(req,res)=>{
//     res.send('Post method')
// })

// //put request
// app.put('/',(req,res)=>{
//     res.send('Put method')
// })

// //patch request
// app.patch('/',(req,res)=>{
//     res.send('Patch method')
// })

// //delete request
// app.delete('/',(req,res)=>{
//     res.send('Delete method')
// })


