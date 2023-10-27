import { Loader } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const spinnerVariants = cva('text-muted-foreground animate-spin', {
  variants: { size: { default: 'h-4 w-4', sm: 'h-2 w-2', lg: 'h-6 w-6', icon: 'h-10 w-10' } },
  defaultVariants: { size: 'default' }
});

interface Props extends VariantProps<typeof spinnerVariants> {}

function Spinner({ size }: Props): JSX.Element {
  return <Loader className={cn(spinnerVariants({ size }))} />;
}
export default Spinner;
