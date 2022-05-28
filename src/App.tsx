import './App.css';
import Field, { FieldProps } from './components/Field/Field';
import typeFields from './assets/type-fields.json';
import { useState } from 'react';
import InputSelector from './components/InputSelector/InputSelector';
import FieldSelect from './components/FieldSelect/FieldSelect'
import { useForm, Controller } from 'react-hook-form';

function App() {
  const [fields, setFields] = useState<FieldProps[]>([])
  const methods = useForm<any>();

  const onFormSubmit = (data: any) => {
    console.log(data);
  }

  const deleteInput = (input: string) => {
    const fieldFilter = fields.filter((field) => field.name !== input)
    setFields(fieldFilter)
  }

  return (
    <div className="App">
      <main className='forms'>
      <h3 className="type">Formulario</h3>
        <form className='forms__form' onSubmit={methods.handleSubmit(onFormSubmit)}>
          {fields.map((field) =>
            field.type !== 'select' ?
            <div className='forms__input'>
              <Controller
                name={field.name}
                control={methods.control}
                render={({field: {onChange, name}}) => (
                    <Field
                        label={field.label}
                        type={field.type}
                        name={name}
                        onChange={onChange}
                    />
                )}
              />
              <span className='forms__times' onClick={() => deleteInput(field.name)}>X</span>
            </div>
            :
            <Controller
              name={field.name}
              control={methods.control}
              render={({field: {onChange, name}}) => (
                  <FieldSelect
                    name={name}
                    label={field.label}
                    options={field.options}
                    onChange={onChange}
                  />
              )}
            />
          )}
          {fields.length > 0 &&
          <div className='forms__button'>
            <button>
              Enivar formulario
            </button>
          </div>
          }
        </form>
      </main>
      <aside className='forms forms--selector'>
        <h3 className="type">Tipos de inputs que puedes agregar</h3>
        { typeFields.map((type) =>
          <InputSelector
            type={type.type}
            sendField={(field: FieldProps) => setFields((value) => [...value, field])}
          />
        ) }
      </aside>
    </div>
  );
}

export default App;
