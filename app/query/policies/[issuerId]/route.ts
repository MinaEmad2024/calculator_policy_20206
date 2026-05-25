// app/api/query/policies/[issuerId]/route.ts
import { NextResponse } from 'next/server';
import { fetchPolicies } from '@/app/lib/data';

// Define the shape of your route params context
interface RouteParams {
  params: Promise<{ issuerId: string }> | { issuerId: string };
}

export async function GET(
  request: Request,
  context: RouteParams
) {
  try {
    // 1. Safely extract the dynamic issuerId from the URL params context
    const resolvedParams = await context.params;
    const issuerId = resolvedParams.issuerId;

    if (!issuerId) {
      return NextResponse.json(
        { error: 'Missing issuer identifier' }, 
        { status: 400 }
      );
    }

    // 2. Fetch the data using your existing database query utility
    const policies = await fetchPolicies(issuerId);

    // 3. Return the data payload as a standard JSON response
    return NextResponse.json(policies, { status: 200 });

  } catch (error) {
    console.error('API Error fetching sub-route policies:', error);
    
    return NextResponse.json(
      { error: 'Internal Server Error', message: (error as Error).message }, 
      { status: 500 }
    );
  }
}
