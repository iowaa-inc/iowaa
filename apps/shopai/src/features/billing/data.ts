import type { Transaction } from './types';

export const transactions: Transaction[] = [
  {
    id: 'tx-1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    description: 'Purchased 500 leads',
    amount: 250.0,
    leadsReceived: 500,
    status: 'completed',
  },
  {
    id: 'tx-2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    description: 'Purchased 1000 leads',
    amount: 450.0,
    leadsReceived: 1000,
    status: 'completed',
  },
  {
    id: 'tx-3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    description: 'Purchased 250 leads',
    amount: 125.0,
    leadsReceived: 250,
    status: 'completed',
  },
  {
    id: 'tx-4',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    description: 'Purchased 2000 leads',
    amount: 800.0,
    leadsReceived: 2000,
    status: 'completed',
  },
  {
    id: 'tx-5',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    description: 'Purchased 750 leads',
    amount: 337.5,
    leadsReceived: 750,
    status: 'completed',
  },
  {
    id: 'tx-6',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    description: 'Purchased 300 leads',
    amount: 150.0,
    leadsReceived: 300,
    status: 'pending',
  },
];
