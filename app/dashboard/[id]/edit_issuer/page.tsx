import Form from '@/app/ui/calcDashboard/issuers/edit-issuer-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchIssuerById } from '@/app/lib/data';
import  PoliciesTable  from '@/app/ui/calcDashboard/policies/policiesTable'
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';



export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const issuer = await fetchIssuerById(id)

  if(!issuer){
    notFound()
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Issuers', href: '/dashboard/Dashboard' },
          {
            label: 'Edit Issuer',
            href: `/dashboard/Dashboard/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form issuer={issuer } />
      {/* 🛠️ Modernized typography block with clear visual hierarchy */}
      <div className="border-t border-gray-100 pt-6 mt-6">
      {/* 1. Add New Policy Button */}
      <Link
        href="/dashboard/policy/create" // Consider updating this to a real path like /dashboard/issuers/create
        className="flex items-center justify-center self-center max-w-lg gap-2 rounded-lg bg-blue-600 px-5 py-5 my-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 md:text-base shadow-sm"
      >
        <span>Add a new Policy to            
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 mx-2 text-sm font-semibold text-blue-700 border border-blue-100 shadow-sm">
            {issuer.name}
          </span> 
        </span> 
        <PlusCircleIcon className="w-10 h-10" />
      </Link>

        <p className="text-lg font-medium text-gray-900 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700 border border-blue-100 shadow-sm">
            {issuer.name}
          </span> 
          <span className="text-gray-600">has the following active policies:</span>
        </p>
        
        <p className="mt-1 text-sm text-gray-500">
          Choose a policy from the list below to modify its details.
        </p>
      </div>
      <PoliciesTable issuerId={issuer.id}/>
    </main>
  );
}