import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

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
 *                   author:
 *                     type: string
 *                     example: George Orwell
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
 *                 author:
 *                   type: string
 *                   example: George Orwell
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

export default router;