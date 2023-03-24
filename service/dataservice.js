//import model
const db=require('./db')   //we import the file itself as we are exporting the model only

//import library for generrate token
const jwt= require('jsonwebtoken')

userDetails={
    1000:{acno:1000,username:"leo",password:"messi",balance:0,transaction:[]},
    1001:{acno:1001,username:"neymar",password:"neymar",balance:0,transaction:[]},
    1002:{acno:1002,username:"andres",password:"iniesta",balance:0,transaction:[]},
    1003:{acno:1003,username:"luis",password:"suarez",balance:0,transaction:[]}
  }


const register=(acno,username,password)=>{

return db.User.findOne({acno}).then(user=>{
    if(user){
        return {
            statusCode:401,
            status:false,
            message:'User already exist'
          }
    }
    else{
        //insert data into db
        const newUser= new db.User({acno,username,password,balance:0,transaction:[]})
        //to store object in collection
        newUser.save()
        return {
            statusCode:200,
            status:true,
            message:'registration success'
          }
    }
})
}

const login=(acno,pass)=>{
    return db.User.findOne({acno,password:pass}).then(user=>{
        if(user){
        currentUser=user.username
        currentacno=acno
        const token=jwt.sign({currentacno:acno},'secretkey')
                                                //string without space
        return {
            statusCode:200,
            status:true,
            message:'Login success',
            currentUser,
            currentacno,
            token
          }
        }
        else{
            return {
                statusCode:401,
                status:false,
                message:'Incorrect Account number or Password'
              }
        }
    })
    }
    


  const deposit=(acno,pass,d_amount)=>{
    var amount=parseInt(d_amount)
    return db.User.findOne({acno,password:pass}).then(user=>{
        if(user){
        user.balance+=amount
        user.transaction.push({type:'Credit',amount})
        user.save()    //to save the updations in database like we did in register
        return {
            statusCode:200,
            status:true,
            message:`${amount} credited and new balance is ${user.balance}`
         }
        }
        else{
            return {
                statusCode:401,
                status:false,
                message:'Incorrect Account number or  Password'
            }
          }

    })
  }


  const withdraw=(acno1,pass1,w_amount)=>{
    var amount=parseInt(w_amount)
    return db.User.findOne({acno:acno1,password:pass1}).then(user=>{
        if(user){
            if(amount<user.balance){
                user.balance-=amount
      
                //add transaction details
                user.transaction.push({type:'Debit',amount})
                user.save()
                return {
                  statusCode:200,
                  status:true,
                  message:`${amount} withdrawed and new balance is ${user.balance}`
              }
              }
              else{
                return {
                  statusCode:401,
                  status:false,
                  message:'Withdraw amount is greater than current balance.'
              }
              }
        }
        else{
            return {
                statusCode:401,
                status:false,
                message:'Incorrect Account number or Password'
            }
          }
    })
  }

 const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(user=>{
        if(user){
            return {
                statusCode:200,
                status:true,
                transaction:user['transaction']
              }
        }
        else{
            return {
                statusCode:401,
                status:false,
                message:'User doesnt exist'
            }
          }
       
    })
  }

  const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
        if(user){
            return {
                statusCode:200,
                status:true,
                message:'Deleted Successfully'
              }
        }
        else{
            return {
                statusCode:401,
                status:false,
                message:'User Doesnt exist'
            }
          }
    })
  }

module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
}