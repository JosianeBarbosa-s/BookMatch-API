const express = require('express');
const router = express.Router();
const data = require('../data/db.json');

/* ================= QUIZ ================= */
router.get('/quiz', (req, res) => {
  res.json({
    quiz: [
      {
        id: 1,
        pergunta: "Qual o seu gênero de livro favorito?",
        opcoes: ["Fantasia", "Romance", "Ficção Científica", "Mistério", "Suspense", "Aventura", "Ação", "Adult", "Baseado em fatos reais", "Desenvolvimento pessoal"]
      },
      {
        id: 2,
        pergunta: "Como você prefere o ritmo da história?",
        opcoes: ["Lento", "Equilibrado", "Rápido", "Muito intenso"]
      },
      {
        id: 3,
        pergunta: "Qual tipo de protagonista você prefere?",
        opcoes: ["Herói", "Anti-herói", "Pessoa comum", "Vilão", "Personagem feminino forte", "Personagem complexo"]
      },
      {
        id: 4,
        pergunta: "Você prefere histórias que?",
        opcoes: ["Transformam vidas", "Inspiram", "Assustam", "Emocionam", "Prendem atenção", "Fazem refletir"]
      },
      {
        id: 5,
        pergunta: "Qual emoção você mais gosta de sentir ao ler?",
        opcoes: ["Alegria", "Tensão", "Tristeza", "Esperança", "Medo", "Empolgação", "Motivação"]
      }
    ]
  });
});

/* ================= RECOMENDAÇÃO ================= */
router.post('/recommend', (req, res) => {
  const respostas = req.body;

  const resultados = data.livros.filter(livro => {
    let score = 0;

    if (livro.genero === respostas.genero) score++;
    if (livro.emocao === respostas.emocao) score++;
    if (livro.estilo === respostas.estilo) score++;

    return score >= 1;
  });

  res.json({
    total: resultados.length,
    recomendacoes: resultados.length ? resultados : data.livros.slice(0, 5)
  });
});

/* ================= LISTAR LIVROS ================= */
router.get('/books', (req, res) => {
  res.json({
    total: data.livros.length,
    livros: data.livros
  });
});

module.exports = router;
