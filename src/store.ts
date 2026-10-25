export type Ticket = { id: number; tenant: string; title: string; priority: number };
export class Store {
  tickets: Ticket[] = Array.from({length: 12}, (_, i) => ({id: i + 1, tenant: i < 6 ? 'north' : 'south', title: `Ticket ${i + 1}`, priority: i % 3}));
  credits = 100;
  async insert(title: string) {
    await new Promise(resolve => setTimeout(resolve, 50));
    this.tickets.push({id: this.tickets.length + 1, tenant: 'north', title, priority: 1});
  }
  async readCredits() { const value = this.credits; await new Promise(resolve => setTimeout(resolve, 20)); return value; }
  async saveCredits(value: number) { this.credits = value; }
}
