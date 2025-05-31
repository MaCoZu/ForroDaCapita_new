import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

function initSmoothScroll() {
  // Cleanup previous instances
  if (smoother) {
    smoother.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }

  // Ensure content is visible for height calculation
  const content = document.getElementById('smooth-content');
  gsap.set(content, { visibility: 'visible', opacity: 1 });

  // Initialize ScrollSmoother
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
    onUpdate: () => {
      // Lock horizontal position to maintain margins
      gsap.set('#smooth-content', {
        x: 0,
        width: '100%',
      });
    },
  });

  // Force GSAP to recalculate scrollable area
  ScrollTrigger.refresh();

  // Debug logging
  console.log('Content height:', content.scrollHeight);
  console.log('Wrapper height:', document.getElementById('smooth-wrapper').offsetHeight);

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = anchor.getAttribute('href');
      if (target && smoother) {
        e.preventDefault();
        smoother.scrollTo(target, true, 'top top');
      }
    });
  });
}

// Initialize with delay to ensure proper rendering
function init() {
  requestAnimationFrame(() => {
    if (document.readyState === 'complete') {
      initSmoothScroll();
    } else {
      window.addEventListener('load', initSmoothScroll);
    }
    document.addEventListener('astro:page-load', initSmoothScroll);
  });
}

init();

// Cleanup
document.addEventListener('astro:before-swap', () => {
  if (smoother) smoother.kill();
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
