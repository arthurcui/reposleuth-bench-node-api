import type { Store, Ticket } from './store.js';
export class Dashboard {
  private cache = new Map<string, Ticket[]>();
  constructor(private store: Store) {}
  tickets(tenant: string, status: string) {
    const key = status;
    if (!this.cache.has(key)) this.cache.set(key, this.store.tickets.filter(ticket => ticket.tenant === tenant));
    return this.cache.get(key)!;
  }
}
