/**
 * VietCALL – Main JS
 * Handles: navbar scroll, hamburger menu, animate-in on scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar ──────────────────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // ─── Scroll Animations ───────────────────────────────────────────────────
  const animateEls = document.querySelectorAll('.animate-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    animateEls.forEach(el => observer.observe(el));
  } else {
    animateEls.forEach(el => el.classList.add('visible'));
  }

  // ─── Active nav link ─────────────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('navbar__link--active');
    }
  });

  // ─── Smooth counter animation ────────────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
    }, step);
  }

  const statEls = document.querySelectorAll('[data-target]');
  if (statEls.length) {
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => statObserver.observe(el));
  }

  // ─── Contact form → Formspree ─────────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const lang = localStorage.getItem('vc_lang') || 'vi';

      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) { field.classList.add('is-invalid'); valid = false; }
        else field.classList.remove('is-invalid');
      });
      if (!valid) return;

      btn.disabled = true;
      btn.textContent = lang === 'vi' ? 'Đang gửi…' : 'Sending…';

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.style.display = 'none';
          const success = document.getElementById('contactSuccess');
          if (success) {
            success.style.display = 'block';
            success.querySelectorAll('.lang-block').forEach(el => {
              el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
            });
          }
        } else {
          btn.disabled = false;
          btn.textContent = lang === 'vi' ? 'Gửi lại' : 'Try again';
          alert(lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.');
        }
      } catch {
        btn.disabled = false;
        btn.textContent = lang === 'vi' ? 'Gửi lại' : 'Try again';
        alert(lang === 'vi' ? 'Không thể kết nối. Kiểm tra mạng và thử lại.' : 'Could not connect. Check your network and try again.');
      }
    });
  }

  // ─── Membership form → Formspree ─────────────────────────────────────────
  const membershipForm = document.getElementById('membershipForm');
  if (membershipForm) {
    membershipForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = membershipForm.querySelector('button[type="submit"]');
      const lang = localStorage.getItem('vc_lang') || 'vi';

      // Basic validation
      const required = membershipForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) { field.classList.add('is-invalid'); valid = false; }
        else field.classList.remove('is-invalid');
      });
      if (!valid) return;

      btn.disabled = true;
      btn.textContent = lang === 'vi' ? 'Đang gửi…' : 'Sending…';

      try {
        const res = await fetch(membershipForm.action, {
          method: 'POST',
          body: new FormData(membershipForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          membershipForm.style.display = 'none';
          const success = document.getElementById('membershipSuccess');
          if (success) {
            success.style.display = 'block';
            // Apply current language to success message
            success.querySelectorAll('.lang-block').forEach(el => {
              el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
            });
          }
        } else {
          btn.disabled = false;
          btn.textContent = lang === 'vi' ? 'Gửi lại' : 'Try again';
          alert(lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.');
        }
      } catch {
        btn.disabled = false;
        btn.textContent = lang === 'vi' ? 'Gửi lại' : 'Try again';
        alert(lang === 'vi' ? 'Không thể kết nối. Kiểm tra mạng và thử lại.' : 'Could not connect. Check your network and try again.');
      }
    });
  }

});
