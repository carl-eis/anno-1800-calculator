import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Formik, useFormikContext } from 'formik'
import { cloneDeep, get } from 'lodash'
import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { RecoilRoot, } from 'recoil'
import { NestedForm } from './NestedForm.tsx'
import { ShipmentRow } from './ShipmentRow.tsx'
import { ShippingStats } from './ShippingStats.tsx'

import { Body, CardsGrid } from './styles.tsx'

library.add(faCheckSquare, faCoffee, faTrash)

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
