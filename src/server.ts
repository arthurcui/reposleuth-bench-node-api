import { createServer } from 'node:http';
import { Store } from './store.js';
import { listTickets, priorityTickets, importTickets } from './tickets.js';
import { Dashboard } from './dashboard.js';
import { debit } from './credits.js';
const store = new Store(); const dashboard = new Dashboard(store);
createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  try {
    let result: unknown;
    if (url.pathname === '/health') result = {status:'ok'};
    else if (req.method === 'GET' && url.pathname === '/tickets') {
      const page = Number(url.searchParams.get('page') ?? 1), size = Number(url.searchParams.get('pageSize') ?? 3);
      if (!Number.isInteger(page) || page < 1 || !Number.isInteger(size) || size < 1 || size > 100) throw new Error('Invalid page');
      result = listTickets(store,page,size);
    } else if (req.method === 'GET' && url.pathname === '/priority') result = priorityTickets(store,url.searchParams.has('value') ? Number(url.searchParams.get('value')) : undefined);
    else if (req.method === 'GET' && url.pathname === '/dashboard') result = dashboard.tickets(url.searchParams.get('tenant') ?? 'north',url.searchParams.get('status') ?? 'open');
    else if (req.method === 'GET' && url.pathname === '/credits') result = { balance: store.credits };
    else if (req.method === 'POST') {
      let body=''; for await (const part of req) { body+=part; if (body.length > 10000) throw new Error('Body too large'); }
      const data=JSON.parse(body);
      if (url.pathname === '/imports') result = await importTickets(store,data.titles);
      else if (url.pathname === '/credits/debit') result = await debit(store,Number(data.amount));
      else { res.writeHead(404).end(); return; }
    } else { res.writeHead(404).end(); return; }
    res.writeHead(200,{'content-type':'application/json'}).end(JSON.stringify(result));
  } catch { res.writeHead(400,{'content-type':'application/json'}).end(JSON.stringify({error:'Request rejected'})); }
}).listen(4311,'127.0.0.1');
