const database=require("./../database/db.json")
const fs=require("fs");
const getbook= ()=>{
    return new Promise((resolve, reject) => {
        resolve(database.books)
    })
}
const remove1=(bookid)=>{
    return new Promise((resolve, reject) => {
        let cheek=false
        database.books.forEach(book => {
            if(book.id==Number(bookid)){
                cheek=true;
            }
        });
        if(cheek){
            const newbooks=database.books.filter((book)=>book.id!=Number(bookid))
            fs.writeFile(`${process.cwd()}/database/db.json`,JSON.stringify({...database,books:newbooks}),(err)=>{
                if(err) throw err
                resolve("book deleted Successfully")
            })
           
        }else{
            
            resolve("your book not found 404")
        }
    })
}
const bookadd=(book)=>{
   return new Promise((resolve, reject) => {
        const newbook={id:(database.books.length)+1,...JSON.parse(book),free:true}
        database.books.push(newbook) 
       fs.writeFile(`${process.cwd()}/database/db.json`,JSON.stringify(database),(err)=>{
           if(err) throw err
           resolve("book added Successfully")
        })
    })
}
const updatebook=(bookedit,bookid)=>{
    return new Promise((resolve, reject) => {
        const newbook=JSON.parse(bookedit)
        database.books.forEach((item)=>{
            if(item.id==Number(bookid)){
                item.title=newbook.title
                item.author=newbook.author
                item.price=newbook.price
            }
        })
        fs.writeFile("./database/db.json",JSON.stringify(database),(err)=>{
            if(err) throw err
            resolve("book update Successfully")
        })
    })
   
} 
module.exports={
    getbook,
    remove1,
    bookadd,
    updatebook
} 