// ===============================
// ESTADO GLOBAL
// ===============================
let selectedGame = null;


// ===============================
// FILTRO POR EDAD (HOME)
// ===============================
const ageButtons = document.querySelectorAll('.age-btn');
const gameCards = document.querySelectorAll('.game-card');

ageButtons.forEach(button => {
  button.addEventListener('click', () => {
    ageButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedCategory = button.textContent.trim();

    gameCards.forEach(card => {
      const badge = card.querySelector('.badge');
      if (!badge) return;

      const gameCategory = badge.textContent.trim();
      card.style.display = gameCategory === selectedCategory ? '' : 'none';
    });
  });
});


// ===============================
// NAVEGACIÓN A JUEGOS
// ===============================
const playButtons = document.querySelectorAll('.btn-secondary');

playButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    selectedGame = button.dataset.game;
    window.location.href = `juegos/${selectedGame}.html`;
  });
});


// ===============================
// MAPA DE JUEGOS
// ===============================
const gamesMap = {

  // ===============================
  // TRIVIA RÁPIDA (COMPLETA)
  // ===============================
  'trivia-rapida': {
    init: function () {
      const container = document.querySelector('.game-wrapper');
      if (!container) return;

      const questions = [
        {
          text: '¿Cuál es la capital de Francia?',
          explanation: 'París es la capital de Francia porque desde hace siglos concentra el poder político, administrativo y cultural del país.',
          answers: [
            { text: 'Madrid', correct: false },
            { text: 'París', correct: true },
            { text: 'Roma', correct: false },
            { text: 'Berlín', correct: false }
          ]
        },
        {
          text: '¿Cuántos continentes hay en el mundo?',
          explanation: 'Existen siete continentes porque la Tierra se divide en grandes masas de tierra diferenciadas por criterios geográficos y culturales.',
          answers: [
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '8', correct: false }
          ]
        },
        {
          text: '¿Qué animal es conocido como el rey de la selva?',
          explanation: 'El león es llamado así porque ocupa la cima de la cadena alimenticia y lidera su grupo con autoridad.',
          answers: [
            { text: 'Tigre', correct: false },
            { text: 'Elefante', correct: false },
            { text: 'León', correct: true },
            { text: 'Jaguar', correct: false }
          ]
        },
        {
          text: '¿Cuántos días tiene un año normal?',
          explanation: 'Un año normal tiene 365 días porque ese es el tiempo que tarda la Tierra en completar una órbita alrededor del Sol.',
          answers: [
            { text: '360', correct: false },
            { text: '364', correct: false },
            { text: '365', correct: true },
            { text: '366', correct: false }
          ]
        },
        {
          text: '¿Qué color resulta de mezclar azul y amarillo?',
          explanation: 'Al mezclar azul y amarillo se obtiene verde porque son colores primarios que al combinarse forman un color secundario.',
          answers: [
            { text: 'Rojo', correct: false },
            { text: 'Verde', correct: true },
            { text: 'Morado', correct: false },
            { text: 'Naranja', correct: false }
          ]
        },
        {
          text: '¿Qué instrumento tiene seis cuerdas?',
          explanation: 'La guitarra tiene seis cuerdas porque su diseño tradicional permite tocar acordes completos.',
          answers: [
            { text: 'Piano', correct: false },
            { text: 'Violín', correct: false },
            { text: 'Guitarra', correct: true },
            { text: 'Batería', correct: false }
          ]
        },
        {
          text: '¿Cuál es el océano más grande del planeta?',
          explanation: 'El océano Pacífico es el más grande porque cubre más de un tercio de la superficie terrestre.',
          answers: [
            { text: 'Atlántico', correct: false },
            { text: 'Índico', correct: false },
            { text: 'Ártico', correct: false },
            { text: 'Pacífico', correct: true }
          ]
        },
        {
          text: '¿Qué deporte se juega con un balón y una canasta?',
          explanation: 'El baloncesto se juega encestando un balón en una canasta elevada para sumar puntos.',
          answers: [
            { text: 'Fútbol', correct: false },
            { text: 'Baloncesto', correct: true },
            { text: 'Tenis', correct: false },
            { text: 'Voleibol', correct: false }
          ]
        },
        {
          text: '¿Qué gas respiramos para vivir?',
          explanation: 'El oxígeno es esencial para la respiración celular y la producción de energía en el cuerpo humano.',
          answers: [
            { text: 'Hidrógeno', correct: false },
            { text: 'Oxígeno', correct: true },
            { text: 'Nitrógeno', correct: false },
            { text: 'Dióxido de carbono', correct: false }
          ]
        },
        {
          text: '¿Cuál es el símbolo químico del agua?',
          explanation: 'El agua se representa como H₂O porque está formada por dos átomos de hidrógeno y uno de oxígeno.',
          answers: [
            { text: 'CO₂', correct: false },
            { text: 'H₂O', correct: true },
            { text: 'O₂', correct: false },
            { text: 'NaCl', correct: false }
          ]
        }
      ];

      let currentQuestionIndex = 0;
      let score = 0;

      function renderQuestion() {
        const question = questions[currentQuestionIndex];

        container.innerHTML = `
          <h1>Trivia Rápida</h1>

          <div class="trivia-game">
            <div class="trivia-progress">
              Pregunta ${currentQuestionIndex + 1} / ${questions.length} · Puntos: ${score}
            </div>

            <div class="trivia-question">
              <p>${question.text}</p>
            </div>

            <div class="trivia-answers">
              ${question.answers.map(a => `
                <button data-correct="${a.correct}">${a.text}</button>
              `).join('')}
            </div>
          </div>
        `;

        const answerButtons = container.querySelectorAll('.trivia-answers button');

        answerButtons.forEach(button => {
          button.addEventListener('click', () => {
            const isCorrect = button.dataset.correct === 'true';
            if (isCorrect) score++;

            answerButtons.forEach(btn => {
              btn.disabled = true;
              if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
              }
            });

            const explanation = document.createElement('p');
            explanation.className = 'trivia-explanation';
            explanation.textContent = question.explanation;

            const game = container.querySelector('.trivia-game');
            game.appendChild(explanation);

            const nextBtn = document.createElement('button');
            nextBtn.className = 'trivia-next';
            nextBtn.textContent = 'Siguiente';

            nextBtn.addEventListener('click', () => {
              currentQuestionIndex++;
              if (currentQuestionIndex < questions.length) {
                renderQuestion();
              } else {
                showEnd();
              }
            });

            game.appendChild(nextBtn);
          });
        });
      }

      function showEnd() {
        container.innerHTML = `
          <h1>Trivia Rápida</h1>
          <p>🎉 Juego terminado 🎉</p>
          <p>Tu puntuación: ${score} / ${questions.length}</p>
          <button class="trivia-restart">Volver a jugar</button>
        `;

        container.querySelector('.trivia-restart').addEventListener('click', () => {
          currentQuestionIndex = 0;
          score = 0;
          renderQuestion();
        });
      }

      renderQuestion();
    }
  },

  'carreras-arcade': { init: function () {} },

  'memoria-visual': { 
    init: function () {
      const container = document.querySelector('.game-wrapper');
      if (!container) return;

      const pool = ['🐶','🍕','🥤','🚗','⭐','🎈','🍎','🧸','🎮','🚀','🐱','🍩','📦','🎧','🌈'];

      let round = 0;
      let cards = [];
      let sequence = [];
      let userIndex = 0;
      let state = 'idle';

      function renderStart() {
        container.innerHTML = `
          <h1>Memoria Visual</h1>
          <p>Prepárate</p>
          <button class="memory-start">Empezar</button>
        `;
        container.querySelector('.memory-start').onclick = startGame;
      }

      function startGame() {
        round = 0;
        cards = [];
        sequence = [];
        nextRound(true);
      }

      function generateRandomSequence(length) {
        const indices = Array.from({ length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices;
      }

      function nextRound(isFirst = false) {
        round++;
        userIndex = 0;

        if (isFirst) {
          cards = pool.slice(0, 3);
        } else {
          cards.push(pool[cards.length % pool.length]);
        }

        sequence = generateRandomSequence(cards.length);
        state = 'showing';
        renderBoard(`Observa la secuencia — Ronda ${round}`);
        showSequence();
      }

      function renderBoard(text) {
        container.innerHTML = `
          <h1>Memoria Visual</h1>
          <p>${text}</p>
          <div class="memory-board">
            ${cards.map((c, i) => `
              <button class="memory-card" data-i="${i}">
                ${c}
              </button>
            `).join('')}
          </div>
        `;

        container.querySelectorAll('.memory-card').forEach(btn => {
          btn.onclick = () => {
            if (state !== 'playing') return;
            handleClick(Number(btn.dataset.i), btn);
          };
        });
      }

      function showSequence() {
        const buttons = container.querySelectorAll('.memory-card');
        let i = 0;

        const interval = setInterval(() => {
          const idx = sequence[i];
          const btn = buttons[idx];

          btn.classList.add('active');
          setTimeout(() => btn.classList.remove('active'), 400);

          i++;
          if (i >= sequence.length) {
            clearInterval(interval);
            state = 'playing';
            updateText(`Tu turno — Ronda ${round}`);
          }
        }, 700);
      }

      function handleClick(index, btn) {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 200);

        if (index !== sequence[userIndex]) {
          endGame();
          return;
        }

        userIndex++;
        if (userIndex === sequence.length) {
          state = 'showing';
          setTimeout(() => nextRound(false), 800);
        }
      }

      function updateText(text) {
        const p = container.querySelector('p');
        if (p) p.textContent = text;
      }

      function endGame() {
        state = 'end';
        container.innerHTML = `
          <h1>Memoria Visual</h1>
          <p>Juego terminado</p>
          <p>Llegaste hasta la ronda ${round}</p>
          <button class="memory-restart">Volver a jugar</button>
        `;
        container.querySelector('.memory-restart').onclick = renderStart;
      }

      renderStart();
    }
  },

  'cartas-clasicas': {
    init: function () {
      const container = document.querySelector('.game-wrapper');
      if (!container) return;

      let cards = [];
      let flippedCards = [];
      let matchedCount = 0;
      let lockBoard = false;

      let levelIndex = 0;
      const levels = [6, 8, 10];

      function renderStart() {
        container.innerHTML = `
          <h1>Cartas Clásicas</h1>
          <p>Encuentra todas las parejas volteando las cartas.</p>
          <button class="cards-start">Empezar</button>
        `;
        container.querySelector('.cards-start').onclick = startGame;
      }

      function startGame() {
        matchedCount = 0;
        flippedCards = [];
        lockBoard = false;
        cards = generateCards();
        renderBoard();
      }

      function generateCards() {
        const allValues = ['🍎','🍌','🍇','🍓','🍍','🍒','🥝','🍉','🍑','🍋'];
        const pairsCount = levels[levelIndex];

        const selected = allValues.slice(0, pairsCount);
        const pairValues = [...selected, ...selected];

        return shuffle(
          pairValues.map((value, index) => ({
            id: index,
            value,
            flipped: false,
            matched: false
          }))
        );
      }

      function renderBoard() {
        container.innerHTML = `
          <h1>Cartas Clásicas</h1>
          <div class="memory-grid">
            ${cards.map(card => `
              <div class="memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}"
                   data-id="${card.id}">
                <div class="card-inner">
                  <div class="card-front">?</div>
                  <div class="card-back">${card.value}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        container.querySelectorAll('.memory-card').forEach(cardEl => {
          cardEl.onclick = () => handleFlip(cardEl);
        });
      }

      function handleFlip(cardEl) {
        if (lockBoard) return;

        const id = Number(cardEl.dataset.id);
        const card = cards.find(c => c.id === id);

        if (card.flipped || card.matched) return;

        card.flipped = true;
        flippedCards.push(card);
        renderBoard();

        if (flippedCards.length === 2) {
          checkMatch();
        }
      }

      function checkMatch() {
        lockBoard = true;
        const [a, b] = flippedCards;

        if (a.value === b.value) {
          a.matched = true;
          b.matched = true;
          matchedCount += 2;

          setTimeout(() => {
            flippedCards = [];
            lockBoard = false;
            renderBoard();
            checkEnd();
          }, 900);
        } else {
          setTimeout(() => {
            a.flipped = false;
            b.flipped = false;
            flippedCards = [];
            lockBoard = false;
            renderBoard();
          }, 700);
        }
      }

      function checkEnd() {
        if (matchedCount === cards.length) {
          levelIndex = (levelIndex + 1) % levels.length;
          startGame();
        }
      }

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      renderStart();
    }
  },

  'combate-ligero': { init: function () {} },
  'juego-reflejos': { init: function () {} }
};


