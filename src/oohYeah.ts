import { explode } from "./utils/kaboom";

export const oohYeah = async (
  powerTimer: {
    start: Function;
    stop: Function;
  },
  cursorPosition: any,
  mutations: any
) => {
  for (const mutation of mutations) {
    if (mutation.type === "characterData") {
      powerTimer.stop();
      powerTimer.start();

      // exploding curosr
      let newCursorPosition = await logseq.Editor.getEditingCursorPosition();

      if (newCursorPosition === null) {
        cursorPosition = cursorPosition;
      } else {
        cursorPosition = newCursorPosition;
      }

      if (cursorPosition) {
        explode(
          cursorPosition.rect.left + cursorPosition.left,
          cursorPosition.rect.top + cursorPosition.top
        );
      }

      // shake shake
      logseq.provideStyle(`
                        .cp__sidebar-main-content {
                        animation: shake 1s !important;
                        animation-iteration-count: 1 !important;
                        }
                        `);
      window.setTimeout(() => {
        logseq.provideStyle(`
                        .cp__sidebar-main-content {
                        animation: null !important;
                        animation-iteration-count: null !important;
                        }
                        `);
      }, 100);
    }
  }
};
