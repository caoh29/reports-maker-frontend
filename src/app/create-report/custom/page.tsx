import CustomReportForm from '@/app/_components/custom-report-form';
import { Main } from '@/app/_components/ui/main';

export default function CustomReportPage() {
  return (
    <Main className='bg-gray-50'>
      <div className='container flex flex-col items-center md:items-start mx-auto px-4 pt-8 pb-4'>
        <h1 className='text-2xl font-bold text-black'>Create Custom Report</h1>
        <p className='text-gray-600'>Design your own personalized report</p>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <CustomReportForm />
      </div>
    </Main>
  );
}
