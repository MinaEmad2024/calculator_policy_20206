import Form from '@/app/ui/calcDashboard/policies/create-policy-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchIssuers } from '@/app/lib/data';
import { createPolicy } from '@/app/lib/actions'


export default async function Page() {
    const issuers = await fetchIssuers()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Policy', href: '/dashboard' },
          {
            label: 'Create Issuer',
            href: `/dashboard`,
            active: true,
          },
        ]}
      />
      <Form action={createPolicy} issuers={issuers} />

    </main>
  );
}