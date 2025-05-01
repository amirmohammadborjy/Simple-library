const express=require("express");
const url=require("url");
require("dotenv").config(); 
const database=require("./database/db.json");
const bookcontroller=require("./controller/bookcontroller")
const usercontroller=require("./controller/usercontroller")
const rentcontroller=require("./controller/rentcontroller")
const app=express();
app.use(express.json());
app.get("/api/books",(req,res)=>{
    bookcontroller.getall(req,res)
})
app.post("/api/adbook",(req,res)=>{
    bookcontroller.addone(req,res);
})
app.put("/api/books",(req,res)=>{
    bookcontroller.updateone(req,res);
})
app.post("/api/adduser",(req,res)=>{
    usercontroller.addone(req,res)
})
app.put("/api/users/crime",(req,res)=>{
    usercontroller.setcrime(req,res);
})
app.put("/api/users/upgrade",(req,res)=>{
    usercontroller.upgraderole(req,res);
})
app.post("/api/login",(req,res)=>{
    usercontroller.login(req,res);
})
app.post("/api/books/rent",(req,res)=>{
    rentcontroller.rentbook(req,res);
})
app.put("/api/user/rent",(req,res)=>{
    rentcontroller.returnRent(req,res);
})
app.listen(process.env.PORT,()=>{
    console.log(`Server run on port${process.env.PORT}`);
})

//const server=http.createServer((req,res)=>{
  //  if(req.method=="GET"&&req.url=="/api/users")
    //  fs.readFile("./database/db.json",(err,data)=>{
      //  if(err){
        //    throw err
        //} 
        //const parsdata=JSON.parse(data)
        //res.writeHead(200,{"Content-Type":"application/json"})
        //res.write(JSON.stringify(parsdata.users))
        //res.end()
    //}//)
    
    
    //else if(req.method=="DELETE"){
     //   bookcontroller.delet(req,res);
    //}    
  
   
   
 //   })

