'use client'

import Logo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SelectInput from './ui/selectInput';
import { useState } from 'react';

export default function Page() {

  const stateOptions = [
  { id: 1, choice: 'Cairo' },
  { id: 2, choice: 'Alexandria' },
  { id: 3, choice: 'Qena' },
  ];

    const [selectedState, setSelectedState] = useState(stateOptions[0].choice);
    
    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex flex-row h-20 shrink-0 justify-between rounded-lg bg-blue-500 p-4 md:h-52">
        <Logo />
        <Link
            href="/login"
            className="flex items-center gap-5  rounded-lg bg-blue-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 sm:flex-col">
        <div className="flex flex-col items-center gap-5 justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <SelectInput  options={stateOptions} handleChange={handleStateChange}  />
          {/* <SelectInput  options={stateOptions} handleChange={handleStateChange}  />
          <SelectInput  options={stateOptions} handleChange={handleStateChange}  /> */}
        </div>
      </div>
    </main>
  );
}
