import React from 'react'
import MyBooking from './MyBooking'

describe('<MyBooking />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyBooking />)
  })
})