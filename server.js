import express from 'express';
const app=express();

//middleware
app.use(express.json());

let books=[
    {
        id:1,
        name:"Harry Potter",
        author:"J.K Rowling",
        price:250
    },
    {
        id:2,
        name:"William Shakespeare",
        author:"Romeo and Juliet",
        price:300
    },
    {
        id:3,
        name:"Chetan Bhagat",
        author:"Five Point Someone",
        price:150
    },
];

//get all books
app.get('/getBooks',(req,res)=>{
    res.status(200).json({
        message:"Book details fetched successfully",
        books:books
    })
});

//get book details by id
app.get('/getBook/:id',(req,res)=>{
    const id=Number(req.params.id);
    const book=books.find((book)=>book.id);
    if(!book){
        res.status(404).json({
            message:"Book Not Found",
        })
    }
    res.status(200).json({
        message:"Book details fetched successfully",
        book:book
    })
});

//add a book
app.post('/addBook',(req,res)=>{
    const {name,author,price}=req.body;
    if(!name || !author || !price){
        res.status(404).json({
            message:"All fields are required",
        })
    }
    const newBook={
        id:books.length>0?Math.max(...books.map(b=>b.id))+1:1,
        name:name,
        author:author,
        price:price
    };
    books.push(newBook);
    res.status(201).json({
        message:"Book aaded successfully",
        book:newBook
    })
})

app.listen(3000,()=>{
    console.log("Server Running at http://localhost:3000");
    
})
