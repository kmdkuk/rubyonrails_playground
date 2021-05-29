import React from 'react'
import Login from 'components/Login'
import GenericTemplate from 'components/templates/GenericTemplate'

export const LoginPage: React.VFC = () => {
  return (
    <GenericTemplate title="ログインページ">
      <Login />
    </GenericTemplate>
  )
}
