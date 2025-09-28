# Configuración de Deploy Continuo con GitHub Actions y Vercel

## Pasos para configurar el deploy automático

### 1. Configurar Vercel

1. **Crear cuenta en Vercel** (si no tienes una):

   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub

2. **Importar el proyecto**:

   - En el dashboard de Vercel, haz clic en "New Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Obtener las credenciales necesarias**:
   - Ve a [Vercel Account Settings](https://vercel.com/account/tokens)
   - Crea un nuevo token de acceso
   - Ve a la configuración del proyecto en Vercel
   - Copia el `Project ID` y `Org ID`

### 2. Configurar GitHub Secrets

En tu repositorio de GitHub, ve a:
`Settings > Secrets and variables > Actions`

Agrega los siguientes secrets:

- `VERCEL_TOKEN`: El token de acceso de Vercel
- `ORG_ID`: El ID de tu organización en Vercel
- `PROJECT_ID`: El ID de tu proyecto en Vercel

### 3. Variables de entorno (si las necesitas)

Si tu aplicación usa variables de entorno, configúralas en:

- **Vercel Dashboard**: Project Settings > Environment Variables
- **GitHub Actions**: Settings > Secrets and variables > Actions

### 4. Flujo de trabajo

El workflow se ejecutará automáticamente cuando:

- Haces push a las ramas `main` o `develop`
- Creas un Pull Request hacia `main`

### 5. Comandos útiles

```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Deploy manual (si necesitas)
vercel --prod

# Ver logs de deploy
vercel logs
```

### 6. Monitoreo

- **GitHub Actions**: Ve a la pestaña "Actions" en tu repositorio
- **Vercel Dashboard**: Monitorea los deploys en tiempo real
- **Logs**: Revisa los logs en caso de errores

## Estructura del workflow

El archivo `.github/workflows/deploy.yml` incluye:

1. **Checkout**: Descarga el código
2. **Setup Node.js**: Configura Node.js 20 con cache de npm
3. **Install**: Instala dependencias con `npm ci`
4. **Lint**: Ejecuta el linter
5. **Build**: Construye el proyecto
6. **Deploy**: Despliega a Vercel

## Troubleshooting

### Error: "Vercel token not found"

- Verifica que el secret `VERCEL_TOKEN` esté configurado correctamente

### Error: "Project not found"

- Verifica que `PROJECT_ID` y `ORG_ID` sean correctos

### Build falla

- Revisa los logs de GitHub Actions
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no hay errores de TypeScript o ESLint
