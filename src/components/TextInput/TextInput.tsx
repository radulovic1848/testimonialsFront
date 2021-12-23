import React from 'react'
import './style.scss';

type Props = {
    id?: string;
    fieldname?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<Props> = ({ id, fieldname, placeholder, onChange}) => {
    return (
        <input id={id} type='text' name={fieldname} placeholder={placeholder} onChange={onChange}/>
    )
}

export default TextInput;