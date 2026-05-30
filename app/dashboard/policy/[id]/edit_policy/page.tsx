import Form from '@/app/ui/calcDashboard/policies/edit-policy-form';
import Breadcrumbs from '@/app/ui/calcDashboard/policies/breadcrumbs';
import { fetchPolicyById, fetchIssuers, fetchPolicyDetail } from '@/app/lib/data';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import PolicyDetialsTable from '@/app/ui/calcDashboard/policiesDetails/policyDetailTable';


export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // 1. Fetch data in parallel
  const [dbPolicy, issuers, policiesDetails] = await Promise.all([
    fetchPolicyById(id),
    fetchIssuers(),
    fetchPolicyDetail(id)
  ]);

    // 2. Handle database wrapper variations (unwraps arrays if sql`SELECT` returned an array)
  const policy = Array.isArray(dbPolicy) ? dbPolicy[0] : dbPolicy;

  // 3. 🛠️ Safety check: If policy does not exist, trigger a 404 page immediately
  // This tells TypeScript that from this line onward, "policy" is guaranteed to be a valid object.
  if (!policy) {
    notFound();
  }


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Policy', href: '/dashboard' },
          {
            label: 'Edit Policy',
            href: `/dashboard`,
            active: true,
          },
        ]}
      />
      <Form policy={policy} issuers={issuers} />
      {/* 🛠️ Modernized typography block with clear visual hierarchy */}
      <div className="border-t border-gray-100 pt-6 mt-6 flex flex-col items-center text-center w-full">
      {/* 1. Add New Policy Button */}
      <Link
        href={`/dashboard/policy_detail/create/${policy.id || policy.policy_id || (policy as any).Id}`}
        className="flex items-center justify-center self-center max-w-lg gap-2 rounded-lg bg-blue-600 px-5 py-5 my-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 md:text-base shadow-sm"
      >
        <span>Add a new Option to            
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 mx-2 text-sm font-semibold text-blue-700 border border-blue-100 shadow-sm">
            {policy.name}
          </span> 
        </span> 
        <PlusCircleIcon className="w-10 h-10" />
      </Link>

        <p className="text-lg font-medium text-gray-900 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700 border border-blue-100 shadow-sm">
            {policy.name}
          </span> 
          <span className="text-gray-600">has the following Optins:</span>
        </p>
        
        <p className="mt-1 text-sm text-gray-500">
          Choose an Option from the list below to modify its details.
        </p>
      </div>
      <div className='mt-5 mb-10'>
        <PolicyDetialsTable policyDetails={policiesDetails} />
      </div>
    </main>
  );
}