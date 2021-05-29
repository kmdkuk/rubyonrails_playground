import React from 'react'
import Login from './Login'
import GenericTemplate from './templates/GenericTemplate'

const LoginPage: React.VFC = () => {
  return (
    <GenericTemplate title="ログインページ">
      <Login />
    </GenericTemplate>
  )
}

export default LoginPage
