"use client";

import type { InteractionEffect } from "./types";

/** Small procedural sounds keep world interactions responsive without shipping unlicensed audio files. */
export function playWorldInteractionSound(effect: InteractionEffect) {
  if (typeof window === "undefined") return;
  const legacyWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextClass = window.AudioContext ?? legacyWindow.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const now = context.currentTime;
  const note = (frequency: number, start: number, duration: number, type: OscillatorType = "sine", gain = 0.05) => {
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.exponentialRampToValueAtTime(gain, start + 0.015);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(volume).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  };

  if (effect === "dust") { note(196, now, 0.22, "sawtooth", 0.055); note(247, now + 0.14, 0.25, "sawtooth", 0.05); }
  else if (effect === "headlights") { note(92, now, 0.34, "square", 0.045); note(117, now + 0.17, 0.3, "square", 0.04); }
  else if (effect === "whistle") { note(784, now, 0.46, "sine", 0.05); note(988, now + 0.17, 0.35, "sine", 0.04); }
  else if (effect === "bell" || effect === "streetlight") { note(1047, now, 0.48, "sine", 0.06); note(1319, now + 0.04, 0.5, "sine", 0.035); }
  else if (effect === "snip") { note(560, now, 0.08, "triangle", 0.045); note(390, now + 0.07, 0.07, "triangle", 0.035); }
  else if (effect === "steam" || effect === "raindrop") { note(1240, now, 0.12, "sine", 0.028); note(930, now + 0.09, 0.14, "sine", 0.02); }
  else { note(740, now, 0.17, "sine", 0.03); note(1110, now + 0.16, 0.22, "sine", 0.025); }

  window.setTimeout(() => void context.close(), 1100);
}
