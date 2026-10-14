/*
 * Spotify's current Home cards render their navigation action as a sibling of
 * the artwork. Glassify's layered hover surface can leave that action behind
 * the visible image, so forward artwork clicks to Spotify's own card action.
 */
const CARD_SELECTOR = ".main-card-cardContainer.Card";
const IMAGE_SELECTOR = ".main-card-imageContainer";
const ACTION_SELECTOR =
  ':scope > [role="button"][aria-labelledby*="card-title-"], :scope > [role="button"]';

function activateHomeCard(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) return;

  const artwork = target.closest(IMAGE_SELECTOR);
  if (!artwork || target.closest("button")) return;

  const card = artwork.closest<HTMLElement>(CARD_SELECTOR);
  if (!card) return;

  const action = card.querySelector<HTMLElement>(ACTION_SELECTOR);
  if (!action || action.contains(target)) return;

  event.preventDefault();
  event.stopPropagation();
  action.click();
}

export default function enableHomeCardArtworkLinks() {
  document.addEventListener("click", activateHomeCard, true);
}
