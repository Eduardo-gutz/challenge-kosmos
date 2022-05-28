import { FieldProps } from "../Field/Field";

export interface Option {
    option: string
    value: string | number
}

const FieldSelect = ({ name, label, options, onChange }: FieldProps) => {
    return (
        <div className="field">
            <label className='field__label' htmlFor={ name }>{ label }</label>
            <select name={ name } onChange={onChange}>
                {options?.map((option) => (
                    <option value={ option.value }>{ option.option }</option>
                ))}

            </select>
        </div>
    )
}

export default FieldSelect;