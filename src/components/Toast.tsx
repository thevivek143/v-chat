import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../store/toast.store';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return { color: '#10B981', icon: <CheckCircle size={18} className="text-[#10B981]" />, borderLeftColor: '#10B981' };
      case 'warning':
        return { color: '#F59E0B', icon: <AlertTriangle size={18} className="text-[#F59E0B]" />, borderLeftColor: '#F59E0B' };
      case 'error':
        return { color: '#EF4444', icon: <XCircle size={18} className="text-[#EF4444]" />, borderLeftColor: '#EF4444' };
      case 'info':
      default:
        return { color: '#6C3CE1', icon: <Info size={18} className="text-[#6C3CE1]" />, borderLeftColor: '#6C3CE1' };
    }
  };

  return (
    <div className="absolute top-[44px] left-0 right-0 z-[9999] pointer-events-none flex flex-col items-center px-4 gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const styles = getToastStyles(toast.type);
          
          return (
            <motion.div
              key={toast.id}
              initial={{ y: -80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-card w-[95%] max-w-[360px] rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-[0.5px] border-border overflow-hidden flex items-center justify-between p-3 pointer-events-auto"
              style={{ borderLeftWidth: '4px', borderLeftColor: styles.borderLeftColor }}
            >
              <div className="flex items-center gap-3">
                {styles.icon}
                <span className="text-[13px] font-semibold text-text leading-tight">{toast.message}</span>
              </div>
              <button onClick={() => removeToast(toast.id)} className="text-text3 hover:text-text cursor-pointer ml-2">
                 <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
