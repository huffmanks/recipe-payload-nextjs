import React from 'react'

import { useField } from 'payload/components/forms'
import { Label } from 'payload/components/forms'
import { Props } from 'payload/components/fields/Number'

import './styles.scss'

const InputRange: React.FC<Props> = (props) => {
    const { path, label, required } = props
    const { value, setValue }: { value: string | number; setValue: any } = useField({ path })
    return (
        <div className='input-range-container'>
            <div className='label-container'>
                <Label htmlFor={path} label={label} required={required} />
                <label className='field-label'>
                    <span className='label-accent'>{'('}</span>
                    <span className='label-value'>{value}</span>
                    <span className='label-accent'>{')'}</span>
                </label>
            </div>
            <input className='input-range' type='range' min='1' max='5' step='0.1' value={value} onChange={(e) => setValue(e.currentTarget.value)} />
        </div>
    )
}

export default InputRange
