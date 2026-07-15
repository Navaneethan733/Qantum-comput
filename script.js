// ============================================
// STACKLY v2 — interactions & animations
// ============================================

/* ========== PREMIUM QUANTUM PRELOADER ========== */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  document.body.classList.add('preloader-active');

  /* ── 1. DEEP-SPACE PARTICLE FIELD ── */
  const pCanvas = document.getElementById('plCanvas');
  const pCtx = pCanvas.getContext('2d');
  let PW, PH;
  const stars = [];
  function resizeP() {
    PW = pCanvas.width = window.innerWidth;
    PH = pCanvas.height = window.innerHeight;
  }
  resizeP();
  window.addEventListener('resize', resizeP);
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      drift: (Math.random() - 0.5) * 0.00015,
    });
  }
  function drawStars() {
    pCtx.clearRect(0, 0, PW, PH);
    stars.forEach(s => {
      s.x += s.drift; if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
      pCtx.beginPath();
      pCtx.arc(s.x * PW, s.y * PH, s.r, 0, Math.PI * 2);
      /* dark particles matching --ink */
      pCtx.fillStyle = `rgba(18,18,18,${s.a * 0.4})`;
      pCtx.fill();
    });
    // Entanglement lines between nearby stars
    for (let i = 0; i < stars.length; i += 2) {
      for (let j = i + 1; j < stars.length; j += 2) {
        const dx = (stars[i].x - stars[j].x) * PW;
        const dy = (stars[i].y - stars[j].y) * PH;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          pCtx.beginPath();
          pCtx.strokeStyle = `rgba(18,18,18,${0.12 * (1 - d / 90)})`;
          pCtx.lineWidth = 0.5;
          pCtx.moveTo(stars[i].x * PW, stars[i].y * PH);
          pCtx.lineTo(stars[j].x * PW, stars[j].y * PH);
          pCtx.stroke();
        }
      }
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();

  /* ── 2. BINARY RAIN ── */
  const rCanvas = document.getElementById('plRain');
  const rCtx = rCanvas.getContext('2d');
  let RW, RH;
  function resizeR() {
    RW = rCanvas.width = window.innerWidth;
    RH = rCanvas.height = window.innerHeight;
  }
  resizeR();
  const cols = Math.floor(window.innerWidth / 20);
  const drops = Array.from({ length: cols }, () => Math.random() * -50);
  const chars = '01ψΦαβΩ∇⟨⟩|+−√∞';
  function drawRain() {
    rCtx.fillStyle = 'rgba(247,245,241,0.1)';
    rCtx.fillRect(0, 0, RW, RH);
    rCtx.font = '12px JetBrains Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const brightness = Math.random();
      rCtx.fillStyle = brightness > 0.97
        ? `rgba(18,18,18,0.85)`
        : `rgba(18,18,18,${0.15 + brightness * 0.25})`;
      rCtx.fillText(ch, i * 20, y * 20);
      drops[i] = y > RH / 20 + Math.random() * 20 ? 0 : y + 1;
    });
    requestAnimationFrame(drawRain);
  }
  drawRain();

  /* ── 3. BLOCH SPHERE ── */
  const sCanvas = document.getElementById('plSphere');
  const sCtx = sCanvas.getContext('2d');
  const CX = 160, CY = 160, R = 120;
  let angle = 0, stateAngle = 0;

  function project3D(x, y, z) {
    // simple isometric-ish projection
    const rx = x * Math.cos(angle) - z * Math.sin(angle);
    const rz = x * Math.sin(angle) + z * Math.cos(angle);
    return { sx: CX + rx * R, sy: CY - y * R + rz * 0.3 * R };
  }

  function drawSphere() {
    sCtx.clearRect(0, 0, 320, 320);

    // Sphere body glow — warm dark core
    const grad = sCtx.createRadialGradient(CX, CY, 10, CX, CY, R);
    grad.addColorStop(0, 'rgba(18,18,18,0.06)');
    grad.addColorStop(0.6, 'rgba(18,18,18,0.02)');
    grad.addColorStop(1, 'rgba(18,18,18,0)');
    sCtx.beginPath();
    sCtx.arc(CX, CY, R, 0, Math.PI * 2);
    sCtx.fillStyle = grad;
    sCtx.fill();

    // Sphere outline
    sCtx.beginPath();
    sCtx.arc(CX, CY, R, 0, Math.PI * 2);
    sCtx.strokeStyle = 'rgba(18,18,18,0.2)';
    sCtx.lineWidth = 1;
    sCtx.stroke();

    // Equatorial ellipse
    sCtx.beginPath();
    sCtx.ellipse(CX, CY, R, R * 0.28, 0, 0, Math.PI * 2);
    sCtx.strokeStyle = 'rgba(18,18,18,0.12)';
    sCtx.lineWidth = 1;
    sCtx.stroke();

    // Meridian lines
    for (let a = 0; a < Math.PI; a += Math.PI / 4) {
      sCtx.beginPath();
      sCtx.ellipse(CX, CY, R * Math.abs(Math.cos(a + angle)), R, 0, 0, Math.PI * 2);
      sCtx.strokeStyle = 'rgba(18,18,18,0.05)';
      sCtx.lineWidth = 0.7;
      sCtx.stroke();
    }

    // Axes
    const axes = [
      { end: [0, -1, 0], label: '|0⟩', col: 'rgba(18,18,18,0.6)' },
      { end: [0, 1, 0], label: '|1⟩', col: 'rgba(18,18,18,0.3)' },
      { end: [1, 0, 0], label: '|+⟩', col: 'rgba(18,18,18,0.25)' },
      { end: [-1, 0, 0], label: '|−⟩', col: 'rgba(18,18,18,0.25)' },
    ];
    axes.forEach(ax => {
      const p0 = project3D(0, 0, 0);
      const p1 = project3D(...ax.end);
      sCtx.beginPath();
      sCtx.moveTo(p0.sx, p0.sy);
      sCtx.lineTo(p1.sx, p1.sy);
      sCtx.strokeStyle = ax.col;
      sCtx.lineWidth = 1;
      sCtx.stroke();
      sCtx.font = '10px JetBrains Mono, monospace';
      sCtx.fillStyle = ax.col;
      sCtx.fillText(ax.label, p1.sx + 4, p1.sy + 4);
    });

    // State vector |ψ⟩ — tip traces a spiral
    stateAngle += 0.025;
    const theta = Math.PI / 3 + Math.sin(stateAngle * 0.4) * 0.5;
    const phi = stateAngle;
    const vx = Math.sin(theta) * Math.cos(phi);
    const vy = -Math.cos(theta);
    const vz = Math.sin(theta) * Math.sin(phi);
    const tip = project3D(vx, vy, vz);
    const origin = project3D(0, 0, 0);

    // Draw state trail
    sCtx.beginPath();
    sCtx.moveTo(origin.sx, origin.sy);
    sCtx.lineTo(tip.sx, tip.sy);
    /* dark trail matching --ink */
    sCtx.strokeStyle = 'rgba(18,18,18,0.7)';
    sCtx.lineWidth = 1.5;
    sCtx.stroke();

    // Glowing tip
    const tipGlow = sCtx.createRadialGradient(tip.sx, tip.sy, 0, tip.sx, tip.sy, 10);
    tipGlow.addColorStop(0, 'rgba(18,18,18,0.9)');
    tipGlow.addColorStop(0.4, 'rgba(18,18,18,0.4)');
    tipGlow.addColorStop(1, 'rgba(18,18,18,0)');
    sCtx.beginPath();
    sCtx.arc(tip.sx, tip.sy, 10, 0, Math.PI * 2);
    sCtx.fillStyle = tipGlow;
    sCtx.fill();
    sCtx.beginPath();
    sCtx.arc(tip.sx, tip.sy, 3, 0, Math.PI * 2);
    sCtx.fillStyle = 'rgba(18,18,18,0.95)';
    sCtx.fill();

    angle += 0.006;
    requestAnimationFrame(drawSphere);
  }
  drawSphere();

  /* ── 4. HUD COUNTERS ── */
  const elQubits   = document.getElementById('plQubits');
  const elFidelity = document.getElementById('plFidelity');
  const elSysVal   = document.getElementById('plSysVal');
  const elTemp     = document.getElementById('plTemp');

  const sysStates = ['BOOT', 'INIT', 'CALIB', 'ENTGL', 'READY'];
  let sysIdx = 0;
  const hudInterval = setInterval(() => {
    const q = Math.min(128, Math.floor(Math.random() * 15) + (sysIdx * 26));
    elQubits.textContent = String(q).padStart(3, '0') + '/128';
    elFidelity.textContent = (97.2 + Math.random() * 2.6).toFixed(1) + '%';
    elTemp.textContent = (15 + Math.random() * 2).toFixed(1) + 'mK';
    sysIdx = Math.min(sysIdx + 1, sysStates.length - 1);
    elSysVal.textContent = sysStates[sysIdx] || 'READY';
  }, 400);

  /* ── 5. TYPEWRITER STATUS ── */
  const statusEl = document.getElementById('plStatus');
  const sequences = [
    'BOOT SEQUENCE INITIATED',
    'LOADING CRYOGENIC CONTROL...',
    'CALIBRATING MICROWAVE DRIVES',
    'ENTANGLING QUBIT REGISTERS',
    'APPLYING HADAMARD TRANSFORMS',
    'MEASURING QUANTUM FIDELITY...',
    'SYSTEM CALIBRATION COMPLETE',
    'QUANTUM CORE ONLINE',
  ];
  let seqIdx = 0, charIdx = 0;
  function typeNext() {
    if (!statusEl) return;
    const target = sequences[seqIdx % sequences.length];
    if (charIdx < target.length) {
      statusEl.textContent = target.slice(0, ++charIdx);
      setTimeout(typeNext, 28 + Math.random() * 18);
    } else {
      setTimeout(() => {
        seqIdx++; charIdx = 0; typeNext();
      }, 600);
    }
  }
  typeNext();

  /* ── 6. PROGRESS BAR ── */
  const fill = document.getElementById('plFill');
  const glow = document.getElementById('plGlow');
  const pct  = document.getElementById('plPct');
  const braket = document.getElementById('plBraket');
  const brakets = ['|Ψ⟩ = α|0⟩ + β|1⟩', '|Φ+⟩ = (|00⟩+|11⟩)/√2', 'H|0⟩ = |+⟩', 'CNOT|ψ⟩', '|Ω⟩ = ∑ cₖ|k⟩'];
  let progress = 0, bkIdx = 0;

  const progressInterval = setInterval(() => {
    const jump = Math.random() * 12 + 3;
    progress = Math.min(100, progress + jump);
    const w = progress.toFixed(1);
    fill.style.width = w + '%';
    glow.style.left  = Math.max(0, parseFloat(w) - 4) + '%';
    glow.style.width = '8%';
    pct.textContent  = Math.round(progress) + '%';
    bkIdx = (bkIdx + 1) % brakets.length;
    if (braket) braket.textContent = brakets[bkIdx];

    if (progress >= 100) {
      clearInterval(progressInterval);
      clearInterval(hudInterval);
      fill.style.background = 'var(--ink)';
      glow.style.width = '0';
      if (statusEl) statusEl.textContent = 'QUANTUM SYSTEM ONLINE';
      elSysVal.textContent = 'ONLINE';
      elQubits.textContent = '128/128';
      elFidelity.textContent = '99.8%';
      setTimeout(dismiss, 700);
    }
  }, 140);

  function dismiss() {
    preloader.classList.add('hidden');
    document.body.classList.remove('preloader-active');
    setTimeout(() => preloader.remove(), 1100);
  }

  // Absolute fallback
  setTimeout(dismiss, 6000);
})();


