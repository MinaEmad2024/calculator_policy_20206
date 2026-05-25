
type option = {
    id: number,
    name: string,
    email?: string,
    issuer_id?: string;
    code?: string;
    policy_id?:string;
    deductables?:number;
    coins?:number;   
    max?:number;
    min?:number;
    coins2?:number;  
    coins3?:number;



}

type selectInputProps = {
    options: option[],
    title: string,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}



const SelectInput = ({options, handleChange, title}: selectInputProps) => {
  return (
        <>
            <div className="flex flex-row gap-[15px] items-center justify-between w-full  py-[20px] md:w-full md:items-center md:justify-between  ">
                <label htmlFor="optiopns">{title}</label>
                <select
                    id="optiopns"
                    name="optiopns"
                    // value={selectedValue}
                    onChange={handleChange}
                    className="flex-1 w-0 rounded border border-blue-500 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                > 
                {options.map(option => <option key={option.id} value={option.name}>{option.name}</option>)}
                </select>
            </div>
        </>
    )
}

export default SelectInput