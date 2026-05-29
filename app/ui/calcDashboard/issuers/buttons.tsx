import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteIssuer } from '@/app/lib/actions';
// import { issuers } from '@/app/lib/placeholder-data';


export function UpdateIssuer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit_issuer`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteIssuer({ id }: { id: string }) {

  const deleteIssuerById = deleteIssuer.bind(null, id) 

  return (
    <>
      <form action={deleteIssuerById}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
