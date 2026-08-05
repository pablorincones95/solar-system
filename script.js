/* ==========================================================================
   Solar System — interactivity
   ========================================================================== */

const solarSystem = document.getElementById("solar-system");
const pauseBtn = document.getElementById("pause-btn");
const speedInput = document.getElementById("speed");

/**
 * Pause / resume.
 * Toggling the "paused" class freezes every CSS orbit animation
 * (the rule lives in styles.css).
 */
function togglePause() {
  const isPaused = solarSystem.classList.toggle("paused");
  pauseBtn.textContent = isPaused ? "Play" : "Pause";
  pauseBtn.setAttribute("aria-pressed", String(isPaused));
}

pauseBtn.addEventListener("click", togglePause);

/**
 * Speed control.
 * We override each orbit's --duration custom property. Both the orbit (spin)
 * and its label (label-spin) read this same var, so they update together.
 */
function applySpeed() {
  const value = Number(speedInput.value); // slider value in percent

  // Base duration for each orbit (the order matches CSS defaults)
  const baseDurations = {
    mercury: 6,
    venus: 9,
    earth: 12,
    mars: 16,
    jupiter: 24,
    saturn: 30,
    uranus: 38,
    neptune: 46,
  };

  // 100% → full speed (default); 50% → half speed, 200% → double speed
  const multiplier = value / 100;

  for (const [name, base] of Object.entries(baseDurations)) {
    const orbit = document.getElementById(`${name}-orbit`);
    orbit.style.setProperty("--duration", `${base / multiplier}s`);
  }
}

speedInput.addEventListener("input", applySpeed);

// Apply the initial speed on load (also starts everything unpaused)
applySpeed();
