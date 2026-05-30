  'use client'

  import { PolicyDetail } from "@/app/lib/definitions"
  import CalculationModal from "./modal";
  import CalculatorInputs from "./calculatorInputs";
  import { useState } from "react";

  interface ValueCalculatorProps {
    selectedOption: PolicyDetail | undefined; // Can be undefined if nothing is selected yet
  }




  const ValueCalculator = ({selectedOption} : ValueCalculatorProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const [data, setData] = useState({
        "totalProclaimed":"",
        "Consultation":"",
        "appConsult":"",
        "appOtherServices":"",
        "consult":"",
        "thirdCoInssurance":""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{

      const type = e.target.type;
      const name = e.target.name;

      const value = type === "checkbox"?
                    e.target.checked 
                    :e.target.value

      setData(prev => ({
        ...prev, [name]: value
      }))
    }

    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(data);
      setIsModalOpen(true);
    }

    return (
                <div className="flex flex-col items-center w-full max-w-md  mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-100">
                  <form action="" 
                  onSubmit={(e)=>handlesubmit(e)}
                  className="w-full flex flex-col gap-4">
                    <CalculatorInputs handleChange={handleChange} data={data} />
                    {/* Action Button */}
                    <button 
                      type="submit"
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
                    >
                      Calculate 
                    </button>
                  </form> 
                  {/* 3. Render Modal */}
                  <CalculationModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} />
                    {/* calculatedData={data}      /> */}

                </div>
    )
  }

  export default ValueCalculator