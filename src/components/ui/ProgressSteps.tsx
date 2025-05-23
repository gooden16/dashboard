import { cn } from '../../utils';

export interface Step {
  name: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressStepsProps {
  steps: Step[];
  className?: string;
}

const ProgressSteps = ({ steps, className }: ProgressStepsProps) => {
  return (
    <div className={cn('w-full py-4', className)}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li key={step.name} className={cn(
            'flex items-center',
            index === steps.length - 1 ? 'w-auto' : 'w-full'
          )}>
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full shrink-0',
              step.status === 'completed' ? 'bg-gold-400 text-navy-900' :
              step.status === 'current' ? 'bg-navy-600 text-cream-300 border-2 border-gold-400' :
              'bg-navy-700 text-cream-500'
            )}>
              {step.status === 'completed' ? (
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={cn(
              'ms-2 text-sm font-medium',
              step.status === 'completed' ? 'text-gold-400' :
              step.status === 'current' ? 'text-cream-300' :
              'text-cream-500'
            )}>
              {step.name}
            </span>
            
            {index < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-4',
                step.status === 'completed' ? 'bg-gold-400' : 'bg-navy-700'
              )}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressSteps;