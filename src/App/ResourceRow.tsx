import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, useFormikContext } from 'formik'
import { get } from 'lodash'
import React, { useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { removeItemAtIndex } from './helpers.ts'
import { CargoCloseContainer, CargoInputRow, CargoRowContainer } from './styles.tsx'
import { TextInput } from './TextInput.tsx'

export const ResourceRow = (props) => {
  const { dataPath: originalDataPath, index } = props
  const dataPath = `${originalDataPath}.${index}`
  const getFieldName = useCallback((name) => `${dataPath}.${name}`, [])

  const { values: formValues, setFieldValue } = useFormikContext()

  const removeResource = () => {
    const existingValues: any[] = get(formValues, originalDataPath) ?? []
    setFieldValue(originalDataPath, removeItemAtIndex(existingValues, index))
  }

  return (
    <div>
      {/*<h6>{resourceName} {index + 1}</h6>*/}
      <CargoRowContainer>
        <CargoInputRow>
          <Field
            name={getFieldName('cargoName')}
            component={TextInput}
            placeholder={'Cargo name'}
          />
          <Field
            name={getFieldName('cargoAmount')}
            component={TextInput}
            placeholder={'Cargo amount'}
          />
        </CargoInputRow>
        <CargoCloseContainer>
          <Button onClick={removeResource} variant={'info'} style={{ height: '38px' }}>
            <FontAwesomeIcon icon={['fas', 'trash']}/>
          </Button>
        </CargoCloseContainer>
      </CargoRowContainer>
    </div>
  )
}
