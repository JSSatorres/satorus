import { initializeApp, FirebaseApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth"

// Configuración de Firebase - Reemplaza estos valores con los de tu proyecto
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
}

// Solo inicializar Firebase si las variables están configuradas
let app: FirebaseApp | null = null
let auth: Auth | null = null
let googleProvider: GoogleAuthProvider | null = null

try {
  // Verificar si las variables de entorno están configuradas
  const hasValidConfig =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  if (hasValidConfig) {
    // Inicializar Firebase solo si está configurado
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)

    // Configurar Google Auth Provider
    googleProvider = new GoogleAuthProvider()
    googleProvider.setCustomParameters({
      prompt: "select_account",
    })
  } else {
    console.warn("Firebase no configurado - usando modo demo")
  }
} catch (error) {
  console.warn("Error al inicializar Firebase:", error)
}

export { auth, googleProvider }
export default app
