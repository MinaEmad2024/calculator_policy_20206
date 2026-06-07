import Form from '@/app/ui/calcDashboard/issuers/create-issuer-form';
import Breadcrumbs from '@/app/ui/calcDashboard/issuers/breadcrumbs';
import { createIssuer } from '@/app/lib/actions'; 


export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Insurance Company', href: '/dashboard/create_issuer' },
          {
            label: 'Create New Company',
            href: '/dashboard/create_issuer',
            active: true,
          },
        ]}
      />
      <Form action={createIssuer} />
    </main>
  );
}