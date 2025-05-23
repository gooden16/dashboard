import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Canvas } from '../../types';
import { formatCurrency, cn } from '../../utils';

interface CanvasCardProps {
  canvas: Canvas;
  primary?: boolean;
}

const CanvasCard = ({ canvas, primary = false }: CanvasCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      hover
      className={cn(
        'flex flex-col h-full',
        primary && 'border-gold-400/50'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-navy-700 text-xl">
            {canvas.icon}
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{canvas.name}</h3>
            <p className="text-sm text-cream-500">{canvas.entityName}</p>
          </div>
        </div>
        <div className="px-2 py-1 text-xs rounded-full bg-success-500/20 text-success-500">
          {canvas.status === 'active' ? 'Active' : canvas.status}
        </div>
      </div>

      {canvas.type === 'business' && (
        <>
          <div className="mb-4">
            <div className="text-sm text-cream-500 mb-1">Net Operating Income</div>
            <div className="text-xl font-medium">{canvas.netOperatingIncome}%</div>
            <div className="h-2 w-full bg-navy-700 rounded-full mt-2">
              <div 
                className="h-full bg-gold-400 rounded-full" 
                style={{ width: `${canvas.netOperatingIncome}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <div>
              <div className="text-sm text-cream-500">Balance</div>
              <div className="font-medium">{formatCurrency(canvas.totalBalance)}</div>
            </div>
            <div>
              <div className="text-sm text-cream-500">Revenue</div>
              <div className="font-medium">{formatCurrency(canvas.monthlyRevenue || 0)}</div>
            </div>
            <div>
              <div className="text-sm text-cream-500">Properties</div>
              <div className="font-medium">{canvas.properties}</div>
            </div>
          </div>

          <div className="mt-auto flex space-x-2">
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate(`/canvas/${canvas.id}`)}
            >
              View Details
            </Button>
            <Button variant="outline" size="sm">
              Quick Transfer
            </Button>
          </div>
        </>
      )}

      {canvas.type === 'savings' && (
        <>
          <div className="mb-4">
            <div className="text-sm text-cream-500 mb-1">Emergency Fund Balance</div>
            <div className="text-xl font-medium">{formatCurrency(canvas.totalBalance)}</div>
            <div className="h-2 w-full bg-navy-700 rounded-full mt-2">
              <div 
                className="h-full bg-gold-400 rounded-full" 
                style={{ width: `${canvas.progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <div>
              <div className="text-sm text-cream-500">Target</div>
              <div className="font-medium">{formatCurrency(canvas.targetBalance || 0)}</div>
            </div>
            <div>
              <div className="text-sm text-cream-500">Progress</div>
              <div className="font-medium">{canvas.progressPercentage}%</div>
            </div>
            <div>
              <div className="text-sm text-cream-500">Monthly</div>
              <div className="font-medium">{formatCurrency(canvas.monthlyContribution || 0)}</div>
            </div>
          </div>

          <div className="mt-auto flex space-x-2">
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate(`/canvas/${canvas.id}`)}
            >
              View Details
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default CanvasCard;