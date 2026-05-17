
type option = {
    id: number,
    choice: string
}

type selectInputProps = {
    options: option[],
    handleChange: () => void
}



const SelectInput = ({options, handleChange}: selectInputProps) => {
  return (
        <>
            <label htmlFor="optiopns">State</label>
            <select
                id="optiopns"
                name="optiopns"
                // value={options}
                onChange={handleChange}
            > 
            {options.map(option => <option key={option.id} value={option.choice}>{option.choice}</option>)}
            </select>
        </>
    )
}

export default SelectInput