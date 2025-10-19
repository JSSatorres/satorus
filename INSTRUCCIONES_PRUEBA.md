# 🧪 Instrucciones para Probar el Escaneo de Menú con IA

## ✅ Checklist Rápido

Sigue estos pasos para probar la funcionalidad completa:

---

## 1️⃣ Obtener API Key de Google Gemini (2 minutos)

### Paso a paso:

1. **Abre tu navegador** y ve a:
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Inicia sesión** con tu cuenta de Google

3. **Clic en "Create API Key"** o "Get API Key"

4. **Copia la clave** que aparece (algo como: `AIzaSyC...`)

5. **Guárdala** temporalmente (la necesitarás en el siguiente paso)

---

## 2️⃣ Configurar la Aplicación

### Opción A: Crear archivo .env.local (Recomendado)

1. En la raíz del proyecto, crea un archivo llamado `.env.local`

2. Pega esto dentro:
   ```bash
   GEMINI_API_KEY=TU_API_KEY_AQUI
   ```

3. Reemplaza `TU_API_KEY_AQUI` con la clave que copiaste

### Opción B: Si ya tienes .env

1. Abre tu archivo `.env` existente

2. Añade esta línea al final:
   ```bash
   GEMINI_API_KEY=TU_API_KEY_AQUI
   ```

3. Guarda el archivo

---

## 3️⃣ Instalar Dependencias (si no lo has hecho)

```bash
npm install
```

**Esto instalará:**
- `next-pwa` (para PWA)
- `@google/generative-ai` (para Gemini)

---

## 4️⃣ Ejecutar la Aplicación

```bash
npm run dev
```

Deberías ver:
```
> pideya@0.1.0 dev
> next dev --turbopack

  ▲ Next.js 15.5.3
  - Local:        http://localhost:3000
  
✓ Ready in 2.5s
```

---

## 5️⃣ Acceder al Dashboard

1. Abre tu navegador en: **http://localhost:3000**

2. Si necesitas autenticarte:
   - Ve a `/login` o `/register`
   - Crea/inicia sesión

3. Ve al Dashboard: **http://localhost:3000/dashboard**

---

## 6️⃣ Probar el Escaneo de Menú

### Preparar una foto de menú:

**Opción 1: Usar un menú físico**
- Ten a mano un menú de restaurante impreso
- O imprime uno de ejemplo

**Opción 2: Descargar imagen de prueba**
- Busca en Google: "menú restaurante español PDF"
- Descarga una imagen de ejemplo
- O usa esta de ejemplo: https://www.example.com/menu-sample.jpg

### Pasos en la App:

1. **En el Dashboard**, busca la sección **"Gestión de Menú"** o **"Crear y Gestionar Menú"**

2. **Clic en el botón:**
   ```
   📷 Escanear Menú con IA
   ```

3. **Se abrirá un modal** con dos opciones:

   **Opción A: Usar Cámara (en móvil o PC con webcam)**
   - Clic en "Abrir Cámara"
   - El navegador pedirá permisos → **Aceptar**
   - Enfoca el menú físico
   - Clic en "Capturar Foto"

   **Opción B: Subir desde Galería/Archivos**
   - Clic en "Subir desde Galería"
   - Selecciona la imagen del menú
   - Se mostrará preview

4. **Procesar con IA:**
   - Clic en **"Extraer Menú con IA"**
   - Espera 2-5 segundos
   - Verás: "Procesando con IA..."

5. **Revisar los Platos Extraídos:**
   - Se abrirá el preview con todos los platos detectados
   - Cada plato mostrará:
     - ✅ Nombre
     - ✅ Descripción
     - ✅ Precio
     - ✅ Categoría

6. **Editar (opcional):**
   - Clic en ✏️ para editar un plato
   - Clic en 🗑️ para eliminar
   - Clic en ➕ para añadir uno manual

7. **Guardar:**
   - Clic en **"Guardar X Platos en el Menú"**
   - Verás mensaje: "✅ X platos guardados correctamente"

---

## 7️⃣ Verificar en Base de Datos (Opcional)

### Opción 1: Ver en Prisma Studio

```bash
npx prisma studio
```

1. Se abrirá en http://localhost:5555
2. Ve a la tabla `menu_items`
3. Verás los platos guardados

