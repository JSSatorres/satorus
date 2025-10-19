# 📸 Sistema de Escaneo de Menú con IA - Guía de Configuración

## 🎯 ¿Qué hace esta funcionalidad?

Tu aplicación **PideYa** ahora puede:
- ✅ **Acceder a la cámara del móvil** (como PWA)
- ✅ **Capturar fotos de menús físicos**
- ✅ **Subir fotos desde la galería**
- ✅ **Extraer automáticamente** todos los platos con IA
- ✅ **Editar y confirmar** antes de guardar
- ✅ **Guardar en base de datos** todo el menú

## 📱 PWA: Web + App en uno

**¿Qué es una PWA?**
- Es una **aplicación web** que funciona en el navegador
- Puede **instalarse en el móvil** como app nativa
- **NO necesita Play Store** ni App Store
- El usuario decide si la usa en navegador o la instala

**Ventajas:**
- 🌐 Acceso por URL normal (ej: `pideya.com`)
- 📲 Opción de instalar en pantalla de inicio
- 📷 Acceso a cámara del dispositivo
- 🔄 Funciona offline (con service worker)

## 🔧 Configuración

### 1. Obtener API Key de Google Gemini (GRATIS)

Google Gemini Flash 2.0 es la opción **más barata** para procesar imágenes:

1. Ve a: **https://aistudio.google.com/app/apikey**
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API Key"**
4. Copia la clave generada

**Precios:**
- **Gratis:** 1,500 requests/día
- **Pago:** $0.075 por 1M de tokens (muy barato)
- **Costo por menú:** ~$0.001 - $0.003 (menos de 1 céntimo)

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Google Gemini API Key
GEMINI_API_KEY=tu-api-key-aqui
```

### 3. Ejecutar la Aplicación

```bash
# Desarrollo (PWA deshabilitada para testing)
npm run dev

# Producción (PWA habilitada)
npm run build
npm start
```

## 🚀 Cómo Usar

### En el Dashboard:

1. Ve a la sección **"Gestión de Menú"**
2. Haz clic en **"Escanear Menú con IA"**
3. Elige una opción:
   - 📷 **Abrir Cámara**: Toma foto en tiempo real
   - 📂 **Subir desde Galería**: Sube una foto existente
4. Captura/sube la foto del menú físico
5. Haz clic en **"Extraer Menú con IA"**
6. Espera unos segundos mientras la IA procesa
7. **Revisa los platos extraídos**:
   - ✏️ Edita nombre, descripción, precio o categoría
   - 🗑️ Elimina platos incorrectos
   - ➕ Añade platos manualmente
8. Haz clic en **"Guardar X Platos en el Menú"**
9. ✅ ¡Listo! Los platos están en tu base de datos

## 📋 Formato de Datos Extraídos

La IA devuelve los platos en este formato:

```json
{
  "menuItems": [
    {
      "name": "Paella Valenciana",
      "description": "Arroz con mariscos, pollo y azafrán",
      "price": 15.50,
      "category": "Platos principales"
    },
    {
      "name": "Tarta de Chocolate",
      "description": "Con helado de vainilla",
      "price": 6.50,
      "category": "Postres"
    }
  ]
}
```

## 🎨 Componentes Creados

### 1. `MenuPhotoCapture.tsx`
- Modal para capturar/subir foto
- Acceso a cámara con `MediaDevices API`
- Preview de imagen
- Llamada a API de procesamiento

### 2. `MenuItemsPreview.tsx`
- Preview de items extraídos
- Editor inline para cada plato
- Validación de datos
- Confirmación antes de guardar

### 3. `MenuSection.tsx` (actualizado)
- Integración completa del flujo
- Estados de loading
- Mensajes de éxito/error

## 🔌 APIs Creadas

### 1. POST `/api/menu/extract-from-image`
- Recibe imagen en base64
- Procesa con Google Gemini Flash
- Devuelve array de platos

### 2. POST `/api/menu`
- Crea un menú en la BD
- Devuelve `menuId`

### 3. POST `/api/menu/items`
- Guarda items en un menú
- Bulk insert para eficiencia

### 4. GET `/api/menu/items?menuId=xxx`
- Obtiene items de un menú
- Ordenados por categoría y nombre

## 💡 Tips para Mejores Resultados

### Al Tomar/Subir Fotos:

✅ **Buena iluminación**
✅ **Texto legible y enfocado**
✅ **Foto directa (sin ángulos extremos)**
✅ **Evitar reflejos o sombras**
✅ **Una página a la vez** (mejor que todo el menú junto)

### Categorías Soportadas:

- Entrantes
- Platos principales
- Postres
- Bebidas
- General (por defecto)

## 🔐 Permisos de Cámara

### En Móvil (PWA):
- El navegador pedirá permiso la primera vez
- El usuario debe **aceptar** el acceso a cámara
- Se puede revocar desde configuración del navegador

### En Navegador Web:
- Funciona igual que en móvil
- Chrome, Safari, Firefox lo soportan
- Requiere **HTTPS** en producción

## 🌐 Instalación como PWA

### Android/iPhone:

1. Abre la app en el navegador
2. El navegador mostrará un banner: **"Instalar PideYa"**
3. O toca el menú (⋮) → **"Añadir a pantalla de inicio"**
4. La app aparecerá como icono en el móvil
5. Se abrirá en pantalla completa (sin barra del navegador)

### Desktop:

1. Abre en Chrome/Edge
2. Icono de instalación en la barra de direcciones
3. Clic → **"Instalar"**
4. Se añade como app del sistema

## 📊 Estructura de Base de Datos

```prisma
model Menu {
  id          String     @id @default(cuid())
  name        String
  description String?
  restaurantId String
  items       MenuItem[]
}

model MenuItem {
  id          String  @id @default(cuid())
  name        String
  description String?
  price       Decimal
  category    String?
  isAvailable Boolean
  menuId      String
  menu        Menu
}
```

## 🐛 Troubleshooting

### "No se pudo acceder a la cámara"
- Verifica permisos del navegador
- Asegúrate de usar HTTPS (no HTTP)
- En desarrollo, `localhost` está permitido

### "Error al procesar imagen"
- Verifica que `GEMINI_API_KEY` esté configurada
- Revisa la consola para detalles del error
- Prueba con otra foto más clara

### "La IA no extrae bien los platos"
- Toma foto más cercana y nítida
- Asegúrate de que el texto sea legible
- Divide el menú en secciones más pequeñas

## 🚀 Próximas Mejoras

- [ ] Caché de menús procesados
- [ ] Soporte para múltiples idiomas
- [ ] OCR offline con Tesseract.js
- [ ] Edición de menús existentes
- [ ] Export/Import de menús

## 📚 Recursos

- **Google Gemini Docs:** https://ai.google.dev/gemini-api/docs
- **PWA Guide:** https://web.dev/progressive-web-apps/
- **MediaDevices API:** https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

---

**¡Disfruta de tu sistema de escaneo de menú con IA!** 🎉

