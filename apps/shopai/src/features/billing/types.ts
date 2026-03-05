export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  leadsReceived: number;
  status: 'completed' | 'pending';
}
