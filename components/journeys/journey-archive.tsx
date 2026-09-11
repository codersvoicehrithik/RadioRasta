"use client";
import Link from "next/link";
import { ArrowUpRight, Ticket } from "lucide-react";
import { useState } from "react";
import { readAnonymousJourneys } from "@/lib/anonymous-state";
import type { JourneyRecord } from "@/lib/types";
export function JourneyArchive() { const [journeys] = useState<JourneyRecord[]>(() => typeof window === "undefined" ? [] : readAnonymousJourneys()); return <section className="journey-archive">{journeys.length ? <div className="ticket-stack">{journeys.map((journey) => <article key={journey.id} className="journey-mini-ticket"><span>{journey.worldName}</span><strong>{journey.from} <i>→</i> {journey.to}</strong><small>{journey.passenger} · {new Date(journey.createdAt).toLocaleDateString()}</small></article>)}</div> : <div className="journey-empty"><Ticket size={25}/><p className="section-eyebrow">No ticket stubs yet</p><h2>अभी कोई सफर शुरू नहीं हुआ.</h2><p>Your first little detour is waiting somewhere on the map.</p><Link className="button button-primary" href="/world/bus-wala">Start with Bus Wala <ArrowUpRight size={17}/></Link></div>}</section>; }
