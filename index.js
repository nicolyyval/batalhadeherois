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



app.get('/', (req, res) => {
    res.send('A rota está funcionando! ✨💋');
  });

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} monstrinha do meu coração! 💋`);
});