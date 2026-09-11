"use client";

import { motion } from "framer-motion";
import { Share2, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { JourneyDetails, World } from "@/lib/types";

export function JourneyTicket({ world, details, onDismiss, onEnter }: { world: World; details: JourneyDetails; onDismiss: () => void; onEnter?: () => void }) {
  const ticketNumber = details.ticketNumber ?? "RR-DIGITAL";

  return <motion.div className="ticket-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><motion.article className="journey-ticket" initial={{ y: 40, rotate: -1 }} animate={{ y: 0, rotate: 0 }}><button className="ticket-close" onClick={onDismiss} aria-label="Close ticket"><X size={18} /></button><p>{siteConfig.productName.toUpperCase()} · DIGITAL JOURNEY</p><div className="ticket-route"><strong>{details.from}</strong><span>→</span><strong>{details.to}</strong></div><div className="ticket-data"><span>PASSENGER<b>{details.passenger}</b></span><span>WORLD<b>{world.name}</b></span><span>SEAT<b>{details.seat || "Window seat"}</b></span><span>TRIP ID<b>{ticketNumber}</b></span></div><footer><small>Not valid for travel. Valid for a beautiful detour.</small><button onClick={() => void navigator.share?.({ title: `${siteConfig.productName} journey`, text: `${details.from} → ${details.to}, on ${world.name}` })}><Share2 size={15} /> Share ticket</button></footer>{onEnter ? <button className="button button-primary ticket-enter" onClick={onEnter}>Enter {world.name}</button> : null}</motion.article></motion.div>;
}
