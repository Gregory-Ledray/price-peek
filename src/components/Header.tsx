import { Settings, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onSettingsClick?: () => void;
}

function closeClick() {
    window.close();
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center h-16 px-4 w-full bg-surface-container border-b border-outline-variant sticky top-0 z-50">
      <h1 className="text-sm font-medium text-white tracking-[0.2em] uppercase">Price Peek</h1>
      <div className="flex items-center gap-2">
        <motion.button 
          whileHover={{ color: '#C5A059' }}
          whileTap={{ scale: 0.9 }}
          onClick={onSettingsClick}
          className="p-1 text-[#707070] transition-colors"
        >
          <Settings size={18} />
        </motion.button>
        <motion.button 
          whileHover={{ color: '#C5A059' }}
          className="p-1 text-[#707070] transition-colors"
          onClick={closeClick}
        >
          <X size={18} />
        </motion.button>
      </div>
    </header>
  );
}
