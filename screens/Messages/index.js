import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../mocks/contact.json'
import Main from './Main'

const Messages = () => <Main {...contactData} />

Messages.navigationOptions = () => ({
  title: "Messages",
})

Messages.propTypes = {
 navigation: PropTypes.object.isRequired,
}

export default Messages