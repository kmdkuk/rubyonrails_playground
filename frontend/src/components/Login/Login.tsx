import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  TextField,
} from '@material-ui/core'
import { auth } from 'Firebase'
import { useHistory } from 'react-router'
import { useStyles } from 'styles'
import { LoginActionType, useLoginReduser } from 'components/Login/LoginState'

const Login = () => {
  const classes = useStyles()
  const [state, dispatch] = useLoginReduser()
  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && history.push('/')
    })
    if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: LoginActionType.SET_IS_BUTTON_DISABLED,
        payload: false,
      })
    } else {
      dispatch({
        type: LoginActionType.SET_IS_BUTTON_DISABLED,
        payload: true,
      })
    }
  }, [history, state, dispatch])

  const signIn = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = () => {
    console.log('handleLogin')
    signIn(state.email, state.password)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      state.isButtonDisabled || handleLogin()
    }
  }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    dispatch({
      type: LoginActionType.SET_EMAIL,
      payload: event.target.value,
    })
  }

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    dispatch({
      type: LoginActionType.SET_PASSWORD,
      payload: event.target.value,
    })
  }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default Login
