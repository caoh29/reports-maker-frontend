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

export default function ReportForm({ reportType }: Readonly<ReportFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    position: '',
    department: '',
    startDate: '',
    salary: '',
    workSchedule: '',
    companyName: '',
    managerName: '',
    managerTitle: '',
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
      const response = await fetch(`/api/reports/${reportType}`, {
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

  const getFormFields = () => {
    const commonFields = (
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='employeeName'>Employee Name *</Label>
            <Input
              id='employeeName'
              value={formData.employeeName}
              onChange={(e) =>
                handleInputChange('employeeName', e.target.value)
              }
              placeholder='John Doe'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='employeeId'>Employee ID</Label>
            <Input
              id='employeeId'
              value={formData.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
              placeholder='EMP001'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='position'>Position *</Label>
            <Input
              id='position'
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder='Software Engineer'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='department'>Department</Label>
            <Input
              id='department'
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              placeholder='Engineering'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='companyName'>Company Name *</Label>
          <Input
            id='companyName'
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder='Acme Corporation'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='startDate'>Start Date *</Label>
          <Input
            id='startDate'
            type='date'
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            required
          />
        </div>
      </>
    );

    const salaryFields = (
      <div className='space-y-2'>
        <Label htmlFor='salary'>Monthly Salary *</Label>
        <Input
          id='salary'
          type='number'
          value={formData.salary}
          onChange={(e) => handleInputChange('salary', e.target.value)}
          placeholder='5000'
          required
        />
      </div>
    );

    const scheduleFields = (
      <div className='space-y-2'>
        <Label htmlFor='workSchedule'>Work Schedule *</Label>
        <Select
          onValueChange={(value) => handleInputChange('workSchedule', value)}
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

    const managerFields = (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='managerName'>Manager Name</Label>
          <Input
            id='managerName'
            value={formData.managerName}
            onChange={(e) => handleInputChange('managerName', e.target.value)}
            placeholder='Jane Smith'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='managerTitle'>Manager Title</Label>
          <Input
            id='managerTitle'
            value={formData.managerTitle}
            onChange={(e) => handleInputChange('managerTitle', e.target.value)}
            placeholder='Engineering Manager'
          />
        </div>
      </div>
    );

    switch (reportType) {
      case 'employment-letter':
        return (
          <>
            {commonFields}
            {managerFields}
          </>
        );
      case 'salary-certificate':
        return (
          <>
            {commonFields}
            {salaryFields}
            {managerFields}
          </>
        );
      case 'work-schedule-certificate':
        return (
          <>
            {commonFields}
            {scheduleFields}
            {managerFields}
          </>
        );
      case 'income-proof':
        return (
          <>
            {commonFields}
            {salaryFields}
            {scheduleFields}
            {managerFields}
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
        <form onSubmit={handleSubmit} className='space-y-6'>
          {getFormFields()}

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
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
