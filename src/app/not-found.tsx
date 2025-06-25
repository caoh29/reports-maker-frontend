import Link from 'next/link';
import { Button } from '@/app/_components/ui/shadcn/button';
import { FileX, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='text-center'>
        <FileX className='h-24 w-24 text-gray-400 mx-auto mb-6' />
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>404</h1>
        <h2 className='text-xl text-gray-600 mb-6'>Report Type Not Found</h2>
        <p className='text-gray-500 mb-8'>{}</p>
        <Button asChild>
          <Link href='/'>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
