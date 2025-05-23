import { useState } from 'react';
import { ArrowRightLeft, Plus, CalendarClock } from 'lucide-react';
import Modal from '../ui/Modal';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatCurrency } from '../../utils';

interface MoveMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoveMoneyModal = ({ isOpen, onClose }: MoveMoneyModalProps) => {
  const [step, setStep] = useState<'menu' | 'new-payee' | 'payment'>('menu');
  const [frequency, setFrequency] = useState<'one-time' | 'recurring'>('one-time');
  
  const renderNewPayee = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Add New Payee</h3>
      <Input label="Payee Name" placeholder="Enter business or individual name" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Account Number" placeholder="Enter account number" />
        <Input label="Routing Number" placeholder="Enter routing number" />
      </div>
      <Input label="Phone Number" type="tel" placeholder="(555) 555-5555" />
      <Input label="Address" placeholder="Enter street address" />
      <div className="grid grid-cols-3 gap-4">
        <Input label="City" placeholder="City" />
        <Input label="State" placeholder="State" />
        <Input label="ZIP Code" placeholder="ZIP" />
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="outline" onClick={() => setStep('menu')}>Cancel</Button>
        <Button onClick={() => setStep('payment')}>Continue</Button>
      </div>
    </div>
  );

  const renderPaymentDetails = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Payment Details</h3>
      
      <div className="flex space-x-4 mb-6">
        <Button 
          variant={frequency === 'one-time' ? 'primary' : 'outline'}
          onClick={() => setFrequency('one-time')}
          className="flex-1"
        >
          One-Time
        </Button>
        <Button 
          variant={frequency === 'recurring' ? 'primary' : 'outline'}
          onClick={() => setFrequency('recurring')}
          className="flex-1"
        >
          Recurring
        </Button>
      </div>

      <Input 
        label="Amount" 
        type="number" 
        placeholder="0.00"
        prefix="$"
      />
      
      <Input 
        label="Receipt Date"
        type="date"
        min={new Date().toISOString().split('T')[0]}
      />

      {frequency === 'recurring' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input 
              label="Frequency"
              type="select"
              className="flex-1"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </Input>
            <Input 
              label="End Date"
              type="date"
              className="flex-1"
            />
          </div>
        </div>
      )}

      <Card variant="darker" className="p-4 mt-6">
        <h4 className="font-medium mb-2">Smart Routing</h4>
        <p className="text-sm text-cream-500 mb-4">
          Based on the payment details, we recommend:
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Method:</span>
            <span className="font-medium">ACH Transfer</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Estimated Fee:</span>
            <span className="text-success-500">$0.00</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Arrival:</span>
            <span className="font-medium">2-3 business days</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="outline" onClick={() => setStep('menu')}>Back</Button>
        <Button onClick={onClose}>Schedule Payment</Button>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card 
        hover 
        className="p-6 cursor-pointer"
        onClick={() => setStep('new-payee')}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center mr-3">
            <Plus className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-medium">New Payment</h3>
            <p className="text-sm text-cream-500">Add a new payee</p>
          </div>
        </div>
      </Card>

      <Card 
        hover 
        className="p-6 cursor-pointer"
        onClick={() => setStep('payment')}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center mr-3">
            <CalendarClock className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-medium">Recent Payees</h3>
            <p className="text-sm text-cream-500">Schedule a payment</p>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Move Money"
    >
      {step === 'menu' && renderMenu()}
      {step === 'new-payee' && renderNewPayee()}
      {step === 'payment' && renderPaymentDetails()}
    </Modal>
  );
};

export default MoveMoneyModal;