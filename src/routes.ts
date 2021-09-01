import { adicionarRegistro, alterarNomeRegistro, removerRegistro } from 'database';
import express, { Request, Response } from 'express';
import { User, UserDataUpdate } from './types';

const routes = express.Router();

// TODO: 1) Cadastrar pessoa na agenda de aniversariantes (nome, dia e mês do aniversário).
routes.post('/cadastrar', (req: Request, res: Response) => {
  const { nome, mes, dia }: User = req.body;

  const message = adicionarRegistro({ nome, mes, dia });

  res.json(message);
});

// TODO: 2) Excluir pessoa a partir do nome.
routes.delete('/excluir/:nome', (req: Request, res: Response) => {
  const { nome } = req.params;

  const message = removerRegistro(nome);

  res.json(message);
});

// TODO: 3) Alterar dia ou mês a partir do nome.
routes.put('/alterar/:nome', (req: Request, res: Response) => {
  const { nome } = req.params;
  const update: UserDataUpdate = {
    mes: req.body.mes,
    dia: req.body.dia,
  };

  try {
    const message = alterarNomeRegistro(nome, update);
    return res.json(message);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// TODO: 4) Consultar aniversariantes de uma data (dia e mês).
routes.get('/index/:mes/:dia', (req: Request, res: Response) => {
  const { mes, dia } = req.params;

  res.json({ message: `Indexa aniversariantes do dia ${dia}/${mes}.` });
});

// TODO: 5) Consultar aniversariantes por mês.
routes.get('/index/:mes', (req: Request, res: Response) => {
  const { mes } = req.params;
  res.json({ message: `Indexa aniversariantes do mes ${mes}.` });
});

// TODO: 6) Consultar aniversariantes pela letra inicial do nome.
routes.get('/index/:letra', (req: Request, res: Response) => {
  const { letra } = req.params;

  res.json({ message: `Indexa aniversariantes que começam com ${letra}.` });
});

// TODO: 7) Mostrar toda a agenda ordenada pelo nome.
// TODO: 8) Mostrar toda a agenda ordenada por mês.
routes.get('/', (req: Request, res: Response) => {
  const { ordem } = req.query;
  if (ordem === 'nome') {
    return res.json({
      message: `Indexa todos os aniversariantes ordenados por ${ordem}.`,
    });
  }
  if (ordem === 'mes') {
    return res.json({
      message: `Indexa todos os aniversariantes ordenados por ${ordem}.`,
    });
  }

  return res.json({ message: 'Indexa todos os aniversariantes.' });
});

export default routes;
