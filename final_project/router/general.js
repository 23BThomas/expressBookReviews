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
  res.send(JSON.stringify(books,null,8))
  return res.status(300).json({message: "List of all books"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
res.send(books[isbn])
  return res.status(300).json({message: "Yet to be implemented"});
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
  return res.status(300).json({message: "Yet to be implemented"});
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


  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.review;
  const isbn = req.params.isbn;
  const books = [
   {isbn: '1', author: "Chinua Achebe",title: "Things Fall Apart",reviews: [ {text:'Good',rating:5} ] },
    {isbn: '2', author: "Hans Christian Andersen",title: "Fairy tales",reviews: [ {text:'Excellent',rating:4}] },
     {isbn: '3', author: "Dante Alighieri",title: "The Divine Comedy",reviews: {} },
    {isbn: '4', author: "Unknown",title: "The Epic Of Gilgamesh",reviews: {} },
    {isbn: '5',author: "Unknown",title: "The Book Of Job",reviews: {} },
    {isbn: '6', author: "Unknown",title: "One Thousand and One Nights",reviews: {} },
    {isbn: '7', author: "Unknown",title: "Nj\u00e1l's Saga",reviews: {} },
    {isbn: '8', author: "Jane Austen",title: "Pride and Prejudice",reviews: {} },
    {isbn: '9', author: "Honor\u00e9 de Balzac",title: "Le P\u00e8re Goriot",reviews: {} },
    {isbn: '10', author: "Samuel Beckett",title: "Molloy, Malone Dies, The Unnamable, the trilogy",reviews: {} }

  ] 
  const reviewBooks = books.filter(book => book.isbn === isbn);
  res.send(reviewBooks);

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
