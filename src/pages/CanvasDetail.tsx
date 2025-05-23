import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCanvas } from '../context/CanvasContext';
import { Building2, CreditCard, ArrowRightLeft } from 'lucide-react';
import AccountCard from '../components/canvas/AccountCard';
import MetricCard from '../components/dashboard/MetricCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ActivityItem from '../components/dashboard/ActivityItem';
import MoveMoneyModal from '../components/canvas/MoveMoneyModal';
import CardManagementModal from '../components/canvas/CardManagementModal';
import { formatCurrency } from '../utils';

const CanvasDetail = () => {
  const { id } = useParams();
  const { canvases } = useCanvas();
  const canvas = canvases.find(c => c.id === id);
  const [moveMoneyOpen, setMoveMoneyOpen] = useState(false);
  const [cardManagementOpen, setCardManagementOpen] = useState(false);

  if (!canvas) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Canvas Not Found</h1>
      </div>
    );
  }

  const operatingAccount = canvas.accounts.find(a => a.type === 'Business Checking');
  const reserveAccount = canvas.accounts.find(a => a.type === 'High-Yield Savings');
  const creditCard = canvas.accounts.find(a => a.type.includes('Credit Card'));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy-700 text-2xl mr-4">
            {canvas.icon}
          </div>
          <div>
            <h1>{canvas.name}</h1>
            <p className="text-cream-500">{canvas.entityName}</p>
          </div>
        </div>
        <div className="px-3 py-1 text-sm rounded-full bg-success-500/20 text-success-500">
          {canvas.status === 'active' ? 'Active' : canvas.status}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Balance"
          value={formatCurrency(canvas.totalBalance)}
          change="+12.5% vs last month"
          trend="up"
        />
        {canvas.monthlyRevenue && (
          <MetricCard
            title="Monthly Revenue"
            value={formatCurrency(canvas.monthlyRevenue)}
            change="+8.3% vs last month"
            trend="up"
          />
        )}
        {canvas.properties && (
          <MetricCard
            title="Properties"
            value={canvas.properties.toString()}
            change="No change"
            trend="neutral"
          />
        )}
        {canvas.netOperatingIncome && (
          <MetricCard
            title="Net Operating Income"
            value={`${canvas.netOperatingIncome}%`}
            change="+2.1% vs last month"
            trend="up"
          />
        )}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card hover className="flex flex-col items-center text-center p-8">
          <div className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center mb-4">
            <ArrowRightLeft className="w-6 h-6 text-gold-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Move Money</h3>
          <p className="text-cream-500 mb-4">Transfer funds or schedule payments</p>
          <Button variant="primary" onClick={() => setMoveMoneyOpen(true)}>Get Started</Button>
        </Card>

        <Card hover className="flex flex-col items-center text-center p-8">
          <div className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6 text-gold-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Cards</h3>
          <p className="text-cream-500 mb-4">Manage your business credit and debit cards</p>
          <Button variant="primary" onClick={() => setCardManagementOpen(true)}>View Cards</Button>
        </Card>
      </div>

      {/* Building Blocks */}
      <h2 className="text-xl font-medium mb-4">Building Blocks</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {operatingAccount && (
          <Card hover className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                <Building2 className="w-5 h-5 text-cream-300" />
              </div>
              <div>
                <h3 className="font-medium">Operating</h3>
                <p className="text-sm text-cream-500">{operatingAccount.accountNumber}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-2xl font-playfair">{formatCurrency(operatingAccount.balance)}</div>
              <div className="text-sm text-cream-500">Available Balance</div>
            </div>
            <Button variant="outline" size="sm" className="w-full">View Transactions</Button>
          </Card>
        )}

        {reserveAccount && (
          <Card hover className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                {reserveAccount.icon}
              </div>
              <div>
                <h3 className="font-medium">Reserve</h3>
                <p className="text-sm text-cream-500">{reserveAccount.accountNumber}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-2xl font-playfair">{formatCurrency(reserveAccount.balance)}</div>
              <div className="text-sm text-success-500">
                {reserveAccount.interestRate}% APY
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">View Transactions</Button>
          </Card>
        )}

        {creditCard && (
          <Card hover className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                {creditCard.icon}
              </div>
              <div>
                <h3 className="font-medium">Credit Card</h3>
                <p className="text-sm text-cream-500">{creditCard.accountNumber}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-2xl font-playfair">{formatCurrency(creditCard.balance)}</div>
              <div className="text-sm text-cream-500">
                {creditCard.utilization}% Utilization
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">View Transactions</Button>
          </Card>
        )}
      </div>

      {/* Recent Transactions */}
      <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
      <Card>
        <ActivityItem
          transaction={{
            id: '1',
            type: 'transfer',
            description: 'Transfer to Reserve Account',
            amount: -50000,
            date: new Date(),
            status: 'completed',
            accountId: 'acc1',
            canvasId: canvas.id,
            icon: '💸'
          }}
        />
        <ActivityItem
          transaction={{
            id: '2',
            type: 'payment',
            description: 'Office Supplies Inc',
            amount: -2450,
            date: new Date(Date.now() - 86400000),
            status: 'completed',
            accountId: 'acc1',
            canvasId: canvas.id,
            icon: '💳'
          }}
        />
        <ActivityItem
          transaction={{
            id: '3',
            type: 'income',
            description: 'Property Rental Income',
            amount: 125000,
            date: new Date(Date.now() - 259200000),
            status: 'completed',
            accountId: 'acc1',
            canvasId: canvas.id,
            icon: '📈'
          }}
        />
      </Card>

      <MoveMoneyModal 
        isOpen={moveMoneyOpen}
        onClose={() => setMoveMoneyOpen(false)}
      />

      <CardManagementModal
        isOpen={cardManagementOpen}
        onClose={() => setCardManagementOpen(false)}
      />
    </div>
  );
};

export default CanvasDetail;