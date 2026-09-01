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

export { getAllBooks, getBookById };