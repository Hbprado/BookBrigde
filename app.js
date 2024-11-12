const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const sequelize = require('./src/config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

// Testes na porta 3001
const PORT = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.DEV_PORT || 3000;


sequelize.sync()
    .then(() => {
        console.log('Database connected and synced.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = app;