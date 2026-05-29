import { fetchIssuers } from '@/app/lib/data';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import IssuersTable from '../ui/calcDashboard/issuers/issuerTable';


export default async function Page() {
  const issuers = await fetchIssuers();
    
  return (
     <div className="mb-6 flex flex-col gap-4 w-full  max-w-xl mx-auto  ">
      
      {/* 1. Add New Issuer Button */}
      <Link
        href="/dashboard/create_issuer" // Consider updating this to a real path like /dashboard/issuers/create
        className="flex items-center justify-center self-center max-w-lg gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 md:text-base shadow-sm"
      >
        <span>Add new Issuer</span> 
        <PlusCircleIcon className="w-5 h-5" />
      </Link>

      {/* 2. Structured Label */}
      <div className="flex flex-col gap-2 ">
        <span className="text-sm font-semibold self-center max-w-md text-gray-700 text-center">
          Choose an Issuer to Edit
        </span>
          <IssuersTable issuers={issuers} />
          {issuers.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-400">
              No issuers available.
            </div>
          )}
        </div>
      </div>
  )
}

