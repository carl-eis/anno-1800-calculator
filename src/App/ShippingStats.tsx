import { useFormikContext } from 'formik'
import { get, isEmpty, isNaN } from 'lodash'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { getAverageResourcesPerMinute, getAverageShipmentTime } from './helpers.ts'
import { IShipment } from './interfaces.ts'
import { ShipmentStatsBar, StatsRow } from './styles.tsx'

const f = (input: unknown): string => {
  console.log('input: ', input)

  if (typeof input !== 'number') {
    return '0'
  }

  if (isNaN(input)) {
    return '0'
  }

  return input.toFixed(2)
}

export const ShippingStats = () => {
  const { values } = useFormikContext()

  const shipments: IShipment[] = get(values, 'shipments') as any
  const averageTime = getAverageShipmentTime(shipments)
  const averageStats = getAverageResourcesPerMinute(shipments, averageTime)

  const [showDebug, setShowDebug] = useState(false)

  const {
    averagePerMinute,
    averagePerShipment,
  } = averageStats as any

  if (!averagePerMinute || !averagePerShipment) {
    return null
  }

  if (isEmpty(averagePerMinute || isEmpty(averagePerShipment))) {
    return null
  }

  return (
    <div>
      <ShipmentStatsBar>
        {Object.keys(averagePerMinute).map((key) => {
          const value: number = averagePerMinute[key]
          return (
            <StatsRow>
              <div>{key}:{' '}</div>
              <div>{f(value)} per minute</div>
            </StatsRow>
          )
        })}
      </ShipmentStatsBar>
      <Form.Check // prettier-ignore
        type={'checkbox'}
        id={`default-${'checkbox'}`}
        label={`Enable debug mode`}
        onChange={() => setShowDebug(!showDebug)}
        checked={showDebug}
      />

      {showDebug && <pre>{JSON.stringify({ averageTime, averagePerMinute, averagePerShipment }, null, 2)}</pre>}
    </div>
  )
}
