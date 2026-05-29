import Form from '@/app/ui/calcDashboard/policiesDetails/edit-policyDetail-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPolicyDetailById } from '@/app/lib/data';
import { notFound } from 'next/navigation'; // 🛠️ Added for missing items

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const policyDetailId = resolvedParams.id; // This will equal your policy.id variable
  const dbDetail = await fetchPolicyDetailById(policyDetailId);

  // 🛠️ Unbox the item if your database data function wraps selections inside arrays
  const policyDetail = Array.isArray(dbDetail) ? dbDetail[0] : dbDetail;

  // 🛠️ Safety Check: Guard against undefined database fetches
  if (!policyDetail) {
    notFound();
  }



  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'PolicyOption', href: '/dashboard' },
          {
            label: 'Update Option',
            href: `/dashboard`,
            active: true,
          },
        ]}
      />
      <Form policyDetail={policyDetail}  />

    </main>
  );
}