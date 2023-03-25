import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Get current user
 * @returns logged in user
 */
export const useUser = () => {
  const user = useTypedSelector((state) => state.auth.user)
  return { user, isLoggedIn: user!! }
}
