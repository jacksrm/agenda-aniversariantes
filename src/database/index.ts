import fs from 'fs';
import { User } from '../types';

function getDB() {
  const dbFile = fs.readFileSync(`${__dirname}/db.json`, { encoding: 'utf-8' });

  const dbObject: User[] = JSON.parse(dbFile);

  return dbObject;
}

function saveDB(dbObject: User[]) {
  const dbFile = JSON.stringify(dbObject, null, 2);

  fs.writeFileSync(`${__dirname}/db.json`, dbFile, { encoding: 'utf-8' });
}

export function adicionarRegistro(user: User) {
  const db = getDB();

  db.push(user);

  saveDB(db);

  return { message: 'Usuário salvo!' };
}
