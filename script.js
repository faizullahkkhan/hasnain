/* =========================================================
   M. Hasnain — Portfolio
   script.js — theme toggle, navigation, animations, form
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. DARK / LIGHT MODE TOGGLE
     Persists the user's preference in localStorage and falls
     back to the OS-level preference on first visit.
  --------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('portfolio-theme', theme);
  }

  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------------------------------------------------------
     2. MOBILE NAVIGATION (hamburger menu)
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu whenever a nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------------------------------------------------------
     3. NAVBAR BACKGROUND ON SCROLL
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  /* ---------------------------------------------------------
     4. HERO — TYPING EFFECT FOR ROLE LINE
  --------------------------------------------------------- */
  const roles = [
    'Front-End Developer',
    'Graphic Designer',
    'C++ / Java Programmer',
    'Problem Solver'
  ];
  const typedRoleEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedRoleEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1400); // pause before deleting
        return;
      }
    } else {
      charIndex--;
      typedRoleEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = deleting ? 40 : 80;
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ---------------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS
     Adds .is-visible to any .reveal element once it enters
     the viewport, and fills the skill bars the same way.
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // If this is the skills sheet, trigger the bar-fill animation
        if (entry.target.classList.contains('skills-sheet')) {
          entry.target.querySelectorAll('.skill-row').forEach((row, i) => {
            setTimeout(() => row.classList.add('filled'), i * 120);
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     6. ACTIVE NAV LINK ON SCROLL
     Highlights the nav link matching the section in view.
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------------------------------------------------------
     7. BACK TO TOP BUTTON
  --------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     8. CONTACT FORM (front-end only demo handling)
     No back end is wired up here — this simply validates and
     shows a confirmation message. Replace with a real request
     (fetch/EmailJS/Formspree, etc.) to actually send messages.
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    if (!name) return;

    formStatus.textContent = `Thanks, ${name}! Your message has been noted — I'll get back to you soon.`;
    contactForm.reset();

    setTimeout(() => { formStatus.textContent = ''; }, 6000);
  });

  /* ---------------------------------------------------------
     9. FOOTER YEAR
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
// 👇 Yahan apne certificates add karo. Bas naya object add karo, design automatic ban jayega.
  const certificates = [
        {
      title: "AI for Beginners",
      issuer: "HP",
      date: "Jul 2025",
      image: "myphoto2.png",
      link: "myphoto2.png"
    },
    {
      title: "Introduction to Cybersecurity Awareness",
      issuer: "HP",
      date: "jun 2025",
      image: "myphoto3.png",
      link: "myphoto3.png"
    },
    {
      title: "Microsoft Excel",
      issuer: "Coursera",
      date: "Jul 14, 2025",
      image: "Microsoft Excel.jpeg",
      link: "Microsoft Excel.jpeg"
    },
    {
      title: "Microsoft Word",
      issuer: "Coursera",
      date:"Jul 9, 2025",
      image: "Microsoft Word.png",
      link: "Microsoft Word.png",
    }
  ];

  const grid = document.getElementById("certificatesGrid");

  certificates.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card";
    card.innerHTML = `
      <img src="${cert.image}" alt="${cert.title}">
      <div class="cert-info">
        <p class="cert-title">${cert.title}</p>
        <p class="cert-issuer">${cert.issuer}</p>
        <p class="cert-date">${cert.date}</p>
        <a href="${cert.link}" target="_blank" class="cert-link">View Certificate</a>
      </div>
    `;
    grid.appendChild(card);
  });
