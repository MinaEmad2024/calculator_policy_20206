import Form from '@/app/ui/calcDashboard/policiesDetails/create-policyDetail-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { createPolicyDetail } from '@/app/lib/actions'


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const policyId = resolvedParams.id; // This will equal your policy.id variable

    // 🛠️ FIX: Pre-bind the policyId right here.
  // This turns a (id, formData) function into a clean (formData) function.
  const createPolicyDetailWithId = createPolicyDetail.bind(null, policyId);


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'PolicyOption', href: '/dashboard' },
          {
            label: 'Create Option',
            href: `/dashboard`,
            active: true,
          },
        ]}
      />
      <Form action={createPolicyDetailWithId} id={policyId}  />

    </main>
  );
}