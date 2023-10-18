import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Formik, useFormikContext } from 'formik'
import { cloneDeep, get } from 'lodash'
import React, { useLayoutEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { RecoilRoot, } from 'recoil'
import { NestedForm } from './NestedForm.tsx'
import { ShipmentRow } from './ShipmentRow.tsx'
import { ShippingStats } from './ShippingStats.tsx'
import { createPortal } from 'react-dom';

import { Body, ButtonGrid, CardsGrid, FooterButtons, FooterContainer } from './styles.tsx'

library.add(faCheckSquare, faCoffee, faTrash)

const DebugFormValues = () => {
  const { values } = useFormikContext()

  return (
    <pre>{JSON.stringify(values, null, 2)}</pre>
  )
}

const ShipsForm = () => {
  const { values: formValues, setFieldValue } = useFormikContext()

  const [portalTarget, setPortalTarget] = useState<any>(null)

  useLayoutEffect(() => {
    setPortalTarget(document.getElementById('navbar-portal'))
  }, [])

  const addResource = (dataPath: string) => () => {
    const existingValues: any[] = get(formValues, dataPath) ?? []
    if (!existingValues?.length) {
      setFieldValue(dataPath, [...existingValues, {}])
    } else {
      const prevValue = get(existingValues, existingValues.length - 1)
      setFieldValue(dataPath, [...existingValues, cloneDeep(prevValue)])
    }
  }

  const reset = () => {
    setFieldValue('shipments', [])
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
      <ButtonGrid>
        <Button onClick={addResource('shipments')}>Add Shipment</Button>
      </ButtonGrid>
      {!!portalTarget && createPortal((
        <FooterButtons>
          <Button onClick={addResource('shipments')}>Add Shipment</Button>
          <Button variant={'info'} onClick={reset}>Clear all shipments</Button>
        </FooterButtons>
      ), portalTarget)}
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
      <FooterContainer id={'navbar-portal'}></FooterContainer>
    </RecoilRoot>
  )
}

export default App
