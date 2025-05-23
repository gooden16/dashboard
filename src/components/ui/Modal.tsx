import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'w-full max-w-3xl max-h-[90vh] overflow-auto bg-navy-800 rounded-card border border-navy-700 shadow-card',
          className
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-navy-700 bg-navy-800">
          <h2 className="text-xl font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-navy-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-cream-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;