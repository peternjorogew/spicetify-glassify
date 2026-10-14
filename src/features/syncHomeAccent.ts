const HOME_ACCENT_SELECTOR = ".dqwQhIudKoD98eWJzj5E";
const HOME_SHORTCUT_SELECTOR = ".view-homeShortcutsGrid-shortcut";
const HOME_SHORTCUTS_SELECTOR = ".view-homeShortcutsGrid-shortcuts";

let currentAccent = "";
let isPreviewingShortcut = false;
let initialized = false;

const getHomeAccent = () =>
  document.querySelector<HTMLElement>(HOME_ACCENT_SELECTOR);

const restorePlayingAccent = () => {
  if (
    !currentAccent ||
    isPreviewingShortcut ||
    document.body.dataset.pageUrl !== "/"
  )
    return;

  getHomeAccent()?.style.setProperty(
    "background-color",
    currentAccent,
    "important",
  );
};

export const setHomeAccentColor = (color: string) => {
  currentAccent = color;
  restorePlayingAccent();
};

const initHomeAccent = () => {
  if (initialized) return;
  initialized = true;

  document.addEventListener("pointerover", (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest(HOME_SHORTCUT_SELECTOR))
      return;

    isPreviewingShortcut = true;
    getHomeAccent()?.style.removeProperty("background-color");
  });

  document.addEventListener("pointerout", (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest(HOME_SHORTCUT_SELECTOR))
      return;

    const relatedTarget = event.relatedTarget;
    if (
      relatedTarget instanceof Element &&
      relatedTarget.closest(HOME_SHORTCUTS_SELECTOR)
    )
      return;

    isPreviewingShortcut = false;
    requestAnimationFrame(() => requestAnimationFrame(restorePlayingAccent));
  });

  const observer = new MutationObserver(restorePlayingAccent);
  observer.observe(document.body, { childList: true, subtree: true });

  restorePlayingAccent();
};

export default initHomeAccent;
