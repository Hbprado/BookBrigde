const express = require('express');
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const {
    createClub,
    getAllClubs,
    updateClub,
    deleteClub,
} = require('../controllers/clubController')
const { addBookToClub, getAllBooksInClub, getBookInClub, updateBookInClub, deleteBookInClub } = require('../controllers/bookController');
const { addReviewToBook } = require('../controllers/reviewController');
const {
    getStatistics
} = require('../controllers/statsController');
const authenticate = require('../middlewares/auth');

const router = express.Router();


//Rotas de cadastro e login do usuário
router.post('/register', register);
router.post('/login', login);

// Rotas de CRUD para usuários 
router.get('/users', authenticate, getAllUsers);
router.get('/users/:id', authenticate, getUserById);
router.put('/users/:id', authenticate, updateUser);
router.delete('/users/:id', authenticate, deleteUser);

// Rotas de CRUD para clubes de leitura
router.post('/clubs', authenticate, createClub);
router.get('/clubs', authenticate, getAllClubs);
router.put('/clubs/:id', authenticate, updateClub);
router.delete('/clubs/:id', authenticate, deleteClub);

// Rota para adicionar e gerenciar livros ao clube
router.post('/clubs/:clubId/books', authenticate, addBookToClub);
router.get('/clubs/:clubId/books', authenticate, getAllBooksInClub);
router.get('/clubs/:clubId/books/:bookId', authenticate, getBookInClub);
router.put('/clubs/:clubId/books/:bookId', authenticate, updateBookInClub);
router.delete('/clubs/:clubId/books/:bookId', authenticate, deleteBookInClub);


// Rota para registrar opiniões sobre livros
router.post('/books/:bookId/reviews', authenticate, addReviewToBook);

// Rota de estatísticas
router.get('/stats', authenticate, getStatistics);


module.exports = router;
