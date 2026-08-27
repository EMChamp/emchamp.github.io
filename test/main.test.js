import { beforeEach, expect, it, vi } from 'vitest';
import { VIDEO_ID } from '../assets/js/site.js';

beforeEach(() => {
  document.body.innerHTML = `
    <span id="yr"></span>
    <div id="player" role="button" tabindex="0"></div>
  `;
});

it('wires the page when the entry point is imported', async () => {
  vi.resetModules();
  await import('../assets/js/main.js');

  expect(document.querySelector('#yr').textContent).toBe(String(new Date().getFullYear()));

  const player = document.querySelector('#player');
  player.click();
  expect(player.querySelector('iframe').src).toBe(
    `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`
  );
});
