import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-amber-500/20 text-amber-700 dark:text-amber-200',
        outline: 'border-amber-200 text-amber-600 dark:border-amber-800 dark:text-amber-200',
        success: 'border-transparent bg-emerald-500/20 text-emerald-700 dark:text-emerald-200',
        danger: 'border-transparent bg-rose-500/20 text-rose-700 dark:text-rose-200',
        muted: 'border-transparent bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

