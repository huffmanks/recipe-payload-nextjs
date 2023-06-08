import React from 'react'
import { useField } from 'payload/components/forms'
import { Props } from 'payload/components/fields/Text'

import './styles.scss'

const InputField: React.FC<Props> = (props: { path: string; name: string }) => {
    const { path, name } = props
    const { value, setValue } = useField<string>({ path })

    return (
        <>
            <div className={`input-group ${name === 'hours' ? 'input-left' : name === 'minutes' ? 'input-right' : 'input-single'}`}>
                <div className='input-field'>
                    <input
                        id='input'
                        className='input'
                        type='text'
                        placeholder='0'
                        maxLength={2}
                        value={value ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.replace(/\D/g, ''))}
                    />
                    <label htmlFor='input' className='label'>
                        {name === 'hours' || name === 'minutes' ? Array.from(name)[0] : ''}
                    </label>
                </div>
            </div>
        </>
    )
}
export default InputField
