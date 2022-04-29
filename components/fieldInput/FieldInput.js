import React from 'react'
import { Input } from 'antd'
import style from './FieldInput.module.scss'

export default function FieldInput({
  name,
  id,
  placeholder,
  label,
  description,
  onChange,
  value,
  error,
  note,
  inLeft,
  inRight
}) {
  return (
    <div className={style.FieldInput}>
      {label && <div className={style.label}>{label}</div>}
      {description && <div className={style.description}>{description}</div>}
      <Input
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        addonAfter={inRight}
        addonBefore={inLeft}
      />
      {note && <div className={style.note}>{note} </div>}
      {error && <div className='fieldError'>{error}</div>}
    </div>
  )
}
