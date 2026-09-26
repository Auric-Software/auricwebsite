const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
if (header) {
  let scheduled = false;
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
    scheduled = false;
  };
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// One continuous SVG spans the hero and product; paths follow the responsive
// layout, so the same dots keep travelling when the hero scrolls out of view.
const story = document.querySelector('.product-story');
if (story && 'IntersectionObserver' in window) {
  const art = story.querySelector('.story-art');
  const svg = art.querySelector('svg');
  const heroContent = story.querySelector('.hero-inner');
  const preview = story.querySelector('.demo');
  const particles = [...story.querySelectorAll('[data-curve]')].map(element => {
    const path = document.getElementById(element.dataset.curve);
    return {
      element, path, length: path.getTotalLength(),
      phase: Number(element.dataset.phase),
      duration: Number(element.dataset.duration) * 1000,
    };
  });
  const bounds = story.getBoundingClientRect();
  let inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
  let animationFrame = null;
  let previousTime = null;
  let elapsed = 0;

  function positionParticles() {
    particles.forEach(({ element, path, length, phase, duration }) => {
      const progress = (phase + elapsed / duration) % 1;
      const point = path.getPointAtLength(progress * length);
      element.setAttribute('transform', `translate(${point.x} ${point.y})`);
    });
  }

  function layoutCurves() {
    const width = story.clientWidth;
    const height = story.clientHeight;
    const heroHeight = heroContent.offsetHeight;
    const previewTop = preview.offsetTop;
    const previewBottom = previewTop + preview.offsetHeight;
    const rail = Math.min(width - 12, (width + preview.offsetWidth) / 2 + 60);
    const gap = Math.min(44, width * 0.035);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    particles.forEach((particle, index) => {
      const offset = (index - 1) * gap;
      particle.path.setAttribute('d', `
        M -120 ${heroHeight * 0.24 + offset}
        C ${width * 0.2} ${heroHeight * 0.24 + offset},
          ${width * 0.04} ${heroHeight * 0.86 + offset},
          ${width * 0.42} ${heroHeight * 0.86 + offset}
        S ${width + 100 + offset} ${heroHeight * 0.92 + offset},
          ${rail + offset} ${previewTop + 80}
        S ${width + 60 + offset} ${previewBottom + 60},
          ${width * 0.48} ${previewBottom + 100 + offset}
        S ${width * 0.1} ${height - 100 + offset}, -120 ${height - 40 + offset}
      `);
      particle.length = particle.path.getTotalLength();
    });
    positionParticles();
  }

  function animate(time) {
    if (previousTime !== null) elapsed += Math.min(time - previousTime, 100);
    previousTime = time;
    positionParticles();
    animationFrame = window.requestAnimationFrame(animate);
  }

  function updateStoryMotion() {
    const playing = inView && !document.hidden && !reducedMotion.matches;
    story.classList.toggle('is-art-playing', playing);
    if (playing && animationFrame === null) {
      previousTime = null;
      animationFrame = window.requestAnimationFrame(animate);
    } else if (!playing && animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      previousTime = null;
    }
  }

  layoutCurves();
  if ('ResizeObserver' in window) {
    const layoutObserver = new ResizeObserver(layoutCurves);
    layoutObserver.observe(story);
    layoutObserver.observe(preview);
  } else {
    window.addEventListener('resize', layoutCurves, { passive: true });
  }
  const storyObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    updateStoryMotion();
  });
  storyObserver.observe(story);
  reducedMotion.addEventListener('change', updateStoryMotion);
  document.addEventListener('visibilitychange', updateStoryMotion);
  updateStoryMotion();
}

let revealObserver;

function setupReveals() {
  revealObserver?.disconnect();
  document.querySelectorAll('.is-revealing').forEach(element => {
    element.classList.remove('is-revealing');
  });
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.add('is-revealing');
      element.dataset.revealed = 'true';
      element.addEventListener('animationend', () => {
        element.classList.remove('is-revealing');
      }, { once: true });
      revealObserver.unobserve(element);
    });
  }, { threshold: 0, rootMargin: '0px 0px 32px 0px' });

  document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach(element => {
    // Keep initial content and deep links immediately readable. Reveal only what
    // is still below the viewport, just before it scrolls into view.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.dataset.revealed = 'true';
    } else {
      revealObserver.observe(element);
    }
  });
}

setupReveals();
reducedMotion.addEventListener('change', setupReveals);
