// app/api/query/policies/[issuerId]/route.ts
import { NextResponse } from 'next/server';
import { fetchPolicyDetail } from '@/app/lib/data';

// Define the shape of your route params context
interface RouteParams {
  params: Promise<{ policyId: string }> | { policyId: string };
}

export async function GET(
  request: Request,
  context: RouteParams
) {
    try {
        // 1. Safely extract the dynamic policyId from the URL params context
        const resolvedParams = await context.params;
        const policyId = resolvedParams.policyId;

        if (!policyId) {
        return NextResponse.json(
            { error: 'Missing issuer identifier' }, 
            { status: 400 }
        );
        }

        // 2. Fetch the data using your existing database query utility
        const policies = await fetchPolicyDetail(policyId);

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