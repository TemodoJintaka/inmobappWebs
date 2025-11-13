# 📚 ÍNDICE DE DOCUMENTACIÓN - MLS PROPERTIES

Bienvenido al proyecto MLS Properties. Aquí encontrarás toda la documentación necesaria.

---

## 📖 Documentos Disponibles

### 1. 📘 [README.md](./README.md) - **LÉEME PRIMERO**
**Documentación principal y completa del proyecto**

Incluye:
- ✅ Arquitectura del proyecto
- ✅ Tecnologías utilizadas
- ✅ Instalación paso a paso
- ✅ Estructura de carpetas completa
- ✅ Endpoints de la API
- ✅ Características implementadas
- ✅ Comandos útiles
- ✅ Troubleshooting
- ✅ Próximas mejoras

**📄 Tamaño**: 27KB | **⏱️ Lectura**: 15-20 minutos

---

### 2. 🚀 [INSTRUCCIONES_INICIO.md](./INSTRUCCIONES_INICIO.md) - **INICIO RÁPIDO**
**Guía rápida para levantar el proyecto en 5 minutos**

Incluye:
- ✅ Cómo iniciar backend y frontend
- ✅ Orden correcto de ejecución
- ✅ Verificación de servidores
- ✅ Cambiar puertos
- ✅ Detener servidores
- ✅ Troubleshooting rápido

**📄 Tamaño**: 6KB | **⏱️ Lectura**: 5 minutos

---

### 3. 🏗️ [ARQUITECTURA.md](./ARQUITECTURA.md) - **ARQUITECTURA TÉCNICA**
**Explicación profunda de cómo funciona el SSR y la comunicación frontend-backend**

Incluye:
- ✅ Diagrama de arquitectura detallado
- ✅ Flujo completo de una petición (12 pasos)
- ✅ Comparación SSR vs SPA
- ✅ Decisiones de arquitectura
- ✅ Cómo funciona la hidratación de React
- ✅ Cómo funciona Express SSR
- ✅ Escalabilidad para producción

**📄 Tamaño**: 17KB | **⏱️ Lectura**: 20-25 minutos

---

### 4. 📸 [COMO_AGREGAR_IMAGENES.md](./COMO_AGREGAR_IMAGENES.md) - **GUÍA DE IMÁGENES**
**Todo sobre cómo agregar imágenes a las propiedades**

Incluye:
- ✅ Agregar imágenes desde el admin de Django
- ✅ Agregar imágenes programáticamente
- ✅ Ubicación de archivos media
- ✅ Verificación de imágenes
- ✅ Troubleshooting de imágenes
- ✅ Formatos soportados

**📄 Tamaño**: 4.4KB | **⏱️ Lectura**: 5 minutos

---

## 🎯 ¿Por Dónde Empezar?

### Si eres nuevo en el proyecto:

```
1️⃣ Lee: INSTRUCCIONES_INICIO.md (5 min)
   → Levanta el proyecto
   
2️⃣ Lee: README.md (15 min)
   → Entiende qué hace cada cosa
   
3️⃣ Lee: ARQUITECTURA.md (20 min)
   → Comprende cómo funciona internamente
   
4️⃣ Lee: COMO_AGREGAR_IMAGENES.md (5 min)
   → Aprende a gestionar imágenes
```

### Si solo quieres levantar el proyecto:

```bash
# Leer solo esto:
📄 INSTRUCCIONES_INICIO.md

# Comandos rápidos:
# Terminal 1 (Backend)
cd backend && source venv/bin/activate && python manage.py runserver

# Terminal 2 (Frontend)
cd ssr && npm run build && npm run ssr
```

### Si quieres entender cómo funciona el SSR:

```
📄 ARQUITECTURA.md
   → Sección: "Cómo Funciona el SSR"
   → Sección: "Flujo Detallado de una Petición"
```

### Si necesitas agregar contenido:

```
📄 COMO_AGREGAR_IMAGENES.md
   → Admin de Django
   → http://localhost:8000/admin
```

---

## 📂 Estructura del Proyecto (Resumen)

```
SSR/
├── backend/              # Django REST API (Puerto 8000)
│   ├── properties/       # App principal
│   ├── mls_project/      # Configuración
│   └── media/            # Imágenes subidas
│
├── ssr/                  # React + Express (Puerto 3000)
│   ├── src/              # Código React/TypeScript
│   ├── server/           # Servidor SSR
│   └── build/            # Compilado (npm run build)
│
└── *.md                  # 📚 Documentación
```

---

## 🔗 Enlaces Rápidos

### Frontend (React SSR)
- **Home**: http://localhost:3000/
- **Listado**: http://localhost:3000/propiedades
- **Detalle**: http://localhost:3000/propiedades/1

### Backend (Django API)
- **Admin**: http://localhost:8000/admin/
- **API Root**: http://localhost:8000/api/
- **Propiedades**: http://localhost:8000/api/properties/
- **Estados**: http://localhost:8000/api/states/

### Credenciales
- **Usuario**: `admin`
- **Contraseña**: `admin123`

---

## 🛠️ Comandos Más Usados

### Iniciar Proyecto

```bash
# Backend
cd backend && source venv/bin/activate && python manage.py runserver

# Frontend
cd ssr && npm run ssr
```

### Compilar Frontend

```bash
cd ssr
npm run build
```

### Ver Logs

```bash
# Backend: ya se muestran en la terminal
# Frontend: también se muestran en la terminal
```

### Cargar Datos de Ejemplo

```bash
cd backend
source venv/bin/activate
python manage.py load_sample_data
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Puerto 8000 ocupado | `lsof -i:8000` y `kill -9 <PID>` |
| Puerto 3000 ocupado | `lsof -i:3000` y `kill -9 <PID>` |
| Frontend no conecta | Verificar `http://localhost:8000/api/` |
| Build no existe | `cd ssr && npm run build` |
| No hay datos | `python manage.py load_sample_data` |
| Módulos faltantes | `cd ssr && npm install` |

---

## 📊 Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Express.js (SSR)
- React Router v7
- Axios
- Tailwind CSS

### Backend
- Django 5.1
- Django REST Framework
- django-filter
- django-cors-headers
- SQLite (desarrollo)

---

## 📝 Notas Importantes

1. ⚠️ **Siempre iniciar primero el backend (8000), luego el frontend (3000)**
2. ⚠️ **Ejecutar `npm run build` después de cambios en código React**
3. ⚠️ **Los cambios en `server-ssr.js` requieren reiniciar el servidor SSR**
4. ✅ **El proyecto usa 2 servidores independientes**
5. ✅ **CORS ya está configurado para desarrollo**

---

## 🎓 Conceptos Clave

### SSR (Server-Side Rendering)
Express renderiza HTML inicial en el servidor, React lo hidrata en el cliente.

### Hidratación (Hydration)
React "activa" el HTML estático del servidor sin re-renderizarlo.

### API REST
Backend Django expone datos en formato JSON para el frontend.

### CORS
Permite que frontend (3000) consuma backend (8000).

---

## 📧 Soporte

Para dudas o problemas:
1. Revisa la documentación correspondiente
2. Verifica Troubleshooting en README.md
3. Revisa logs de consola (backend y frontend)

---

## 🔄 Última Actualización

**Fecha**: 10 de Noviembre, 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Completo y funcional

---

## ✨ Próximos Pasos Sugeridos

1. Revisar todos los documentos
2. Levantar el proyecto
3. Explorar el código
4. Agregar datos de prueba
5. Probar los filtros
6. Agregar imágenes
7. Personalizar estilos

---

**¡Feliz codificación!** 🚀

