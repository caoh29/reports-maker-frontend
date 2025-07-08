'use client';

import { useActionState } from 'react';
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
// import { capitalizeString } from '@/lib/utils';

interface State {
  logo?: File;
  reportTitle: string;
  recipientName?: string;
  recipientTitle?: string;
  content: string;
  companyName?: string;
  companyPhone?: string;
  signerName: string;
  signerRole: string;
  signature?: File;
  footer?: string;
  date: string;
}

const initialState: State = {
  logo: undefined,
  recipientName: '',
  recipientTitle: '',
  companyName: '',
  companyPhone: '',
  signerName: '',
  signerRole: '',
  signature: undefined,
  footer: '',
  reportTitle: '',
  content: '',
  date: '',
};

const handleSubmit = async (previousState: State, formData: FormData) => {
  try {
    const response = await fetch(`/api/pdf/custom`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Redirect to download page
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.get('reportTitle') ?? 'custom-report'}.pdf`;
      a.click();
      alert('File was successfully generated!');
    } else {
      throw new Error('Failed to generate report');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle error (you might want to show a toast notification)
  }

  return initialState;
};

export default function CustomReportForm() {
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  return (
    <div className='max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>
            {state.reportTitle.length >= 0 && ''}Custom Report Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='reportTitle'>Report Title *</Label>
              <Input
                id='reportTitle'
                type='text'
                name='reportTitle'
                defaultValue={initialState.reportTitle}
                placeholder='Monthly Performance Report'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='recipientName'>Recipient Name</Label>
                <Input
                  id='recipientName'
                  type='text'
                  name='recipientName'
                  defaultValue={initialState.recipientName}
                  placeholder='John Doe'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='recipientTitle'>Recipient Title</Label>
                <Input
                  id='recipientTitle'
                  type='text'
                  name='recipientTitle'
                  defaultValue={initialState.recipientTitle}
                  placeholder='Mr./Dr.'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='logo'>Company Logo</Label>
              <Input
                id='logo'
                type='file'
                name='logo'
                accept='image/png, image/jpeg'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='companyName'>Company Name</Label>
                <Input
                  id='companyName'
                  name='companyName'
                  type='text'
                  placeholder='Acme Corporation'
                  defaultValue={initialState.companyName}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='companyPhone'>Company Phone</Label>
                <Input
                  id='companyPhone'
                  name='companyPhone'
                  type='tel'
                  placeholder='437-356-1415'
                  defaultValue={initialState.companyPhone}
                  pattern='\d{3}\-\d{3}-\d{4}$'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='content'>Report Content *</Label>
              <Textarea
                id='content'
                name='content'
                defaultValue={initialState.content}
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
                <Label htmlFor='signerName'>Signer Name *</Label>
                <Input
                  id='signerName'
                  name='signerName'
                  type='text'
                  placeholder='Jane Smith'
                  defaultValue={initialState.signerName}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='signerRole'>Signer Role *</Label>
                <Input
                  id='signerRole'
                  name='signerRole'
                  type='text'
                  placeholder='Engineering Manager'
                  defaultValue={initialState.signerRole}
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='signature'>Signature</Label>
              <Input
                id='signature'
                name='signature'
                type='file'
                accept='image/png, image/jpeg'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='date'>Report Date *</Label>
              <Input
                id='date'
                type='date'
                name='date'
                defaultValue={initialState.date}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='footer'>Footer</Label>
              <Input
                id='footer'
                name='footer'
                type='text'
                defaultValue={initialState.footer}
              />
            </div>

            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? (
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
