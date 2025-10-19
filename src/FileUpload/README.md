# 📁 FileUpload Context

**Responsabilidad**: Gestión de carga y procesamiento de archivos.

## Estructura

```
FileUpload/
├── domain/              # Entidades y reglas de negocio
│   ├── File.ts
│   ├── FileId.ts
│   ├── FileName.ts
│   ├── FileSize.ts
│   ├── FileType.ts
│   └── FileRepository.ts (interface)
├── application/         # Casos de uso y servicios
│   ├── UploadFile.ts
│   ├── DeleteFile.ts
│   ├── GetFile.ts
│   └── FileUploadService.ts
└── infrastructure/      # Implementaciones concretas
    ├── FileRepository.ts
    ├── S3FileStorage.ts
    └── LocalFileStorage.ts
```

## Entidades del Dominio

### File

- **FileId**: Identificador único del archivo
- **FileName**: Nombre original del archivo
- **FileSize**: Tamaño del archivo en bytes
- **FileType**: Tipo MIME del archivo
- **StoragePath**: Ruta de almacenamiento
- **Url**: URL pública del archivo
- **CreatedAt**: Fecha de carga
- **UpdatedAt**: Fecha de última actualización

## Casos de Uso

### UploadFile

- Cargar archivo al sistema
- Validar tipo y tamaño
- Generar nombre único
- Almacenar en storage

### DeleteFile

- Eliminar archivo del sistema
- Limpiar storage
- Actualizar referencias

### GetFile

- Obtener información del archivo
- Por ID o por criterios

## Tipos de Archivo Soportados

### Imágenes de Productos

- **Formatos**: JPG, PNG, WebP
- **Tamaño máximo**: 5MB
- **Resolución**: Mínimo 300x300px

### Documentos

- **Formatos**: PDF, DOC, DOCX
- **Tamaño máximo**: 10MB

### Códigos QR

- **Formatos**: PNG, SVG
- **Tamaño**: 200x200px

## Storage Options

### S3FileStorage

- Almacenamiento en AWS S3
- URLs públicas
- CDN integration

### LocalFileStorage

- Almacenamiento local
- Para desarrollo
- Archivos en carpeta public

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { File } from "@/FileUpload/domain/File"
// import { UploadFile } from "@/FileUpload/application/UploadFile"
// import { S3FileStorage } from "@/FileUpload/infrastructure/S3FileStorage"
```
