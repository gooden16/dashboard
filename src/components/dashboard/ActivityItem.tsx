import { 
  ArrowLeftRight, 
  CreditCard, 
  TrendingUp,
  BadgeDollarSign
} from 'lucide-react';
import { Transaction } from '../../types';
import { formatCurrency, formatRelativeTime } from '../../utils';

interface ActivityItemProps {
  transaction: Transaction;
}

const ActivityItem = ({ transaction }: ActivityItemProps) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'transfer':
        return <ArrowLeftRight className="text-cream-400" />;
      case 'payment':
        return <CreditCard className="text-error-500" />;
      case 'income':
        return <TrendingUp className="text-success-500" />;
      case 'fee':
        return <BadgeDollarSign className="text-warning-500" />;
      default:
        return <ArrowLeftRight className="text-cream-400" />;
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-navy-700 last:border-0">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center mr-3">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <p className="text-sm text-cream-500">{formatRelativeTime(transaction.date)}</p>
        </div>
      </div>
      <div className={transaction.amount > 0 ? 'text-success-500' : 'text-cream-300'}>
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default ActivityItem;