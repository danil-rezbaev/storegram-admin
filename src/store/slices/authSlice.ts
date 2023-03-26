import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { User } from "../../types/User";

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: {}) => {
  const { data } = await axios.post('/auth/login', params)
  return data
})

export const fetchSignup = createAsyncThunk('auth/fetchSignup', async (params: {}) => {
  const {data} = await axios.post('/auth/signup', params)
  return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const {data} = await axios.get('/auth/me')
  return data
})

export type Auth = {
  status: boolean,
  data: User | null,
}

const defaultState: Auth = {
  status: false,
  data: null,
}

function isAuthState (obj: any): obj is Auth {
  if (!obj) return false

  const objAsGlobalState = obj as Auth
  return (objAsGlobalState.data !== undefined &&
    objAsGlobalState.status !== undefined)
}

const initialState = isAuthState(JSON.parse(localStorage.getItem('authData') as string))
  ? JSON.parse(localStorage.getItem('authData') as string)
  : defaultState

const saveStore = (state: Auth) => localStorage.setItem('authData', JSON.stringify(state))

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout (state) {
      state.status = false
      state.data = null
      window.localStorage.clear()
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchAuthMe.pending]: (state) => {
      state.status = false
      state.data = null
      saveStore(state)
    },
    // @ts-ignore
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = true

      if(state.data.stores) {
        state.store = {
          default: state.data.stores,
          modifier: state.data.stores.splice(0, 1),
          currentIndex: 0,
          currentStore: state.data.stores[0]
        }
      }

      saveStore(state)
    },
    // @ts-ignore
    [fetchAuthMe.rejected]: (state) => {
      state.status = false
      state.data = null
      saveStore(state)
    },
    // @ts-ignore
    [fetchLogin.pending]: (state) => {
      state.status = false
      saveStore(state)
    },
    // @ts-ignore
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = true
      saveStore(state)
    },
    // @ts-ignore
    [fetchLogin.rejected]: (state) => {
      state.data = null
      state.status = false
      saveStore(state)
    },
    // @ts-ignore
    [fetchSignup.pending]: (state) => {
      state.data = null
      state.status = false
      saveStore(state)
    },
    // @ts-ignore
    [fetchSignup.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = true
      saveStore(state)
    },
    // @ts-ignore
    [fetchSignup.rejected]: (state) => {
      state.data = null
      state.status = false
      saveStore(state)
    }
  }
})

// @ts-ignore
export const selectIsAuth = state => state.auth.data

export const { logout } = authSlice.actions

export default authSlice.reducer
