import React from 'react'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

export const Body = styled.div<any>`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  align-items: center;
`

export const CargoRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const CargoInputRow = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export const CargoCloseContainer = styled.div`
  flex: 0 0 auto;
`

export const ShipmentStatsBar = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 10px;
  background: lightblue;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const ShipmentCard = ({ children }) => {
  return (
    <Card style={{ width: '500px', marginBottom: '20px', padding: '15px' }}>
      {children}
    </Card>
  )
}

export const StatsRow = styled.div`
  div:first-child {
    text-transform: capitalize;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 260px;
`
