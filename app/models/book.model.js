const db = require("../common/connect")
const Book = function(book){
    this.id=book.id
    this.name=book.name
    this.image=book.image
    this.author_id=book.author_id
}

Book.get_all = function(result){
    db.query(`SELECT * FROM book`,function(err,book){
        if(err){
            return null
        } else{
            result(book)
        }
    })
}

Book.getById = function(id,result){
    //db.query(`SELECT * FROM book WHERE id = ${id}`,function(err,book){
    db.query(`SELECT * FROM book WHERE id = ${id}`, (err,book) => {
        if(err|| book.length==0){
            result(null)
        } else{
            result(book)
        }
    })
}

Book.create = function(data,result){
    db.query("INSERT INTO book SET ?",data,(err,book)=>{
        if(err){
            result(null)
        }
        result({id: book.insertId, ...data})
    })
}

Book.remove = function(id,result){
    db.query(`DELETE FROM book WHERE id = ${id}`, (err,book) => {
        if(err|| book.length==0){
            result(null)
        } else{
            result("Delete book id: " +id)
        }
    })
}

Book.update = function(b,result){
    db.query("UPDATE book SET name=?,image=?,author_id=? WHERE id=?",[b.name,b.image,b.author_id,b.id],(err,book)=>{
        if(err){
            result(null)
        }
        result(b)
    })
}

module.exports = Book