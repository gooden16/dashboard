import { useState } from 'react';
import { cn } from '../../utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

const Tabs = ({ tabs, defaultTab, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-navy-700 mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-3 px-4 text-sm font-medium border-b-2 transition-all duration-200',
                activeTab === tab.id
                  ? 'border-gold-400 text-gold-400'
                  : 'border-transparent text-cream-500 hover:text-cream-300 hover:border-navy-600'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;