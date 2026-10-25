import type { Store } from './store.js';
export async function debit(store: Store, amount: number) {
  const balance = await store.readCredits();
  if (amount <= 0 || balance < amount) throw new Error('Insufficient credits');
  await store.saveCredits(balance - amount);
  return { balance: store.credits };
}
