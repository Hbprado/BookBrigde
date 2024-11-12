const Club = require('../models/Club');
const cache = require('../config/cache');

// Criar um novo clube
exports.createClub = async (req, res) => {
    try {
        const { name, description } = req.body;
        const club = await Club.create({ name, description });
        res.status(201).json(club);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao criar clube.', details: error.message });
    }
};


// Listar todos os clubes (Implementação do cache)
exports.getAllClubs = async (req, res) => {
    try {
        const cacheKey = 'clubs:all';

        // Verificar se os dados já estão em cache
        const cachedClubs = await cache.get(cacheKey);
        if (cachedClubs) {
            return res.json(JSON.parse(cachedClubs));
        }

        // Buscar no banco de dados se não estiver em cache
        const clubs = await Club.findAll();
        res.json(clubs);

        // Armazenar no cache por 10 minutos
        await cache.setEx(cacheKey, 600, JSON.stringify(clubs));
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar clubes.' });
    }
};

// Atualizar um clube
exports.updateClub = async (req, res) => {
    try {
        const { id } = req.params;
        const club = await Club.findByPk(id);
        if (!club) return res.status(404).json({ error: 'Clube não encontrado' });

        await club.update(req.body);
        res.json(club);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar clube.' });
    }
};

// Deletar um clube
exports.deleteClub = async (req, res) => {
    try {
        const { id } = req.params;
        const club = await Club.findByPk(id);
        if (!club) return res.status(404).json({ error: 'Clube não encontrado' });

        await club.destroy();
        res.json({ message: 'Clube deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar clube.' });
    }
};
