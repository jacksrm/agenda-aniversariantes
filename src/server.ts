import app from './app';

app.listen(process.env.PORT ?? 3333, () => console.log('Server running on http://localhost:3333'));
