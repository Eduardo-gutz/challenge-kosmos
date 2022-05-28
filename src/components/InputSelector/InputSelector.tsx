import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Field, { FieldProps } from "../Field/Field"
import { Option } from '../FieldSelect/FieldSelect'

interface InputSelectorProps {
    type: string
    sendField: (field: FieldProps) => void
};

interface NewInputForm {
    name: string
    label: string
    option: string
    value: string
}

const InputSelector = ({ type, sendField }: InputSelectorProps) => {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [options, setOptions] = useState<Option[]>([])
    const methods = useForm<NewInputForm>()

    const addField = (data: NewInputForm) => {
        const field: FieldProps = {
            label: data.label,
            name: data.name,
            type: type as 'text' | 'number',
            options: options
        }

        sendField(field)
        setOpenForm(false)
    }
    const addOption = (data: NewInputForm) => {
        const option = {
            option: data.option,
            value: data.value
        }
        setOptions((value) => [...value, option])
    }
    return (
        <div>
            <p className="type" onClick={() => setOpenForm(!openForm)}>{ type }</p>
            {openForm &&
                <form onSubmit={methods.handleSubmit(addField)}>
                    <Controller
                    name="name"
                    control={methods.control}
                    render={({field: {onChange, name}}) => (
                        <Field
                            label={"Nombre del Campo: "}
                            type={"text"}
                            name={name}
                            onChange={onChange}
                        />
                    )}
                    />
                    <Controller
                    name="label"
                    control={methods.control}
                    render={({field: {onChange, name}}) => (
                        <Field
                            label={"Etiqueta del Campo: "}
                            type={"text"}
                            name={name}
                            onChange={onChange}
                        />
                    )}
                    />
                    {type === 'select' &&
                    <>
                        {options.map((option) =>
                            <span className="option">{option.option}</span>
                        )}
                        <form onSubmit={methods.handleSubmit(addOption)}>
                        <Controller
                            name="option"
                            control={methods.control}
                            render={({field: {onChange, name}}) => (
                                <Field
                                    label={"Etiqueta de la Opcion: "}
                                    type={"text"}
                                    name={name}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            name="value"
                            control={methods.control}
                            render={({field: {onChange, name}}) => (
                                <Field
                                    label={"Valor de la Opcion: "}
                                    type={"text"}
                                    name={name}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <div className='forms__button'>
                            <button onClick={methods.handleSubmit(addOption)}>
                                Agregar opciòn
                            </button>
                        </div>
                        </form>
                    </>
                    }
                    <div className='forms__button'>
                        <button>
                            Agregar campo
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default InputSelector