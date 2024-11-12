const Review = require('../models/Review');
const Book = require('../models/Book');

// Adicionar uma opinião sobre um livro
exports.addReviewToBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByPk(bookId);

        if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

        const review = await Review.create({ ...req.body, bookId });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar opinião.' });
    }
};
