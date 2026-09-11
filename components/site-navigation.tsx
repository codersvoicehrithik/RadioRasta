"use client";

import Link from "next/link";
import { Compass, Heart, Map, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CodersvoiceSignature } from "@/components/brand/codersvoice-signature";
import { RadioRastaLogo } from "@/components/brand/radiorasta-logo";

const items = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/journeys", label: "Journeys", icon: Map },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export function SiteNavigation() {
  const pathname = usePathname();
  const isWorld = pathname.startsWith("/world/");
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className={`site-nav ${isWorld ? "on-world" : ""}`}>
    <RadioRastaLogo compact={isWorld}/>
    <nav aria-label="Main navigation">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{Icon && <Icon size={14}/>} {label}</Link>)}</nav>
    <div className="nav-utility"><Link className="nav-search" href="/search" aria-label="Search worlds and music"><Search size={18}/><kbd>/</kbd></Link><CodersvoiceSignature/><button className="mobile-menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={20}/> : <Menu size={21}/>}</button></div>
    {menuOpen ? <nav className="mobile-nav-panel" aria-label="Mobile navigation">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={pathname === href ? "active" : ""}>{Icon && <Icon size={16}/>} {label}</Link>)}</nav> : null}
  </header>;
}
