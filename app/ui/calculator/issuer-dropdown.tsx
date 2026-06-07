"use client"; 

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';

interface Issuer {
  id: string;
  name: string;
}

export default function IssuerDropdown({ issuers }: { issuers: Issuer[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const urlIssuerId = searchParams.get('issuer') || '';
  const [localSelection, setLocalSelection] = useState(urlIssuerId);

  useEffect(() => {
    setLocalSelection(urlIssuerId);
  }, [urlIssuerId]);
        
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    
    setLocalSelection(selectedId);
    
    // 1. Safe parsing using Next.js utility instead of window.location
    const params = new URLSearchParams(searchParams.toString());
    
    // 2. Cascade cleanup: Wipe out BOTH dependent steps when resetting issuer
    params.delete('policy');
    params.delete('detail');

    if (selectedId) { 
      params.set('issuer', selectedId);
    } else {
      params.delete('issuer');
    }

    const newUrl = `${pathname}?${params.toString()}`;

    // 3. REMOVED window.history.replaceState. 
    // This allows router.replace to drive the operation and instantly engage your Skeletons.
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  return (
    <div 
      className={`flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between transition-opacity ${
        isPending ? 'opacity-60 pointer-events-none' : ''
      }`} 
      data-loading-state={isPending ? "true" : "false"}
    >
      <label htmlFor="options" className="text-sm font-semibold text-gray-700">
        Select Insurance company {isPending && <span className="text-blue-500 text-xs animate-pulse">(loading...)</span>}
      </label>
      <select
        id="options"
        name="options"
        value={localSelection}
        onChange={handleChange}
        disabled={isPending}
        className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      > 
        <option value="">Choose an issuer...</option>
        {issuers.map((issuer) => (
          <option key={issuer.id} value={issuer.id}>
            {issuer.name}
          </option>
        ))}
      </select>
    </div>
  );
}



// "use client"; 

// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useState, useEffect, useTransition } from 'react'; // 1. Import useTransition

// interface Issuer {
//   id: string;
//   name: string;
// }

// export default function IssuerDropdown({ issuers }: { issuers: Issuer[] }) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition(); // 2. Initialize the transition hook

//   const urlIssuerId = searchParams.get('issuer') || '';
//   const [localSelection, setLocalSelection] = useState(urlIssuerId);

//   useEffect(() => {
//     setLocalSelection(urlIssuerId);
//   }, [urlIssuerId]);
        
// const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = event.target.value;
    
//     // 1. Instant visual change in the UI dropdown thread
//     setLocalSelection(selectedId);
//     const params = new URLSearchParams(window.location.search);
    
//     // CRITICAL CHANGE: Always wipe out the old policy parameter on issuer switch
//     params.delete('policy');


//     // 2. Prepare the new parameters string
//     if (selectedId) { 
//       params.set('issuer', selectedId);
//     } else {
//       params.delete('issuer');
//     }

//     const newUrl = `${pathname}?${params.toString()}`;

//     // 3. Native Update for the browser address bar (0ms overhead)
//     window.history.replaceState(null, '', newUrl);

//     // 4. FIX: Use router.replace inside the transition instead of refresh.
//     // This tells Next.js EXACTLY what changed so it fires the server request instantly.
//     startTransition(() => {
//       router.replace(newUrl, { scroll: false });
//     });
//   };


//   return (
//     <div className="flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between" data-loading-state={isPending ? "true" : "false"} >
//       <label htmlFor="options">
//         Select Issuers {isPending && <span className="text-gray-400 text-xs">(loading...)</span>}
//       </label>
//       <select
//         id="options"
//         name="options"
//         value={localSelection}
//         onChange={handleChange}
//         className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//       > 
//         <option value="">Choose an issuer...</option>
//         {issuers.map((issuer) => (
//           <option key={issuer.id} value={issuer.id}>
//             {issuer.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }


// "use client"; 

// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

// interface Issuer {
//   id: string;
//   name: string;
// }

// export default function IssuerDropdown({ issuers }: { issuers: Issuer[] }) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();


//   // Read the active ID directly from the URL query parameter
//   const urlIssuerId = searchParams.get('issuer') || '';
//   const [localSelection, setLocalSelection] = useState(urlIssuerId);

//   // Keep state synced only if the URL changes externally (like clicking browser back button)
//   useEffect(() => {
//     setLocalSelection(urlIssuerId);
//   }, [urlIssuerId]);
        
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = event.target.value;
    
//     // 1. Instant visual change in the UI thread
//     setLocalSelection(selectedId);

//     // 2. Prepare the new search parameters string
//     const params = new URLSearchParams(window.location.search);
//     if (selectedId) {
//       params.set('issuer', selectedId);
//     } else {
//       params.delete('issuer');
//     }

//     // 3. Native Browser History Update (Zero lag, zero framework overhead)
//     const newUrl = `${pathname}?${params.toString()}`;
//     window.history.replaceState(null, '', newUrl);

//     // 4. Force Next.js Server Components to notice the URL change and refresh data
//     // We construct a custom event that tells Next.js navigation to sync up
//     const navEvent = new PopStateEvent('popstate');
//     window.dispatchEvent(navEvent);
//     router.refresh()
//   };

//   return (
//     <div className="flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between">
//       <label htmlFor="options">Select Issuers</label>
//       <select
//         id="options"
//         name="options"
//         value={localSelection}
//         onChange={handleChange}
//         className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//       > 
//         <option value="">Choose an issuer...</option>
//         {issuers.map((issuer) => (
//           <option key={issuer.id} value={issuer.id}>
//             {issuer.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }




// "use client"; 

// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useTransition, useState, useEffect } from 'react';

// interface Issuer {
//   id: string;
//   name: string;
// }

// export default function IssuerDropdown({ issuers }: { issuers: Issuer[] }) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const urlIssuerId = searchParams.get('issuer') || '';
//   const [localSelection, setLocalSelection] = useState(urlIssuerId);

//   useEffect(() => {
//     setLocalSelection(urlIssuerId);
//   }, [urlIssuerId]);
        
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = event.target.value;
    
//     // This updates instantly in the browser thread
//     setLocalSelection(selectedId);

//     // This updates the URL smoothly in the background
//     startTransition(() => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (selectedId) {
//         params.set('issuer', selectedId);
//       } else {
//         params.delete('issuer');
//       }
//       replace(`${pathname}?${params.toString()}`, { scroll: false });
//     });
//   };

//   return (
//     <div className="flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between">
//       <label htmlFor="options">
//         Select Issuers {isPending && <span className="text-gray-400 text-xs">(updating...)</span>}
//       </label>
//       <select
//         id="options"
//         name="options"
//         value={localSelection} // FIX: Changed from currentIssuerId to localSelection
//         onChange={handleChange}
//         className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//       > 
//         <option value="">Choose an issuer...</option>
//         {issuers.map((issuer) => (
//           <option key={issuer.id} value={issuer.id}>
//             {issuer.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }




// "use client"; 


// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import {useTransition, useState, useEffect} from 'react';


// // Define what props this component expects from the server
// interface Issuer {
//   id: string;
//   name: string;
// }

// export default function IssuerDropdown({ issuers }: { issuers: Issuer[] }) {

//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();
//   const [isPending, startTransition] = useTransition();

//   // 1. Local state provides instant visual feedback in the browser
//   const urlIssuerId = searchParams.get('issuer') || '';
//   const [localSelection, setLocalSelection] = useState(urlIssuerId);

//   // Keep local state in sync if the URL changes externally (like back button)
//   useEffect(() => {
//     setLocalSelection(urlIssuerId);
//   }, [urlIssuerId]);
        
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = event.target.value;
    
//     // 2. Instantly update visual dropdown state so it doesn't freeze
//     setLocalSelection(selectedId);

//     // 3. Defer the heavy URL/Server routing update to a background transition
//     startTransition(() => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (selectedId) {
//         params.set('issuer', selectedId);
//       } else {
//         params.delete('issuer');
//       }
//       replace(`${pathname}?${params.toString()}`, { scroll: false });
//     });
//   };

//   return (
//     <div className="flex flex-row gap-[15px] items-center justify-between w-full py-[20px] md:w-full md:items-center md:justify-between">
//       <label htmlFor="options">Select Issuers</label>
//       <select
//         id="options"
//         name="options"
//         value={localSelection}
//         onChange={handleChange}
//         className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//       > 
//         {issuers.map((issuer) => (
//           <option key={issuer.id} value={issuer.id}>
//             {issuer.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
