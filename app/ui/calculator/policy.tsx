import { fetchPolicies } from "@/app/lib/data";
import PolicyDropDown from "./policy-dropdown";

interface PolicyParams {
  issuerId: string;
}

async function Policy ({issuerId}: PolicyParams){


    // Guard clause: if no issuerId is present in URL, pass an empty array immediately
  if (!issuerId || issuerId.trim() === "") {
    return <PolicyDropDown policies={[]} />;
  }
    
  try {
    // This will now only execute when a real UUID exists in the URL
    const policies = await fetchPolicies(issuerId);
    return <PolicyDropDown policies={policies} />;
  } catch (error) {
    // Optional: Render an error state in the UI instead of crashing the app
    console.error("Failed to render policy sub-section:", error);
    return <div className="text-red-500 text-sm">Error loading policies.</div>;
  }

}

export default Policy