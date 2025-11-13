# 🏠 MLS Properties - Sistema de Listado de Propiedades con SSR

Sistema completo de listado de propiedades inmobiliarias (Multiple Listing Service) con Server-Side Rendering (SSR), construido con React + Express (frontend) y Django REST Framework del proyecto **inmobap** (backend).

---

## 📋 Tabla de Contenidos

- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Cómo Funciona el SSR](#-cómo-funciona-el-ssr)
- [Flujo de Datos](#-flujo-de-datos)
- [Configuración del Tenant (Multitenancy)](#-configuración-del-tenant-multitenancy)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Iniciar el Proyecto](#-iniciar-el-proyecto)
- [Características Implementadas](#-características-implementadas)
- [Endpoints API](#-endpoints-api)
- [SEO y Optimización](#-seo-y-optimización)
- [Administración](#-administración)
- [Troubleshooting](#-troubleshooting)

---

## 🏗 Arquitectura del Proyecto

Este proyecto sigue una arquitectura **desacoplada** con dos servidores independientes:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│                     (Navegador Web)                         │
└────────────┬──────────────────────────────────┬─────────────┘
             │                                  │
             │ Petición inicial (HTML)          │ Peticiones AJAX (JSON)
             │                                  │
             ▼                                  ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│   EXPRESS SERVER (SSR)  │         │   DJANGO REST API        │
│      Puerto 3000        │────────▶│      Puerto 8000         │
│                         │         │   (Backend inmobap)      │
│  • Server-Side Render   │         │                          │
│  • Hidratación React    │         │  • Endpoints REST        │
│  • Meta Tags SEO        │         │  • Multitenancy          │
│  • Routing SSR          │         │  • Filtros y Paginación  │
└─────────────────────────┘         └──────────────────────────┘
             │                                  │
             │ Consume API (con X-Company)      │
             └──────────────────────────────────┘
```

### Componentes Principales

1. **Frontend SSR (Express + React)**
   - **Puerto**: 3000
   - **Responsable de**: 
     - Renderizar HTML inicial en el servidor
     - Hidratar la aplicación React en el cliente
     - Servir archivos estáticos (JS, CSS)
     - Generar meta tags dinámicos para SEO
     - Enviar header `X-Company` para multitenancy

2. **Backend API (Django REST Framework - inmobap)**
   - **Puerto**: 8000
   - **Responsable de**:
     - Proveer API REST para propiedades
     - Gestionar base de datos con multitenancy (django-tenants)
     - Filtros y paginación avanzados
     - Sistema de permisos (público para lectura)
     - Admin interface

3. **Cliente (React)**
   - **Ejecuta en**: Navegador
   - **Responsable de**:
     - Hidratar el HTML inicial
     - Manejar interacciones del usuario
     - Realizar peticiones AJAX al backend
     - Routing del lado del cliente

---

## 🛠 Tecnologías Utilizadas

### Frontend
- **React 18** - Librería UI con hidratación
- **TypeScript** - Tipado estático
- **React Router v7** - Routing del lado del cliente
- **Axios** - Cliente HTTP para llamadas API
- **Tailwind CSS** - Framework CSS utility-first
- **Express.js** - Servidor Node para SSR

### Backend (inmobap)
- **Django 5.1+** - Framework web Python
- **Django REST Framework (DRF)** - API REST
- **django-tenants** - Multitenancy con PostgreSQL schemas
- **django-filter** - Filtros avanzados para querysets
- **django-cors-headers** - Manejo de CORS
- **Pillow** - Procesamiento de imágenes
- **PostgreSQL** - Base de datos (con schemas por tenant)

### Build Tools
- **Create React App** - Configuración React
- **Babel** - Transpilación ES6+ para SSR
- **@babel/register** - Compilación on-the-fly
- **ignore-styles** - Ignorar CSS imports en Node

---

## 📁 Estructura de Carpetas

```
SSR/
├── Backend/                          # Backend Django (inmobap)
│   ├── inmobapp/                     # Aplicación principal
│   │   ├── apps/
│   │   │   ├── realstate/            # Módulo de propiedades
│   │   │   │   ├── models/           # RealProperty, TypeProperty, etc.
│   │   │   │   ├── serializers/      # PropertySerializer, etc.
│   │   │   │   ├── viewsets/         # PropertyViewSet, etc.
│   │   │   │   └── fixtures/         # Datos iniciales
│   │   │   ├── crm/                  # Clientes, búsquedas, visitas
│   │   │   ├── membership/           # Membresías y usuarios
│   │   │   └── administration/       # Reservas
│   │   ├── locations/                # Estados, municipios, parroquias
│   │   ├── core/                     # Utilidades compartidas
│   │   │   └── utils/
│   │   │       └── permissions_mixin.py  # Sistema de permisos
│   │   └── tenant/                    # Multitenancy (django-tenants)
│   │       └── middleware.py          # Manejo de X-Company header
│   ├── config/                        # Configuración Django
│   │   ├── settings/                  # Settings por ambiente
│   │   ├── urls.py                    # URLs principales
│   │   └── api_router.py             # Router de DRF
│   ├── manage.py                      # CLI Django
│   └── requirements/                  # Dependencias Python
│
├── ssr/                               # Frontend React + Express
│   ├── public/                       # Archivos públicos
│   │   └── index.html                # Template HTML base
│   ├── src/                          # Código fuente React
│   │   ├── components/
│   │   │   ├── common/               # Componentes reutilizables
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   └── Loading.tsx
│   │   │   ├── layout/               # Componentes de layout
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── property/             # Componentes de propiedades
│   │   │       ├── PropertyCard.tsx
│   │   │       ├── PropertyFilters.tsx
│   │   │       ├── PropertyGallery.tsx
│   │   │       └── AgentInfo.tsx
│   │   ├── pages/                    # Páginas principales
│   │   │   ├── Home.tsx              # Landing page
│   │   │   ├── PropertyList.tsx      # Listado con filtros
│   │   │   └── PropertyDetail.tsx     # Detalle de propiedad
│   │   ├── services/
│   │   │   └── api.ts                # Cliente API con Axios
│   │   ├── types/
│   │   │   ├── property.types.ts     # Tipos TypeScript
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── seo.ts                # Utilidades SEO
│   │   ├── App.tsx                   # Componente principal
│   │   ├── index.js                  # Entry point cliente
│   │   └── index.css                 # Estilos globales
│   ├── server/                       # Servidor Express SSR
│   │   ├── index.js                  # Loader Babel
│   │   └── server-ssr.js             # Servidor Express principal
│   ├── build/                        # Build de producción React
│   ├── .env                          # Variables de entorno
│   ├── package.json                  # Dependencias Node
│   └── tsconfig.json                 # Configuración TypeScript
│
├── COMO_AGREGAR_IMAGENES.md          # Guía para imágenes
├── CONFIGURAR_TENANT.md              # Guía de configuración del tenant
├── INSTRUCCIONES_INICIO.md           # Guía de inicio rápido
└── README.md                         # Este archivo
```

---

## 🔄 Cómo Funciona el SSR

### 1. Renderizado en el Servidor (Server-Side Rendering)

Cuando un usuario accede a una URL (ej: `http://localhost:3000/propiedades/123`):

```javascript
// server/server-ssr.js

1. Express recibe la petición GET
   ↓
2. Lee el archivo build/index.html
   ↓
3. Renderiza un componente React básico con ReactDOMServer.renderToString()
   ↓
4. Inyecta el HTML renderizado en <div id="root">
   ↓
5. Genera meta tags SEO dinámicos basados en la URL
   ↓
6. Envía el HTML completo al navegador
```

**Código simplificado:**

```javascript
// server/server-ssr.js
const renderSSR = (req, res) => {
  fs.readFile('build/index.html', 'utf-8', (err, data) => {
    // 1. Renderizar componente React
    const SimpleApp = React.createElement('div', {
      id: 'app-container',
      className: 'flex flex-col min-h-screen'
    }, 'Cargando...');
    
    const appHtml = ReactDomServer.renderToString(SimpleApp);
    
    // 2. Generar meta tags
    const metaTags = generateMetaTags(req.url);
    
    // 3. Inyectar en HTML
    let html = data
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace('</head>', `${metaTags}</head>`);
    
    // 4. Enviar respuesta
    res.send(html);
  });
};

app.get('/', renderSSR);
app.get('/propiedades', renderSSR);
app.get('/propiedades/:id', renderSSR);
```

### 2. Hidratación en el Cliente (Client-Side Hydration)

Una vez que el HTML llega al navegador:

```javascript
// src/index.js

1. El navegador carga el HTML inicial (con contenido)
   ↓
2. Descarga y ejecuta los bundles JS de React
   ↓
3. React "hidrata" el HTML existente usando hydrateRoot()
   ↓
4. La aplicación React toma control total
   ↓
5. Las navegaciones subsecuentes son del lado del cliente (SPA)
```

**Código:**

```javascript
// src/index.js
const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(rootElement, (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ));
}
```

### 3. Ventajas del SSR en este Proyecto

✅ **SEO**: Los motores de búsqueda ven contenido HTML inmediato
✅ **Performance**: First Contentful Paint más rápido
✅ **Accesibilidad**: Funciona sin JavaScript (fallback básico)
✅ **Meta Tags Dinámicos**: Cada propiedad tiene sus propias meta tags
✅ **Social Sharing**: Previews correctas en Facebook, Twitter, etc.

---

## 📊 Flujo de Datos

### Flujo Completo de una Petición

```
USUARIO accede a /propiedades/123
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ 1. EXPRESS SERVER (SSR)                                    │
│    - Recibe GET /propiedades/123                           │
│    - Renderiza HTML básico con React                       │
│    - Genera meta tags para propiedad ID 123                │
│    - Envía HTML completo                                   │
└────────────────────────────────────────────────────────────┘
         │
         ▼ HTML
┌────────────────────────────────────────────────────────────┐
│ 2. NAVEGADOR                                               │
│    - Recibe y muestra HTML (contenido visible)             │
│    - Descarga bundles JS                                   │
│    - React hidrata la aplicación                           │
└────────────────────────────────────────────────────────────┘
         │
         ▼ componentDidMount()
┌────────────────────────────────────────────────────────────┐
│ 3. REACT COMPONENT (PropertyDetail.tsx)                   │
│    - useEffect() se ejecuta                                │
│    - Llama a propertyAPI.getProperty(123)                  │
└────────────────────────────────────────────────────────────┘
         │
         ▼ HTTP GET con header X-Company
┌────────────────────────────────────────────────────────────┐
│ 4. AXIOS CLIENT (services/api.ts)                         │
│    - GET http://localhost:8000/api/properties/123/         │
│    - Headers:                                              │
│      • Content-Type: application/json                     │
│      • X-Company: nombre_del_tenant                       │
└────────────────────────────────────────────────────────────┘
         │
         ▼ API Request
┌────────────────────────────────────────────────────────────┐
│ 5. DJANGO MIDDLEWARE (TenantMainMiddleware)               │
│    - Lee header X-Company                                 │
│    - Busca tenant por nombre                              │
│    - Cambia al schema del tenant                          │
└────────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ 6. DJANGO REST API                                         │
│    - PropertyViewSet.retrieve()                            │
│    - PermissionsMixin: permite acceso público             │
│    - Consulta: RealProperty.objects.get(id=123)           │
│    - Serializa con PropertySerializer                      │
│    - Incluye: características, imágenes, asesor           │
└────────────────────────────────────────────────────────────┘
         │
         ▼ JSON Response
┌────────────────────────────────────────────────────────────┐
│ 7. AXIOS CLIENT                                            │
│    - Recibe JSON con datos de la propiedad                 │
│    - Retorna response.data                                │
└────────────────────────────────────────────────────────────┘
         │
         ▼ data
┌────────────────────────────────────────────────────────────┐
│ 8. REACT COMPONENT                                         │
│    - setProperty(data)                                     │
│    - Re-render con datos reales                            │
│    - Usuario ve: galería, precio, características         │
└────────────────────────────────────────────────────────────┘
```

### Comunicación Frontend ↔ Backend

**Configuración CORS (Backend):**

```python
# Backend/config/settings/base.py
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "x-company",  # Header para multitenancy
    "authorization",
    "content-type",
    # ...
]
```

**Cliente API (Frontend):**

```typescript
// ssr/src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
const X_COMPANY_HEADER = process.env.REACT_APP_COMPANY_NAME || 'default';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Company': X_COMPANY_HEADER,  // Requerido para multitenancy
  },
});
```

---

## 🏢 Configuración del Tenant (Multitenancy)

El backend de inmobap usa **django-tenants** para multitenancy. Esto significa que cada empresa (tenant) tiene su propio schema en PostgreSQL y **todas las peticiones API requieren el header `X-Company`**.

### ⚠️ IMPORTANTE: Configuración Requerida

**1. Crear archivo `.env` en `ssr/`:**

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api

# Tenant Configuration (django-tenants)
# Este debe ser el NOMBRE (name) del tenant Company, NO el ID
REACT_APP_COMPANY_NAME=nombre_del_tenant_aqui
```

**2. Obtener el nombre del tenant:**

```bash
cd /home/tachibana/Escritorio/SSR/Backend
source venv/bin/activate
python manage.py shell
```

```python
from inmobapp.tenant.models import Company
companies = Company.objects.all()
for c in companies:
    print(f"Name: '{c.name}', Schema: {c.schema_name}")
```

**3. Si no tienes un tenant, créalo desde el admin:**
- Accede a: http://localhost:8000/admin/tenant/company/add/
- Completa los campos y guarda
- Luego crea un Domain para ese tenant

**📖 Ver guía completa**: [CONFIGURAR_TENANT.md](./CONFIGURAR_TENANT.md)

---

## 💻 Instalación y Configuración

### Requisitos Previos

- **Node.js** 16+ y npm
- **Python** 3.10+
- **PostgreSQL** (para multitenancy)
- **Git**

### 1. Backend (Django - inmobap)

El backend ya está configurado. Solo necesitas:

```bash
# Entrar a la carpeta del backend
cd /home/tachibana/Escritorio/SSR/Backend

# Activar entorno virtual (si existe)
source venv/bin/activate

# Aplicar migraciones (si es necesario)
just migrate

# Cargar datos iniciales (si es necesario)
just load-initial-data

# Cargar fixtures del tenant (si es necesario)
just manage load_tenant_fixtures --tenant=<schema_name>

# Iniciar servidor Django
python manage.py runserver
# ✓ Backend corriendo en http://localhost:8000
```

### 2. Frontend (React + Express)

```bash
# Entrar a la carpeta del frontend
cd /home/tachibana/Escritorio/SSR/ssr

# Instalar dependencias
npm install --legacy-peer-deps

# Crear archivo .env (IMPORTANTE)
cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_COMPANY_NAME=nombre_del_tenant_aqui
EOF

# Compilar aplicación React
npm run build

# Iniciar servidor SSR
npm run ssr
# ✓ Frontend corriendo en http://localhost:3000
```

---

## 🚀 Iniciar el Proyecto

Necesitas **2 terminales** abiertas simultáneamente:

### Terminal 1: Backend Django

```bash
cd /home/tachibana/Escritorio/SSR/Backend
source venv/bin/activate  # Si usas venv
python manage.py runserver
```

**Salida esperada:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Terminal 2: Frontend Express SSR

```bash
cd /home/tachibana/Escritorio/SSR/ssr
npm run ssr
```

**Salida esperada:**
```
🚀 Server-Side Rendering server is running
📡 Listening on http://localhost:3000
```

### Acceder a la Aplicación

- **Frontend**: http://localhost:3000
- **Admin Django**: http://localhost:8000/admin
- **API REST**: http://localhost:8000/api
- **Swagger Docs**: http://localhost:8000/docs

---

## ✨ Características Implementadas

### 1. Sistema de Propiedades Completo

- ✅ Listado de propiedades con paginación (12 por página)
- ✅ Filtros avanzados:
  - Búsqueda por texto (nombre, ubicación, email)
  - Tipo de propiedad (Casa, Apartamento, Oficina, etc.)
  - Tipo de negociación (Venta, Alquiler)
  - Ubicación (Estado, Municipio, Parroquia)
  - Rango de precios (min/max)
- ✅ Detalle de propiedad con:
  - Galería de imágenes
  - Características (habitaciones, baños, m², etc.)
  - Información del asesor
  - Ubicación detallada
  - Precio y tipo de negociación

### 2. Landing Page (Home)

- ✅ Hero section con gradiente
- ✅ Propiedades destacadas
- ✅ Sección "¿Por qué elegirnos?"
- ✅ Call to action
- ✅ Diseño responsive

### 3. Componentes Reutilizables

- ✅ Button - Botones con variantes
- ✅ Input - Campos de entrada
- ✅ Select - Dropdowns
- ✅ Pagination - Navegación entre páginas
- ✅ Loading - Indicador de carga
- ✅ PropertyCard - Tarjeta de propiedad
- ✅ PropertyFilters - Panel de filtros
- ✅ PropertyGallery - Galería de imágenes
- ✅ AgentInfo - Información del asesor

### 4. SEO Optimizado

- ✅ Meta tags dinámicos por página
- ✅ Open Graph para social sharing
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD) con Schema.org

### 5. Backend Robusto (inmobap)

- ✅ Sistema multitenancy con django-tenants
- ✅ Modelos completos:
  - RealProperty (Propiedad)
  - PropertyImage (Imágenes)
  - PropertyCharacteristic (Características)
  - Characteristic (Catálogo)
  - TypeProperty (Tipo de propiedad)
  - TypeNegotiation (Tipo de negociación)
  - State, Municipality, Parish (Ubicaciones)
  - Franchise, Membership, Client
- ✅ API REST completa con DRF
- ✅ Filtros personalizados avanzados
- ✅ Paginación configurable
- ✅ Permisos: acceso público para lectura
- ✅ CORS configurado
- ✅ Admin interface personalizada

### 6. Sistema de Imágenes

- ✅ Upload de imágenes desde admin
- ✅ Ordenamiento de imágenes
- ✅ Almacenamiento organizado
- ✅ URLs absolutas en API
- ✅ Servido de archivos media en desarrollo

---

## 🔌 Endpoints API

### Base URL
```
http://localhost:8000/api
```

### ⚠️ IMPORTANTE: Header Requerido

Todas las peticiones deben incluir el header:
```
X-Company: nombre_del_tenant
```

### Propiedades

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/properties/` | Lista paginada | `page`, `page_size`, `search`, `type_property`, `type_negotiation`, `state`, `municipality`, `parish`, `ordering` |
| GET | `/properties/{id}/` | Detalle de propiedad | - |

**Ejemplo:**
```bash
# Listar todas las propiedades
curl -H "X-Company: nombre_del_tenant" http://localhost:8000/api/properties/

# Buscar casas en Miranda
curl -H "X-Company: nombre_del_tenant" "http://localhost:8000/api/properties/?type_property=5&state=2"

# Ver propiedad ID 5
curl -H "X-Company: nombre_del_tenant" http://localhost:8000/api/properties/5/
```

### Catálogos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/property-types/` | Tipos de propiedad (Casa, Apartamento, etc.) |
| GET | `/type-negotiations/` | Tipos de negociación (Venta, Alquiler) |

**Nota**: Estos endpoints devuelven objetos paginados. El frontend maneja automáticamente la extracción de `results`.

### Ubicaciones

| Método | Endpoint | Descripción | Filtro |
|--------|----------|-------------|--------|
| GET | `/states/` | Lista de estados | `?country=1` |
| GET | `/municipalities/` | Lista de municipios | `?state=2` |
| GET | `/parishes/` | Lista de parroquias | `?municipality=3` |

**Nota**: El backend de inmobap usa **parishes** (parroquias) en lugar de cities (ciudades).

**Ejemplo:**
```bash
# Estados
curl -H "X-Company: nombre_del_tenant" http://localhost:8000/api/states/

# Municipios de Miranda (state=2)
curl -H "X-Company: nombre_del_tenant" http://localhost:8000/api/municipalities/?state=2

# Parroquias de Chacao (municipality=2)
curl -H "X-Company: nombre_del_tenant" http://localhost:8000/api/parishes/?municipality=2
```

### Formato de Respuesta

**Lista de propiedades (paginada):**
```json
{
  "count": 50,
  "next": "http://localhost:8000/api/properties/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Hermoso Apartamento en Altamira",
      "code": "APT001",
      "price": "250000.00",
      "rent_price": "0.00",
      "type_property": {"id": 5, "name": "Casa"},
      "type_negotiation": {"id": 1, "name": "Venta"},
      "state": {"id": 2, "name": "Miranda"},
      "municipality": {"id": 2, "name": "Chacao"},
      "parish": {"id": 1, "name": "Chacao"},
      "images": [
        {
          "id": 1,
          "image": "http://localhost:8000/media/properties/1/imagen.jpg",
          "order": 0
        }
      ],
      "characteristics": [
        {
          "id": 1,
          "characteristic": {"id": 1, "name": "Habitaciones", "code": "bedrooms"},
          "value": "3",
          "code": "bedrooms"
        }
      ],
      "assigned_to": {
        "id": 1,
        "user": {
          "id": 1,
          "name": "Juan Pérez",
          "email": "juan@example.com"
        }
      }
    }
  ]
}
```

**Detalle de propiedad:**
```json
{
  "id": 1,
  "name": "Hermoso Apartamento en Altamira",
  "code": "APT001",
  "description": "Apartamento moderno con excelente ubicación...",
  "price": "250000.00",
  "characteristics": [
    {
      "id": 1,
      "characteristic": {"id": 1, "name": "Habitaciones", "type_value": "integer"},
      "value": "3",
      "code": "bedrooms"
    }
  ],
  "images": [...],
  "assigned_to": {
    "id": 1,
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
}
```

---

## 🔍 SEO y Optimización

### Meta Tags Dinámicos

El servidor Express genera meta tags específicos para cada página, y los componentes React actualizan dinámicamente:

```typescript
// src/utils/seo.ts
export const generatePropertyMetaTags = (property: RealProperty): MetaTags => {
  const title = `${property.name} - ${property.type_property?.name || 'Propiedad'}`;
  const description = `${property.type_negotiation?.name || ''} - ${property.type_property?.name || ''} en ${property.address || ''}`;
  // ...
};
```

### Structured Data (JSON-LD)

Cada página de detalle incluye structured data para SEO:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Propiedad",
  "offers": {
    "@type": "Offer",
    "price": "250000.00",
    "priceCurrency": "USD"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressRegion": "Miranda"
  }
}
```

### Beneficios SEO

1. **Contenido indexable**: Los motores de búsqueda ven HTML completo
2. **Meta tags únicos**: Cada propiedad tiene su título y descripción
3. **URLs amigables**: `/propiedades/123` en lugar de `/?id=123`
4. **Tiempo de carga**: First Contentful Paint < 1s
5. **Social sharing**: Previews correctas en redes sociales

---

## 👨‍💼 Administración

### Acceder al Admin

1. Accede a: http://localhost:8000/admin
2. Inicia sesión con tu usuario de Django

### Gestión de Propiedades

**Crear nueva propiedad:**
1. Admin → Realstate → Properties → Add Property
2. Completa los campos requeridos
3. Agregar imágenes en la sección "Property images"
4. Agregar características en "Property characteristics"
5. Guardar

**Ver guía completa**: [COMO_AGREGAR_IMAGENES.md](./COMO_AGREGAR_IMAGENES.md)

### Gestión de Tenants

**Crear nuevo tenant:**
1. Admin → Tenant → Companies → Add Company
2. Completa:
   - Name (este es el valor para X-Company)
   - Schema name (debe ser único)
   - Paid until
3. Crear Domain asociado
4. Cargar fixtures del tenant: `just manage load_tenant_fixtures --tenant=<schema_name>`

---

## 🐛 Troubleshooting

### Error: "X-Company header is required" (400)

**Causa**: El header `X-Company` no se está enviando o el tenant no existe.

**Solución**:
1. Verifica que el archivo `.env` existe en `ssr/`
2. Verifica que `REACT_APP_COMPANY_NAME` está configurado
3. Verifica que el nombre del tenant coincide exactamente
4. Reinicia el servidor después de crear/modificar `.env`

**Ver guía**: [CONFIGURAR_TENANT.md](./CONFIGURAR_TENANT.md)

### Error: "Tenant not found" (400)

**Causa**: El nombre en `REACT_APP_COMPANY_NAME` no coincide con ningún tenant.

**Solución**:
1. Lista los tenants disponibles (ver sección de configuración)
2. Actualiza `.env` con el nombre correcto
3. Reinicia el servidor

### Error: "Unauthorized" (401)

**Causa**: El backend requiere autenticación pero el frontend no la tiene.

**Solución**: Ya implementado - el backend permite acceso público para lectura. Si persiste, verifica que los ViewSets tienen `permissions_by_action` configurado correctamente.

### Error: "Cannot read properties of undefined"

**Causa**: El backend devuelve datos con campos opcionales que no existen.

**Solución**: Ya implementado - el frontend usa optional chaining (`?.`) y validaciones. Si persiste, verifica que el backend está devolviendo datos correctamente.

### Error: "Internal Server Error" (500)

**Causa**: Error en el backend al procesar la petición.

**Solución**:
1. Revisa los logs del servidor Django
2. Verifica que el tenant tiene datos cargados
3. Verifica que las migraciones están aplicadas

### Servidor SSR se detiene automáticamente

**Causas comunes**:
1. No se ejecutó `npm run build` antes
2. Errores de importación en `server-ssr.js`
3. Puerto en uso

**Solución**: 
```bash
cd ssr
npm run build
npm run ssr
```

---

## 📝 Comandos Útiles

### Backend

```bash
# Aplicar migraciones (multitenancy)
just migrate

# Aplicar solo migraciones compartidas
just migrate-shared

# Aplicar solo migraciones de tenants
just migrate-tenants

# Cargar datos iniciales (catalog, locations)
just load-initial-data

# Cargar fixtures de un tenant
just manage load_tenant_fixtures --tenant=<schema_name>

# Cargar fixtures de todos los tenants
just manage load_tenant_fixtures --all

# Crear superusuario
python manage.py createsuperuser

# Shell interactivo
python manage.py shell
```

### Frontend

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Compilar para producción
npm run build

# Iniciar servidor SSR
npm run ssr

# Desarrollo (sin SSR)
npm start

# Tests
npm test
```

---

## 🎯 Diferencias con el Backend Original

Este proyecto usa el **backend de inmobap** en lugar de un backend creado desde cero. Principales diferencias:

1. **Multitenancy**: Requiere header `X-Company` para identificar el tenant
2. **Endpoints**: 
   - `/type-negotiations/` en lugar de `/negotiation-types/`
   - `/parishes/` en lugar de `/cities/`
3. **Paginación**: Usa `LargeResultsSetPagination` que devuelve objetos paginados
4. **Permisos**: Sistema personalizado con `PermissionsMixin` que permite acceso público para lectura
5. **Estructura**: Backend más complejo con múltiples apps (realstate, crm, membership, etc.)

---

## 🎯 Próximas Mejoras

- [ ] Autenticación de usuarios en frontend
- [ ] Favoritos y guardados
- [ ] Sistema de búsqueda avanzada con mapas
- [ ] Chat en tiempo real con asesores
- [ ] Comparador de propiedades
- [ ] Sistema de reseñas y valoraciones
- [ ] Panel de usuario
- [ ] Notificaciones por email
- [ ] Export a PDF de propiedades
- [ ] Multilenguaje (i18n)

---

## 📚 Documentación Adicional

- [CONFIGURAR_TENANT.md](./CONFIGURAR_TENANT.md) - Guía completa de configuración del tenant
- [COMO_AGREGAR_IMAGENES.md](./COMO_AGREGAR_IMAGENES.md) - Guía para agregar imágenes
- [INSTRUCCIONES_INICIO.md](./INSTRUCCIONES_INICIO.md) - Guía de inicio rápido
- [OBTENER_TENANT.md](./ssr/OBTENER_TENANT.md) - Cómo obtener/crear tenants

---

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request

---

## 📄 Licencia

Este proyecto es privado y está bajo licencia propietaria.

---

## 📧 Contacto

Para consultas sobre este proyecto, contacta al equipo de desarrollo.

---

## 🙏 Agradecimientos

- Create React App por la configuración base
- Django REST Framework por la API robusta
- django-tenants por el sistema de multitenancy
- React Router por el routing
- Tailwind CSS por los estilos

---

**Versión**: 2.0.0  
**Última actualización**: Noviembre 2025  
**Backend**: inmobap (django-tenants)  
**Desarrollado con**: ❤️ y ☕
# InmobappWeb
# inmobappWebs
# inmobappWebs
# inmobappWebs
