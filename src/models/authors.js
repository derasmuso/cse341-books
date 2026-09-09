import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
    const db = getDb();
    const collection = db.collection('authors');
    const authors = await collection.find({}).toArray();

    return authors;
};

const getAuthorById = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const author = await collection.findOne({ id: authorId });

    return author;
};

const addAuthor = async (authorData) => {
    const db = getDb();
    const collection = db.collection('authors');
    await collection.insertOne(authorData);

    return authorData;
};

const updateAuthor = async (id, author) => {
    const db = getDb();
    const collection = db.collection('authors');
    await collection.updateOne({ id }, { $set: author });

    return { id, ...author };
};

const deleteAuthor = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const deletedAuthor = await collection.deleteOne({ id: authorId });

    return deletedAuthor;
};

const authorHasBooks = async (authorId) => {
    const db = getDb();
    const collection = db.collection('books');
    const book = await collection.findOne({ authorId });

    return Boolean(book);
};

export { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor, authorHasBooks };