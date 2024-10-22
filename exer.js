const express = require('express');
const app = express();
app.use(express.json());

let books = [
    {id: 1, titre: 'java', autheur: 'ericmicheal', prix: 700},
    {id: 2, titre: 'php', autheur: 'jeanparc', prix: 500},
];

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));

    res.json(book);
});

// Get books by author
app.get('/books/autheur/:autheur', (req, res) => {
    const author = req.params.autheur;  
    const autheurBooks = books
        .filter((b) => b.autheur === author)  
        .map((b) => b.titre); 
   
    res.json(autheurBooks);
});

// Add a new book
app.post('/books/add',(req,res)=>{
    let id = req.body.id; 
    const book = books.find(b => b.id === id);
    
    if(book)
        res.json('already added');
    else {
        books.push(req.body);
        res.json('added successfully');
    }
});


//edit a book
app.put('/books/:id', (req, res) => {
    let id = parseInt(req.params.id); 
    const book = books.find(b => b.id === id); 

    if (!book) {
        res.json('book not found');
    } else {
      
        book.titre = req.body.titre;
        book.autheur = req.body.autheur;
        book.prix = req.body.prix;

        res.json('book modifie successfully');
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
