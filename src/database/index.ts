import fs from 'fs';
import { User, UserDataUpdate, UserData } from '../types';

function getDB() {
  const dbFile = fs.readFileSync(`${__dirname}/db.json`, { encoding: 'utf-8' });

  const dbObject: User[] = JSON.parse(dbFile);

  return dbObject;
}

function saveDB(dbObject: User[]) {
  const dbFile = JSON.stringify(dbObject, null, 2);

  fs.writeFileSync(`${__dirname}/db.json`, dbFile, { encoding: 'utf-8' });
}

function getLastId() {
  const db = getDB();
  if (db.length === 0) return 0;
  const lastIndex = db.length - 1;

  return db[lastIndex].id + 1;
}
m;
function adicionarRegistro(userData: UserData) {
  const db = getDB();
  const newUser = { id: getLastId(), ...userData };

  db.push(newUser);

  saveDB(db);
  return { message: 'Usuário cadastrado com sucesso!' };
}

function removerRegistro(nome: string) {
  const db = getDB();
  const usuario = db.find((user) => new RegExp(nome, 'i').test(user.nome));

  if (!usuario) {
    throw new Error('Usuário não removido!');
  }

  const targetIndex = db.indexOf(usuario);
  db.splice(targetIndex, 1);
  saveDB(db);
  return { message: 'Usuário removido!' };
}

function alterarNomeRegistro(nome: string, update: UserDataUpdate) {
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

function consultaLetraInicial(letra? : string) {
  if (!letra) throw new Error('Letra não informada');
  const db = getDB();
  const arrUsuariosEncontrados = db.filter((user) => {
    const regex = new RegExp(`^${letra}`, 'i');
    return regex.test(user.nome);
  });
  return arrUsuariosEncontrados;
}

export { adicionarRegistro, removerRegistro, alterarNomeRegistro, consultaLetraInicial };
