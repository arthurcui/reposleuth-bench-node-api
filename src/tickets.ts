import type { Store } from './store.js';
export function listTickets(store: Store, page: number, pageSize: number) {
  const offset = page * pageSize;
  return store.tickets.slice(offset, offset + pageSize);
}
export function priorityTickets(store: Store, priority: number | undefined) {
  return store.tickets.filter(ticket => !priority || ticket.priority === priority);
}
export async function importTickets(store: Store, titles: string[]) {
  titles.forEach(async title => { await store.insert(title); });
  return { imported: titles.length, visible: store.tickets.length };
}
