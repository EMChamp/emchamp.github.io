import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';

const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

describe('index.html module integration', () => {
  it('references the module entry point without inline JavaScript', () => {
    const { document } = new JSDOM(html).window;
    const scripts = [...document.querySelectorAll('script')];

    expect(scripts).toHaveLength(1);
    expect(scripts[0].type).toBe('module');
    expect(scripts[0].getAttribute('src')).toBe('assets/js/main.js');
    expect(scripts.every((script) => script.textContent.trim() === '')).toBe(true);
  });

  it('retains the elements used by the module', () => {
    const { document } = new JSDOM(html).window;

    expect(document.querySelector('#yr')).not.toBeNull();
    expect(document.querySelector('#player')).not.toBeNull();
  });
});
