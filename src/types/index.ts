export interface Canvas {
  id: string;
  name: string;
  entityName: string;
  type: string;
  icon: string;
  status: 'pending' | 'active' | 'inactive';
  totalBalance: number;
  monthlyRevenue?: number;
  properties?: number;
  netOperatingIncome?: number;
  targetBalance?: number;
  progressPercentage?: number;
  monthlyContribution?: number;
  lastUpdated: Date;
  accounts: Account[];
}

export interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  availableBalance?: number;
  interestRate?: number;
  monthlyInterest?: number;
  creditLimit?: number;
  utilization?: number;
  nextPayment?: {
    amount: number;
    dueDate: Date;
  };
  status: 'active' | 'pending' | 'inactive';
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  permissions: string[];
  isOwner: boolean;
  status: 'active' | 'pending';
  joinDate: Date;
}

export interface Transaction {
  id: string;
  type: 'transfer' | 'payment' | 'income' | 'fee';
  description: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  accountId: string;
  canvasId: string;
  icon: string;
}

export interface DocumentType {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'required' | 'uploaded' | 'verified';
  date?: Date;
  size?: number;
  icon: string;
}

export interface BusinessRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  schedule: string;
  status: 'active' | 'paused';
  stats?: {
    timesTriggered: number;
    amountMoved?: number;
  };
}

export interface Card {
  id: string;
  type: 'physical' | 'virtual';
  status: 'active' | 'inactive' | 'frozen';
  number: string;
  expirationDate: string;
  cvv: string;
  limits: {
    daily: number;
    monthly: number;
  };
  categories: {
    [key: string]: boolean;
  };
}