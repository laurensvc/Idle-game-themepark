import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border-[2px] px-2.5 py-0.5 text-xs font-bold transition-all duration-100 cursor-default',
  {
    variants: {
      variant: {
        default:
          'border-[2px] border-primary/30 bg-gradient-to-b from-primary to-primary/75 text-white shadow-[0_2px_0_rgb(16,185,129)/.3] hover:shadow-[0_3px_0_rgb(16,185,129)/.4]',
        secondary:
          'border-[2px] border-gray-300 bg-secondary text-secondary-foreground shadow-[0_2px_0_rgb(212,215,217)/.3] hover:bg-secondary/80',
        destructive:
          'border-[2px] border-red-900/40 bg-gradient-to-b from-destructive to-red-700 text-white shadow-[0_2px_0_rgb(153,27,27)/.3]',
        outline:
          'border-[2px] border-gray-400 bg-background text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground active:border-gray-500',
        operating:
          'border-[2px] border-park-green/40 bg-gradient-to-br from-park-green/20 to-park-green/8 text-park-green shadow-[0_2px_0_rgb(74,222,128)/.2] hover:bg-park-green/25',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };
