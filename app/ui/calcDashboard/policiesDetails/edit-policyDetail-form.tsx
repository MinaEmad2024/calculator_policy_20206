'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PolicyDetail } from '@/app/lib/definitions';
import { updatePolicyDetail } from '@/app/lib/actions'


// 2. Destructure the action prop in the function arguments
export default function Form({ policyDetail }: {policyDetail:PolicyDetail}) {
  
  const updatePolicyDetailWithId = updatePolicyDetail.bind(null, policyDetail.id);


  return (
    <form action={updatePolicyDetailWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* id */}
        <div className="mb-4">
          {/* <label htmlFor="name" className="mb-2 block text-sm font-medium">
            policy_id
          </label> */}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="policy_id"
                name="policy_id"
                type='hidden'
                defaultValue={policyDetail.policy_id}
                placeholder="Enter Option Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Option Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Option Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={policyDetail.name}
                placeholder="Enter Issuer Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Deductable */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Deductable
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="deductable"
                name="deductable"
                type="text"
                defaultValue={policyDetail.deductables}
                placeholder="Enter Deductable"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* coins */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            coins
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="coins"
                name="coins"
                type="text"
                defaultValue={policyDetail.coins}
                placeholder="Enter 1st co-insurance"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* max */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            max
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="max"
                name="max"
                type="text"
                defaultValue={policyDetail.max}
                placeholder="Enter Max policy Coverage"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* min */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            min
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="min"
                name="min"
                type="text"
                defaultValue={policyDetail.min}
                placeholder="Enter Minimum insurance coverage"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* coins2 */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            coins2
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="coins2"
                name="coins2"
                type="text"
                defaultValue={policyDetail.coins2}
                placeholder="Enter 2nd co-insurance"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* coins3 */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            coins3
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="coins3"
                name="coins3"
                type="text"
                defaultValue={policyDetail.coins3}
                placeholder="Enter 3nd co-insurance"
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
        <Button type="submit">Edit Option</Button>
      </div>
    </form>
  );
}
