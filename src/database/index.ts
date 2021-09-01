import fs from 'fs';
import { User, UserDataUpdate } from '../types';

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

export function removerRegistro(nome: string) {
  const db = getDB();
  const usuario = db.find((user) => nome === user.nome);

  if (usuario) {
    const targetIndex = db.indexOf(usuario);
    db.splice(targetIndex, 1);
    saveDB(db);
    return { message: 'Usuário deletado!' };
  }
  return { message: 'Usuário não deletado!' };
}

export function alterarNomeRegistro(nome: string, update: UserDataUpdate) {
  const db = getDB();
  const usuario = db.find((user) => nome === user.nome);

  if (!usuario) {
    throw new Error('Usuário não alterado!');
  }
  usuario.mes = update.mes;
  usuario.dia = update.dia;
  saveDB(db);
  return { message: 'Usuário alterado!' };
}
