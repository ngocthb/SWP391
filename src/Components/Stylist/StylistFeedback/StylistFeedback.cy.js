import React from 'react'
import StylistFeedback from './StylistFeedback'

describe('<StylistFeedback />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<StylistFeedback />)
  })
})