### Opción 2: Ver en consola

```bash
npx prisma db seed # si tienes seed
```

O crear un script rápido para listar items.

---

## 8️⃣ Probar como PWA (Opcional)

### En Móvil:

1. **Despliega en Vercel** (o similar) para tener HTTPS:
   ```bash
   vercel deploy
   ```

2. **Abre la URL** en el móvil

3. **El navegador mostrará:**
   - Chrome: "Instalar PideYa"
   - Safari: Botón de compartir → "Añadir a inicio"

4. **Instala la app**

5. **Abre desde la pantalla de inicio**

6. **Ahora podrás usar la cámara** como app nativa

### En Desktop:

1. **Abre en Chrome/Edge**

2. **Busca el icono de instalación** en la barra de direcciones (⊕)

3. **Clic → "Instalar"**

4. La app se abrirá en ventana independiente

---

## 🧪 Casos de Prueba

### ✅ Prueba 1: Menú Simple
- Foto de menú con 3-5 platos
- Texto claro y legible
- Resultado esperado: Todos los platos extraídos correctamente

### ✅ Prueba 2: Menú Complejo
- Foto de menú con 10+ platos
- Múltiples categorías
- Resultado esperado: Mayoría de platos correctos, algunos para editar

### ✅ Prueba 3: Foto Borrosa
- Foto con poca luz o desenfocada
- Resultado esperado: Algunos errores, mensaje de mejorar calidad

### ✅ Prueba 4: Menú en Otro Idioma
- Menú en inglés, italiano, etc.
- Resultado esperado: Funciona igual (Gemini es multiidioma)

### ✅ Prueba 5: Edición Manual
- Extraer menú
- Editar varios platos
- Añadir uno manual
- Eliminar uno incorrecto
- Guardar
- Resultado esperado: Cambios reflejados en BD

---

## ❌ Troubleshooting

### Error: "No se pudo acceder a la cámara"

**Causa:** Permisos denegados o no HTTPS

**Solución:**
1. En Chrome: `chrome://settings/content/camera`
2. Permitir acceso para `localhost`
3. O usar "Subir desde Galería" como alternativa

---

### Error: "Error al procesar imagen con IA"

**Causa:** API Key incorrecta o no configurada

**Solución:**
1. Verificar `.env.local` tiene `GEMINI_API_KEY`
2. Reiniciar servidor: `Ctrl+C` → `npm run dev`
3. Verificar que la clave sea válida en Google AI Studio

---

### Error: "La IA no extrae bien los platos"

**Causa:** Foto de mala calidad

**Solución:**
1. Tomar foto con mejor iluminación
2. Acercar más al menú
3. Asegurarse de que el texto sea legible
4. Probar con una sección más pequeña del menú

---

### Error: "Error al guardar en base de datos"

**Causa:** Prisma no configurado o BD no accesible

**Solución:**
```bash
# Generar cliente Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate dev

# Verificar conexión
npx prisma studio
```

---

## 📊 Métricas de Éxito

Al terminar la prueba, deberías poder:

- ✅ Capturar foto de menú (cámara o archivo)
- ✅ Ver la IA procesando en 2-5 segundos
- ✅ Obtener lista de platos con nombre, precio, categoría
- ✅ Editar/eliminar/añadir platos
- ✅ Guardar en base de datos
- ✅ Ver confirmación de guardado
- ✅ (Opcional) Instalar como PWA y usar cámara

---

## 🎉 ¡Prueba Completada!

Si lograste todos los pasos, la funcionalidad está **100% operativa**.

### Próximos Pasos:

1. **Integrar con tu autenticación** (obtener restaurantId real)
2. **Personalizar categorías** según tu negocio
3. **Añadir vista de menús** guardados
4. **Implementar edición** de menús existentes
5. **Desplegar en producción** con HTTPS

---

## 📞 Soporte

Si encuentras algún problema:

1. **Revisa la consola del navegador** (F12 → Console)
2. **Revisa logs del servidor** (terminal donde corre `npm run dev`)
3. **Verifica las variables de entorno**
4. **Revisa la documentación completa:** `MENU_AI_SETUP.md`

---

**¡Disfruta de tu sistema de escaneo de menú con IA!** 🚀📸







