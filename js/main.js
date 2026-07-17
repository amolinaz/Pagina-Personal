// Adriana Molina Zúñiga — interacciones base del sitio
document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // Dropdowns tocables en móvil
  document.querySelectorAll('.has-dropdown > a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Resalta el enlace de navegación activo según la página actual
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  // Animación de aparición al hacer scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Filtro de categorías del blog
  const chips = document.querySelectorAll('.filter-chip');
  const posts = document.querySelectorAll('[data-category]');
  if (chips.length && posts.length) {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.filter;
        posts.forEach((post) => {
          post.style.display = cat === 'todas' || post.dataset.category === cat ? '' : 'none';
        });
      });
    });
  }

  // Envío de formularios (demo local — reemplazar con backend / Formspree / HubSpot)
  document.querySelectorAll('form[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Enviado ✓';
      form.reset();
      setTimeout(() => (btn.textContent = original), 2500);
    });
  });

  // Formulario de contacto real (Vercel Function + Resend)
  const contactForm = document.querySelector('form[data-contact-form]');
  if (contactForm) {
    const statusEl = contactForm.querySelector('.form-status');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.classList.remove('form-status-success', 'form-status-error');
      }

      const data = Object.fromEntries(new FormData(contactForm).entries());

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok && result.ok) {
          contactForm.reset();
          if (statusEl) {
            statusEl.textContent = 'Mensaje enviado. Te responderé pronto.';
            statusEl.classList.add('form-status-success');
          }
        } else {
          if (statusEl) {
            statusEl.textContent = result.error || 'No se pudo enviar el mensaje. Intenta de nuevo.';
            statusEl.classList.add('form-status-error');
          }
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent = 'Error de conexión. Intenta de nuevo en unos minutos.';
          statusEl.classList.add('form-status-error');
        }
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }
});
