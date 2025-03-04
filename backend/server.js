//dotenv.config() → Loads environment variables from a .env file.
//express() → Creates an instance of an Express application.
//app.use(cors()) → Enables Cross-Origin Resource Sharing (CORS) so the frontend can access the backend.
//app.use(express.json()) → Allows Express to parse bvd JSON request bodies automatically.

require('dotenv').config(); // I just loaded environmental variables from .env file
const express=require('express'); //Import Express framework
const mongoose=require('mongoose');
const cors=require('cors');
const Book=require('./bookModel')
const app=express();
app.use(cors());
app.use(express.json());
/*mongoose.connect(process.env.MONGO_URI, { options }) → Connects to the MongoDB database using a connection string stored in .env.
useNewUrlParser: true → Ensures that MongoDB uses the latest connection logic.
useUnifiedTopology: true → Enables the new server discovery and monitoring engine.
.then(() => console.log("MongoDB Connected")) → If successful, logs "MongoDB Connected".
.catch(err => console.error(err)) → If an error occurs, logs it. */

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("MongoDb connected")).catch(err=>console.error(err));



/*app.post('/books', async (req, res) => {...}) → Defines a POST API route for adding a new book.
const book = new Book(req.body); → Creates a new book using the data from the request body.
await book.save(); → Saves the book in MongoDB.
res.status(201).json(book); → Returns the created book with a 201 Created status.
If an error occurs, we send a 400 Bad Request response with the error message.*/


app.post('/books',async(req,res)=>{
    try{
        const book=new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch(error){
        res.status(400).json({error:error.message});
    }
});

/**Book.find() → Fetches all books from the database.
res.json(books); → Returns the list of books as JSON.
If an error occurs, we send a 500 Internal Server Error response. */
app.get('/books',async(req,res)=>{
    try{
        const books=await Book.find();
        res.json(books);
    }catch(error){
        res.status(500).json({error:error.message});
    }

});
app.get('/books/:bookId', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



/**process.env.PORT || 5000 → Uses the port from .env, or defaults to 5000.
app.listen(PORT, () => console.log(...)) → Starts the server and logs a message. */
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));
