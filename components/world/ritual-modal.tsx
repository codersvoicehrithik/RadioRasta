"use client";

import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import type { JourneyDetails, World } from "@/lib/types";

export function RitualModal({ world, onComplete, onSkip, onDismiss }: { world: World; onComplete: (details?: JourneyDetails) => void; onSkip?: () => void; onDismiss: () => void }) {
  const [details, setDetails] = useState<JourneyDetails>({ from: "", to: "", passenger: "" });
  const [chosen, setChosen] = useState<string>();
  const isJourney = world.ritual.kind === "ticket";
  const isWelcome = world.ritual.kind === "welcome";
  const canContinue = isJourney ? Boolean(details.from.trim() && details.to.trim() && details.passenger.trim()) : isWelcome || Boolean(chosen);

  return <motion.div className="ritual-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="ritual-title">
    <motion.section className="ritual-modal" initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}><button className="ritual-close" onClick={onDismiss} aria-label="Close ritual"><X size={18} /></button>
      <p className="section-eyebrow">{isJourney ? "Optional journey ritual" : "A small ritual"}</p><h2 id="ritual-title">{world.ritual.title}</h2><p>{world.ritual.prompt}</p>
      {isJourney ? <div className="ticket-form"><label>From<input autoFocus value={details.from} onChange={(event) => setDetails({ ...details, from: event.target.value })} placeholder="Delhi" /></label><label>To<input value={details.to} onChange={(event) => setDetails({ ...details, to: event.target.value })} placeholder="Manali" /></label><label className="wide">Passenger name<input value={details.passenger} onChange={(event) => setDetails({ ...details, passenger: event.target.value })} placeholder="Your name" /></label><label>Seat (optional)<input value={details.seat ?? ""} onChange={(event) => setDetails({ ...details, seat: event.target.value })} placeholder="Window, 12A…" /></label></div> : <div className="ritual-options">{world.ritual.options?.map((option) => <button key={option} onClick={() => setChosen(option)} className={chosen === option ? "selected" : ""}>{option}</button>)}</div>}
      <button className="button button-primary ritual-submit" disabled={!canContinue} onClick={() => onComplete(isJourney ? details : undefined)}>{isJourney ? "Create My Ticket" : isWelcome ? "Stay a while" : `Open ${world.name}`} <ArrowRight size={18} /></button>
      {isJourney && onSkip ? <button className="ticket-skip" onClick={onSkip}>Skip → Enter {world.name}</button> : null}
      <small>{isJourney ? "A nostalgic memento, never a real transport ticket." : world.ritual.arrivalLine ?? "Your choice shapes this listening session."}</small>
    </motion.section>
  </motion.div>;
}
