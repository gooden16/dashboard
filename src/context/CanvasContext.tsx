import { createContext, useState, useContext, ReactNode } from 'react';
import { Canvas, Account } from '../types';

// Mock data for the context
const mockCanvases: Canvas[] = [
  {
    id: '1',
    name: 'Property Co',
    entityName: 'Smith Family LLC',
    type: 'business',
    icon: '🏢',
    status: 'active',
    totalBalance: 1200000,
    monthlyRevenue: 450000,
    properties: 12,
    netOperatingIncome: 35.2,
    lastUpdated: new Date(),
    accounts: [
      {
        id: 'acc1',
        name: 'Operating Account',
        type: 'Business Checking',
        accountNumber: '****1234',
        balance: 245000,
        availableBalance: 245000,
        interestRate: 0.1,
        status: 'active',
        icon: '🏦'
      },
      {
        id: 'acc2',
        name: 'Reserve Account',
        type: 'High-Yield Savings',
        accountNumber: '****5678',
        balance: 500000,
        availableBalance: 500000,
        interestRate: 4.5,
        monthlyInterest: 1875,
        status: 'active',
        icon: '💎'
      },
      {
        id: 'acc3',
        name: 'Business Credit Card',
        type: 'Visa Business',
        accountNumber: '****8901',
        balance: 15000,
        creditLimit: 100000,
        utilization: 15,
        nextPayment: {
          amount: 5000,
          dueDate: new Date('2025-06-01')
        },
        status: 'active',
        icon: '💳'
      }
    ]
  },
  {
    id: '2',
    name: 'Rainy Day',
    entityName: 'Smith Family Trust',
    type: 'savings',
    icon: '🌧️',
    status: 'active',
    totalBalance: 125000,
    targetBalance: 150000,
    progressPercentage: 83,
    monthlyContribution: 5000,
    lastUpdated: new Date(),
    accounts: [
      {
        id: 'acc4',
        name: 'Emergency Fund',
        type: 'High-Yield Savings',
        accountNumber: '****4321',
        balance: 125000,
        availableBalance: 125000,
        interestRate: 4.2,
        status: 'active',
        icon: '💰'
      }
    ]
  }
];

interface CanvasContextType {
  canvases: Canvas[];
  selectedCanvas: Canvas | null;
  selectCanvas: (id: string) => void;
  totalAssets: number;
  monthlyIncome: number;
  getAccount: (canvasId: string, accountId: string) => Account | undefined;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [canvases] = useState<Canvas[]>(mockCanvases);
  const [selectedCanvas, setSelectedCanvas] = useState<Canvas | null>(null);

  const selectCanvas = (id: string) => {
    const canvas = canvases.find(c => c.id === id) || null;
    setSelectedCanvas(canvas);
  };

  // Calculate total assets across all canvases
  const totalAssets = canvases.reduce((sum, canvas) => sum + canvas.totalBalance, 0);
  
  // Calculate total monthly income
  const monthlyIncome = canvases.reduce((sum, canvas) => sum + (canvas.monthlyRevenue || 0), 0);

  // Helper to get a specific account
  const getAccount = (canvasId: string, accountId: string): Account | undefined => {
    const canvas = canvases.find(c => c.id === canvasId);
    return canvas?.accounts.find(a => a.id === accountId);
  };

  return (
    <CanvasContext.Provider value={{ 
      canvases, 
      selectedCanvas, 
      selectCanvas,
      totalAssets,
      monthlyIncome,
      getAccount
    }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};