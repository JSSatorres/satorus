# 🚀 Inicio Rápido - Escaneo de Menú con IA

## ⚡ 3 Pasos para Empezar

### 1️⃣ Obtener API Key de Gemini (2 minutos)

1. Abre: **https://aistudio.google.com/app/apikey**
2. Inicia sesión con Google
3. Clic en **"Create API Key"**
4. Copia la clave

### 2️⃣ Configurar la API Key

Crea un archivo `.env.local` en la raíz:

```bash
GEMINI_API_KEY=tu-clave-aqui
```

O si ya tienes `.env`, añade esta línea.

### 3️⃣ Ejecutar la App

```bash
npm run dev
```

Abre: **http://localhost:3000/dashboard**

---

## 📸 Cómo Usar

1. Ve a sección **"Gestión de Menú"**
2. Clic en **"Escanear Menú con IA"**
3. Toma foto o sube imagen del menú
4. Espera la extracción
5. Revisa y edita los platos
6. ¡Guarda!

---

## 💰 Costos

- **Gratis:** 1,500 escaneos/día
- **Precio:** ~$0.001 por menú (casi gratis)

---

## 📱 Instalar como PWA (Opcional)

**En móvil:**
- Abre la app en el navegador
- Toca "Añadir a pantalla de inicio"
- Ahora tienes la app instalada

**En PC:**
- Chrome/Edge mostrará icono de instalación
- Clic → "Instalar"

---

## ❓ Problemas Comunes

**"No se pudo acceder a la cámara"**
→ Da permisos en el navegador

**"Error al procesar imagen"**
→ Verifica que `GEMINI_API_KEY` esté en `.env.local`

**"No extrae bien los platos"**
→ Toma foto más clara y cercana

---

## 📚 Documentación Completa

Ver: **MENU_AI_SETUP.md**

