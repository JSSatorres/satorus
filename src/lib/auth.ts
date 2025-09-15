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
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, googleProvider)
}

export const logout = async (): Promise<void> => {
  return await signOut(auth)
}

export const getCurrentUser = (): User | null => {
  return auth.currentUser
}
