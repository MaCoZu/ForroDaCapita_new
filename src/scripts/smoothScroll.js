// Import GSAP and its necessary plugins
// These imports will be processed by Astro/Vite when this file is bundled
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Will resolve to your local installation (gsap or gsap-trial)
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

// Define a function to initialize ScrollSmoother and anchor links
function initializeSmoothScroll() {
  console.log('Astro:page-load event fired. Initializing/Re-initializing ScrollSmoother...');

  // --- Clean up existing ScrollSmoother and ScrollTrigger instances ---
  if (smoother) {
    smoother.kill(); // Kills the ScrollSmoother instance
    smoother = null; // Crucial: Nullify the reference to the old instance
    console.log('Previous ScrollSmoother instance killed and cleared.');
  }
  ScrollTrigger.killAll(); // Kill all ScrollTrigger instances
  console.log('All ScrollTrigger instances killed.');

  const smoothWrapper = document.getElementById('smooth-wrapper');
  const smoothContent = document.getElementById('smooth-content');

  if (smoothWrapper && smoothContent) {
    smoother = ScrollSmoother.create({
      smooth: 5,
      effects: true,
      wrapper: smoothWrapper,
      content: smoothContent,
      // normalizeScroll: true, // Optional: uncomment if you experience issues on mobile devices
    });
    console.log('ScrollSmoother initialized successfully!');

    // --- Implement Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const id = this.getAttribute('href');
        const targetElement = document.querySelector(id);

        if (targetElement && smoother) {
          smoother.scrollTo(targetElement, true, 'top top');
          console.log(`Smooth scrolling to: ${id}`);
        } else {
          console.warn(`Anchor target "${id}" not found or ScrollSmoother not ready.`);
        }
      });
    });
  } else {
    console.error(
      'ScrollSmoother: Could not find #smooth-wrapper or #smooth-content. Smooth scrolling will not be active.',
    );
  }
}

// Attach the initialization function to Astro's page load event
document.addEventListener('astro:page-load', initializeSmoothScroll);

// Optional: More robust cleanup before Astro's View Transitions swap content
document.addEventListener('astro:before-swap', () => {
  if (smoother) {
    smoother.kill();
    smoother = null;
  }
  ScrollTrigger.killAll();
  console.log('ScrollSmoother and ScrollTriggers cleaned up on astro:before-swap.');
});
