const request = require('supertest');
const app = require('../../app');

describe('User CRUD Operations', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Registrar e logar um usuário para obter o token de autenticação
        await request(app)
            .post('/api/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        const res = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'password123' });
        token = res.body.token;
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({ username: 'newuser', email: 'new@example.com', password: 'newpassword123' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        userId = res.body.user.id; // Salva o ID do novo usuário para os testes seguintes
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'new@example.com', password: 'newpassword123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true); // Deve retornar uma lista de usuários
    });

    it('should get a user by ID', async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('username', 'newuser');
    });

    it('should update a user', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser', email: 'updated@example.com' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Usuário atualizado com sucesso');
        expect(res.body.user.username).toEqual('updateduser');
        expect(res.body.user.email).toEqual('updated@example.com');
    });

    it('should delete a user', async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Usuário deletado com sucesso');
    });

    it('should return 404 for a deleted user', async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Usuário não encontrado');
    });

});
