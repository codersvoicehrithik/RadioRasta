import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
export function RadioRastaLogo({ href = "/", compact = false, inverse = false }: { href?: string; compact?: boolean; inverse?: boolean }) { return <Link href={href} className={`radiorasta-logo ${compact ? "is-compact" : ""} ${inverse ? "is-inverse" : ""}`} aria-label={siteConfig.brand.productName}><span className="logo-radio">RADIO</span><span className="logo-rasta">Rasta</span><i aria-hidden="true">●</i></Link>; }
