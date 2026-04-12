import { AnimatePresence, motion } from 'motion/react';
import { memo } from 'react';

export interface CoinFlyItem {
  id: number;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

interface CoinFlyLayerProps {
  items: CoinFlyItem[];
  onItemDone: (id: number) => void;
}

const CoinFlyLayer: React.FC<CoinFlyLayerProps> = memo(({ items, onItemDone }) => {
  return (
    <AnimatePresence>
      {items.map((f) => (
        <motion.div
          key={f.id}
          className="border-park-orange/30 bg-park-orange/15 pointer-events-none fixed z-200 flex h-10 w-10 items-center justify-center rounded-full border text-xl shadow-lg backdrop-blur-sm select-none"
          aria-hidden
          initial={{
            left: f.sx,
            top: f.sy,
            x: '-50%',
            y: '-50%',
            scale: 1.18,
            opacity: 1,
            rotate: -8,
          }}
          animate={{
            left: f.ex,
            top: f.ey,
            x: '-50%',
            y: '-50%',
            scale: 0.52,
            opacity: 0.15,
            rotate: 6,
          }}
          exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.12 } }}
          transition={{ duration: 0.58, ease: [0.19, 0.82, 0.22, 1] }}
          onAnimationComplete={() => onItemDone(f.id)}
        >
          💰
        </motion.div>
      ))}
    </AnimatePresence>
  );
});

CoinFlyLayer.displayName = 'CoinFlyLayer';

export default CoinFlyLayer;
