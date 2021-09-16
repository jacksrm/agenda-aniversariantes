import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import routes from './routes';

import swaggerDoc from './swagger.json';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(routes);

export default app;
