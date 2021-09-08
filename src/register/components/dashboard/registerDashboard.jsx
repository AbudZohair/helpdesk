import React from 'react'

import { useHistory } from 'react-router'




const registerDashboard = () => {
  const history = useHistory()
  history.push('/register/resources/User/actions/new')

  return (<div></div>)
}

export default registerDashboard