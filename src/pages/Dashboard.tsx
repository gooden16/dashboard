import { useCanvas } from '../context/CanvasContext';
import MetricCard from '../components/dashboard/MetricCard';
import CanvasCard from '../components/dashboard/CanvasCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import { formatCurrency } from '@/utils';

const Dashboard = () => {
  const { canvases, totalAssets, monthlyIncome } = useCanvas();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1>Welcome to Canvas Financial</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Assets"
          value={formatCurrency(totalAssets)}
          change="+8.5% vs last month"
          trend="up"
        />
        <MetricCard
          title="Monthly Income"
          value={formatCurrency(monthlyIncome)}
          change="+12.3% vs last month"
          trend="up"
        />
        <MetricCard
          title="Active Canvases"
          value={canvases.length.toString()}
          change="No change"
          trend="neutral"
        />
        <MetricCard
          title="Avg Monthly Fees"
          value="2.3%"
          change="-0.4% vs last month"
          trend="down"
        />
      </div>

      <h2 className="text-xl font-medium mb-4">Your Canvases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {canvases.map((canvas) => (
          <CanvasCard key={canvas.id} canvas={canvas} />
        ))}
      </div>

      <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
      <div className="bg-navy-800 rounded-card border border-navy-700 p-6">
        {/* Placeholder for activity items - would normally come from API/context */}
        <ActivityItem
          transaction={{
            id: '1',
            type: 'transfer',
            description: 'Transfer to Reserve Account',
            amount: -50000,
            date: new Date(),
            status: 'completed',
            accountId: 'acc1',
            canvasId: '1',
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
            canvasId: '1',
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
            canvasId: '1',
            icon: '📈'
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;