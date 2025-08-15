export interface WalletState {
    address: string | null;
    balance: string;
    isConnected: boolean;
    chainId: number | null;
    isLoading: boolean;
  }
  
  export interface Transaction {
    hash: string;
    to: string;
    value: string;
    timestamp: number;
    status: 'pending' | 'confirmed' | 'failed';
  }
  
  export interface NetworkInfo {
    chainId: number;
    name: string;
    currency: string;
    rpcUrl: string;
  }