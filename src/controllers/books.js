import { getAllBooks, getBookById, addBook, updateBook, deleteBook, authorExists } from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:bookId failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createBookHandler = async (req, res) => {
    const { id, authorId, title, publicationDate } = req.body;

    if (!id || !authorId || !title || !publicationDate) {
        return res.status(400).json({ message: 'id, authorId, title, and publicationDate are required.' });
    }

    try {
        const existingBook = await getBookById(id);
        if (existingBook) {
            return res.status(400).json({ message: `A book with id '${id}' already exists.` });
        }

        const validAuthor = await authorExists(authorId);
        if (!validAuthor) {
            return res.status(400).json({ message: `authorId '${authorId}' does not match an existing author.` });
        }

        const newBook = await addBook({ id, authorId, title, publicationDate });
        return res.status(201).json(newBook);
    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBookHandler = async (req, res) => {
    const requestedId = req.params.id;
    const { authorId, title, publicationDate } = req.body;

    if (!authorId || !title || !publicationDate) {
        return res.status(400).json({ message: 'authorId, title, and publicationDate are required.' });
    }

    try {
        const existingBook = await getBookById(requestedId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const validAuthor = await authorExists(authorId);
        if (!validAuthor) {
            return res.status(400).json({ message: `authorId '${authorId}' does not match an existing author.` });
        }

        const updatedBook = await updateBook(requestedId, { authorId, title, publicationDate });
        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteBookHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const existingBook = await getBookById(requestedId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await deleteBook(requestedId);
        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };
