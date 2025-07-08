import { FileText, Zap, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/shadcn/card';
import ReportSelector from '@/app/_components/report-selector';
import { Main } from './_components/ui/main';

export type Report = {
  name: string;
  id: string;
  description: string;
};

export default async function LandingPage() {
  const reports: Report[] =
    (await fetch('http://localhost:4000/api/pdf/reports', {
      cache: 'force-cache',
    }).then((res) => res.json())) ?? [];

  return (
    <Main className='bg-blue-300 dark:bg-blue-500/30'>
      <section className='container mx-auto px-4 py-12 text-center'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>
            Generate Professional Reports
            <span className='text-blue-600'> Instantly</span>
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Create employment letters, salary certificates, and custom reports
            with our easy-to-use platform. Professional templates, instant
            generation.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          <Card className='text-center'>
            <CardHeader>
              <Zap className='h-12 w-12 text-blue-600 mx-auto mb-4' />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate reports in seconds with our optimized templates and
                instant processing.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='text-center'>
            <CardHeader>
              <FileText className='h-12 w-12 text-green-600 mx-auto mb-4' />
              <CardTitle>Professional Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pre-made templates for employment letters, salary certificates,
                and more.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='text-center'>
            <CardHeader>
              <Users className='h-12 w-12 text-purple-600 mx-auto mb-4' />
              <CardTitle>Custom Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create fully customized reports tailored to your specific needs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Report Selection */}
      <section className='container mx-auto px-4 py-12'>
        <div className='max-w-2xl mx-auto'>
          <Card className='shadow-xl'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl'>
                Choose Your Report Type
              </CardTitle>
              <CardDescription>
                Select from our pre-made templates or create a custom report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportSelector reports={reports} />
            </CardContent>
          </Card>
        </div>
      </section>
    </Main>
  );
}
