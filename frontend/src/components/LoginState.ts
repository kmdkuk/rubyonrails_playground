import { useReducer } from 'react'

type LoginState = {
  email: string
  password: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
}

const initialState: LoginState = {
  email: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
}

export enum LoginActionType {
  SET_EMAIL = 'setEmail',
  SET_PASSWORD = 'setPassword',
  SET_IS_BUTTON_DISABLED = 'setIsButtonDisabled',
  LOGIN_SUCCESS = 'loginSuccess',
  LOGIN_FAILED = 'loginFailed',
  SET_IS_ERROR = 'setIsError',
}

type LoginAction =
  | { type: LoginActionType.SET_EMAIL; payload: string }
  | { type: LoginActionType.SET_PASSWORD; payload: string }
  | { type: LoginActionType.SET_IS_BUTTON_DISABLED; payload: boolean }
  | { type: LoginActionType.LOGIN_SUCCESS; payload: string }
  | { type: LoginActionType.LOGIN_FAILED; payload: string }
  | { type: LoginActionType.SET_IS_ERROR; payload: boolean }

const reducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case LoginActionType.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case LoginActionType.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case LoginActionType.SET_IS_BUTTON_DISABLED:
      return {
        ...state,
        isButtonDisabled: action.payload,
      }
    case LoginActionType.LOGIN_SUCCESS:
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      }
    case LoginActionType.LOGIN_FAILED:
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      }
    case LoginActionType.SET_IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      }
  }
}

export const useLoginReduser = () => {
  return useReducer(reducer, initialState)
}
