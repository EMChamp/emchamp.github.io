export const VIDEO_ID = 'BHvTuYzNYY4';
export const VIDEO_TITLE = 'Use Cases with 8x8 CPaaS with our Demo Platform';

export function setFooterYear(doc = document, now = new Date()) {
  const el = doc.getElementById('yr');
  if (!el) return null;
  const year = String(now.getFullYear());
  el.textContent = year;
  return year;
}

export function embedMarkup(videoId = VIDEO_ID, title = VIDEO_TITLE) {
  return '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1"' +
    ' title="' + title + '"' +
    ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
    ' allowfullscreen></iframe>';
}

export function isActivationKey(event) {
  return event.key === 'Enter' || event.key === ' ';
}

export function initPlayer(doc = document) {
  const player = doc.getElementById('player');
  if (!player) return null;

  const load = () => {
    player.innerHTML = embedMarkup();
    player.style.cursor = 'default';
  };

  player.addEventListener('click', load);
  player.addEventListener('keydown', (event) => {
    if (!isActivationKey(event)) return;
    event.preventDefault();
    load();
  });

  return load;
}

export function init(doc = document) {
  setFooterYear(doc);
  initPlayer(doc);
}
