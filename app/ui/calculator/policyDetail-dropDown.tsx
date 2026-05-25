'use client'

import { PolicyDetail } from "@/app/lib/definitions";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from "react"; 
import Parameters from "./parameters";
import ValueCalculator from "./valueCalculator";

interface PolicyProps {
  policiesDetails: PolicyDetail[];
}

// FIX 1: Renamed function to match your exact file import: PolicyDetailDropDown
const PolicyDetailDropDown = ({ policiesDetails }: PolicyProps) => {
  const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();
  const [isPending, startTransition] = useTransition(); 

  const urlDetailId = searchParams.get('detail') || '';
  const [selection, setSelection] = useState(urlDetailId);
  const [selectedOption, setSelectionOption] = useState<PolicyDetail | undefined>(undefined)

  // Find the complete selected object to extract raw parameters
  // const selectedPolicyData = (policiesDetails || []).find(p => p.id === selection);

  useEffect(() => {
  // 1. If the array is empty, the parent reset the form. Clear the selection!
  if (!policiesDetails || policiesDetails.length === 0) {
    setSelection('');
    return;
  }

  // 2. Otherwise, sync with the URL parameter
  setSelection(urlDetailId || '');
}, [urlDetailId, policiesDetails]);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    // console.log(selectedId);

    setSelection(selectedId);

    const index = policiesDetails.findIndex(policy => policy.id === selectedId);

    const selectedOption = policiesDetails[index];
    // console.log(selectedOption);
    setSelectionOption(selectedOption)

    // Use searchParams from next/navigation instead of window.location.search
    // const params = new URLSearchParams(searchParams.toString());
    // if (selectedId) {
    //   params.set('detail', selectedId);
    // } else {
    //   params.delete('detail');
    // }

    // const newUrl = `${pathname}?${params.toString()}`;

    // // Fix: Wrap the next.js router action directly inside startTransition
    // startTransition(() => {
    //   router.replace(newUrl, { scroll: false });
    // });
  };
  
  return (
    <>
      {/* FIX 3: Changed flex-row to flex-col for clean, unbreakable mobile responsive stacking */}
      <div 
        className="flex flex-col gap-2 items-start justify-between w-full py-5 md:flex-row md:items-center"
        data-loading-state={isPending ? "true" : "false"}
      >
        <label htmlFor="policy-options" className="text-sm font-semibold text-gray-700">
          Select Policy Option {isPending && <span className="text-blue-500 text-xs animate-pulse">(loading...)</span>}
        </label>
        <select
          id="policy-options"
          name="policy-options"
          value={selection}
          onChange={handleChange}
          suppressHydrationWarning={true} // Add this line
          disabled={isPending || !policiesDetails || policiesDetails.length === 0}
          className="w-full md:w-2/3 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        > 
          <option value="">{Array.isArray(policiesDetails) && policiesDetails.length > 0 ? 'Choose a policy option...': 'NO availabble options' }</option>
          {(policiesDetails || []).map(detail => (
            <option key={detail.id} value={detail.id}>
              {detail.name}
            </option>
          ))}
        </select>
      </div>

      {/* FIX 2: Correctly feed data down into your child display elements */}
      <div className="flex flex-col gap-4 w-full lg:flex-row mt-4">
        <Parameters 
          selectedOption={selectedOption} 
        />
        <ValueCalculator 
          // selectedOption={selectedOption} 
        />
      </div>
    </>
  );
}

export default PolicyDetailDropDown;

