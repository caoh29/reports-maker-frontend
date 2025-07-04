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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/shadcn/select';
import { Loader2 } from 'lucide-react';

interface ReportFormProps {
  reportType: string;
}

interface State {
  logo?: File;
  employeeName: string;
  employeeId: string;
  employeeIdType: string;
  role?: string;
  department?: string;
  startDate?: string;
  salary?: number;
  workSchedule?: string;
  contractType?: string;
  companyName: string;
  companyPhone: string;
  signerName: string;
  signerRole: string;
  signature?: File;
  footer?: string;
  reportType: string;
}

const initialState: State = {
  logo: undefined,
  employeeName: '',
  employeeId: '',
  employeeIdType: '',
  role: '',
  department: '',
  startDate: undefined,
  salary: undefined,
  workSchedule: undefined,
  contractType: undefined,
  companyName: '',
  companyPhone: '',
  signerName: '',
  signerRole: '',
  signature: undefined,
  footer: '',
  reportType: '',
};

const handleSubmit = async (previousState: State, formData: FormData) => {
  try {
    const response = await fetch(
      `http://localhost:4000/pdf/${formData.get('reportType')}`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (response.ok) {
      // Redirect to download page
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.get('employeeName') ?? 'custom-report'}.pdf`;
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

export default function ReportForm({ reportType }: Readonly<ReportFormProps>) {
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  const getFormFields = () => {
    const commonFields = (
      <>
        <Input
          id='reportType'
          type='text'
          name='reportType'
          defaultValue={reportType}
          className='hidden'
          required
        />
        <div className='space-y-2'>
          <Label htmlFor='logo'>Company Logo *</Label>
          <Input id='logo' type='file' name='logo' required />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='companyName'>Company Name *</Label>
            <Input
              id='companyName'
              name='companyName'
              type='text'
              placeholder='Acme Corporation'
              defaultValue={initialState.companyName}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='companyPhone'>Company Phone *</Label>
            <Input
              id='companyPhone'
              name='companyPhone'
              type='tel'
              placeholder='+1 (437)-356-1415'
              defaultValue={initialState.companyPhone}
              pattern='^\+\d{1,3}\s\(\d{3}\)-\d{3}-\d{4}$'
              required
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='employeeName'>Employee Name *</Label>
          <Input
            id='employeeName'
            name='employeeName'
            type='text'
            placeholder='John Doe'
            defaultValue={initialState.employeeName}
            required
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='employeeIdType'>Employee ID Type *</Label>
            <Input
              id='employeeIdType'
              name='employeeIdType'
              type='text'
              placeholder='Passport'
              defaultValue={initialState.employeeIdType}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='employeeId'>Employee ID *</Label>
            <Input
              id='employeeId'
              name='employeeId'
              type='text'
              placeholder='AT001'
              defaultValue={initialState.employeeId}
              required
            />
          </div>
        </div>
      </>
    );

    const startDateFields = (
      <div className='space-y-2'>
        <Label htmlFor='startDate'>Start Date *</Label>
        <Input
          id='startDate'
          name='startDate'
          type='date'
          defaultValue={initialState.startDate}
          required
        />
      </div>
    );

    const roleFields = (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='role'>Role *</Label>
          <Input
            id='role'
            name='role'
            type='text'
            placeholder='Software Engineer'
            defaultValue={initialState.role}
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='department'>Department *</Label>
          <Input
            id='department'
            name='department'
            type='text'
            placeholder='Engineering'
            defaultValue={initialState.department}
            required
          />
        </div>
      </div>
    );

    const salaryFields = (
      <div className='space-y-2'>
        <Label htmlFor='salary'>Average Income *</Label>
        <Input
          id='salary'
          name='salary'
          type='number'
          min={1}
          step={1}
          placeholder='5000'
          defaultValue={initialState.salary}
          required
        />
      </div>
    );

    const scheduleFields = (
      <div className='space-y-2'>
        <Label htmlFor='workSchedule'>Work Schedule *</Label>
        <Select
          name='workSchedule'
          defaultValue={initialState.workSchedule}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder='Select work schedule' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='full-time'>Full-time (40 hours/week)</SelectItem>
            <SelectItem value='part-time'>Part-time (20 hours/week)</SelectItem>
            <SelectItem value='flexible'>Flexible hours</SelectItem>
            <SelectItem value='remote'>Remote work</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );

    const contractFields = (
      <div className='space-y-2'>
        <Label htmlFor='contractType'>Contract Type *</Label>
        <Select
          name='contractType'
          defaultValue={initialState.contractType}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder='Select contract type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='annually'>Annually</SelectItem>
            <SelectItem value='hourly'>Hourly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );

    const signerFields = (
      <>
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
          <Input id='signature' name='signature' type='file' />
        </div>
      </>
    );

    const footerFields = (
      <div className='space-y-2'>
        <Label htmlFor='footer'>Footer</Label>
        <Input
          id='footer'
          name='footer'
          type='text'
          defaultValue={initialState.footer}
        />
      </div>
    );

    switch (reportType) {
      case 'employment-letter':
        return (
          <>
            {commonFields}
            {roleFields}
            {startDateFields}
            {signerFields}
            {footerFields}
          </>
        );
      case 'salary-certificate':
        return (
          <>
            {commonFields}
            {roleFields}
            {startDateFields}
            {contractFields}
            {salaryFields}
            {signerFields}
            {footerFields}
          </>
        );
      case 'work-schedule-certificate':
        return (
          <>
            {commonFields}
            {roleFields}
            {scheduleFields}
            {signerFields}
            {footerFields}
          </>
        );
      case 'income-proof':
        return (
          <>
            {commonFields}
            {salaryFields}
            {signerFields}
            {footerFields}
          </>
        );
      default:
        return commonFields;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className='space-y-6'>
          {getFormFields()}

          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Generating Report...
              </>
            ) : (
              'Generate Report'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
