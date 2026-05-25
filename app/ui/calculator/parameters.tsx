import Card from "./card"
import { PolicyDetail } from "@/app/lib/definitions"

interface ParametersProps {
  selectedOption: PolicyDetail | undefined; // Can be undefined if nothing is selected yet
}



export default function Parameters({selectedOption} : ParametersProps) {

  return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 w-full p-4">
                  <Card title="Deductable" parameter={selectedOption?.deductables?? "0"}  sign="BD"/>
                  <Card title="1st CoIns" parameter={selectedOption?.coins?? "0"} sign="BD"/>
                  <Card title="Max" parameter={selectedOption?.max?? "0"} sign="BD"/>
                  <Card title="Min" parameter={selectedOption?.min?? "0"} sign="BD"/>
                  <Card title="2nd CoIns " parameter={selectedOption?.coins2?? "0"} sign="BD"/>
                  <Card title="3rd CoIns" parameter={selectedOption?.coins3?? "0"} sign="BD"/>
              </div>
  )
}

