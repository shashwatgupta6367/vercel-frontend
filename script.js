document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.navbar');

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  const sectionIds = [
    'home', 'about', 'skills', 'projects',
    'experience', 'education', 'certifications', 'contact'
  ];

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightActiveNav = () => {
    const navHeight = navbar?.offsetHeight ?? 80;
    const scrollPos = window.scrollY + navHeight + 60;

    let currentSectionId = '';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  const openMobileMenu = () => {
    hamburger?.classList.add('active');
    mobileMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('active');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', (e) => {
    if (
      mobileMenu?.classList.contains('active') &&
      !mobileMenu.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  const NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const targetPosition = targetEl.offsetTop - NAVBAR_OFFSET;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  const fadeInElements = document.querySelectorAll('.fade-in');

  if (fadeInElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    fadeInElements.forEach((el) => fadeObserver.observe(el));
  }

  const contactForm = document.getElementById('contact-form');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent ?? 'Send';

    if (submitBtn) {
      submitBtn.textContent = 'Thank you for your message! I will get back to you soon.';
      submitBtn.disabled = true;
      submitBtn.style.pointerEvents = 'none';
    }

    contactForm.reset();

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.pointerEvents = '';
      }
    }, 3000);
  });

  const professionText = document.querySelector('.profession-text');

  if (professionText) {
    const fullText = professionText.textContent.trim();
    professionText.textContent = '';

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.textContent = '|';
    professionText.parentNode?.insertBefore(cursor, professionText.nextSibling);

    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < fullText.length) {
        professionText.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 80);
      } else {
        setTimeout(() => {
          cursor.style.transition = 'opacity 0.6s ease';
          cursor.style.opacity = '0';
          setTimeout(() => cursor.remove(), 600);
        }, 3000);
      }
    };

    setTimeout(typeChar, 500);
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length > 0) {
    const COUNTER_DURATION = 2000;

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      const hasPlusSuffix = el.textContent.trim().includes('+');
      const suffix = hasPlusSuffix ? '+' : '';

      el.textContent = `0${suffix}`;

      const start = performance.now();

      const step = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / COUNTER_DURATION, 1);

        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.floor(easedProgress * target);

        el.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  const backToTopBtn = document.querySelector('.back-to-top');

  const handleBackToTopVisibility = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  handleNavbarScroll();
  highlightActiveNav();
  handleBackToTopVisibility();
});
