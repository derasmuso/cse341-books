import express from 'express';
import { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from './controllers/books.js';
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor } from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6a972bfc6201314a5ceb8ec5
 *                   id:
 *                     type: string
 *                     example: b1
 *                   authorId:
 *                     type: string
 *                     example: a1
 *                   title:
 *                     type: string
 *                     example: '1984'
 *                   publicationDate:
 *                     type: string
 *                     example: 1949-06-08
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a single book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's custom id (e.g. "b1")
 *     responses:
 *       200:
 *         description: The matching book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6a972bfc6201314a5ceb8ec5
 *                 id:
 *                   type: string
 *                   example: b1
 *                 authorId:
 *                   type: string
 *                   example: a1
 *                 title:
 *                   type: string
 *                   example: '1984'
 *                 publicationDate:
 *                   type: string
 *                   example: 1949-06-08
 *       404:
 *         description: No book found with the given id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *           example:
 *             id: b4
 *             authorId: a1
 *             title: Example Book Title
 *             publicationDate: '2026-01-15'
 *     responses:
 *       201:
 *         description: The newly created book
 *       400:
 *         description: A required field is missing, the id already exists, or authorId does not match an existing author
 *       500:
 *         description: Internal server error
 */
router.post('/books', createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's custom id (e.g. "b1")
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *           example:
 *             authorId: a2
 *             title: Updated Book Title
 *             publicationDate: '2026-02-20'
 *     responses:
 *       200:
 *         description: The updated book
 *       400:
 *         description: A required field is missing, or authorId does not match an existing author
 *       404:
 *         description: No book found with the given id
 *       500:
 *         description: Internal server error
 */
router.put('/books/:id', updateBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's custom id (e.g. "b1")
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: No book found with the given id
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', deleteBookHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The matching author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */

router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             id: a4
 *             name: Example Author
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: The newly created author
 *       400:
 *         description: A required field is missing, or the id already exists
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', addAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             name: Updated Author
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: The updated author
 *       400:
 *         description: A required field is missing
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Cannot delete an author who still has books
 *       500:
 *         description: Unable to delete author
 */
router.delete('/authors/:id', deleteAuthor);


export default router;