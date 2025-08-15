import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletState, Transaction } from '../types/web3';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: '0',
    isConnected: false,
    chainId: null,
    isLoading: false,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const checkConnection = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setWalletState({
          address,
          balance: ethers.formatEther(balance),
          isConnected: true,
          chainId: Number(network.chainId),
          isLoading: false,
        });
        setProvider(provider);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isLoading: true }));
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await checkConnection();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWalletState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      balance: '0',
      isConnected: false,
      chainId: null,
      isLoading: false,
    });
    setProvider(null);
    setTransactions([]);
  };

  const refreshBalance = async () => {
    if (!provider || !walletState.address) return;

    try {
      const balance = await provider.getBalance(walletState.address);
      setWalletState(prev => ({
        ...prev,
        balance: ethers.formatEther(balance)
      }));
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  };

  const sendTransaction = async (to: string, amount: string) => {
    if (!provider || !walletState.address) return null;

    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      const newTransaction: Transaction = {
        hash: tx.hash,
        to,
        value: amount,
        timestamp: Date.now(),
        status: 'pending',
      };

      setTransactions(prev => [newTransaction, ...prev]);

      // Wait for confirmation
      tx.wait().then(() => {
        setTransactions(prev =>
          prev.map(t =>
            t.hash === tx.hash ? { ...t, status: 'confirmed' as const } : t
          )
        );
        refreshBalance();
      }).catch(() => {
        setTransactions(prev =>
          prev.map(t =>
            t.hash === tx.hash ? { ...t, status: 'failed' as const } : t
          )
        );
      });

      return tx.hash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  };

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkConnection);
      window.ethereum.on('chainChanged', checkConnection);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', checkConnection);
        window.ethereum.removeListener('chainChanged', checkConnection);
      }
    };
  }, [checkConnection]);

  return {
    walletState,
    transactions,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    sendTransaction,
  };
};