const database=require("./../database/db.json")
const fs=require("fs");

const adduser=async(userdata)=>{
    return new Promise((resolve, reject) => {
        const userexist =database.users.find(
            (user)=> user.username==userdata.username)
        
        if(userdata.name==""||userdata.username==""){
            resolve("value is faild")
        }
        
        else if(userexist){
            resolve("Username exists. ")
        }
         
        else{
            const newuser={id:(database.users.length)+1,...userdata,crime:0,role:"USER"}
            database.users.push(newuser);
          //  const {name,username}=user
           // const newuser={
             ///   id:(database.users.length)+1,
                //name,
                //username,
                //crime:0,
                //role:"USER"
           // }
            //console.log(newuser)
            fs.writeFile("./database/db.json",JSON.stringify(database),(err)=>{
                if(err){
                    throw err
                } 
                resolve("user add Successfully")
            })
        }
        
    })
    
}
const addcrime=async(usercrime,userid)=>{
    return new Promise((resolve, reject) => {
        const {crime}=(usercrime)
            database.users.forEach(user => {
                if(user.id==Number(userid)){
                    user.crime=user.crime+crime
                }
            });
            fs.writeFile("./database/db.json",JSON.stringify(database),(err)=>{
                if(err) {
                    throw err
                }
                resolve("crime set Successfully")
                
            })
           
    })
    
}
const changerole=async(userid)=>{
    return new Promise((resolve, reject) => {
        database.users.forEach(user => {
            if(user.id==Number(userid)){
                user.role="ADMIN"
            }
        });
        fs.writeFile("./database/db.json",JSON.stringify(database),(err)=>{
            if(err) throw err
            resolve("user upgrade Successfully");
        })
    })
   
}
const checklogin=(login)=>{
    return new Promise((resolve, reject) => {
        //let cheek=false
    const result=database.users.find(user=> user.username==login.username&&user.pass==login.pass)
   // database.users.forEach(user => {
     //   if(user.username==login.username&&user.pass==login.pass){
      //      cheek=true
       // }
       
    //});
    if(result){
        resolve(`welcom ${login.username}`)
    }
    else{
        
        resolve("username or password is wrong.")
            
    }
    })
    
}
module.exports={
    adduser,
    addcrime,
    changerole,
    checklogin
}