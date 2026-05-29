import {Issuer } from '@/app/lib/definitions'
import Link from 'next/link';
import { Button } from '@/app/ui/button';

// 1. Define the props to accept a Server Action function
interface FormProps {
  action: (formData: FormData) => Promise<void> | void;
  issuers: Issuer[]
}

// 2. Destructure the action prop in the function arguments
export default function Form({ action, issuers }: FormProps) {
  return (
    <form action={action}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="issuer_id" className="mb-2 block text-sm font-medium">
            Choose an issuer
          </label>
          <div className="relative">
            <select
              id="issuer_id"
              name="issuer_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select an issuer
              </option>
              {issuers.map((issuer) => (
                <option key={issuer.id} value={issuer.id}>
                  {issuer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Issuer Name */}
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
                placeholder="Enter Issuer Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        {/* Issuer Email */}
        <div className="mb-4">
          <label htmlFor="code" className="mb-2 block text-sm font-medium">
            Policy code
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Enter Issuer Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
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
        <Button type="submit">Create Policy</Button>
      </div>
    </form>
  );
}
