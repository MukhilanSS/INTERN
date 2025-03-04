const {v4:uuidv4}= require('uuid');

const mongoose=require('mongoose');
const bookSchema =new mongoose.Schema({
    bookId:{type:String, default:uuidv4},
    bookName: String,
    authorName:String,
    authorMail:String,
    publisher:String,
    description:String,
    price:Number
},{timestamps:true});
/*mongoose.Schema({ fields }) → Defines a schema for the Book collection.
mongoose.model('Book', bookSchema) → Creates a Book model based on this schema. */
const Book=mongoose.model('Book',bookSchema);
module.exports= Book;