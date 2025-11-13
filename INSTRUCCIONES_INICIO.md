# 🚀 CÓMO INICIAR EL PROYECTO MLS PROPERTIES

## 📦 Estructura de Servidores

Tu proyecto tiene **2 servidores independientes**:

```
┌─────────────────────────────────────────┐
│  BACKEND (Django + DRF)                 │
│  Puerto: 8000                           │
│  URL: http://localhost:8000/api/        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FRONTEND (React + Express SSR)         │
│  Puerto: 3000                           │
│  URL: http://localhost:3000/            │
└─────────────────────────────────────────┘
```

---

## ⚡ INICIO RÁPIDO

### **Opción 1: Iniciar en 2 Terminales (Recomendado)**

#### **Terminal 1 - Backend Django** 🐍

```bash
# Ir al directorio backend
cd /home/tachibana/Escritorio/SSR/backend

# Activar entorno virtual
source venv/bin/activate

# Iniciar servidor Django
python manage.py runserver

# ✅ Backend corriendo en: http://localhost:8000
```

#### **Terminal 2 - Frontend React SSR** ⚛️

```bash
# Ir al directorio frontend
cd /home/tachibana/Escritorio/SSR/ssr

# Compilar el proyecto (solo la primera vez o después de cambios)
npm run build

# Iniciar servidor SSR
npm run ssr

# ✅ Frontend corriendo en: http://localhost:3000
```

---

### **Opción 2: Script de Inicio Automático**

Crear script `start.sh` en la raíz del proyecto:

```bash
#!/bin/bash

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando MLS Properties...${NC}\n"

# Iniciar Backend
echo -e "${GREEN}📦 Iniciando Backend Django...${NC}"
cd backend
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!

sleep 3

# Iniciar Frontend
echo -e "${GREEN}⚛️  Iniciando Frontend React SSR...${NC}"
cd ../ssr
npm run ssr &
FRONTEND_PID=$!

echo -e "\n${GREEN}✅ Servidores iniciados!${NC}"
echo -e "Backend PID: $BACKEND_PID"
echo -e "Frontend PID: $FRONTEND_PID"
echo -e "\n${BLUE}Para detener:${NC} kill $BACKEND_PID $FRONTEND_PID"

wait
```

```bash
# Dar permisos de ejecución
chmod +x start.sh

# Ejecutar
./start.sh
```

---

## 🗂️ Archivos de Servidor en `/ssr/server/`

| Archivo | Descripción | ¿Usar? |
|---------|-------------|--------|
| `server-ssr.js` | ✅ Servidor SSR completo con React Router | **SÍ** |
| `index.js` | 🔧 Punto de entrada (carga `server-ssr.js`) | Automático |

**El archivo `index.js` ya está configurado para usar `server-ssr.js`** ✅

---

## 📝 Orden de Inicio

**IMPORTANTE:** Inicia primero el backend, luego el frontend.

### 1️⃣ **Primero: Backend Django**
```bash
cd /home/tachibana/Escritorio/SSR/backend
source venv/bin/activate
python manage.py runserver
```

### 2️⃣ **Segundo: Frontend React**
```bash
cd /home/tachibana/Escritorio/SSR/ssr
npm run build  # Solo si hay cambios en el código
npm run ssr
```

---

## 🔍 Verificación

### **Backend (Django):**
- API Root: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/
- Propiedades: http://localhost:8000/api/properties/

**Credenciales Admin:** `admin` / `admin123`

### **Frontend (React SSR):**
- Home: http://localhost:3000/
- Listado: http://localhost:3000/propiedades
- Detalle: http://localhost:3000/propiedades/1

---

## ⚙️ Configuración de Puertos

### **Cambiar Puerto del Frontend:**

Editar `/ssr/server/server-ssr.js` línea 13:

```javascript
const PORT = process.env.PORT || 3000; // Cambiar 3000 por el puerto deseado
```

O usar variable de entorno:

```bash
PORT=4000 npm run ssr
```

### **Cambiar Puerto del Backend:**

```bash
python manage.py runserver 8080
```

O editar URL en el frontend:

Crear archivo `/ssr/.env`:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🛑 Detener Servidores

### **Opción 1: Ctrl+C en cada terminal**

Presiona `Ctrl+C` en cada terminal donde corre un servidor.

### **Opción 2: Por PID**

```bash
# Ver procesos
ps aux | grep "python manage.py runserver"
ps aux | grep "node server"

# Matar por PID
kill <PID>
```

### **Opción 3: Matar todos**

```bash
# Matar Django
pkill -f "python manage.py runserver"

# Matar Node
pkill -f "node server"
```

---

## 🐛 Troubleshooting

### **Error: Puerto ya en uso**

```bash
# Ver qué está usando el puerto 8000
sudo lsof -i :8000

# Matar el proceso
kill -9 <PID>
```

### **Error: Cannot GET /api/properties**

✅ Verifica que el backend esté corriendo en puerto 8000

```bash
curl http://localhost:8000/api/properties/
```

### **Error: Module not found**

```bash
cd /home/tachibana/Escritorio/SSR/ssr
npm install
```

### **Frontend no se conecta al backend**

Editar `/ssr/.env`:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Y recompilar:

```bash
npm run build
npm run ssr
```

---

## 📊 Comandos Útiles

### **Backend:**

```bash
# Ver logs del backend
cd backend
source venv/bin/activate
python manage.py runserver --verbosity 2

# Crear superusuario nuevo
python manage.py createsuperuser

# Ver base de datos
python manage.py dbshell
```

### **Frontend:**

```bash
# Desarrollo con hot-reload
npm start

# Build de producción
npm run build

# Ver tamaño del bundle
npm run build -- --stats

# Limpiar cache
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Resumen Rápido

```bash
# Terminal 1: Backend
cd backend && source venv/bin/activate && python manage.py runserver

# Terminal 2: Frontend
cd ssr && npm run build && npm run ssr
```

**URLs:**
- 🏠 Frontend: http://localhost:3000
- 🔌 API: http://localhost:8000/api/
- ⚙️ Admin: http://localhost:8000/admin/

**Credenciales:** `admin` / `admin123`

---

¡Listo! 🎉

