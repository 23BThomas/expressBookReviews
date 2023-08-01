const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function doesExist(username) {
    const user = users.find((user) => user.username === username);
  
    return !!user;
  }

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username, password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
  //return res.status(300).json({message: "Successfully registered. You can now login!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4))
  //return res.status(300).json({message: "List of all books"});
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  

 // Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const books = [
    {author: "Chinua Achebe",title: "Things Fall Apart",reviews: {} },
    {author: "Hans Christian Andersen",title: "Fairy tales",reviews: {} },
    {author: "Dante Alighieri",title: "The Divine Comedy",reviews: {} },
    {author: "Unknown",title: "The Epic Of Gilgamesh",reviews: {} },
    {author: "Unknown",title: "The Book Of Job",reviews: {} },
    {author: "Unknown",title: "One Thousand and One Nights",reviews: {} },
    {author: "Unknown",title: "Nj\u00e1l's Saga",reviews: {} },
    {author: "Jane Austen",title: "Pride and Prejudice",reviews: {} },
    {author: "Honor\u00e9 de Balzac",title: "Le P\u00e8re Goriot",reviews: {} },
    {author: "Samuel Beckett",title: "Molloy, Malone Dies, The Unnamable, the trilogy",reviews: {} }
  ]

  const keys = Object.keys(books);
  console.log(keys);
  const authorToMatch = 'Dante Alighieri';

  books.forEach(book => {
    if (book.author === authorToMatch) {
      console.log(book.title);
    }
  });
  const authorBooks = books.filter(book => book.author === author);
  res.send(authorBooks);
//res.send(books[author])
  //return res.status(300).json({message: "Yet to be implemented"});
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const books = [
    {author: "Chinua Achebe",title: "Things Fall Apart",reviews: {} },
    {author: "Hans Christian Andersen",title: "Fairy tales",reviews: {} },
    {author: "Dante Alighieri",title: "The Divine Comedy",reviews: {} },
    {author: "Unknown",title: "The Epic Of Gilgamesh",reviews: {} },
    {author: "Unknown",title: "The Book Of Job",reviews: {} },
    {author: "Unknown",title: "One Thousand and One Nights",reviews: {} },
    {author: "Unknown",title: "Nj\u00e1l's Saga",reviews: {} },
    {author: "Jane Austen",title: "Pride and Prejudice",reviews: {} },
    {author: "Honor\u00e9 de Balzac",title: "Le P\u00e8re Goriot",reviews: {} },
    {author: "Samuel Beckett",title: "Molloy, Malone Dies, The Unnamable, the trilogy",reviews: {} }
  ] 
  const keys = Object.keys(books);
  const titleBooks = books.filter(book => book.title === title);
  res.send(titleBooks);
  return res.status(300).json({message: "Title not found"});
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});


//Task: 10
//Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.

let getBookList = new Promise((resolve,reject) => {
      resolve("books")
})

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    getBookList().then(
      (bk)=>res.send(JSON.stringify(bk, null, 4)),
      (error) => res.send("denied")
    );  
  });


  //Task : 11
  //Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
  
  function getFromISBN(){
    let book_ = books[isbn];  
  return new Promise((resolve,reject)=>{
    if (book_) {
      resolve(book_);
    }else{
      reject("Unable to find book!");
    }    
  })
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    getFromISBN(isbn).then(
      (bk)=>res.send(JSON.stringify(bk, null, 4)),
      (error) => res.send(error)
    )
   });


   //Task : 12
// Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.


function getFromAuthor(){
    let output = []; 
    return new Promise((resolve,reject)=>{
        for (var isbn in books) {
            let book_ = books[isbn];
            if (book_.author==book)
            {
                output.push(book_);
            
            }
        }
        resolve(output);
    })
}


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    getFromAuthor(author)
    .then(
      result =>res.send(JSON.stringify(result, null, 4))
    );
  });


  //Task : 13
// Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.

function getFromTitle(title){
    let output = [];
    return new Promise((resolve,reject)=>{
      for (var isbn in books) {
        let book_ = books[isbn];
        if (book_.title === title){
          output.push(book_);
        }
      }
      resolve(output);  
    })
  }
  
  // Get all books based on title
  public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    getFromTitle(title)
    .then(
      result =>res.send(JSON.stringify(result, null, 4))
    );
  });

module.exports.general = public_users;