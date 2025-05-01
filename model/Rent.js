const database=require("./../database/db.json")
const fs=require("fs");
const rent=(reqbody)=>{
    return new Promise((resolve, reject) => {
        const {userid,bookid}=reqbody
    const findbook=database.books.find((book)=>book.id==Number(bookid))
    console.log(findbook)
    if(findbook){
        if(findbook.free){
            database.books.forEach(book=>{
                if(book.id==bookid){
                    book.free=false
                }
            })
            const rentbook={
                id:(database.rents.length)+1,
                userid,
                bookid
            }
            database.rents.push(rentbook)
            fs.writeFile("./database/db.json",JSON.stringify(database),(err)=>{
                if(err) throw err
                resolve("Book rental completed successfully..")
            })
            
        }
        else{
            resolve("The book is currently unavailable.")
        }
    }
    else{
        resolve("book not found")  
    }
    })
    
}
const deletRent=(bookid)=>{
    return new Promise((resolve, reject) => {
        database.books.forEach((book)=>{
            if(book.id==Number(bookid)){
                book.free=true
            }
        })
       // const newrent=database.rents.filter((rent)=>rent.bookID!=Number(bookid))
        fs.writeFile("./database/db.json",JSON.stringify(database),(err)=>{
            if(err) throw err
            resolve("Book backed successfully..")  
        })
    })
    
}
module.exports={
    rent,
    deletRent
}