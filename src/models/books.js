import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
    const db = getDb();
    const booksCollection = db.collection('books');
    const books = await booksCollection.find({}).toArray();
    return books;
};

export { getAllBooks };