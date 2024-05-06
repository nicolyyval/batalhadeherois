const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'batalha_herois',
    password: 'ds564',
    port: 7007,
});
app.use(express.json());


//Rota que obtem todos os herois
app.get('/heroi', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM heroi');
        res.json({
            total: resultado.rowCount,
            heroi: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter herois', error);
        res.status(500).json({ message: 'Erro ao obter os herois' });
    }
});

//Rota que cria um heroi
app.post('/heroi', async (req, res) => {
    const { nome, poder, level, hp } = req.body;
    try {
        const resultado = await pool.query(
            'INSERT INTO heroi (nome, poder, level, hp) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, poder, level, hp]
        );
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao criar heroi', error);
        res.status(500).json({ message: 'Erro ao criar heroi' });
    }
});

//Rotas que obtem um heroi pelo id
app.get('/heroi/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM heroi WHERE id = $1', [id]);
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao obter heroi', error);
        res.status(500).json({ message: 'Erro ao obter heroi' });
    }
});

//Rota que atualiza um heroi
app.put('/heroi/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, poder, level, hp } = req.body;
    try {
        const resultado = await pool.query(
            'UPDATE heroi SET nome = $1, poder = $2, level = $3, hp = $4 WHERE id = $5 RETURNING *',
            [nome, poder, level, hp, id]
        );
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar heroi', error);
        res.status(500).json({ message: 'Erro ao atualizar heroi' });
    }
});

//Rota que deleta um heroi
app.delete('/heroi/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM heroi WHERE id = $1', [id]);
        res.json({ message: 'Heroi deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar heroi', error);
        res.status(500).json({ message: 'Erro ao deletar heroi' });
    }
});


app.get('/', (req, res) => {
    res.send('A rota está funcionando! ✨💋');
  });

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} monstrinha do meu coração! 💋`);
});