import { cn } from '../../utils';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Account } from '../../types';
import { formatCurrency } from '../../utils';

interface AccountCardProps {
  account: Account;
  primary?: boolean;
}

const AccountCard = ({ account, primary = false }: AccountCardProps) => {
  return (
    <Card className={cn(
      'flex flex-col',
      primary && 'border-gold-400/50'
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-navy-700 text-xl">
            {account.icon}
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{account.name}</h3>
            <div className="flex items-center text-sm text-cream-500">
              <span>{account.type}</span>
              <span className="mx-2">•</span>
              <span>{account.accountNumber}</span>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 text-xs rounded-full bg-success-500/20 text-success-500">
          {account.status === 'active' ? 'Active' : account.status}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xl md:text-2xl font-playfair mb-1">
          {formatCurrency(account.balance)}
        </div>
        {account.availableBalance !== undefined && (
          <div className="text-sm text-cream-500">
            Available: {formatCurrency(account.availableBalance)}
          </div>
        )}
        {account.interestRate !== undefined && (
          <div className="text-sm text-success-500">
            {account.interestRate}% APY
          </div>
        )}
        {account.monthlyInterest !== undefined && (
          <div className="text-sm text-success-500">
            +{formatCurrency(account.monthlyInterest)}/month
          </div>
        )}
      </div>

      {account.type.includes('Credit Card') && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-cream-500">Credit Limit</span>
            <span>{formatCurrency(account.creditLimit || 0)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-cream-500">Utilization</span>
            <span>{account.utilization}%</span>
          </div>
          {account.nextPayment && (
            <div className="mt-2 p-2 bg-navy-700 rounded-lg">
              <div className="text-sm">Next Payment</div>
              <div className="flex justify-between">
                <span className="font-medium">{formatCurrency(account.nextPayment.amount)}</span>
                <span className="text-warning-500">
                  Due {account.nextPayment.dueDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {account.interestRate !== undefined && account.interestRate > 4.0 && (
        <div className="mb-4 flex items-center text-sm text-success-500 bg-success-500/10 px-2 py-1 rounded">
          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Yield Optimized
        </div>
      )}

      <div className="mt-auto flex space-x-2">
        <Button variant="primary" size="sm">
          Transfer
        </Button>
        <Button variant="outline" size="sm">
          Details
        </Button>
        <Button variant="outline" size="sm">
          Statements
        </Button>
      </div>
    </Card>
  );
};

export default AccountCard;