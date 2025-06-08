// src/scripts/smoothScroll.js

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once globally
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother; // Keep smoother in a global scope to manage its lifecycle

function initializeSmoothScroll() {
  console.log('Attempting to initialize ScrollSmoother...');

  // --- Crucial Cleanup First ---
  // Kill any existing ScrollSmoother instance
  if (smoother) {
    console.log('Killing existing ScrollSmoother instance.');
    smoother.kill();
    smoother = null; // Nullify the reference
  }

  // Kill all existing ScrollTriggers to prevent conflicts and ensure a clean slate
  console.log('Killing all existing ScrollTriggers.');
  ScrollTrigger.getAll().forEach((st) => st.kill());
  // Ensure ScrollTriggers are properly re-evaluated after cleanup
  ScrollTrigger.refresh(true); // true parameter forces a full refresh

  // --- Get Wrapper and Content Elements ---
  const smoothWrapper = document.getElementById('smooth-wrapper');
  const smoothContent = document.getElementById('smooth-content');

  if (!smoothWrapper || !smoothContent) {
    console.error('ScrollSmoother: Missing #smooth-wrapper or #smooth-content. Cannot initialize.');
    return; // Exit if elements are not found
  }

  // --- Create ScrollSmoother Instance ---
  try {
    smoother = ScrollSmoother.create({
      wrapper: smoothWrapper,
      content: smoothContent,
      smooth: 2.5, // Adjust for desired smoothness
      effects: true, // Enable data-speed and data-lag attributes
      normalizeScroll: true, // Helps with inconsistencies across browsers/OS
      ignoreMobileResize: true, // Can help prevent jumpiness on mobile with address bar changes
    });
    console.log('ScrollSmoother initialized successfully!');

    // --- Force a refresh of ScrollTrigger after Smoother is created ---
    // This is important if you have other ScrollTriggers on the page
    ScrollTrigger.refresh(true);

    // --- Debug Logging ---
    // Make sure these show sensible values
    console.log('Final Content scrollHeight:', smoothContent.scrollHeight);
    console.log('Final Wrapper offsetHeight:', smoothWrapper.offsetHeight);
    console.log('smoother.content().offsetHeight:', smoother.content().offsetHeight);
    console.log('smoother.wrapper().offsetHeight:', smoother.wrapper().offsetHeight);
    console.log('smoother.scrollTrigger.end:', smoother.scrollTrigger.end);
  } catch (error) {
    console.error('Error creating ScrollSmoother:', error);
    return; // Exit if creation fails
  }

  // --- Handle Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Remove previous listeners to prevent multiple firings on re-initialization
    // This requires a named function or storing references if you had complex listeners
    // For simplicity, we'll add it each time, but ensure the `if (smoother)` check
    // prevents issues if a smoother isn't ready.
    anchor.removeEventListener('click', handleAnchorClick); // Remove previous listener if exists
    anchor.addEventListener('click', handleAnchorClick);
  });

  function handleAnchorClick(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    const targetElement = document.querySelector(id);
    if (targetElement && smoother) {
      smoother.scrollTo(targetElement, true, 'top top');
      console.log(`Smooth scrolling to: ${id}`);
    } else {
      console.warn(`Anchor target "${id}" not found or ScrollSmoother not ready.`);
    }
  }
}

// --- Astro Lifecycle Integration ---
// Always run initialization on astro:page-load
document.addEventListener('astro:page-load', initializeSmoothScroll);

// Clean up before navigating away
document.addEventListener('astro:before-swap', () => {
  if (smoother) {
    console.log('Cleaning up ScrollSmoother before page swap.');
    smoother.kill();
    smoother = null; // Essential to nullify
  }
  ScrollTrigger.getAll().forEach((st) => st.kill());
  ScrollTrigger.refresh(true); // Force refresh for any remaining triggers
});

// Initial call on first load (in case astro:page-load doesn't fire immediately or for SSR hydration)
// This should effectively be covered by astro:page-load, but good for robustness
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSmoothScroll);
} else {
  initializeSmoothScroll();
}
