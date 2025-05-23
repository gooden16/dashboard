import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import Card from '../ui/Card';
import { cn } from '../../utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard = ({ title, value, change, trend, className }: MetricCardProps) => {
  return (
    <Card className={cn('flex flex-col', className)}>
      <div className="text-cream-500 text-sm mb-1">{title}</div>
      <div className="text-2xl font-playfair mb-1">{value}</div>
      {change && (
        <div className={cn(
          'flex items-center text-sm',
          trend === 'up' ? 'trend-up' : 
          trend === 'down' ? 'trend-down' : 
          'trend-neutral'
        )}>
          {trend === 'up' && <ArrowUp size={16} className="mr-1" />}
          {trend === 'down' && <ArrowDown size={16} className="mr-1" />}
          {trend === 'neutral' && <Minus size={16} className="mr-1" />}
          {change}
        </div>
      )}
    </Card>
  );
};

export default MetricCard;