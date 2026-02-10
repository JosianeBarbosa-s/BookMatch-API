const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'BookMatch API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      quiz: '/api/quiz',
      recommend: '/api/recommend',
      books: '/api/books'
    }
  });
});

app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`📚 BookMatch API rodando em http://localhost:${PORT}`);
});
