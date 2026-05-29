import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePolicy } from '@/app/lib/actions';
// import { issuers } from '@/app/lib/placeholder-data';


export function Updatepolicy({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/policy/${id}/edit_policy`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function Deletepolicy({ id }: { id: string }) {

  const deletePolicyById = deletePolicy.bind(null, id) 

  return (
    <>
      <form action={deletePolicyById}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
