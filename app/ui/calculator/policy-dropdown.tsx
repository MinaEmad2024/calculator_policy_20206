'use client'

import { Policy } from "@/app/lib/definitions"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from "react"; // Added useTransition

interface PolicyProps {
  policies: Policy[];
}

const PolicyDropDown = ({ policies }: PolicyProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  // 1. Initialize the transition hook
  const [isPending, startTransition] = useTransition();

  const urlPolicyId = searchParams.get('policy') || policies[0]?.id || '';
  const [selection, setSelection] = useState(urlPolicyId);

  useEffect(() => {
    setSelection(urlPolicyId || '');
  }, [urlPolicyId, policies]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    
    setSelection(selectedId);

    // 2. Build params using Next.js searchParams utility
    const params = new URLSearchParams(searchParams.toString());
    if (selectedId) {
      params.set('policy', selectedId);
    } else {
      params.delete('policy');
    }
    
    // Always wipe out the third dropdown's parameter when the second dropdown changes!
    params.delete('detail'); 

    const newUrl = `${pathname}?${params.toString()}`;

    // 3. Perform a proper Next.js transition instead of window hacks
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  return (
    <div 
      className={`flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between transition-opacity ${isPending ? 'opacity-60 pointer-events-none' : ''}` }
      data-loading-state={isPending ? "true" : "false"}
    >
      <label htmlFor="policy-options">
        Select Policy {isPending && <span className="text-xs text-blue-500 animate-pulse">(updating...)</span>}
      </label>
      <select
        id="policy-options"
        name="policy-options"
        value={selection}
        onChange={handleChange}
        disabled={isPending}
        className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      > 
        <option value="">Choose a policy...</option>
        {policies.map(policy => (
          <option key={policy.id} value={policy.id}>
            {policy.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PolicyDropDown;



// 'use client'

// import { Policy } from "@/app/lib/definitions"
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";

// interface PolicyProps {
//   policies: Policy[];
// }

// const PolicyDropDown = ({ policies }: PolicyProps) => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Read the active policy ID from the URL, fallback to the first policy's ID safely
//   const urlPolicyId = searchParams.get('policy') || policies[0]?.id || '';
//   const [selection, setSelection] = useState(urlPolicyId);

//   // Sync state if the URL changes externally or when the policies array refreshes
//   useEffect(() => {
//     setSelection(urlPolicyId);
//   }, [urlPolicyId, policies]);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = event.target.value;
    
//     // 1. Instant visual change
//     setSelection(selectedId);

//     // 2. Prepare parameters string
//     const params = new URLSearchParams(window.location.search);
//     if (selectedId) {
//       params.set('policy', selectedId);
//     } else {
//       params.delete('policy');
//     }

//     // 3. Native zero-lag URL update
//     const newUrl = `${pathname}?${params.toString()}`;
//     window.history.replaceState(null, '', newUrl);

//     // 4. Notify Next.js Server Components to refresh
//     window.dispatchEvent(new PopStateEvent('popstate'));
//     router.refresh();
//   };

//   return (
//     <div className="flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between">
//       <label htmlFor="policy-options">Select Policy</label>
//       <select
//         id="policy-options"
//         name="policy-options"
//         value={selection} // Bound to the ID string state
//         onChange={handleChange}
//         className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//       > 
//         <option value="">Choose a policy...</option>
//         {policies.map(policy => (
//           <option key={policy.id} value={policy.id}> {/* value is the ID */}
//             {policy.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default PolicyDropDown;
