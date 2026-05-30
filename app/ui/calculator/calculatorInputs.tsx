type calculatorInputsProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    data: any 
}



const CalculatorInputs = ({handleChange, data}: calculatorInputsProps) => {


  return (
    <div>
                    {/* Total Amount Input */}
                    <div className="flex flex-col gap-1 mb-3">                    
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
                    <div className="flex flex-col gap-1 mb-3">                    
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
                    <div className="flex flex-col gap-1 mb-3">                    
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
                    <div className="flex flex-col gap-1 mb-3">                    
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
                    <div className="flex flex-col gap-1 mb-3">                    
                      <label htmlFor="amount-accepted" className="text-sm font-semibold text-slate-700">
                        Third Co-Insurance 
                      </label>
                      <input 
                        type="text" 
                        id="thirdCoInssurance"
                        name="thirdCoInssurance" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                        onChange={handleChange}
                      />
                    </div>
                    <input type="checkbox" id="consult" name="consult" value=""onChange={handleChange}/>
                    <label htmlFor="consult" className="mx-2">process by visit</label>

    </div>
  )
}

export default CalculatorInputs