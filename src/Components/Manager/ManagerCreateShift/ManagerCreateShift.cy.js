import React from 'react'
import ManagerCreateShift from './ManagerCreateShift'

describe('<ManagerCreateShift />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ManagerCreateShift />)
  })
})