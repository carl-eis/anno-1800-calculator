import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, Formik, useFormikContext } from 'formik'
import { cloneDeep, get } from 'lodash'
import React, { FC, useCallback } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { RecoilRoot, } from 'recoil'
import { removeItemAtIndex } from './helpers.ts'
import { ShippingStats } from './ShippingStats.tsx'

import { Body, CardsGrid, CargoCloseContainer, CargoInputRow, CargoRowContainer, ShipmentCard } from './styles.tsx'
import { TextInput } from './TextInput.tsx'

library.add(faCheckSquare, faCoffee, faTrash)

const ResourceRow = (props) => {
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

const ShipmentRow = (props) => {
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

interface INestedFormData {
  dataPath: string;
  resourceName: string;
  DataRowComponent: any;
}

const NestedForm: FC<INestedFormData> = (props) => {
  const {
    dataPath,
    DataRowComponent,
    resourceName,
  } = props

  const {
    values: formValues,
  } = useFormikContext()

  const data = get(formValues, dataPath)

  return (
    <>
      {data?.map((item, index) => {
        return (
          <DataRowComponent
            resourceName={resourceName}
            data={item}
            dataPath={`${dataPath}`}
            index={index}
            key={index}
          />
        )
      })}
    </>
  )
}

const DebugFormValues = () => {
  const { values } = useFormikContext()

  return (
    <pre>{JSON.stringify(values, null, 2)}</pre>
  )
}

const ShipsForm = () => {
  const { values: formValues, setFieldValue } = useFormikContext()

  const addResource = (dataPath: string) => () => {
    const existingValues: any[] = get(formValues, dataPath) ?? []
    if (!existingValues?.length) {
      setFieldValue(dataPath, [...existingValues, {}])
    } else {
      const prevValue = get(existingValues, existingValues.length - 1)
      setFieldValue(dataPath, [...existingValues, cloneDeep(prevValue)])
    }
  }

  return (
    <div>
      <h1>Anno 1800 shipment calculator</h1>
      <ShippingStats/>
      <CardsGrid>
        <NestedForm
          DataRowComponent={ShipmentRow}
          dataPath={'shipments'}
          resourceName={'Shipment'}
        />

        {/*<DebugFormValues/>*/}
      </CardsGrid>
      <Button onClick={addResource('shipments')}>Add Shipment</Button>
    </div>
  )
}

function App() {
  return (
    <RecoilRoot>
      <Body>
        <Container style={{ paddingTop: '20px' }}>
          <Formik
            initialValues={{
              shipments: [],
            }}
            onSubmit={() => {}}
          >
            <ShipsForm/>
          </Formik>
        </Container>
      </Body>
    </RecoilRoot>
  )
}

export default App
