import { Field, useFormikContext } from 'formik'
import { get } from 'lodash'
import React from 'react'
import Button from 'react-bootstrap/Button'
import { removeItemAtIndex } from './helpers.ts'
import { NestedForm } from './NestedForm.tsx'
import { ResourceRow } from './ResourceRow.tsx'
import { ShipmentCard } from './styles.tsx'
import { TextInput } from './TextInput.tsx'

export const ShipmentRow = (props) => {
  const { dataPath: originalDataPath, index, resourceName } = props

  const { values: formValues, setFieldValue } = useFormikContext()

  const dataPath = `${originalDataPath}.${index}`

  const addResource = (dataPath: string) => () => {
    const existingValues: any[] = get(formValues, dataPath) ?? []
    setFieldValue(dataPath, [...existingValues, {}])
  }

  const removeResource = () => {
    const existingValues: any[] = get(formValues, originalDataPath) ?? []
    setFieldValue(originalDataPath, removeItemAtIndex(existingValues, index))
  }

  return (
    <ShipmentCard>
      {/*<pre>{JSON.stringify(props, null, 2)}</pre>*/}
      <h3>{resourceName} {index + 1}</h3>
      <Field label="Time ago" placeholder={'Shipment time'} component={TextInput} name={`${dataPath}.timeAgo`}/>
      <NestedForm
        DataRowComponent={ResourceRow}
        resourceName={'Cargo'}
        dataPath={`${dataPath}.resources`}
      />
      <Button onClick={addResource(`${dataPath}.resources`)}>Add Cargo</Button>
      <Button onClick={removeResource} variant={'danger'} style={{ marginTop: '10px' }}>Remove Shipment</Button>
    </ShipmentCard>
  )
}
