import Form from '@/app/ui/calcDashboard/policies/create-policy-form';
import Breadcrumbs from '@/app/ui/calcDashboard/policies/breadcrumbs';
import { fetchIssuers } from '@/app/lib/data';
import { createPolicy } from '@/app/lib/actions'


export default async function Page() {
    const issuers = await fetchIssuers()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Policy', href: '/dashboard/policy/create' },
          {
            label: 'Create Policy',
            href: `/dashboard/policy/create`,
            active: true,
          },
        ]}
      />
      <Form action={createPolicy} issuers={issuers} />

    </main>
  );
}