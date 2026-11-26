/* Stats4U image counter with a recoverable fallback if the image loads slowly. */
(() => {
  const image = document.querySelector('[data-visitor-counter]');
  const status = document.querySelector('[data-counter-status]');
  if (!image || !status) return;

  const showCounter = () => {
    clearTimeout(timeout);
    image.hidden = false;
    image.classList.add('is-ready');
    status.hidden = true;
  };
  const showUnavailable = () => {
    image.hidden = true;
    status.textContent = '現在表示できません';
    status.hidden = false;
  };
  const timeout = setTimeout(() => {
    if (image.complete && image.naturalWidth > 0) showCounter();
    else showUnavailable();
  }, 15000);

  image.addEventListener('load', () => {
    if (image.naturalWidth > 0) showCounter();
    else showUnavailable();
  }, { once: true });
  image.addEventListener('error', showUnavailable, { once: true });

  if (image.complete) {
    if (image.naturalWidth > 0) showCounter();
    else showUnavailable();
  }
})();
