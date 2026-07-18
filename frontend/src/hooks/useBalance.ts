import { useState, useEffect, useCallback } from 'react';

export function useBalance() {
  const [balance, setBalance] = useState<number>(50000);

  useEffect(() => {
    const stored = localStorage.getItem('opay_balance');
    if (stored) {
      setBalance(Number(stored));
    } else {
      localStorage.setItem('opay_balance', '50000');
    }
  }, []);

  const deductBalance = useCallback((amount: number) => {
    setBalance(prev => {
      const newBal = prev - amount;
      localStorage.setItem('opay_balance', String(newBal));
      return newBal;
    });
  }, []);
  
  const resetBalance = useCallback(() => {
    setBalance(50000);
    localStorage.setItem('opay_balance', '50000');
  }, []);

  return { balance, deductBalance, resetBalance };
}
