import express from 'express';
import mysql from 'mysql';

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
});

db.connect((connectionError) => {
  if (connectionError) throw connectionError;

  console.log('🔌 DB connected!');

  const createTableQuery =
    'CREATE TABLE IF NOT EXISTS modules (name VARCHAR(255))';

  db.query(createTableQuery, (tableCreationError, result) => {
    if (tableCreationError) throw tableCreationError;

    console.log('🗃️ Table modules created');

    db.query(`SELECT * FROM modules`, (selectError, modules) => {
      if (selectError) throw selectError;

      if (Array.isArray(modules) && !modules.length) {
        const insertQuery = `INSERT INTO modules (name) VALUES ?`;
        const modules = [
          ['Docker'],
          ['Kubernetes'],
          ['RabbitMQ'],
          ['Apache Kafka'],
        ];

        db.query(insertQuery, [modules], (insertError) => {
          if (insertError) throw insertError;

          console.log('📂 Data inserted');
        });
      }
    });
  });
});

const app = express();

app.get('/', (req, res) => {
  return db.query(`SELECT * FROM modules`, (selectError, modules) => {
    if (selectError) throw selectError;

    res.send(modules);
  });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
