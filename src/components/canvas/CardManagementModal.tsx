import { useState } from 'react';
import { CreditCard, Lock, Unlock, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatCurrency } from '../../utils';
import { Card as CardType } from '../../types';

interface CardManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock card data - in production this would come from your backend
const mockCards: CardType[] = [
  {
    id: 'card1',
    type: 'physical',
    status: 'active',
    number: '4111 1111 1111 1111',
    expirationDate: '12/25',
    cvv: '123',
    limits: {
      daily: 5000,
      monthly: 25000
    },
    categories: {
      travel: true,
      dining: true,
      retail: true,
      online: true
    }
  }
];

const CardManagementModal = ({ isOpen, onClose }: CardManagementModalProps) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [isEditingLimits, setIsEditingLimits] = useState(false);

  const formatCardNumber = (number: string) => {
    if (showSensitiveInfo) {
      return number.match(/.{1,4}/g)?.join(' ') || number;
    }
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  const handleLockCard = (card: CardType) => {
    // In production, this would call your backend API
    console.log('Locking card:', card.id);
  };

  const handleCancelCard = (card: CardType) => {
    // In production, this would call your backend API
    console.log('Canceling card:', card.id);
  };

  const renderCardDetails = (card: CardType) => (
    <div className="space-y-6">
      {/* Physical Card Representation */}
      <div className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl p-6 text-cream-100">
        <div className="absolute top-4 right-4">
          <CreditCard className="w-8 h-8 text-gold-400" />
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-4">
            <div className="text-sm text-cream-400">Canvas Financial</div>
            <div className="font-mono text-xl">{formatCardNumber(card.number)}</div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-cream-400">Valid Thru</div>
              <div>{showSensitiveInfo ? card.expirationDate : '••/••'}</div>
            </div>
            <div>
              <div className="text-xs text-cream-400">CVV</div>
              <div>{showSensitiveInfo ? card.cvv : '•••'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Controls */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
          icon={showSensitiveInfo ? <Lock /> : <Unlock />}
        >
          {showSensitiveInfo ? 'Hide Details' : 'Show Details'}
        </Button>
        <Button
          variant={card.status === 'active' ? 'outline' : 'primary'}
          onClick={() => handleLockCard(card)}
        >
          {card.status === 'active' ? 'Lock Card' : 'Unlock Card'}
        </Button>
      </div>

      {/* Spending Limits */}
      <Card variant="darker" className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Spending Limits</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingLimits(!isEditingLimits)}
          >
            {isEditingLimits ? 'Save' : 'Edit'}
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-cream-500 mb-1">Daily Limit</div>
            {isEditingLimits ? (
              <Input
                type="number"
                prefix="$"
                defaultValue={card.limits.daily}
              />
            ) : (
              <div className="font-medium">{formatCurrency(card.limits.daily)}</div>
            )}
          </div>
          <div>
            <div className="text-sm text-cream-500 mb-1">Monthly Limit</div>
            {isEditingLimits ? (
              <Input
                type="number"
                prefix="$"
                defaultValue={card.limits.monthly}
              />
            ) : (
              <div className="font-medium">{formatCurrency(card.limits.monthly)}</div>
            )}
          </div>
        </div>
      </Card>

      {/* Merchant Categories */}
      <Card variant="darker" className="p-4">
        <h3 className="font-medium mb-4">Allowed Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(card.categories).map(([category, enabled]) => (
            <div
              key={category}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={enabled}
                className="rounded border-navy-600 text-gold-400 focus:ring-gold-400"
                onChange={() => {
                  // In production, this would update the backend
                  console.log('Toggling category:', category);
                }}
              />
              <span className="capitalize">{category}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Cancel Card */}
      <Card variant="darker" className="p-4">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-5 h-5 text-error-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-error-500">Cancel Card</h3>
            <p className="text-sm text-cream-500 mb-4">
              Canceling this card is permanent and cannot be undone.
            </p>
            <Button
              variant="outline"
              className="text-error-500 border-error-500 hover:bg-error-500/10"
              onClick={() => handleCancelCard(card)}
            >
              Cancel Card
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Card Management"
    >
      {mockCards.map(card => renderCardDetails(card))}
    </Modal>
  );
};

export default CardManagementModal;