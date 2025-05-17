import { AuthRepository } from "../domain/auth_repository"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
}                         from "firebase/auth"
import { firebase }       from "../../../firebase"

export class FirebaseAuthData implements AuthRepository {
  private readonly auth

  constructor() {
    this.auth = getAuth( firebase )
  }

  async login( email: string, password: string ): Promise<boolean> {
    try {
      await signInWithEmailAndPassword( this.auth, email, password )
      return true
    }
    catch ( e ) {
      console.log( "Error signing in", e )
      return false
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut( this.auth )
    }
    catch ( e ) {
      console.log( "Error signing out", e )
    }
  }

  async register( email: string, password: string ): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword( this.auth, email, password )
      return true
    }
    catch ( e ) {
      console.log( "Error creating user", e )
      return false
    }
  }

}
