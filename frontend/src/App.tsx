import HomePage from 'components/HomePage'
import LoginPage from 'components/LoginPage'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App: React.VFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  )
}

export default App
