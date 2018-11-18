import React from 'react'

export const required = value => value ? undefined : 'Required'

export const renderField = ({ input, label, type, meta: { touched, error, warning }, disabled }) => (
    <div>
        <label style={{ fontWeight: 'bold' }} >{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className='form-control' disabled={disabled}/>
            {touched && ((error && <span style={{ color: 'red' }} >{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

export const renderSelectField = ({ input, label, type, meta: { touched, error }, children, disabled }) => (
    <div>
        <label style={{ fontWeight: 'bold' }}>{label}</label>
        <div>
            <select {...input} className='form-control' disabled={disabled}>
                {children}
            </select>
            {touched && error && <span style={{ color: 'red' }} >{error}</span>}
        </div>
    </div>
)

export const renderTextAreaField = ({ input, label, type, meta: { touched, error, warning }, rows }) => (
    <div>
        <label style={{ fontWeight: 'bold' }}>{label}</label>
        <div>
            <textarea {...input} placeholder={label} type={type} rows={rows} className='form-control' />
            {touched && ((error && <span style={{ color: 'red' }} >{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)