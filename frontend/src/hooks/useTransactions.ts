import { useState, useEffect } from 'react';

export type Transaction = {
  id: string;
  type: 'bank' | 'opay';
  recipientName: string;
  recipientAccount: string;
  bank: string;
  bankCode: string;
  amount: number;
  remark: string;
  status: 'Successful';
  createdAt: string;
  ref: string;
  sessionId: string;
};

const SEED_DATA: Transaction[] = [
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'OWealth',
    recipientAccount: '',
    bank: 'OWealth',
    bankCode: '',
    amount: 0.09,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-17T17:29:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'EHILIZ VENT',
    recipientAccount: 'EHILIZ VENT',
    bank: 'OPay',
    bankCode: '',
    amount: -500.00,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-17T06:04:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'Sporty',
    recipientAccount: '',
    bank: 'Sporty',
    bankCode: '',
    amount: 400.00,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-17T06:00:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'bank',
    recipientName: 'POS Transfer-ANDR...',
    recipientAccount: '1234567890',
    bank: 'POS',
    bankCode: '',
    amount: -9500.00,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-17T02:32:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'OWealth',
    recipientAccount: '',
    bank: 'OWealth',
    bankCode: '',
    amount: 0.09,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-16T17:35:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'Betting',
    recipientAccount: '',
    bank: 'Betting',
    bankCode: '',
    amount: -100.00,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-16T15:49:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'Airtime Purchase',
    recipientAccount: '',
    bank: 'Bonus',
    bankCode: '',
    amount: 2.00,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-16T15:49:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  },
  {
    id: Math.random().toString().substring(2, 24),
    type: 'opay',
    recipientName: 'Airtime',
    recipientAccount: '',
    bank: 'Airtime',
    bankCode: '',
    amount: -100.00,
    remark: '',
    status: 'Successful',
    createdAt: '2026-07-16T15:48:00Z',
    ref: Math.random().toString().substring(2, 24),
    sessionId: Math.random().toString().substring(2, 26),
  }
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('opay_transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      localStorage.setItem('opay_transactions', JSON.stringify(SEED_DATA));
      setTransactions(SEED_DATA);
    }
  }, []);

  const addTransaction = (data: Omit<Transaction, 'id' | 'ref' | 'sessionId' | 'createdAt' | 'status'>) => {
    const newTx: Transaction = {
      ...data,
      id: Math.random().toString().substring(2, 24),
      ref: Math.random().toString().substring(2, 24),
      sessionId: Math.random().toString().substring(2, 26),
      createdAt: new Date().toISOString(),
      status: 'Successful'
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('opay_transactions', JSON.stringify(updated));
    return newTx;
  };

  const getTransaction = (id: string) => transactions.find(t => t.id === id);

  return { transactions, addTransaction, getTransaction };
}
