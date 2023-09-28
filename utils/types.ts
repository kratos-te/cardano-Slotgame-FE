export interface BalanceType {
    ada: number;
    nebula: number;
    dum: number;
    konda: number;
}

export interface TokenType {
    symbol: string;
}

export interface WalletListType {
    name: string;
    icon: string;
    version: string;
}

export interface TransactionType {
    address: string;
    hash: string;
    status: string;
  }

export interface RankingDataType {
    address: string;
    amount : number;
}