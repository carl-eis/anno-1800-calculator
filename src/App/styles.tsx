import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

enum Breakpoints {
  MOBILE = '520px',
  TABLET = '767px'
}

export const Body = styled.div<any>`
  flex: 1 0 auto;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  align-items: center;
  padding-bottom: 100px;
  overflow: visible;
`

export const StyledCloseButton = styled(Button)`
  height: 38px;

  @media(max-width: ${Breakpoints.MOBILE}) {
    margin-bottom: 10px;
    width: 100%;
  }
`

export const CargoRowContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: ${Breakpoints.MOBILE}) {
    flex-direction: column;
  }
`

export const CargoInputRow = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media(max-width: ${Breakpoints.TABLET}) {
    
  }

  @media(max-width: ${Breakpoints.MOBILE}) {
    flex-direction: column;
  }
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

export const StyledShipmentCard = styled(Card)`
  display: flex;
  flex: 0 1 480px;
  margin-bottom: 20px;
  padding: 15px;
`

export const CardsGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  
  column-gap: 15px;
  width: 100%;
  flex-wrap: wrap;
  
  @media(max-width: ${Breakpoints.TABLET}) {
    grid-template-columns: 1fr;
  }
  
  @media(max-width: ${Breakpoints.MOBILE}) {
    grid-template-columns: 1fr;
    ${StyledShipmentCard} {
      min-width: auto;
    }
  }
`

export const ShipmentCard = ({ children }) => {
  return (
    <StyledShipmentCard>
      {children}
    </StyledShipmentCard>
  )
}

export const ButtonGridContainer = styled(CardsGrid)`
  div {
    min-width: 300px;
    display: flex;
    flex: 0 1 100%;
  }
`

export const ButtonGrid = ({ children }) => {
  return (
    <ButtonGridContainer>
      <div>
        {children}
      </div>
      <div></div>
    </ButtonGridContainer>
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

export const FooterContainer = styled.div`
  position: fixed;
  
  bottom: 0;
  left: 0;
  right: 0;
  
  height: 70px;
  margin-top: 10px;
  
  background: lightslategray;
`

export const FooterButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 15px;
  grid-gap: 15px;
`