document.addEventListener('DOMContentLoaded', () => {


  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Hero image slideshow ---------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroSlideDots = document.querySelectorAll('.hero-slide-dot');
  let currentHeroSlide = 0;

  if (heroSlides.length > 0 && heroSlideDots.length > 0) {
    function goToHeroSlide(index) {
      heroSlides[currentHeroSlide].classList.remove('active');
      heroSlideDots[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
      heroSlideDots[currentHeroSlide].classList.add('active');
    }

    heroSlideDots.forEach(dot => {
      dot.addEventListener('click', () => goToHeroSlide(parseInt(dot.dataset.index, 10)));
    });

    setInterval(() => goToHeroSlide(currentHeroSlide + 1), 5000);
  }

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

  function toggleMenu(){
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    mobileMenuBackdrop.classList.toggle('open');
  }
  function closeMenu(){
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    mobileMenuBackdrop.classList.remove('open');
  }
  hamburger.addEventListener('click', toggleMenu);
  mobileMenuBackdrop.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Hero title split-into-words reveal ---------- */
  document.querySelectorAll('[data-split]').forEach((line, lineIndex) => {
    const words = line.textContent.trim().split(' ');
    line.innerHTML = words
      .map((w, i) => `<span style="transition-delay:${(lineIndex * 0.1 + i * 0.045)}s">${w}</span>`)
      .join(' ');
    line.querySelectorAll('span').forEach(span => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%)';
      span.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    });
  });
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('[data-split] span').forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 120);
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .scale-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const startTime = performance.now();
    const isInt = Number.isInteger(target);
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = (isInt ? target : target.toFixed(1)) + suffix;
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Hero parallax on scroll ---------- */
  const heroImg = document.getElementById('heroImg');
  if (heroImg){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight){
        heroImg.style.transform = `scale(1.06) translateY(${y * 0.12}px)`;
      }
    }, { passive:true });
  }

  /* ---------- Solutions slider ---------- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slide-dot');
  const slideNumber = document.getElementById('slideNumber');
  const slideNext = document.getElementById('slideNext');
  let currentSlide = 0;
  const totalSlides = slides.length;

  if (totalSlides > 0) {
    function goToSlide(index){
      currentSlide = (index + totalSlides) % totalSlides;
      slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
      if (slideNumber) {
        slideNumber.textContent = String(currentSlide + 1).padStart(2, '0') + '.';
      }
    }

    if (slideNext){
      slideNext.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    dots.forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.go, 10)));
    });

    /* Auto-advance, pausing on hover/interaction */
    let autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
    const slider = document.getElementById('slider');
    if (slider){
      slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
      slider.addEventListener('mouseleave', () => {
        autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
      });
    }
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  /* ---------- Gallery horizontal scroll on vertical scroll ---------- */
  const gallerySection = document.querySelector('.gallery');
  const galleryRail = document.getElementById('galleryRail');
  if (gallerySection && galleryRail) {
    const onScrollGallery = () => {
      const rect = gallerySection.getBoundingClientRect();
      const scrollEnd = gallerySection.offsetHeight - window.innerHeight;
      if (scrollEnd <= 0) return;
      
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const progress = -rect.top / scrollEnd;
        const maxTranslate = galleryRail.scrollWidth - window.innerWidth + 64; 
        galleryRail.style.transform = `translateX(-${progress * maxTranslate}px)`;
      } else if (rect.top > 0) {
        galleryRail.style.transform = `translateX(0px)`;
      } else if (rect.bottom < window.innerHeight) {
        const maxTranslate = galleryRail.scrollWidth - window.innerWidth + 64; 
        galleryRail.style.transform = `translateX(-${maxTranslate}px)`;
      }
    };
    window.addEventListener('scroll', onScrollGallery, { passive: true });
    onScrollGallery();
  }

  /* ---------- Contact form (demo submit) ---------- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.classList.add('show');
      form.querySelector('.form-submit').textContent = 'Request sent ✓';
      setTimeout(() => form.reset(), 400);
    });
  }

  /* ---------- Interactive Price Calculator ---------- */
  const calcQubits = document.getElementById('calcQubits');
  const calcShots = document.getElementById('calcShots');
  const calcQubitsVal = document.getElementById('calcQubitsVal');
  const calcShotsVal = document.getElementById('calcShotsVal');
  const calcPriceVal = document.getElementById('calcPriceVal');
  const calcMetricLatency = document.getElementById('calcMetricLatency');
  const calcMetricFidelity = document.getElementById('calcMetricFidelity');
  const calcMetricSupport = document.getElementById('calcMetricSupport');

  if (calcQubits && calcShots) {
    const shotOptions = [10000, 50000, 100000, 500000, 1000000, 5000000, 10000000];
    const shotLabels = ['10 K', '50 K', '100 K', '500 K', '1 M', '5 M', '10 M'];
    const shotPrices = [0, 80, 150, 450, 850, 2200, 4000];

    function updateCalculator() {
      const qubits = parseInt(calcQubits.value, 10);
      const shotIndex = parseInt(calcShots.value, 10);
      const shots = shotOptions[shotIndex];
      const shotsLabel = shotLabels[shotIndex];

      calcQubitsVal.textContent = qubits + ' Qubits';
      calcShotsVal.textContent = shotsLabel;

      let price = 0;
      let latency = '0.4s';
      let fidelity = '99.8%';
      let support = 'Community';

      if (qubits === 16 && shotIndex === 0) {
        // Free / Explorer tier
        price = 0;
        latency = '0.6s';
        fidelity = '99.5%';
        support = 'Forum';
      } else {
        // Compute base rate
        const basePrice = qubits * 12; // $12 per qubit
        const shotPrice = shotPrices[shotIndex];
        price = basePrice + shotPrice + 120; // $120 base platform fee

        // Latency model
        const lVal = (qubits * 0.05 + shotIndex * 0.4).toFixed(1);
        latency = lVal + 's';

        // Fidelity model
        const fVal = (99.9 - (qubits * 0.003) - (shotIndex * 0.01)).toFixed(2);
        fidelity = fVal + '%';

        // Support tier
        if (price > 1800) {
          support = 'Dedicated 24/7';
        } else if (price > 800) {
          support = 'Priority (2h)';
        } else {
          support = 'Standard Email';
        }
      }

      if (price === 0) {
        calcPriceVal.textContent = 'Free';
        if (document.querySelector('.calc-price-curr')) {
          document.querySelector('.calc-price-curr').style.display = 'none';
        }
      } else {
        // format price with spaces for thousands
        calcPriceVal.textContent = price.toLocaleString('en-US').replace(/,/g, ' ');
        if (document.querySelector('.calc-price-curr')) {
          document.querySelector('.calc-price-curr').style.display = 'inline';
        }
      }

      if (calcMetricLatency) calcMetricLatency.textContent = latency;
      if (calcMetricFidelity) calcMetricFidelity.textContent = fidelity;
      if (calcMetricSupport) calcMetricSupport.textContent = support;
    }

    calcQubits.addEventListener('input', updateCalculator);
    calcShots.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  /* ---------- Interactive Tab Filtering ---------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Find parent container or tab row to scope siblings
      const container = tab.closest('.filter-tabs');
      container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      const targetGrid = tab.getAttribute('data-target'); // e.g. '#teamGrid' or '#blogGrid'
      if (!targetGrid) return;

      const items = document.querySelectorAll(`${targetGrid} .filter-item`);
      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.classList.remove('hidden');
          // Trigger a micro-animation reveal
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Newsletter Form Submit ---------- */
  const newsForm = document.getElementById('newsletterForm');
  const newsSuccess = document.getElementById('newsSuccess');
  if (newsForm && newsSuccess) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = newsForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        newsSuccess.classList.add('show');
        submitBtn.textContent = 'Subscribed ✓';
        newsForm.reset();
        setTimeout(() => {
          newsSuccess.classList.remove('show');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 4000);
      }, 800);
    });
  }

  /* ---------- Back to Top Button ---------- */
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 404 Redirection for non-nav/footer links & & buttons ---------- */
  document.addEventListener('click', (e) => {
    // Safeguard: do not redirect if we are already on the 404 page
    if (window.location.pathname.includes('404.html')) return;

    const targetLink = e.target.closest('a');
    const targetButton = e.target.closest('button');

    if (targetLink) {
      const insideNav = targetLink.closest('header, nav, .nav, .mobile-menu');
      const insideFooter = targetLink.closest('footer, .footer');
      if (!insideNav && !insideFooter) {
        e.preventDefault();
        window.location.href = '404.html';
      }
    } else if (targetButton) {
      const insideNav = targetButton.closest('header, nav, .nav, .mobile-menu');
      const insideFooter = targetButton.closest('footer, .footer');
      if (!insideNav && !insideFooter) {
        const isSliderDot = targetButton.classList.contains('hero-slide-dot') || targetButton.classList.contains('slide-dot') || targetButton.classList.contains('slide-next');
        const isFaqToggle = targetButton.classList.contains('faq-q');
        const isFilterTab = targetButton.classList.contains('filter-tab');
        const isBackToTop = targetButton.id === 'backToTop';

        if (!isSliderDot && !isFaqToggle && !isFilterTab && !isBackToTop) {
          e.preventDefault();
          window.location.href = '404.html';
        }
      }
    }
  });

});