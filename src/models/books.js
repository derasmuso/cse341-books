import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
    const db = getDb();
    const booksCollection = db.collection('books');
    const books = await booksCollection.find({}).toArray();
    return books;
};

const getBookById = async (bookId) => {
    const db = getDb();
    const booksCollection = db.collection('books');
    const book = await booksCollection.findOne({ id: bookId });
    return book;
};

const addBook = async (bookData) => {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.insertOne(bookData);

    return bookData;
};

const updateBook = async (id, book) => {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.updateOne({ id }, { $set: book });

    return { id, ...book };
};

const deleteBook = async (bookId) => {
    const db = getDb();
    const booksCollection = db.collection('books');
    const deletedBook = await booksCollection.deleteOne({ id: bookId });

    return deletedBook;
};

const authorExists = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const author = await collection.findOne({ id: authorId });

    return Boolean(author);
};

export { getAllBooks, getBookById, addBook, updateBook, deleteBook, authorExists };