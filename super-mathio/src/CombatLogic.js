const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Map from world number to question type
const WORLD_TYPE = {
  1: 'ALG',
  2: 'STAT',
  3: 'CALC',
  4: 'PHYS'
};

app.get('/api/enemy', async (req, res) => {
  const world = parseInt(req.query.world, 10);
  const level = parseInt(req.query.level, 10);
  const type = WORLD_TYPE[world] || 'ALG';

  try {
    // pick a random question of that type
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM db.questions WHERE type = $1`,
      [type]
    );
    const count = Number(countResult.rows[0].count);
    const offset = Math.floor(Math.random() * count);

    const qRes = await pool.query(
      `SELECT question, answer FROM db.questions WHERE type = $1 OFFSET $2 LIMIT 1`,
      [type, offset]
    );
    if (!qRes.rows.length) {
      return res.status(404).json({ error: 'No questions found' });
    }
    const { question, answer } = qRes.rows[0];

    // choose an enemy sprite based on world
    const png = `enemyplaceholder.png`;

    res.json({ question, answer, png });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
