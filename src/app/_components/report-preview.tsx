import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/shadcn/card';
import { FileText } from 'lucide-react';

interface ReportPreviewProps {
  reportType: string;
}

export default function ReportPreview({
  reportType,
}: Readonly<ReportPreviewProps>) {
  const getPreviewContent = () => {
    switch (reportType) {
      case 'employment-letter':
        return (
          <div className='space-y-4 text-sm'>
            <div className='text-right text-gray-500'>[Date]</div>
            <div>
              <p className='font-semibold'>[Company Name]</p>
              <p>Human Resources Department</p>
            </div>
            <div>
              <p className='font-semibold'>To Whom It May Concern:</p>
            </div>
            <div className='space-y-2'>
              <p>
                This letter is to confirm that{' '}
                <span className='bg-yellow-100 px-1'>[Employee Name]</span> has
                been employed with our company since{' '}
                <span className='bg-yellow-100 px-1'>[Start Date]</span>.
              </p>
              <p>
                <span className='bg-yellow-100 px-1'>[Employee Name]</span>{' '}
                currently holds the position of{' '}
                <span className='bg-yellow-100 px-1'>[Position]</span> in our{' '}
                <span className='bg-yellow-100 px-1'>[Department]</span>{' '}
                department.
              </p>
              <p>This letter is issued upon request for official purposes.</p>
            </div>
            <div className='pt-8'>
              <p>Sincerely,</p>
              <div className='pt-4'>
                <p className='font-semibold'>[Manager Name]</p>
                <p>[Manager Title]</p>
              </div>
            </div>
          </div>
        );
      case 'salary-certificate':
        return (
          <div className='space-y-4 text-sm'>
            <div className='text-center'>
              <h3 className='font-bold text-lg'>SALARY CERTIFICATE</h3>
            </div>
            <div className='text-right text-gray-500'>[Date]</div>
            <div>
              <p className='font-semibold'>Employee Information:</p>
              <ul className='mt-2 space-y-1'>
                <li>
                  Name:{' '}
                  <span className='bg-yellow-100 px-1'>[Employee Name]</span>
                </li>
                <li>
                  Position:{' '}
                  <span className='bg-yellow-100 px-1'>[Position]</span>
                </li>
                <li>
                  Department:{' '}
                  <span className='bg-yellow-100 px-1'>[Department]</span>
                </li>
                <li>
                  Employee ID:{' '}
                  <span className='bg-yellow-100 px-1'>[Employee ID]</span>
                </li>
              </ul>
            </div>
            <div>
              <p className='font-semibold'>Salary Information:</p>
              <p className='mt-2'>
                Monthly Salary: $
                <span className='bg-yellow-100 px-1'>[Salary Amount]</span>
              </p>
            </div>
            <div className='pt-8'>
              <p>Authorized by,</p>
              <div className='pt-4'>
                <p className='font-semibold'>[Manager Name]</p>
                <p>[Manager Title]</p>
                <p>[Company Name]</p>
              </div>
            </div>
          </div>
        );
      case 'work-schedule-certificate':
        return (
          <div className='space-y-4 text-sm'>
            <div className='text-center'>
              <h3 className='font-bold text-lg'>WORK SCHEDULE CERTIFICATE</h3>
            </div>
            <div className='text-right text-gray-500'>[Date]</div>
            <div>
              <p>
                This is to certify that{' '}
                <span className='bg-yellow-100 px-1'>[Employee Name]</span> is
                employed with{' '}
                <span className='bg-yellow-100 px-1'>[Company Name]</span> as a{' '}
                <span className='bg-yellow-100 px-1'>[Position]</span>.
              </p>
            </div>
            <div>
              <p className='font-semibold'>Work Schedule Details:</p>
              <p className='mt-2'>
                Current work schedule:{' '}
                <span className='bg-yellow-100 px-1'>[Work Schedule]</span>
              </p>
              <p>
                Employment start date:{' '}
                <span className='bg-yellow-100 px-1'>[Start Date]</span>
              </p>
            </div>
            <div>
              <p>
                {`This certificate is issued for official purposes upon employee's request.`}
              </p>
            </div>
            <div className='pt-8'>
              <p>Issued by,</p>
              <div className='pt-4'>
                <p className='font-semibold'>[Manager Name]</p>
                <p>[Manager Title]</p>
                <p>[Company Name]</p>
              </div>
            </div>
          </div>
        );
      case 'income-proof':
        return (
          <div className='space-y-4 text-sm'>
            <div className='text-center'>
              <h3 className='font-bold text-lg'>INCOME VERIFICATION</h3>
            </div>
            <div className='text-right text-gray-500'>[Date]</div>
            <div>
              <p className='font-semibold'>Employee Details:</p>
              <ul className='mt-2 space-y-1'>
                <li>
                  Full Name:{' '}
                  <span className='bg-yellow-100 px-1'>[Employee Name]</span>
                </li>
                <li>
                  Position:{' '}
                  <span className='bg-yellow-100 px-1'>[Position]</span>
                </li>
                <li>
                  Department:{' '}
                  <span className='bg-yellow-100 px-1'>[Department]</span>
                </li>
                <li>
                  Employment Date:{' '}
                  <span className='bg-yellow-100 px-1'>[Start Date]</span>
                </li>
              </ul>
            </div>
            <div>
              <p className='font-semibold'>Income Information:</p>
              <ul className='mt-2 space-y-1'>
                <li>
                  Monthly Salary: $
                  <span className='bg-yellow-100 px-1'>[Salary Amount]</span>
                </li>
                <li>
                  Work Schedule:{' '}
                  <span className='bg-yellow-100 px-1'>[Work Schedule]</span>
                </li>
                <li>Employment Status: Active</li>
              </ul>
            </div>
            <div>
              <p>
                This document serves as official proof of income for the
                above-mentioned employee.
              </p>
            </div>
            <div className='pt-8'>
              <p>Verified by,</p>
              <div className='pt-4'>
                <p className='font-semibold'>[Manager Name]</p>
                <p>[Manager Title]</p>
                <p>[Company Name]</p>
              </div>
            </div>
          </div>
        );
      default:
        return <p>Preview not available</p>;
    }
  };

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <FileText className='h-5 w-5' />
          Report Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='bg-white border rounded-lg p-6 shadow-sm'>
          {getPreviewContent()}
        </div>
        <p className='text-xs text-gray-500 mt-2'>
          * Yellow highlighted areas will be filled with your form data
        </p>
      </CardContent>
    </Card>
  );
}
