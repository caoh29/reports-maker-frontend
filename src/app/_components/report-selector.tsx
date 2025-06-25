'use client';

// import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/_components/ui/shadcn/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/shadcn/select';
import { Card, CardContent } from '@/app/_components/ui/shadcn/card';
import { Edit, Briefcase, DollarSign, Calendar, Receipt } from 'lucide-react';

const reportTypes = [
  {
    id: 'employment-letter',
    name: 'Employment Letter',
    description: 'Official employment verification letter',
    icon: Briefcase,
  },
  {
    id: 'salary-certificate',
    name: 'Salary Certificate',
    description: 'Salary verification and income statement',
    icon: DollarSign,
  },
  {
    id: 'work-schedule-certificate',
    name: 'Work Schedule Certificate',
    description: 'Work hours and schedule verification',
    icon: Calendar,
  },
  {
    id: 'income-proof',
    name: 'Income Proof',
    description: 'Comprehensive income verification document',
    icon: Receipt,
  },
];

export default function ReportSelector() {
  // const [selectedReport, setSelectedReport] = useState<string>('');
  const router = useRouter();

  const handleReportSelect = (reportId: string) => {
    if (reportId === 'custom') {
      router.push('/create-report/custom');
    } else {
      router.push(`/create-report/${reportId}`);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Quick Select Dropdown */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Quick Select</h3>
        <Select onValueChange={handleReportSelect}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Choose a report type...' />
          </SelectTrigger>
          <SelectContent>
            {reportTypes.map((report) => (
              <SelectItem key={report.id} value={report.id}>
                {report.name}
              </SelectItem>
            ))}
            <SelectItem value='custom'>Custom Report</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='text-center text-gray-500'>or</div>

      {/* Visual Report Cards */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Browse Templates</h3>
        <div className='grid gap-4'>
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            return (
              <Card
                key={report.id}
                className='cursor-pointer hover:shadow-md transition-shadow'
                onClick={() => handleReportSelect(report.id)}
              >
                <CardContent className='flex items-center p-4'>
                  <IconComponent className='h-8 w-8 text-blue-600 mr-4' />
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{report.name}</h4>
                    <p className='text-sm text-gray-600'>
                      {report.description}
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    Select
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          {/* Custom Report Card */}
          <Card
            className='cursor-pointer hover:shadow-md transition-shadow border-dashed border-2'
            onClick={() => handleReportSelect('custom')}
          >
            <CardContent className='flex items-center p-4'>
              <Edit className='h-8 w-8 text-green-600 mr-4' />
              <div className='flex-1'>
                <h4 className='font-semibold'>Custom Report</h4>
                <p className='text-sm text-gray-600'>
                  Create a personalized report with your own content
                </p>
              </div>
              <Button variant='outline' size='sm'>
                Create
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
