export interface Option {
    option: string
    value: string | number
}

export interface FieldProps {
    label: string
    type?: 'text' | 'radio' | 'number' | 'select'
    defaultValue?: string | number
    name: string
    id?: string
    options?: Option[]
    onChange?: (event: any) => void
}

const Field = ({ label, type, defaultValue, name, id, onChange }: FieldProps) => {
    return (
        <div className="field">
            <label className='field__label' htmlFor={ name }>{ label }</label>
            <input className='field__input' name={ name } id={ id } type={ type } onChange={onChange} />
        </div>
    )
}

export default Field