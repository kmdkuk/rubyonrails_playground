import React, { useReducer, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import { auth } from 'Firebase'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
    },
  }),
)

//state type

type State = {
  email: string
  password: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
}

const initialState: State = {
  email: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
}

type Action =
  | { type: 'setEmail'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setEmail':
      return {
        ...state,
        email: action.payload,
      }
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      }
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      }
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      }
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      }
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      }
  }
}

const Login = () => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && history.push('/')
    })
  }, [])

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
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin()
    }
  }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value,
    })
  }

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    dispatch({
      type: 'setPassword',
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
