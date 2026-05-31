import { PolicyDetail } from "@/app/lib/definitions"

// export type PolicyDetail ={
//       id :string;
//       policy_id :string;
//       name :string;
//       deductables :string;
//       coins :string;   
//       max :string;
//       min :string;
//       coins2 :string;  
//       coins3 :string;
       
// };


export type PolicyCalculationResult = [
  patientShare: number,
  providerShare: number,
  deductable: number,
  coInsurance: number,
  balanceAfterCoInsurance: number,
  nonApprovedGap: number
];


type inputData ={
        totalProclaimed:string,
        Consultation:string,
        appConsult:string,
        appOtherServices:string,
        consult:string,
        thirdCoInssurance:string
    }

type usePolicyProps = {
    option: PolicyDetail | undefined,
    data: inputData
  }


const usePolicy = ({data, option } : usePolicyProps):PolicyCalculationResult => {

    // Return early if no option is selected yet
    if (!option) {
        return [0, 0, 0, 0, 0, 0];
    }

    
    const deductable = parseFloat(option.deductables) || 0;
    const coins = (parseFloat(option.coins) || 0) / 100 ;
    const totalProclaimed  = parseFloat(data.totalProclaimed) || 0;
    const appConsult = parseFloat(data.appConsult) || 0;
    const appOtherServices = parseFloat(data.appOtherServices) || 0;

    const balanceAfterDeductable = totalProclaimed - deductable;
    const CoInsurance = data.consult? appOtherServices * coins:  balanceAfterDeductable * coins;
    const balanceAfterCoInsurance = balanceAfterDeductable - CoInsurance;
    const totalApproved = appConsult + appOtherServices;
    let patientShare = 0;
    let providerShare = 0;
    let nonApprovedGap = 0;

    if ( totalApproved < balanceAfterCoInsurance ){
        nonApprovedGap = balanceAfterCoInsurance - totalApproved ;
        patientShare   = deductable + CoInsurance + nonApprovedGap ;
        providerShare = totalProclaimed - patientShare;

    }else{
        patientShare = deductable + CoInsurance;
        providerShare = totalProclaimed - patientShare;
        
    }

    return [patientShare, providerShare, deductable, CoInsurance, balanceAfterCoInsurance, nonApprovedGap ] as const

}

export default usePolicy