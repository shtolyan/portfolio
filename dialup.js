// Dial-up reveal: the photo loads fast, then "draws" itself top to bottom in jerky scanline bands.
(() => {
  const img = document.querySelector('.portrait-frame img');
  if (!img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'dialup-canvas';
  img.style.visibility = 'hidden';
  img.insertAdjacentElement('afterend', canvas);

  const ctx = canvas.getContext('2d');
  const rand = (a, b) => a + Math.random() * (b - a);
  const TINT = 'rgba(168, 217, 102, .55)'; // --accent green

  function start() {
    const box = img.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.width = Math.round(box.width * dpr);
    const H = canvas.height = Math.round(box.height * dpr);
    Object.assign(canvas.style, {
      position: 'absolute', left: img.offsetLeft + 'px', top: img.offsetTop + 'px',
      width: box.width + 'px', height: box.height + 'px', imageRendering: 'pixelated'
    });

    const sx = img.naturalWidth / W, sy = img.naturalHeight / H;
    const row = Math.max(2, Math.round(3 * dpr)); // one "scanline" height
    let y = 0;

    // Draw a band of rows as a glitchy, chunky, green-tinted scanline.
    function drawGlitch(y0, h) {
      for (let r = y0; r < y0 + h; r += row) {
        const shift = Math.random() < 0.5 ? rand(-18, 18) * dpr : 0;
        ctx.drawImage(img, 0, r * sy, img.naturalWidth, row * sy, shift, r, W, row);
      }
      ctx.fillStyle = TINT;
      ctx.fillRect(0, y0, W, h);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, y0 + h - dpr, W, dpr); // bright leading edge
    }
    // Replace the previous band with clean pixels.
    function drawClean(y0, h) {
      ctx.clearRect(0, y0, W, h);
      ctx.drawImage(img, 0, y0 * sy, img.naturalWidth, h * sy, 0, y0, W, h);
    }

    let prev = null;
    function step() {
      if (prev) drawClean(prev[0], prev[1] + dpr);
      if (y >= H) { finish(); return; }
      // Mostly small chunks, sometimes a burst, sometimes a stall — like a real modem.
      const burst = Math.random() < 0.15;
      const h = Math.min(H - y, Math.round((burst ? rand(24, 56) : rand(5, 14)) * dpr));
      drawGlitch(y, h);
      prev = [y, h];
      y += h;
      const pause = Math.random() < 0.08 ? rand(180, 340) : rand(30, 70);
      setTimeout(() => requestAnimationFrame(step), pause);
    }
    step();
  }

  function finish() {
    img.style.visibility = '';
    canvas.remove();
  }

  // Play only once the tab is actually visible, so nobody misses the show.
  function go() {
    if (!document.hidden) return start();
    document.addEventListener('visibilitychange', go, { once: true });
  }

  if (img.complete && img.naturalWidth) go();
  else {
    img.addEventListener('load', go, { once: true });
    img.addEventListener('error', finish, { once: true });
  }
})();
