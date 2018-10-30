import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../mocks/contact.json'
import Conversation from './Conversation'

const Convo = () => <Conversation {...contactData} />

Convo.navigationOptions = () => ({
  title: "Conversation",
})

Convo.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default Convo