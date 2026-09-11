import type { JourneyDetails } from "./types";

export const BUS_WALA_TICKET_KEY = "radiorasta:bus-wala-ticket";
export const BUS_WALA_TICKET_SKIPPED_KEY = "radiorasta:bus-wala-ticket-skipped";
const TICKET_VERSION = 1;

export interface PersistedBusWalaTicket extends JourneyDetails {
  version: typeof TICKET_VERSION;
  createdAt: string;
  ticketNumber: string;
}

const isBrowser = () => typeof window !== "undefined";

function isPersistedTicket(value: unknown): value is PersistedBusWalaTicket {
  if (!value || typeof value !== "object") return false;
  const ticket = value as Partial<PersistedBusWalaTicket>;
  return ticket.version === TICKET_VERSION
    && typeof ticket.createdAt === "string"
    && typeof ticket.ticketNumber === "string"
    && typeof ticket.from === "string"
    && typeof ticket.to === "string"
    && typeof ticket.passenger === "string";
}

export function readBusWalaTicket(): PersistedBusWalaTicket | undefined {
  if (!isBrowser()) return undefined;
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(BUS_WALA_TICKET_KEY) ?? "null");
    return isPersistedTicket(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

export function saveBusWalaTicket(details: JourneyDetails): PersistedBusWalaTicket {
  const ticket: PersistedBusWalaTicket = {
    version: TICKET_VERSION,
    createdAt: new Date().toISOString(),
    ticketNumber: `RR-BUS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    from: details.from.trim(),
    to: details.to.trim(),
    passenger: details.passenger.trim(),
    ...(details.seat?.trim() ? { seat: details.seat.trim() } : {}),
  };
  window.localStorage.setItem(BUS_WALA_TICKET_KEY, JSON.stringify(ticket));
  window.localStorage.removeItem(BUS_WALA_TICKET_SKIPPED_KEY);
  return ticket;
}

export function hasSkippedBusWalaTicket() {
  return isBrowser() && window.localStorage.getItem(BUS_WALA_TICKET_SKIPPED_KEY) === "1";
}

export function markBusWalaTicketSkipped() {
  if (isBrowser()) window.localStorage.setItem(BUS_WALA_TICKET_SKIPPED_KEY, "1");
}
