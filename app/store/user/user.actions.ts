import { AuthService } from "@/services/auth/auth.service";
import { toastError } from "@/utils/toastError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "api/api.helper";
import { toastr } from "react-redux-toastr";
import { IAuthResponse, ILogin, IRegistration } from "./user.interface";


/* register */
export const register = createAsyncThunk<IAuthResponse, IRegistration>('/register', async ({ email, username, password, sex, avatar }, thunkApi) => {
  try {
    const response = await AuthService.register(email, password, username, sex, avatar)
    toastr.success('Регистрация', 'Вы успешно создали аккаунт!')
    return response.data
  } catch (error) {
    toastError(error)
    return thunkApi.rejectWithValue(error)
  }

})

/* login */
export const login = createAsyncThunk<IAuthResponse, ILogin>('/login', async ({ email, password }, thunkApi) => {
  try {
    const response = await AuthService.login(email, password)
    toastr.success('Логин', 'Вы успешно вошли в аккаунт!')
    return response.data
  } catch (error) {
    toastError(error)
    return thunkApi.rejectWithValue(error)
  }

})


/* logout */
export const logout = createAsyncThunk('/logout', async () => {
  await AuthService.logout()
  toastr.success('Выход', 'Вы успешно вышли из аккаунта!')
})


/* checkAuth */
export const checkAuth = createAsyncThunk<IAuthResponse>('/check-auth', async (_, thunkApi) => {
  try {
    const response = await AuthService.getNewTokens()
    return response.data
  } catch (error) {
    if (errorCatch(error) === 'jwt expired') {
      toastr.error('Выход',
        'Ваша авторизация закончилась, войдите снова')
      thunkApi.dispatch(logout())
    }
    toastError(error)
    return thunkApi.rejectWithValue(error)
  }

})
