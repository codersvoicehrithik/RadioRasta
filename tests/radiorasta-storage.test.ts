import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BUS_WALA_TICKET_KEY, BUS_WALA_TICKET_SKIPPED_KEY, hasSkippedBusWalaTicket, markBusWalaTicketSkipped, readBusWalaTicket, saveBusWalaTicket } from "@/lib/radiorasta-storage";

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}

const storage = new MemoryStorage();

beforeEach(() => {
  storage.clear();
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: storage } });
});

afterEach(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: undefined });
});

describe("Bus Wala ticket persistence", () => {
  it("persists a versioned ticket and restores it after a new read", () => {
    const saved = saveBusWalaTicket({ from: "Delhi", to: "Manali", passenger: "Asha", seat: "12A" });
    expect(storage.getItem(BUS_WALA_TICKET_KEY)).toContain('"version":1');
    expect(readBusWalaTicket()).toEqual(saved);
    expect(saved.ticketNumber).toMatch(/^RR-BUS-/);
  });

  it("remembers Skip until a ticket is created", () => {
    markBusWalaTicketSkipped();
    expect(storage.getItem(BUS_WALA_TICKET_SKIPPED_KEY)).toBe("1");
    expect(hasSkippedBusWalaTicket()).toBe(true);
    saveBusWalaTicket({ from: "Delhi", to: "Manali", passenger: "Asha" });
    expect(hasSkippedBusWalaTicket()).toBe(false);
  });
});
