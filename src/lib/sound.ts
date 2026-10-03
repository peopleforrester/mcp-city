// ABOUTME: The city's optional sound: a low hum while on, and a soft tone when a gate lifts. Off until asked for.
// ABOUTME: WebAudio only, no files; every call is safe when the browser has no AudioContext.

let ctx: AudioContext | null = null;
let hum: { osc: OscillatorNode; gain: GainNode } | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  ctx ??= new AudioContext();
  return ctx;
}

export function setHum(on: boolean): boolean {
  const c = context();
  if (!c) return false;
  if (on && !hum) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    const filter = c.createBiquadFilter();
    osc.type = "sawtooth";
    osc.frequency.value = 55;
    filter.type = "lowpass";
    filter.frequency.value = 160;
    gain.gain.value = 0;
    osc.connect(filter).connect(gain).connect(c.destination);
    osc.start();
    gain.gain.linearRampToValueAtTime(0.05, c.currentTime + 1.5);
    hum = { osc, gain };
    void c.resume();
  } else if (!on && hum) {
    const { osc, gain } = hum;
    gain.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
    osc.stop(c.currentTime + 0.7);
    hum = null;
  }
  return !!hum;
}

export function isHumming(): boolean {
  return !!hum;
}

/** A short rising tone, only while the hum is on, so nothing ever sounds unasked. */
export function chime(): void {
  const c = context();
  if (!c || !hum) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, c.currentTime + 0.25);
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, c.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.6);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.65);
}
