// ============================================
// ZONA TOTAL JUEGOS - VERSIÓN SIMPLE
// ============================================

let todosLosJuegos = [];

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=1566461740&single=true&output=csv";

const recentGrid = document.getElementById('recentGrid');
const gamesGrid = document.getElementById('gamesGrid');
const gamePlayer = document.getElementById('gamePlayer');
const gameFrame = document.getElementById('gameFrame');
const closePlayer = document.getElementById('closePlayer');

closePlayer.addEventListener('click', () => {
  gamePlayer.style.display = 'none';
  gameFrame.src = '';
});

function abrirJuego(url) {
  gameFrame.src = url;
  gamePlayer.style.display = 'flex';
}

function renderizarJuegos(juegos, contenedor, limite = null) {
  const lista = limite ? juegos.slice(0, limite) : juegos;
  if (!lista.length) {
    contenedor.innerHTML = '<p style="color:white">No hay juegos disponibles</p>';
    return;
  }
  contenedor.innerHTML = lista.map(juego => `
    <div class="game-card" onclick="abrirJuego('${juego.embed}')">
      <img class="game-image" src="${juego.imagen}" alt="${juego.nombre}">
    </div>
  `).join('');
}

function filtrarJuegos(categoria) {
  if (categoria === 'todos') {
    renderizarJuegos(todosLosJuegos, gamesGrid);
    const recientes = [...todosLosJuegos].reverse().slice(0, 5);
    renderizarJuegos(recientes, recentGrid);
  } else {
    const filtrados = todosLosJuegos.filter(juego => 
      juego.categoria && juego.categoria.toLowerCase() === categoria.toLowerCase()
    );
    renderizarJuegos(filtrados, gamesGrid);
    const recientesFiltrados = [...filtrados].reverse().slice(0, 5);
    renderizarJuegos(recientesFiltrados, recentGrid);
  }
}

const catBtns = document.querySelectorAll('.cat-btn');
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const categoria = btn.dataset.cat;
    filtrarJuegos(categoria);
  });
});

const menuToggle = document.getElementById('menuToggle');
const navCategories = document.getElementById('navCategories');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navCategories.classList.toggle('open');
  });
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navCategories.classList.remove('open');
    }
  });
});

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => {
    const lineas = csv.trim().split('\n').slice(1);
    todosLosJuegos = [];
    
    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i].trim();
      if (linea === "") continue;
      
      const partes = linea.split(',');
      if (partes.length < 4) continue;
      
      const nombre = partes[0]?.trim() || "Juego sin nombre";
      const embed = partes[1]?.trim() || "";
      const imagen = partes[2]?.trim() || "";
      const categoria = partes[3]?.trim() || "todos";
      
      if (embed && imagen) {
        todosLosJuegos.push({ nombre, embed, imagen, categoria });
      }
    }

    if (todosLosJuegos.length === 0) {
      console.error("No se encontraron juegos válidos en el CSV");
      return;
    }

    console.log("Juegos cargados:", todosLosJuegos.length);
    
    const recientes = [...todosLosJuegos].reverse().slice(0, 5);
renderizarJuegos(recientes, recentGrid);
// Actualizar contador
const counter = document.getElementById('gameCounter');
if (counter) counter.innerHTML = `🎮 ${todosLosJuegos.length} juegos disponibles`;
renderizarJuegos(todosLosJuegos, gamesGrid);
// Juego sorpresa
actualizarJuegoSorpresa();
  })
  .catch(err => console.error('Error cargando juegos:', err));

// ========== MODAL DE BIENVENIDA ==========
document.addEventListener('DOMContentLoaded', function() {
  const welcomeModal = document.getElementById('welcomeModal');
  const closeWelcomeModal = document.getElementById('closeWelcomeModal');
  const acceptWelcomeBtn = document.getElementById('acceptWelcomeBtn');

  if (!welcomeModal) {
    console.error("No se encontró el modal con id 'welcomeModal'");
    return;
  }

  function cerrarModalBienvenida() {
    welcomeModal.style.display = 'none';
    localStorage.setItem('welcomeModalShown', 'true');
  }

  if (!localStorage.getItem('welcomeModalShown')) {
    console.log("Mostrando modal por primera vez");
    welcomeModal.style.display = 'flex';
  }

  if (closeWelcomeModal) {
    closeWelcomeModal.addEventListener('click', cerrarModalBienvenida);
  }

  if (acceptWelcomeBtn) {
    acceptWelcomeBtn.addEventListener('click', cerrarModalBienvenida);
  }

  window.addEventListener('click', (e) => {
    if (e.target === welcomeModal) {
      cerrarModalBienvenida();
    }
  });
});

// ========== JUEGO SORPRESA: CAJITA -> TARJETA ❓ -> FLIP ==========
let juegoSorpresaActual = null;
let etapa = 0; // 0=cajita, 1=tarjeta❓, 2=flip mostrado

function mostrarCajita() {
  const surpriseGrid = document.getElementById('surpriseGameGrid');
  if (surpriseGrid) {
    surpriseGrid.innerHTML = `
      <div class="gift-box" id="giftBox">
        <span>🎁</span>
      </div>
    `;
    const giftBox = document.getElementById('giftBox');
    if (giftBox) {
      giftBox.addEventListener('click', abrirCajita);
    }
  }
  etapa = 0;
}

function abrirCajita() {
  if (etapa !== 0) return;
  
  const giftBox = document.getElementById('giftBox');
  if (!giftBox) return;
  
  // Agregar clase de animación a la cajita
  giftBox.classList.add('abriendo');
  
  // Esperar a que termine la animación para mostrar la tarjeta
  setTimeout(() => {
    const surpriseGrid = document.getElementById('surpriseGameGrid');
    if (surpriseGrid) {
      surpriseGrid.innerHTML = `
        <div class="question-card saliendo" id="questionCard">
          <span>❓</span>
        </div>
      `;
      const questionCard = document.getElementById('questionCard');
      if (questionCard) {
        questionCard.addEventListener('click', mostrarFlip);
      }
    }
    etapa = 1;
  }, 600); // 600ms = duración de la animación
}


function mostrarFlip() {
  if (etapa !== 1 || !juegoSorpresaActual) return;
  
  const surpriseGrid = document.getElementById('surpriseGameGrid');
  if (surpriseGrid) {
    surpriseGrid.innerHTML = `
      <div class="surprise-card" id="surpriseCard">
        <div class="flip-inner">
          <div class="flip-front">
            <img src="${juegoSorpresaActual.imagen}" alt="${juegoSorpresaActual.nombre}">
          </div>
          <div class="flip-back">
            <h3>🎁 ${juegoSorpresaActual.nombre}</h3>
            <p>¡Haz clic para jugar!</p>
            <button class="play-surprise-btn">🎮 Jugar Ahora</button>
          </div>
        </div>
      </div>
    `;
    
    const card = document.getElementById('surpriseCard');
    if (card) {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('play-surprise-btn')) {
          abrirJuego(juegoSorpresaActual.embed);
          return;
        }
        card.classList.toggle('flipped');
      });
    }
  }
  etapa = 2;
}

function actualizarJuegoSorpresa() {
  if (!todosLosJuegos.length) return;
  
  const indiceAleatorio = Math.floor(Math.random() * todosLosJuegos.length);
  juegoSorpresaActual = todosLosJuegos[indiceAleatorio];
  
  // Reiniciar a la cajita
  mostrarCajita();
}
