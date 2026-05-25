import { fetchPolicyDetail } from "@/app/lib/data"
import  PolicyDetailDropDown  from "./policyDetail-dropDown";


async function PolicyDetail({policyId}: { policyId: string }) {

    // console.log("SERVER SIDE - Received policyId from URL:", policyId);


  // Guard clause: if no issuerId is present in URL, pass an empty array immediately
    if (!policyId || policyId.trim() === "") {
      return <PolicyDetailDropDown policiesDetails={[]} />;
    }

    
    try {
      // This will now only execute when a real UUID exists in the URL
      const policyDetails = await fetchPolicyDetail(policyId);
      const normalizedDetails = Array.isArray(policyDetails) 
      ? policyDetails 
      : policyDetails ? [policyDetails] : [];
      // console.log(policyDetails);
      return <PolicyDetailDropDown  policiesDetails={normalizedDetails} />;


    } catch (error) {
      // Optional: Render an error state in the UI instead of crashing the app
      console.error("Failed to render policy sub-section:", error);
      return <div className="text-red-500 text-sm">Error loading policies.</div>;
    }

};

export default PolicyDetail;