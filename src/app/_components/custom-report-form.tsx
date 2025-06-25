'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/_components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/shadcn/card';
import { Input } from '@/app/_components/ui/shadcn/input';
import { Label } from '@/app/_components/ui/shadcn/label';
import { Textarea } from '@/app/_components/ui/shadcn/textarea';
import { Loader2 } from 'lucide-react';

export default function CustomReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    reportBody: '',
    authorName: '',
    authorTitle: '',
    date: new Date().toISOString().split('T')[0],
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to your backend
      const response = await fetch('/api/reports/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to download page
        router.push('/download');
      } else {
        throw new Error('Failed to generate report');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (you might want to show a toast notification)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Report Title *</Label>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder='Monthly Performance Report'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='recipientName'>Recipient Name</Label>
                <Input
                  id='recipientName'
                  value={formData.recipientName}
                  onChange={(e) =>
                    handleInputChange('recipientName', e.target.value)
                  }
                  placeholder='John Doe'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='recipientTitle'>Recipient Title</Label>
                <Input
                  id='recipientTitle'
                  value={formData.recipientTitle}
                  onChange={(e) =>
                    handleInputChange('recipientTitle', e.target.value)
                  }
                  placeholder='HR Manager'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='companyName'>Company Name</Label>
              <Input
                id='companyName'
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange('companyName', e.target.value)
                }
                placeholder='Acme Corporation'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='reportBody'>Report Content *</Label>
              <Textarea
                id='reportBody'
                value={formData.reportBody}
                onChange={(e) =>
                  handleInputChange('reportBody', e.target.value)
                }
                placeholder='Enter the main content of your report here. You can include multiple paragraphs, bullet points, and any other relevant information...'
                rows={10}
                required
                className='min-h-[200px]'
              />
              <p className='text-sm text-gray-500'>
                This will be the main body of your report. You can format it as
                needed.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='authorName'>Author Name *</Label>
                <Input
                  id='authorName'
                  value={formData.authorName}
                  onChange={(e) =>
                    handleInputChange('authorName', e.target.value)
                  }
                  placeholder='Jane Smith'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='authorTitle'>Author Title</Label>
                <Input
                  id='authorTitle'
                  value={formData.authorTitle}
                  onChange={(e) =>
                    handleInputChange('authorTitle', e.target.value)
                  }
                  placeholder='Department Manager'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='date'>Report Date *</Label>
              <Input
                id='date'
                type='date'
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Generating Custom Report...
                </>
              ) : (
                'Generate Custom Report'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
