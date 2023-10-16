import { FieldProps } from 'formik'
import React, { FC } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export const TextInput: FC<FieldProps & { [x: string]: any }> = (props) => {
  const {
    placeholder,
    label,
    field: {
      name,
      onChange,
      value,
      onBlur,
    }
  } = props
  return (
    <InputGroup className="mb-3">
      {label && <InputGroup.Text id="basic-addon1">{label}</InputGroup.Text>}
      <Form.Control
        placeholder={placeholder}
        aria-label={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        // aria-describedby="basic-addon1"
      />
    </InputGroup>
  )
}

const TextInputSimple: FC<FieldProps & { [x: string]: any }> = (props) => {
  const {
    placeholder,
    label,
    onChange,
    name,
  } = props
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      <Form.Control
        placeholder={placeholder}
        aria-label={placeholder}
        name={name}
        // aria-describedby="basic-addon1"
      />
    </InputGroup>
  )
}
