// 'use client';

// import type React from 'react';

// import { useState } from 'react';
// import { Button } from '@/app/_components/ui/shadcn/button';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/app/_components/ui/shadcn/card';
// import { Input } from '@/app/_components/ui/shadcn/input';
// import { Label } from '@/app/_components/ui/shadcn/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/app/_components/ui/shadcn/select';
// import { Loader2 } from 'lucide-react';

// interface ReportFormProps {
//   reportType: string;
// }

// export default function ReportForm({ reportType }: Readonly<ReportFormProps>) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     logoUrl: undefined,
//     employeeName: '',
//     employeeId: '',
//     employeeIdType: '',
//     position: '',
//     department: '',
//     startDate: '',
//     salary: '',
//     workSchedule: '',
//     // contractType?: 'HOURLY' | 'ANNUALLY',
//     contractType: undefined,
//     companyName: '',
//     companyPhone: '',
//     signerName: '',
//     signerRole: '',
//     signature: undefined,
//     // footer: string,
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const reqObj = {
//       header: {
//         logoUrl: formData.logoUrl,
//         stamp: {
//           companyName: formData.companyName,
//           companyPhone: formData.companyPhone,
//         },
//       },
//       body: {
//         date: new Date(),
//         employee: {
//           name: formData.employeeName,
//           documentType: formData.employeeIdType,
//           documentNumber: formData.employeeId,
//           role: formData.position,
//           startDate: formData.startDate,
//         },
//       },
//       sign: {
//         signerName: formData.signerName,
//         signerRole: formData.signerRole,
//         signatureUrl: formData.signature,
//         companyName: formData.companyName,
//       },
//     };

//     try {
//       // Simulate API call to your backend
//       const response = await fetch(`http://localhost:4000/pdf/${reportType}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reqObj),
//       });

//       if (response.ok) {
//         // Redirect to download page
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${formData.employeeName ?? 'custom-report'}.pdf`;
//         a.click();
//         alert('File was successfully generated!');
//       } else {
//         throw new Error('Failed to generate report');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       // Handle error (you might want to show a toast notification)
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getFormFields = () => {
//     const commonFields = (
//       <>
//         <div className='space-y-2'>
//           <Label htmlFor='logoUrl'>Company Logo *</Label>
//           <Input
//             id='logoUrl'
//             type='file'
//             value={formData.logoUrl}
//             onChange={(e) => handleInputChange('logoUrl', e.target.value)}
//             required
//           />
//         </div>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//           <div className='space-y-2'>
//             <Label htmlFor='companyName'>Company Name *</Label>
//             <Input
//               id='companyName'
//               value={formData.companyName}
//               onChange={(e) => handleInputChange('companyName', e.target.value)}
//               placeholder='Acme Corporation'
//               required
//             />
//           </div>
//           <div className='space-y-2'>
//             <Label htmlFor='companyPhone'>Company Phone *</Label>
//             <Input
//               id='companyPhone'
//               type='tel'
//               value={formData.companyPhone}
//               onChange={(e) =>
//                 handleInputChange('companyPhone', e.target.value)
//               }
//               placeholder='4379998877'
//               required
//             />
//           </div>
//         </div>
//         <div className='space-y-2'>
//           <Label htmlFor='employeeName'>Employee Name *</Label>
//           <Input
//             id='employeeName'
//             value={formData.employeeName}
//             onChange={(e) => handleInputChange('employeeName', e.target.value)}
//             placeholder='John Doe'
//             required
//           />
//         </div>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//           <div className='space-y-2'>
//             <Label htmlFor='employeeIdType'>Employee ID Type *</Label>
//             <Input
//               id='employeeIdType'
//               value={formData.employeeIdType}
//               onChange={(e) =>
//                 handleInputChange('employeeIdType', e.target.value)
//               }
//               placeholder='Passport'
//               required
//             />
//           </div>
//           <div className='space-y-2'>
//             <Label htmlFor='employeeId'>Employee ID *</Label>
//             <Input
//               id='employeeId'
//               value={formData.employeeId}
//               onChange={(e) => handleInputChange('employeeId', e.target.value)}
//               placeholder='AT001'
//               required
//             />
//           </div>
//         </div>
//       </>
//     );

//     const startDateFields = (
//       <div className='space-y-2'>
//         <Label htmlFor='startDate'>Start Date *</Label>
//         <Input
//           id='startDate'
//           type='date'
//           value={formData.startDate}
//           onChange={(e) => handleInputChange('startDate', e.target.value)}
//           required
//         />
//       </div>
//     );

//     const roleFields = (
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//         <div className='space-y-2'>
//           <Label htmlFor='position'>Position *</Label>
//           <Input
//             id='position'
//             value={formData.position}
//             onChange={(e) => handleInputChange('position', e.target.value)}
//             placeholder='Software Engineer'
//             required
//           />
//         </div>
//         <div className='space-y-2'>
//           <Label htmlFor='department'>Department</Label>
//           <Input
//             id='department'
//             value={formData.department}
//             onChange={(e) => handleInputChange('department', e.target.value)}
//             placeholder='Engineering'
//           />
//         </div>
//       </div>
//     );

//     const salaryFields = (
//       <div className='space-y-2'>
//         <Label htmlFor='salary'>Monthly Salary *</Label>
//         <Input
//           id='salary'
//           type='number'
//           value={formData.salary}
//           onChange={(e) => handleInputChange('salary', e.target.value)}
//           placeholder='5000'
//           required
//         />
//       </div>
//     );

//     const scheduleFields = (
//       <div className='space-y-2'>
//         <Label htmlFor='workSchedule'>Work Schedule *</Label>
//         <Select
//           onValueChange={(value) => handleInputChange('workSchedule', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder='Select work schedule' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='full-time'>Full-time (40 hours/week)</SelectItem>
//             <SelectItem value='part-time'>Part-time (20 hours/week)</SelectItem>
//             <SelectItem value='flexible'>Flexible hours</SelectItem>
//             <SelectItem value='remote'>Remote work</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     );

//     const signerFields = (
//       <>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//           <div className='space-y-2'>
//             <Label htmlFor='signerName'>Manager Name</Label>
//             <Input
//               id='signerName'
//               value={formData.signerName}
//               onChange={(e) => handleInputChange('signerName', e.target.value)}
//               placeholder='Jane Smith'
//             />
//           </div>
//           <div className='space-y-2'>
//             <Label htmlFor='signerRole'>Manager Title</Label>
//             <Input
//               id='signerRole'
//               value={formData.signerRole}
//               onChange={(e) =>
//                 handleInputChange('signerRole', e.target.value)
//               }
//               placeholder='Engineering Manager'
//             />
//           </div>
//         </div>
//         <div className='space-y-2'>
//           <Label htmlFor='signature'>Manager Name</Label>
//           <Input
//             id='signature'
//             type='file'
//             value={formData.signature}
//             onChange={(e) =>
//               handleInputChange('signature', e.target.value)
//             }
//           />
//         </div>
//       </>
//     );

//     switch (reportType) {
//       case 'employment-letter':
//         return (
//           <>
//             {commonFields}
//             {roleFields}
//             {startDateFields}
//             {signerFields}
//           </>
//         );
//       case 'salary-certificate':
//         return (
//           <>
//             {commonFields}
//             {salaryFields}
//             {signerFields}
//           </>
//         );
//       case 'work-schedule-certificate':
//         return (
//           <>
//             {commonFields}
//             {scheduleFields}
//             {signerFields}
//           </>
//         );
//       case 'income-proof':
//         return (
//           <>
//             {commonFields}
//             {salaryFields}
//             {scheduleFields}
//             {signerFields}
//           </>
//         );
//       default:
//         return commonFields;
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Report Information</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className='space-y-6'>
//           {getFormFields()}

//           <Button type='submit' className='w-full' disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                 Generating Report...
//               </>
//             ) : (
//               'Generate Report'
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import type React from 'react';

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
  // contractType?: 'HOURLY' | 'ANNUALLY',
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

    console.log(response);

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
          <Input
            id='logo'
            type='file'
            name='logo'
            // required
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='companyName'>Company Name *</Label>
            <Input
              id='companyName'
              name='companyName'
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
              placeholder='4379998877'
              defaultValue={initialState.companyPhone}
              required
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='employeeName'>Employee Name *</Label>
          <Input
            id='employeeName'
            name='employeeName'
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
            placeholder='Engineering'
            defaultValue={initialState.department}
            required
          />
        </div>
      </div>
    );

    const salaryFields = (
      <div className='space-y-2'>
        <Label htmlFor='salary'>Monthly Salary *</Label>
        <Input
          id='salary'
          name='salary'
          type='number'
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
        <Input id='footer' name='footer' defaultValue={initialState.footer} />
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
            {scheduleFields}
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
