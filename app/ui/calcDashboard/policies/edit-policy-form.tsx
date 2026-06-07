'use client';

import { Policy, Issuer } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePolicy } from '@/app/lib/actions';
import{ UserCircleIcon} from '@heroicons/react/24/outline';

type EditPolicyFormProps = {
  policy: Policy,
  issuers: Issuer[],
}


export default function EditPolicyForm({
  policy,issuers
}: EditPolicyFormProps) {

  const updatePolicyWithId = updatePolicy.bind(null, policy.id);

  return (
    <form action={updatePolicyWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="issuer_id" className="mb-2 block text-sm font-medium">
            Change the Insurance Company  
          </label>
          <div className="relative">
            <select
              id="issuer_id"
              name="issuer_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={policy.issuer_id}
            >
              <option value="" disabled>
                Select an Issuer
              </option>
              {issuers.map((issuer) => (
                <option key={issuer.id} value={issuer.id}>
                  {issuer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Policy Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={policy.name}
                placeholder="Enter Policy Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Policy Code */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Policy Code
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="code"
                name="code"
                type="text"
                defaultValue={policy.code}
                placeholder="Enter Issuer code"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>


      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Policy</Button>
      </div>
    </form>
  );
}
