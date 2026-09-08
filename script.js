/* ============================================================
   FOTOS Y LOGO — PENDIENTES (placeholder temporal)
   ============================================================
   El usuario aún no ha dejado fotos reales en fotos/. Mientras tanto
   se usan fotos de stock de Unsplash (nunca fotos reales de otra
   cafetería del portafolio). Reemplazar por las reales apenas lleguen. */
const LOGO_SRC = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&q=80';
const HERO_SRC = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80';
const GAL_UNO_SRC = 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80';
const GAL_DOS_SRC = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80';
const GAL_TRES_SRC = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80';

document.getElementById('logoNav').src = LOGO_SRC;
document.getElementById('logoFooter').src = LOGO_SRC;
document.getElementById('heroPhoto').src = HERO_SRC;
document.getElementById('galUno').src = GAL_UNO_SRC;
document.getElementById('galDos').src = GAL_DOS_SRC;
document.getElementById('galTres').src = GAL_TRES_SRC;

/* ============================================================
   CARTA — productos reales (mencionados directamente en Google Maps
   y en reseñas de clientes). Precios "Consultar": la foto de la
   pizarra (sept-2025) no se pudo leer con certeza.
   ============================================================ */
const MENU = {
  'Café': [
    { n: 'Café Machiato con Muffins de Arándanos', d: 'Destacado real de la ficha de Google Maps.' },
    { n: 'Un Latte Con Amor', d: 'Destacado real de la ficha de Google Maps.' },
    { n: 'Chocolate espeso', d: 'Mencionado por su nombre real en una reseña.' },
  ],
  'Para acompañar': [
    { n: 'Medialunas', d: 'Mencionadas por su nombre real en una reseña.' },
    { n: 'Pastelería variada', d: 'Tortas y pasteles — consultar disponibilidad del día.' },
  ],
};

const menuTabsEl = document.getElementById('menuTabs');
const menuPanelsEl = document.getElementById('menuPanels');
const categorias = Object.keys(MENU);

categorias.forEach((cat, i) => {
  const tabBtn = document.createElement('button');
  tabBtn.className = 'menu-tab-btn' + (i === 0 ? ' active' : '');
  tabBtn.textContent = cat;
  tabBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tabBtn.classList.add('active');
    document.getElementById('panel-' + i).classList.add('active');
  });
  menuTabsEl.appendChild(tabBtn);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + i;
  const grid = document.createElement('div');
  grid.className = 'menu-grid';
  MENU[cat].forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item';
    row.innerHTML = `
      <div class="menu-item-text">
        <p class="menu-item-name">${item.n}</p>
        ${item.d ? `<p class="menu-item-desc">${item.d}</p>` : ''}
      </div>
      <span class="menu-item-price">Consultar</span>
    `;
    grid.appendChild(row);
  });
  panel.appendChild(grid);
  menuPanelsEl.appendChild(panel);
});

/* ============================================================
   HORARIO EN VIVO — real, verificado en Google Maps
   Todos los días 9:30-20:30.
   ============================================================ */
(function () {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const openMin = 9 * 60 + 30;
  const closeMin = 20 * 60 + 30;
  const isOpen = minutes >= openMin && minutes < closeMin;

  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const visitStatus = document.getElementById('visit-status');

  if (isOpen) {
    statusDot.classList.remove('closed');
    statusText.textContent = 'Abierto ahora · cierra 20:30';
    visitStatus.textContent = 'Abierto ahora — cierra a las 20:30';
  } else {
    statusDot.classList.add('closed');
    statusText.textContent = 'Cerrado ahora · abre 9:30';
    visitStatus.textContent = 'Cerrado ahora — abre a las 9:30';
  }
})();

/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
function goToTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  const panel = document.querySelector(`[data-tab-panel="${tabName}"]`);
  const link = document.querySelector(`.nav-link[data-tab="${tabName}"]`);
  if (panel) panel.classList.add('active');
  if (link) link.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  runReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goToTab(el.getAttribute('data-tab'));
    navLinks.classList.remove('open');
  });
});

/* ---------- Menú hamburguesa ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ---------- Scroll reveal (con red de seguridad por si IntersectionObserver no dispara) ---------- */
function runReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in');
    });
  }, 1200);
}
runReveal();

/* ---------- Loader breve ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 350);
});
