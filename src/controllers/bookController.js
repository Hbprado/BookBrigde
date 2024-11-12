const Book = require('../models/Book');
const Club = require('../models/Club');

// Adicionar livro a um clube
exports.addBookToClub = async (req, res) => {
    try {
        const { clubId } = req.params;
        const club = await Club.findByPk(clubId);

        if (!club) return res.status(404).json({ error: 'Clube não encontrado' });

        const book = await Book.create({ ...req.body, clubId });
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar livro ao clube.' });
    }
};

// Lista todos os livros de um clube
exports.getAllBooksInClub = async (req, res) => {
    try {
        const { clubId } = req.params;
        const club = await Club.findByPk(clubId, {
            include: Book  // Inclui a lista de livros associados ao clube
        });

        if (!club) return res.status(404).json({ error: 'Clube não encontrado' });

        res.json(club.Books);  // Retorna a lista de livros do clube
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar livros do clube.' });
    }
};

// Lista um livro pelo seu ID de um clube
exports.getBookInClub = async (req, res) => {
    try {
        const { clubId, bookId } = req.params;
        const book = await Book.findOne({
            where: { id: bookId, clubId }
        });

        if (!book) return res.status(404).json({ error: 'Livro não encontrado no clube.' });

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar detalhes do livro.' });
    }
};

// Atualiza um livro em um clube
exports.updateBookInClub = async (req, res) => {
    try {
        const { clubId, bookId } = req.params;
        const book = await Book.findOne({
            where: { id: bookId, clubId }
        });

        if (!book) return res.status(404).json({ error: 'Livro não encontrado no clube.' });

        await book.update(req.body);
        res.json({ message: 'Livro atualizado com sucesso', book });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o livro.' });
    }
};

// Remove um livro específico em um clube
exports.deleteBookInClub = async (req, res) => {
    try {
        const { clubId, bookId } = req.params;
        const book = await Book.findOne({
            where: { id: bookId, clubId }
        });

        if (!book) return res.status(404).json({ error: 'Livro não encontrado no clube.' });

        await book.destroy();
        res.json({ message: 'Livro removido do clube com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover o livro do clube.' });
    }
};
