import { cn } from '@/lib/utils';

export function Main({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot='main'
      className={cn(
        // 'bg-foreground',
        'min-h-screen bg-background',
        className,
      )}
      {...props}
    />
  );
}
