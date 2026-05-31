export type PolicyCalculationResult = [
  patientShare: number,
  providerShare: number,
  deductable: number,
  coInsurance: number,
  balanceAfterCoInsurance: number,
  nonApprovedGap: number
];



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatedData: PolicyCalculationResult | undefined;
}

const CalculationModal = ({ isOpen, onClose, calculatedData }: ModalProps) => {
  if (!isOpen) return null;

  if (!calculatedData) {
  return null; // Or return a loading spinner / empty state
}
  const [patientShare, providerShare, deductable, CoInsurance, balanceAfterCoInsurance, nonApprovedGap ] = calculatedData;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Calculation Results</h3>
        <p className="text-sm text-slate-500 mb-4">Here is the breakdown of your submitted data:</p>
        
        <div className="bg-slate-50 p-4 rounded-lg mb-6 text-sm font-mono text-slate-700">
        </div>
        <div className="glass-card p-6 sticky top-10 border-indigo-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                Summary
                <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Live Calc</span>
            </h3>
            
            <div id="resultArea" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-4 bg-slate-900 rounded-2xl text-white">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Total Member Share</p>
                    <p id="resMember" className="text-3xl font-black">{patientShare}</p>
                </div>
                    
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest mb-1">Provider Share</p>
                    <p id="resProvider" className="text-3xl font-black text-indigo-900">{providerShare}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Logic Breakdown</h4>
                    <div id="breakdown" className="text-[11px] space-y-2 text-slate-600">
                    <div className="flex justify-between">
                        <span>Deductible</span> 
                        <span className="font-bold text-slate-800"> {deductable}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Main Coinsurance</span>
                      <span className="font-bold text-slate-800"> {CoInsurance}</span></div>
                    <div className="flex justify-between">
                      <span>Balance after Initial Share</span>
                      <span className="font-bold text-slate-800">{balanceAfterCoInsurance}</span></div>
                    <div className="flex justify-between">
                      <span>Non-Approved Gap</span>
                      <span className="font-bold text-slate-800">{nonApprovedGap}</span></div></div>
                </div>
            </div>
        </div>
        <button 
          onClick={onClose}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close Results
        </button>
      </div>
    </div>
  );
};

export default CalculationModal