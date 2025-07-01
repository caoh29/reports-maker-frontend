import { notFound } from 'next/navigation';
import ReportForm from '@/app/_components/report-form';
import ReportPreview from '@/app/_components/report-preview';
import { Main } from '@/app/_components/ui/main';
import { capitalizeString } from '@/lib/utils';

const validReportTypes = [
  'employment-letter',
  'salary-certificate',
  'work-schedule-certificate',
  'income-proof',
];

// const reportTitles = {
//   'employment-letter': 'Employment Letter',
//   'salary-certificate': 'Salary Certificate',
//   'work-schedule-certificate': 'Work Schedule Certificate',
//   'income-proof': 'Income Proof',
// };

interface PageProps {
  params: {
    type: string;
  };
}

// type Report = {
//   name: string;
//   type: string;
// };

// export async function generateStaticParams() {
//   const reports: Report[] | null = await fetch(
//     'http://127.0.0.1:3000/pdf/reports',
//   ).then((res) => res.json());

//   if (!reports) {
//     return [];
//   }

//   return reports.map((report) => ({
//     type: report.name,
//   }));
// }

export default async function CreateReportPage({
  params,
}: Readonly<PageProps>) {
  const awaitedParams = await Promise.resolve(params);
  const { type } = awaitedParams;

  if (!validReportTypes.includes(type)) {
    notFound();
  }

  return (
    <Main className='bg-gray-50'>
      <div className='container flex flex-col items-center md:items-start mx-auto px-4 pt-8 pb-4'>
        <h1 className='text-2xl font-bold text-black'>
          Create {capitalizeString(type)}
        </h1>
        <p className='text-gray-600'>Design your own personalized report</p>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        {/* Mobile: Form only */}
        <div className='lg:hidden'>
          <ReportForm reportType={type} />
        </div>

        {/* Desktop: Two columns */}
        <div className='hidden lg:grid lg:grid-cols-2 lg:gap-8'>
          {/* Left Column: Form */}
          <div>
            <ReportForm reportType={type} />
          </div>

          {/* Right Column: Preview */}
          <div className='sticky top-8'>
            <ReportPreview reportType={type} />
          </div>
        </div>
      </div>
    </Main>
  );
}
