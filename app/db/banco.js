import DataBase from "better-sqlite3";

const db = new DataBase("./app/db/escola.db");

db.pragma("foreign_keys = ON");// Habilita chave estrangeira

db.exec(`
    CREAT TABLE IF NOT EXISTS alunos (
      id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_aluno TEXT NOT NULL,
      idade INTEGER NOT NULL,
      serie TEXT NOT NULL,
      ra_aluno TEXT NOT NULL UNIQUE
    );
    `);

    db.exec(`
    CREAT TABLE IF NOT EXISTS notas (
      id_nota INTEGER PRIMARY KEY AUTOINCREMENT,
      id_aluno INTEGER NOT NULL UNIQUE,
      t1 REAL NOT NULL,
      t2 REAL NOT NULL,
      n1 REAL NOT NULL,
      n2 REAL NOT NULL,
      n3 REAL NOT NULL,
      FOREIGN KEY (id_aluno) REFERENCES alunos (id_aluno)
      ON DELETE CASCADE
      );
    `);
    console.log('Banco de dados criado com sucesso!');

    export default db;

