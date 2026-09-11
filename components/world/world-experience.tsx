"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ChevronRight, Heart, MapPin, Share2, Ticket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WorldHeroImage } from "@/components/assets/world-hero-image";
import { useMusic } from "@/components/music/music-provider";
import { isAnonymousFavorite, saveAnonymousJourney, toggleAnonymousFavorite } from "@/lib/anonymous-state";
import { hasSkippedBusWalaTicket, markBusWalaTicketSkipped, readBusWalaTicket, saveBusWalaTicket } from "@/lib/radiorasta-storage";
import { calculateTheme, getTimeOfDay } from "@/lib/theme";
import type { JourneyDetails, World } from "@/lib/types";
import { playWorldInteractionSound } from "@/lib/world-sounds";
import { JourneyTicket } from "./journey-ticket";
import { RitualModal } from "./ritual-modal";

export function WorldExperience({ world }: { world: World }) {
  const { setWorld, track, displayTitle } = useMusic();
  const isBusWala = world.slug === "bus-wala";
  const [ritualOpen, setRitualOpen] = useState(false);
  const [ticket, setTicket] = useState<JourneyDetails>();
  const [ticketPreviewOpen, setTicketPreviewOpen] = useState(false);
  const [ticketStorageReady, setTicketStorageReady] = useState(!isBusWala);
  const [interactionOn, setInteractionOn] = useState(false);
  const [journeyStage, setJourneyStage] = useState(0);
  const [timeOfDay] = useState<ReturnType<typeof getTimeOfDay>>(getTimeOfDay);
  const [favorite, setFavorite] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => { setWorld(world); }, [setWorld, world]);
  useEffect(() => {
    if (!isBusWala) return;
    const restore = window.setTimeout(() => {
      const savedTicket = readBusWalaTicket();
      if (savedTicket) setTicket(savedTicket);
      else if (!hasSkippedBusWalaTicket()) setRitualOpen(true);
      setTicketStorageReady(true);
    });
    return () => window.clearTimeout(restore);
  }, [isBusWala]);
  useEffect(() => { const hydrate = window.setTimeout(() => setFavorite(isAnonymousFavorite(`world:${world.slug}`))); return () => window.clearTimeout(hydrate); }, [world.slug]);

  const theme = calculateTheme(world.theme, track, timeOfDay);
  const activateInteraction = () => { playWorldInteractionSound(world.interaction.effect); setInteractionOn(true); window.setTimeout(() => setInteractionOn(false), world.interaction.cooldown); };
  const completeRitual = (details?: JourneyDetails) => {
    if (isBusWala && details) {
      const savedTicket = saveBusWalaTicket(details);
      setTicket(savedTicket);
      saveAnonymousJourney({ ...savedTicket, id: crypto.randomUUID(), worldSlug: world.slug, worldName: world.name, createdAt: savedTicket.createdAt, completed: false });
      setTicketPreviewOpen(true);
    }
    setRitualOpen(false);
  };
  const skipTicket = () => { markBusWalaTicketSkipped(); setRitualOpen(false); };
  const openRitual = () => setRitualOpen(true);
  const openTicket = () => ticket ? setTicketPreviewOpen(true) : setRitualOpen(true);
  const shareWorld = async () => { const text = `${world.name} — ${world.shortDescription}`; if (navigator.share) await navigator.share({ title: world.name, text, url: window.location.href }); else await navigator.clipboard?.writeText(window.location.href); };

  return <main className={`world-experience atmosphere-${world.theme.atmosphere} is-${timeOfDay}`} style={{ "--primary": theme.primary, "--secondary": theme.secondary, "--accent": theme.accent, "--sky": theme.sky, "--overlay": theme.overlay, "--saturation": theme.saturation, "--brightness": theme.brightness } as React.CSSProperties}>
    <div className="world-scenery world-scenery-bright" aria-hidden="true"><WorldHeroImage world={world} priority className="world-scenery-image" /><motion.div className="world-glow" animate={reducedMotion ? undefined : { x: ["-8%", "9%", "-8%"], opacity: [0.25, 0.65, 0.25] }} transition={{ duration: 14 / theme.motion, repeat: Infinity }} /><div className="world-horizon" /><div className="world-road" /><div className="world-grain" />{world.theme.atmosphere === "rain" && <div className="rain-layer" />}{world.theme.atmosphere === "steam" && <div className="steam-layer"><i /><i /><i /></div>}</div>
    <header className="world-header"><Link href="/discover" aria-label="Back to discover"><ArrowLeft size={20} /></Link><span><MapPin size={14} /> {timeOfDay} frequency</span><div><button onClick={() => setFavorite(toggleAnonymousFavorite(`world:${world.slug}`))} aria-label="Save this world to favorites" aria-pressed={favorite}><Heart size={18} fill={favorite ? "currentColor" : "none"} /></button><button onClick={() => void shareWorld()} aria-label="Share this world"><Share2 size={18} /></button></div></header>
    <section className="world-main"><motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.8 }} className="world-intro"><p className="world-hindi">{world.hindiName}</p><h1>{world.name}</h1><p>{world.description}</p><div className="now-playing-pill"><span className="equalizer"><i /><i /><i /></span><span>Now tuned to</span><strong>{displayTitle ?? track?.title ?? world.music.playlistLabel}</strong></div></motion.div><aside className="world-controls"><button className={`interaction-button ${interactionOn ? "interacted" : ""}`} onClick={activateInteraction}><span>{world.interaction.icon}</span>{world.interaction.label}</button><p>{world.visual.detail}</p>{isBusWala && ticketStorageReady ? <button className="ticket-reopen" onClick={openTicket}><Ticket size={14} /> {ticket ? "View your ticket" : "Get your ticket"}</button> : !isBusWala ? <button className="ticket-reopen" onClick={openRitual}>Try the ritual</button> : null}</aside></section>
    {world.journey && <section className="journey-progress" aria-label="Journey progress"><div className="journey-label"><span>{ticket ? `${ticket.from || "Somewhere"} → ${ticket.to || "Somewhere else"}` : "Your route"}</span><button onClick={() => setJourneyStage((stage) => Math.min(stage + 1, world.journey!.stages.length - 1))}>Continue <ChevronRight size={15} /></button></div><div className="journey-stages">{world.journey.stages.map((stage, index) => <div key={stage} className={index <= journeyStage ? "reached" : ""}><i />{stage}</div>)}</div></section>}
    <AnimatePresence>{ritualOpen && (!isBusWala || ticketStorageReady) && <RitualModal world={world} onComplete={completeRitual} onSkip={isBusWala ? skipTicket : undefined} />}{ticket && ticketPreviewOpen && <JourneyTicket world={world} details={ticket} onDismiss={() => setTicketPreviewOpen(false)} onEnter={() => setTicketPreviewOpen(false)} />}</AnimatePresence>
  </main>;
}
