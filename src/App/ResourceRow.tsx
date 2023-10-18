import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, useFormikContext } from 'formik'
import { get } from 'lodash'
import React, { useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { removeItemAtIndex } from './helpers.ts'
import { CargoCloseContainer, CargoInputRow, CargoRowContainer, StyledCloseButton } from './styles.tsx'
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
          <StyledCloseButton onClick={removeResource} variant={'info'}>
            <FontAwesomeIcon icon={['fas', 'trash']}/>
          </StyledCloseButton>
        </CargoCloseContainer>
      </CargoRowContainer>
    </div>
  )
}