// ===============================
// CONTEXTO DE PÁGINA DE JUEGO
// ===============================
const currentPath = window.location.pathname;

if (currentPath.includes('/juegos/')) {
  const fileName = currentPath.split('/').pop();
  const currentGame = fileName.replace('.html', '');

  if (gamesMap[currentGame] && typeof gamesMap[currentGame].init === 'function') {
    gamesMap[currentGame].init();
  }
}


// ===============================
// VENTANA JUEGOS EXTERNOS (FINAL)
// ===============================
document.addEventListener(
  'click',
  function (e) {
    const btn = e.target.closest('.btn-secondary[data-game]');
    if (!btn) return;

    const game = btn.dataset.game;

    // Juegos creados (NO se tocan)
    if (
      game === 'trivia-rapida' ||
      game === 'memoria-visual' ||
      game === 'cartas-clasicas'
    ) {
      return;
    }

    // 🔥 Evitar navegación (pestañazo)
    e.preventDefault();
    e.stopImmediatePropagation();

    const overlay = document.getElementById('games-modal-overlay');
    if (!overlay) return;

    overlay.removeAttribute('hidden');
  },
  true // 👈 capturing: corre antes que el JS de navegación
);

// Cerrar ventana
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('close-games-modal');
  const overlay = document.getElementById('games-modal-overlay');

  if (!closeBtn || !overlay) return;

  closeBtn.addEventListener('click', () => {
    overlay.setAttribute('hidden', '');
  });
});


document.addEventListener("DOMContentLoaded", () => {

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=1566461740&single=true&output=csv";

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(csv => {

      // separa filas correctamente
      const lines = csv.trim().split("\n");
      const juegos = [];

      // empezamos desde la fila 1 (saltamos encabezados)
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        // CSV real: nombre,embed,imagen
        const firstComma = line.indexOf(",");
        const lastComma = line.lastIndexOf(",");

        const nombre = line.slice(0, firstComma).trim();
        const embed = line.slice(firstComma + 1, lastComma).trim();
        const imagen = line.slice(lastComma + 1).trim();

        juegos.push({ nombre, embed, imagen });
      }

      // ESTE LOG SE QUEDA (es útil siempre)
      console.log("Juegos cargados desde Google Sheets:", juegos);

      // guardamos para fases siguientes
      window.ZONA_TOTAL_JUEGOS = juegos;
    })
    .catch(err => {
      console.error("Error cargando juegos desde Sheets:", err);
    });

});
