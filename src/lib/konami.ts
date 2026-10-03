// ABOUTME: Recognizes the Konami code from a stream of key names, for the rainbow spiders.
// ABOUTME: Pure: feed keys in, get true on the completing key.

export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function konamiMatcher(): (key: string) => boolean {
  let i = 0;
  return (key: string) => {
    const k = key.length === 1 ? key.toLowerCase() : key;
    if (k === KONAMI[i]) {
      i += 1;
      if (i === KONAMI.length) {
        i = 0;
        return true;
      }
      return false;
    }
    i = k === KONAMI[0] ? 1 : 0;
    return false;
  };
}
