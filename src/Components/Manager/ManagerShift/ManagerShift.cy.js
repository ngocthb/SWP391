import React from 'react'
import ManagerShift from './ManagerShift'

describe('<ManagerShift />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ManagerShift />)
  })
})