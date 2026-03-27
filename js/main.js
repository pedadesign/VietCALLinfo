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
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
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
      el.textContent = Math.floor(current).toLocaleString();
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

  // ─── Simple contact form handler ─────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = '✓ Đã gửi / Sent';
      setTimeout(() => {
        btn.disabled = false;
        btn.setAttribute('data-i18n', 'contact.send_btn');
        // Re-apply current language text
        const lang = localStorage.getItem('vc_lang') || 'vi';
        btn.textContent = lang === 'vi' ? 'Gửi tin nhắn' : 'Send Message';
        contactForm.reset();
      }, 3000);
    });
  }

});
