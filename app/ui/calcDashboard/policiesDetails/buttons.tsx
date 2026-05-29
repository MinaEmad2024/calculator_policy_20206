import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePolicyDetail } from '@/app/lib/actions';
// import { issuers } from '@/app/lib/placeholder-data';


export function UpdatePolicyDetail({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/policy_detail/${id}/edit_policy_detail`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePolicyDetail({ id }: { id: string }) {

  const deletePolicyDetailById = deletePolicyDetail.bind(null, id) 

  return (
    <>
      <form action={deletePolicyDetailById}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
