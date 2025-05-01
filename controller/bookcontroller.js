const url=require("url")
const bookmodel=require("./../model/Book");
const getall=async(req,res)=>{
       const book=await bookmodel.getbook();
       res.send((book))   
}
const delet=async(req,res)=>{
    const parsurl=url.parse(req.url,true)
    const bookid=parsurl.query.id
     const removedbook=await bookmodel.remove1(bookid)   
     res.writeHead(200,{"Content-Type":"text/html"})
     res.write(removedbook)
     res.end()
 
}
const addone=async(req,res)=>{
    
    let book="";
        req.on("data",(data)=>{
            book=(book+data.toString());
        });
        
        req.on("end",async()=>{
               const addedbook= await bookmodel.bookadd((book))
               res.send(addedbook)
        })
}
const updateone=async(req,res)=>{
    const  parsurl=url.parse(req.url,true)
    const bookid=parsurl.query.id
    let bookedit=""
    req.on("data",(data)=>{
        bookedit=bookedit+data.toString();
    })
    req.on("end",async()=>{
       const updateed=await bookmodel.updatebook(bookedit,bookid)
       res.send(updateed)
      
    })
}
module.exports={
    getall,
    delet,
    addone,
    updateone
}