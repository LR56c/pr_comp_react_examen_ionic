import { FirebaseAuthData } from "../modules/infrastructure/firebase_auth_data"

import { create } from "zustand"

type Auth = {
  email: string
}

type AuthState = {
  auth?: Auth
  logout: () => Promise<void>
  login: ( email: string, password: string ) => Promise<void>
  register: ( email: string, password: string ) => Promise<void>
}
const authRepo            = new FirebaseAuthData()
export const useAuthStore = create<AuthState>( ( set ) => (
  {
    auth    : undefined,
    login   : async ( email: string, password: string ) => {
      const result = await authRepo.login( email, password )
      if ( result ) {
        set( { auth: { email } } )
      }

    },
    register: async ( email: string, password: string ) => {
      const result = await authRepo.register( email, password )
      if ( result ) {
        set({
         auth: { email }
        })
      }
    },
    logout  : async () => {
      await authRepo.logout()
      set( { auth: undefined } )
    }
  }
) )



