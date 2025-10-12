import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth"
import { auth, googleProvider } from "./firebase"

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  if (!auth) {
    throw new Error(
      "Firebase no está configurado. Por favor, configura las variables de entorno de Firebase."
    )
  }
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  if (!auth) {
    throw new Error(
      "Firebase no está configurado. Por favor, configura las variables de entorno de Firebase."
    )
  }
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async (): Promise<UserCredential> => {
  if (!auth || !googleProvider) {
    throw new Error(
      "Firebase no está configurado. Por favor, configura las variables de entorno de Firebase."
    )
  }
  return await signInWithPopup(auth, googleProvider)
}

export const logout = async (): Promise<void> => {
  if (!auth) {
    throw new Error(
      "Firebase no está configurado. Por favor, configura las variables de entorno de Firebase."
    )
  }
  return await signOut(auth)
}

export const getCurrentUser = (): User | null => {
  if (!auth) {
    return null
  }
  return auth.currentUser
}
