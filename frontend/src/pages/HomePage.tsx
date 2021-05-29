import React, { useEffect, useState } from 'react'
import GenericTemplate from 'components/templates/GenericTemplate'
import { useHistory } from 'react-router'
import { auth } from 'Firebase'

export const HomePage: React.VFC = () => {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState<null | object>(null)
  useEffect(() => {
    // if not logged in, redirect to login page
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : history.push('/login')
    })
  }, [history])
  return (
    <GenericTemplate title="トップページ">
      <>{currentUser && JSON.stringify(currentUser, null, 4)}</>
    </GenericTemplate>
  )
}
