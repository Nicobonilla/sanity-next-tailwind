// components/NavButton.tsx

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

const NavButton = ({ direction, onClick }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 z-20 -translate-y-1/2 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
      aria-label={`${direction} slide`}
      style={{ [direction === 'prev' ? 'left' : 'right']: '4px' }}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="size-6" />
      ) : (
        <ChevronRight className="size-6" />
      )}
    </button>
  );
};

export default NavButton;
