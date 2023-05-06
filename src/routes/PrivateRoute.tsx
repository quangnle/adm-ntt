import { useEffect } from 'react'
import AuthService from '@/api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActions } from '@/store/auth'
import { getCredential } from '@/store/auth/selectors'
import { getToken } from '@/utils/api'
import { accountType } from '@/constants/types'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const credential = useSelector(getCredential)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!credential.isAuthenticated) {
      const token = getToken()

      if (!token) {
        navigate('/admin/login', { replace: true })
      } else {
        let profile: accountType
        AuthService.getMe()
          .then(({ data }) => (profile = data))
          .finally(async () => {
            if (profile) {
              return dispatch(AuthActions.login({ ...profile }))
            } else {
              return dispatch(AuthActions.logout())
            }
          })
      }
    }
  }, [])

  return children
}

export default PrivateRoute
