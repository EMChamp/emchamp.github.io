import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  VIDEO_ID,
  VIDEO_TITLE,
  embedMarkup,
  init,
  initPlayer,
  isActivationKey,
  setFooterYear
} from '../assets/js/site.js';

beforeEach(() => {
  document.body.innerHTML = `
    <span id="yr"></span>
    <div id="player" role="button" tabindex="0"></div>
  `;
});

describe('setFooterYear', () => {
  it('sets and returns the injected date year', () => {
    const year = setFooterYear(document, new Date('2031-06-15T00:00:00Z'));

    expect(year).toBe('2031');
    expect(document.querySelector('#yr').textContent).toBe('2031');
  });

  it('returns null when the footer year element is absent', () => {
    document.body.innerHTML = '<main></main>';

    expect(() => setFooterYear(document, new Date('2031-06-15T00:00:00Z'))).not.toThrow();
    expect(setFooterYear(document, new Date('2031-06-15T00:00:00Z'))).toBeNull();
  });
});

describe('embedMarkup', () => {
  it('builds the default YouTube iframe markup', () => {
    const markup = embedMarkup();

    expect(markup).toContain(`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`);
    expect(markup).toContain(`title="${VIDEO_TITLE}"`);
    expect(markup).toContain('allowfullscreen');
  });

  it('honors custom video and title arguments', () => {
    const markup = embedMarkup('custom-video', 'Custom video title');

    expect(markup).toContain('https://www.youtube.com/embed/custom-video?autoplay=1');
    expect(markup).toContain('title="Custom video title"');
  });
});

describe('isActivationKey', () => {
  it.each([
    ['Enter', true],
    [' ', true],
    ['a', false],
    ['Tab', false],
    ['Escape', false]
  ])('returns %s for the %s key', (key, expected) => {
    expect(isActivationKey({ key })).toBe(expected);
  });
});

describe('initPlayer', () => {
  it('returns null when the player element is absent', () => {
    document.body.innerHTML = '<main></main>';

    expect(initPlayer(document)).toBeNull();
  });

  it('loads the iframe on click and resets the cursor', () => {
    const player = document.querySelector('#player');
    initPlayer(document);

    player.dispatchEvent(new MouseEvent('click'));

    expect(player.querySelector('iframe').src).toBe(
      `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`
    );
    expect(player.innerHTML).toContain(`title="${VIDEO_TITLE}"`);
    expect(player.style.cursor).toBe('default');
  });

  it('loads the iframe and prevents default for Enter and Space', () => {
    const player = document.querySelector('#player');
    initPlayer(document);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    const enterPreventDefault = vi.spyOn(enterEvent, 'preventDefault');
    player.dispatchEvent(enterEvent);
    expect(enterPreventDefault).toHaveBeenCalledOnce();
    expect(enterEvent.defaultPrevented).toBe(true);
    expect(player.querySelector('iframe')).not.toBeNull();

    player.innerHTML = '';
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
    const spacePreventDefault = vi.spyOn(spaceEvent, 'preventDefault');
    player.dispatchEvent(spaceEvent);
    expect(spacePreventDefault).toHaveBeenCalledOnce();
    expect(spaceEvent.defaultPrevented).toBe(true);
    expect(player.querySelector('iframe')).not.toBeNull();
  });

  it('does not load or prevent default for non-activation keys', () => {
    const player = document.querySelector('#player');
    player.innerHTML = '<span>placeholder</span>';
    initPlayer(document);

    const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
    const preventDefault = vi.spyOn(event, 'preventDefault');
    player.dispatchEvent(event);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(player.innerHTML).toBe('<span>placeholder</span>');
  });
});

describe('init', () => {
  it('wires the footer year and player on a complete document', () => {
    init(document);

    expect(document.querySelector('#yr').textContent).toBe(String(new Date().getFullYear()));
    document.querySelector('#player').click();
    expect(document.querySelector('#player iframe')).not.toBeNull();
  });

  it('is safe when neither dependent element exists', () => {
    document.body.innerHTML = '<main></main>';

    expect(() => init(document)).not.toThrow();
  });
});
