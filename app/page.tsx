// 'use client'

import Logo from '@/app/ui/calculator/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Policy from './ui/calculator/policy';
import PolicyDetail from './ui/calculator/policyDetail';
import Issuer from './ui/calculator/issuer';
import Skeleton from './ui/calculator/skeleton'
import { Suspense } from 'react';

// 1. Define the props to accept searchParams from Next.js
interface PageProps {
  searchParams:          | Promise<{ issuer?: string; policy?: string; detail?: string }> 
    | { issuer?: string; policy?: string; detail?: string };
}

interface PageProps {
  searchParams: Promise<{ 
    issuer?: string; 
    policy?: string; 
    detail?: string 
  }> | { issuer?: string; policy?: string; detail?: string };

};

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: PageProps) {
  // 2. Safely resolve and extract the active issuer ID from the URL string
  const resolvedParams = await searchParams;
  const currentIssuerId = resolvedParams?.issuer || '';
  const currentPolicyId = resolvedParams?.policy || '';

  // 1. Generate a total key string representing the exact URL search parameter state
  const totalStateKey = `iss-${currentIssuerId}-pol-${currentPolicyId}`;



  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex flex-row h-20 shrink-0 justify-between rounded-lg bg-blue-500 p-4  lg:h-20 ">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <Link
            href="/login"
            className="flex items-center gap-5  rounded-lg bg-blue-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
      <div className='flex  grow justify-center'>
        <div className="mt-4 flex  flex-col gap-4 w-full border-[3px] rounded-xl border-blue-500 lg:w-3/5 sm:flex-col">
            <div className="flex flex-col items-center gap-1 justify-center p-6 w-full md:px-28 md:py-1">

            {/* 2. Wrap EVERYTHING in an outer Suspense tied to the total URL state */}
            {/* <Suspense key={totalStateKey} fallback={<Skeleton />}>
              <div className="flex flex-col items-center gap-1 justify-center p-6 w-full md:px-28 md:py-1"> */}

              {/* 1. Wrap Issuer in a div and make it a CSS 'peer' */}
              <div className="w-full peer ">
                <Suspense fallback={<Skeleton />}>
                    <Issuer />
                </Suspense>
              </div>
              <div 
                className="w-full peer
                  transition-all duration-200 
                  peer-has-[[data-loading-state=true]]:opacity-40 
                  peer-has-[[data-loading-state=true]]:pointer-events-none"
              >
                <Suspense fallback={<Skeleton />} key={`policy-list-${currentIssuerId}`} >
                    <Policy issuerId={currentIssuerId} /> 
                </Suspense>
              </div>
              <div 
                className="w-full transition-all duration-200 
                  peer-has-[[data-loading-state=true]]:opacity-40 
                  peer-has-[[data-loading-state=true]]:pointer-events-none"
              >
                <Suspense fallback={<Skeleton />} key={`detail-list-${currentPolicyId}`}>
                  <PolicyDetail policyId={currentPolicyId}/>
                </Suspense>
              </div>
            </div>
            
          {/* </Suspense> */}
            </div>
        {/* </div> */}
      </div>
    </main>
  );
}
