const Book = require('../models/Book');
const Club = require('../models/Club');
const Review = require('../models/Review');
const { Sequelize } = require('sequelize');

// Função para calcular estatísticas
exports.getStatistics = async (req, res) => {
    try {
        // Calcular o número médio de livros por clube
        const totalBooks = await Book.count();
        const totalClubs = await Club.count();
        const avgBooksPerClub = totalClubs ? (totalBooks / totalClubs).toFixed(2) : 0;

        // Calcular a média das avaliações dos livros
        const avgBookRatingData = await Review.findAll({
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']]
        });
        const avgBookRating = parseFloat(avgBookRatingData[0].get('averageRating')).toFixed(2);

        res.json({
            avgBooksPerClub,
            avgBookRating
        });
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        res.status(500).json({ error: 'Erro ao obter estatísticas' });
    }
};
