  'use client'

  import { PolicyDetail } from "@/app/lib/definitions"
  import { useState } from "react";

  interface ValueCalculatorProps {
    selectedOption: PolicyDetail | undefined; // Can be undefined if nothing is selected yet
  }




  const ValueCalculator = ({selectedOption} : ValueCalculatorProps) => {

    const [data, setData] = useState({
        "totalProclaimed":"",
        "Consultation":"",
        "appConsult":"",
        "appOtherServices":"",
        "consult":"",
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
    }

    return (
                <div className="flex flex-col items-center w-full max-w-md  mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-100">
                  <form action="" 
                  onSubmit={(e)=>handlesubmit(e)}
                  className="w-full flex flex-col gap-4">
                    
                    {/* Total Amount Input */}
                    <div className="flex flex-col gap-1">                    
                      <label htmlFor="total-proclaimed" className="text-sm font-semibold text-slate-700">
                        Total Billed Amount 
                      </label>
                      <input 
                        type="text" 
                        id="totalProclaimed"
                        name="totalProclaimed" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Amount Accepted Input */}
                    <div className="flex flex-col gap-1">                    
                      <label htmlFor="amount-accepted" className="text-sm font-semibold text-slate-700">
                        Consultation Agreed Price
                      </label>
                      <input 
                        type="text" 
                        id="Consultation"
                        name="Consultation" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-1">                    
                      <label htmlFor="amount-accepted" className="text-sm font-semibold text-slate-700">
                        Approved Consult
                      </label>
                      <input 
                        type="text" 
                        id="appConsult"
                        name="appConsult" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-1">                    
                      <label htmlFor="amount-accepted" className="text-sm font-semibold text-slate-700">
                        Approved Other services
                      </label>
                      <input 
                        type="text" 
                        id="appOtherServices"
                        name="appOtherServices" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                        onChange={handleChange}
                      />
                    </div>
                    <input type="checkbox" id="consult" name="consult" value=""onChange={handleChange}/>
                    <label htmlFor="consult">process by visit</label>
                    {/* Action Button */}
                    <button 
                      type="submit"
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
                    >
                      Calculate 
                    </button>
                  </form> 

                  {/* Summary Total Badge */}
                  <div className="flex flex-row items-center justify-between w-full mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-700">Calculated Total</span>
                    <span className="font-extrabold text-lg text-blue-600 px-3 py-1 bg-blue-50 rounded-md">
                      25 Dinar
                    </span>
                  </div>
                </div>
    )
  }

  export default ValueCalculator