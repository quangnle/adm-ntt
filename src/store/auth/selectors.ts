import { RootState } from '..'

export const getCredential = (state: RootState) => state.auth.credential

export default {
  getCredential
}
