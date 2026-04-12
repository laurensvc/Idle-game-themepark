import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        operating: 'border-transparent bg-park-green/15 text-park-green',
        broken: 'border-transparent bg-park-red/15 text-park-red',
        repairing: 'border-transparent bg-park-yellow/15 text-park-yellow',
        idle: 'border-transparent bg-muted text-muted-foreground',
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
