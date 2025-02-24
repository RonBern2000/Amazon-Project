/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const Title = ({title}) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

Title.prototype = {
    title: PropTypes.string
}

export default Title