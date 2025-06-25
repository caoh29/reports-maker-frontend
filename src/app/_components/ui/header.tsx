import React from 'react';
import { FileText } from 'lucide-react';
import { ModeToggle } from './toggle-theme';
import Link from 'next/link';
export function Header() {
  return (
    <header className='container mx-auto px-4 py-6'>
      <div className='flex items-center space-x-2'>
        <FileText className='h-8 w-8 text-blue-600 dark:text-blue-300' />
        <Link href={'/'}>
          <h1 className='text-2xl font-bold text-foreground'>ReportGen</h1>
        </Link>
        <div className='ml-auto'>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
