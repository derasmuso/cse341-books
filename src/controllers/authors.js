import {
    getAllAuthors as getAllAuthorsFromDb,
    getAuthorById as getAuthorByIdFromDb,
    addAuthor as addAuthorFromDb,
    updateAuthor as updateAuthorFromDb,
    deleteAuthor as deleteAuthorFromDb,
    authorHasBooks,
} from '../models/authors.js';


const getAllAuthors = async (req, res) => {
    try {
        const authors = await getAllAuthorsFromDb();
        return res.status(200).json(authors);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to retrieve authors.' });
    }
};

const getAuthorById = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const author = await getAuthorByIdFromDb(requestedId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found.' });
        }
        return res.status(200).json(author);
    } catch (error) {

        return res.status(500).json({ message: 'Unable to retrieve author.' });
    }
};

const addAuthor = async (req, res) => {
    const { id, name, birthYear } = req.body;

    if (!id || !name || !birthYear) {
        return res.status(400).json({ message: 'id, name, and birthYear are required.' });
    }

    try {
        const existingAuthor = await getAuthorByIdFromDb(id);
        if (existingAuthor) {
            return res.status(400).json({ message: `An author with id '${id}' already exists.` });
        }

        const newAuthor = await addAuthorFromDb({ id, name, birthYear });
        return res.status(201).json(newAuthor);
    } catch (error) {
        console.error('POST /authors failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateAuthor = async (req, res) => {
    const requestedId = req.params.id;
    const { name, birthYear } = req.body;

    if (!name || !birthYear) {
        return res.status(400).json({ message: 'name and birthYear are required.' });
    }

    try {
        const updatedAuthor = await updateAuthorFromDb(requestedId, { name, birthYear });
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Author not found.' });
        }
        return res.status(200).json(updatedAuthor);
    } catch (error) {
        console.error('PUT /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteAuthor = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const existingAuthor = await getAuthorByIdFromDb(requestedId);
        if (!existingAuthor) {
            return res.status(404).json({ message: 'Author not found.' });
        }

        const hasBooks = await authorHasBooks(requestedId);
        if (hasBooks) {
            return res.status(409).json({ message: 'Cannot delete an author who still has books.' });
        }

        await deleteAuthorFromDb(requestedId);
        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor };