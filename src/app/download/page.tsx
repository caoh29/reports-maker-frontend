'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/_components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/shadcn/card';
import { CheckCircle, Download, FileText, Home } from 'lucide-react';

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    // Simulate download process
    setTimeout(() => {
      // In a real app, you would trigger the actual download here
      // For now, we'll just simulate it
      const link = document.createElement('a');
      link.href = '/placeholder.pdf'; // This would be your actual PDF URL from the backend
      link.download = 'report.pdf';
      link.click();
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='mx-auto mb-4'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>
          <CardTitle className='text-2xl text-green-700'>
            Report Generated Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <p className='text-gray-600'>
            Your report has been generated and is ready for download. Click the
            button below to download your PDF document.
          </p>

          <div className='space-y-3'>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className='w-full'
              size='lg'
            >
              {isDownloading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Preparing Download...
                </>
              ) : (
                <>
                  <Download className='mr-2 h-4 w-4' />
                  Download Report
                </>
              )}
            </Button>

            <div className='flex gap-2'>
              <Button variant='outline' asChild className='flex-1'>
                <Link href='/'>
                  <Home className='mr-2 h-4 w-4' />
                  Home
                </Link>
              </Button>
              <Button variant='outline' asChild className='flex-1'>
                <Link href='/'>
                  <FileText className='mr-2 h-4 w-4' />
                  New Report
                </Link>
              </Button>
            </div>
          </div>

          <div className='text-xs text-gray-500 pt-4 border-t'>
            <p>Need help? Contact our support team</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
