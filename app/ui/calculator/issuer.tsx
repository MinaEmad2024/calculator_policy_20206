import { fetchIssuers } from '@/app/lib/data';
import IssuerDropdown from './issuer-dropdown'; // We will create this next


async function Issuer() {


  const issuers = await fetchIssuers();
  
    return <IssuerDropdown issuers={issuers} />;

}

export default Issuer;