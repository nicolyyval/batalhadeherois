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

//Rota que obtem um heroi pelo nome
app.get('/heroi/nome/:nome', async (req, res) => {
    const { nome } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM heroi WHERE nome = $1', [nome]);
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao obter heroi', error);
        res.status(500).json({ message: 'Erro ao obter heroi' });
    }
});

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

//Rota de batalha entre dois herois
app.get('/batalha/:id_heroi_1/:id_heroi_2', async (req, res) => {
    const { id_heroi_1, id_heroi_2 } = req.query;
    try {
        const resultado1 = await pool.query('SELECT * FROM heroi WHERE id = $1', [id_heroi_1]);
        const resultado2 = await pool.query('SELECT * FROM heroi WHERE id = $1', [id_heroi_2]);
        const heroi1 = resultado1.rows[0];
        const heroi2 = resultado2.rows[0];
        console.log(heroi1);
        console.log(heroi2);
        let vencedor = 0;
        if (heroi1.hp > heroi2.hp) {
            vencedor = heroi1.id;
        } else if (heroi2.hp > heroi1.hp) {
            vencedor = heroi2.id;
        }
        const battleInsertQuery = 'INSERT INTO batalha (id_heroi_1, id_heroi_2, vencedor) VALUES ($1, $2, $3) RETURNING id';
        const battleResult = await pool.query(battleInsertQuery, [id_heroi_1, id_heroi_2, vencedor]);
        res.json({ vencedor: vencedor, batalha_id: battleResult.rows[0].id });
    } catch (error) {
        console.error('Erro ao batalhar', error);
        res.status(500).json({ message: 'Erro ao batalhar' });
    }
});

app.get('/batalha/heroi/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM batalha WHERE id_heroi_1 = $1 OR id_heroi_2 = $1', [id]);
        res.json({
            total: resultado.rowCount,
            batalha: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter batalhas', error);
        res.status(500).json({ message: 'Erro ao obter as batalhas' });
    }
});

//histórico de batalhas com os dados dos heróis envolvidos.
app.get('/batalha/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM batalha WHERE id = $1', [id]);
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao obter batalha', error);
        res.status(500).json({ message: 'Erro ao obter batalha' });
    }
});

//Rota que obtem todas as batalhas
app.get('/batalha', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM batalha');
        res.json({
            total: resultado.rowCount,
            batalha: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter batalhas', error);
        res.status(500).json({ message: 'Erro ao obter as batalhas' });
    }
});

app.get('/', (req, res) => {
    res.send('A rota está funcionando! ✨💋');
  });

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} monstrinha do meu coração! 💋`);
});