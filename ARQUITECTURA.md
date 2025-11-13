# 🏗️ ARQUITECTURA DEL PROYECTO MLS PROPERTIES

## 📊 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           INTERNET / NAVEGADOR                          │
│                         http://localhost:3000                           │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         Petición HTML inicial       Peticiones AJAX (JSON)
                    │                         │
                    ▼                         ▼
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│   FRONTEND: EXPRESS + REACT      │  │   BACKEND: DJANGO REST API       │
│         Puerto: 3000             │  │        Puerto: 8000              │
│                                  │  │                                  │
│  ┌────────────────────────────┐ │  │  ┌────────────────────────────┐ │
│  │  Express.js (Node.js)      │ │  │  │  Django 5.1                │ │
│  │  - Server-Side Rendering   │ │  │  │  - REST Framework          │ │
│  │  - Babel Transpilation     │ │  │  │  - ORM                     │ │
│  │  - Static File Serving     │ │  │  │  - Admin Interface         │ │
│  └────────────────────────────┘ │  │  └────────────────────────────┘ │
│                                  │  │                                  │
│  ┌────────────────────────────┐ │  │  ┌────────────────────────────┐ │
│  │  React 18 + TypeScript     │ │  │  │  Models (13)               │ │
│  │  - Components              │ │  │  │  - RealProperty            │ │
│  │  - React Router v7         │ │  │  │  - PropertyImage           │ │
│  │  - Hooks (useState, etc.)  │ │  │  │  - Locations (5 models)    │ │
│  └────────────────────────────┘ │  │  │  - Catalogs                │ │
│                                  │  │  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │  │                                  │
│  │  Axios Client              │ │  │  ┌────────────────────────────┐ │
│  │  - API Calls               │◄─┼──┼─▶│  ViewSets + Serializers    │ │
│  │  - Request/Response        │ │  │  │  - PropertyViewSet         │ │
│  └────────────────────────────┘ │  │  │  - Filters (django-filter) │ │
│                                  │  │  │  - Pagination              │ │
│  ┌────────────────────────────┐ │  │  └────────────────────────────┘ │
│  │  Tailwind CSS              │ │  │                                  │
│  │  - Utility Classes         │ │  │  ┌────────────────────────────┐ │
│  │  - Responsive Design       │ │  │  │  SQLite Database           │ │
│  └────────────────────────────┘ │  │  │  - db.sqlite3              │ │
│                                  │  │  └────────────────────────────┘ │
└──────────────────────────────────┘  └──────────────────────────────────┘
```

---

## 🔄 Flujo Detallado de una Petición

### Paso 1: Usuario Accede a una URL

```
Usuario escribe: http://localhost:3000/propiedades/123
```

### Paso 2: Express Server Recibe la Petición

```javascript
// server/server-ssr.js

app.get('/propiedades/:id', renderSSR);

function renderSSR(req, res) {
    // 1. Lee el template HTML del build
    fs.readFile('build/index.html', 'utf-8', (err, data) => {
        
        // 2. Renderiza un componente React básico
        const SimpleApp = React.createElement('div', {
            id: 'app-container',
            className: 'flex flex-col min-h-screen'
        }, 'Cargando...');
        
        const appHtml = ReactDOMServer.renderToString(SimpleApp);
        
        // 3. Genera meta tags dinámicos
        const metaTags = generateMetaTags(req.url);
        
        // 4. Inyecta el HTML y meta tags
        let html = data
            .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
            .replace('</head>', `${metaTags}</head>`);
        
        // 5. Envía el HTML al navegador
        res.send(html);
    });
}
```

**Salida HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Propiedad - MLS Properties</title>
    <meta name="description" content="..." />
    <meta property="og:title" content="..." />
    <script defer src="/static/js/main.chunk.js"></script>
</head>
<body>
    <div id="root">
        <div id="app-container" class="flex flex-col min-h-screen">
            Cargando...
        </div>
    </div>
</body>
</html>
```

### Paso 3: Navegador Recibe y Procesa el HTML

```
1. El navegador parsea el HTML
   ↓
2. Muestra "Cargando..." inmediatamente (First Contentful Paint)
   ↓
3. Descarga los bundles JavaScript (main.chunk.js, etc.)
   ↓
4. Ejecuta el JavaScript de React
```

### Paso 4: React Hidrata la Aplicación

```javascript
// src/index.js

const rootElement = document.getElementById('root');

if (rootElement) {
    // Hidrata el HTML existente
    hydrateRoot(rootElement, (
        <React.StrictMode>
            <App />  {/* Componente principal con BrowserRouter */}
        </React.StrictMode>
    ));
}
```

**¿Qué es la hidratación?**
- React "adjunta" sus event listeners al HTML existente
- No re-renderiza todo, solo "activa" el HTML estático
- Es más rápido que un render completo

### Paso 5: React Router Detecta la Ruta

```javascript
// src/App.tsx

<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<PropertyList />} />
        <Route path="/propiedades/:id" element={<PropertyDetail />} />
    </Routes>
</BrowserRouter>
```

Como la URL es `/propiedades/123`, React Router renderiza `<PropertyDetail />`.

### Paso 6: Componente PropertyDetail se Monta

```typescript
// src/pages/PropertyDetail.tsx

export const PropertyDetail: React.FC = () => {
    const { id } = useParams();  // Obtiene "123" de la URL
    const [property, setProperty] = useState<RealProperty | null>(null);
    
    useEffect(() => {
        // Se ejecuta después del primer render
        loadProperty();
    }, [id]);
    
    const loadProperty = async () => {
        // 🔥 AQUÍ ES DONDE SE HACE LA PETICIÓN AL BACKEND
        const data = await propertyAPI.getProperty(Number(id));
        setProperty(data);
    };
    
    return (
        <div>
            {property ? (
                <PropertyGallery images={property.images} />
            ) : (
                <Loading />
            )}
        </div>
    );
};
```

### Paso 7: Axios Hace la Petición al Backend

```typescript
// src/services/api.ts

class PropertyAPIService {
    private client = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: { 'Content-Type': 'application/json' }
    });
    
    async getProperty(id: number): Promise<RealProperty> {
        // Petición HTTP GET
        const response = await this.client.get<RealProperty>(
            `/properties/${id}/`
        );
        return response.data;
    }
}
```

**Petición HTTP:**
```http
GET /api/properties/123/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Origin: http://localhost:3000
```

### Paso 8: Django REST API Procesa la Petición

```python
# backend/properties/views.py

class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RealProperty.objects.all()
    serializer_class = RealPropertyDetailSerializer
    
    # DRF automáticamente maneja:
    # - GET /api/properties/     -> list()
    # - GET /api/properties/123/ -> retrieve(pk=123)
```

**Proceso interno:**
```python
# 1. CORS Middleware verifica el origen
if origin in CORS_ALLOWED_ORIGINS:
    # Permite la petición
    
# 2. ViewSet.retrieve() se ejecuta
def retrieve(self, request, pk=None):
    property = RealProperty.objects.get(pk=pk)
    
    # 3. Serializer convierte el modelo a JSON
    serializer = RealPropertyDetailSerializer(property, context={'request': request})
    
    # 4. Retorna JSON
    return Response(serializer.data)
```

### Paso 9: Serializer Construye la Respuesta JSON

```python
# backend/properties/serializers.py

class RealPropertyDetailSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    characteristics = PropertyCharacteristicSerializer(many=True, read_only=True)
    
    class Meta:
        model = RealProperty
        fields = [
            'id', 'name', 'description', 'price',
            'images', 'characteristics', 'assigned_to',
            # ... más campos
        ]
```

**Respuesta JSON:**
```json
{
    "id": 123,
    "name": "Apartamento en Altamira",
    "description": "Hermoso apartamento...",
    "price": "250000.00",
    "images": [
        {
            "id": 1,
            "image": "http://localhost:8000/media/properties/2025/11/foto1.jpg",
            "order": 0
        },
        {
            "id": 2,
            "image": "http://localhost:8000/media/properties/2025/11/foto2.jpg",
            "order": 1
        }
    ],
    "characteristics": [
        {
            "id": 1,
            "characteristic": {"id": 1, "name": "Habitaciones"},
            "value": "3",
            "display_value": 3
        }
    ],
    "assigned_to": {
        "id": 1,
        "user": {
            "email": "agente@example.com",
            "first_name": "Juan"
        }
    }
}
```

### Paso 10: Axios Retorna los Datos

```typescript
// En PropertyDetail.tsx

const data = await propertyAPI.getProperty(123);
// data = { id: 123, name: "...", images: [...], ... }

setProperty(data);  // Actualiza el estado de React
```

### Paso 11: React Re-renderiza con los Datos

```typescript
// React detecta el cambio de estado y re-renderiza

return (
    <div>
        <PropertyGallery images={property.images} />
        <h1>{property.name}</h1>
        <p>{property.description}</p>
        <AgentInfo agent={property.assigned_to} />
    </div>
);
```

### Paso 12: Usuario Ve la Propiedad Completa

El navegador ahora muestra:
- ✅ Galería de imágenes
- ✅ Nombre y descripción
- ✅ Precio
- ✅ Características
- ✅ Información del asesor

---

## 🔀 Comparación: Primera Carga vs. Navegación Cliente

### Primera Carga (SSR)

```
Usuario → Express Server → Navegador → React Hidrata → API Request → Render Final
   |            |              |            |              |             |
  URL      HTML+MetaTags   Display HTML   Attach Events   Get Data   Update UI
  0ms         100ms          200ms         300ms          500ms       600ms
```

**Ventajas:**
- ✅ Contenido visible en 200ms (HTML estático)
- ✅ SEO completo (meta tags indexables)
- ✅ Social sharing funciona

### Navegación Cliente (SPA)

```
Usuario Click → React Router → API Request → Render
      |              |              |            |
   onClick      Change Route     Get Data    Update UI
     0ms           10ms           200ms        250ms
```

**Ventajas:**
- ✅ Más rápido (no hay round-trip al servidor Express)
- ✅ Transiciones suaves
- ✅ Mantiene estado de la aplicación

---

## 🎯 Decisiones de Arquitectura

### ¿Por qué Express en lugar de Next.js?

1. **Aprendizaje**: El usuario quería aprender SSR con Express
2. **Control**: Control total sobre el proceso de rendering
3. **Flexibilidad**: Fácil de personalizar y depurar
4. **Simplicidad**: Menos magia, más transparencia

### ¿Por qué Django REST en lugar de GraphQL?

1. **Familiaridad**: Django es conocido y robusto
2. **Admin Built-in**: Django Admin acelera el desarrollo
3. **ORM Potente**: Consultas complejas con facilidad
4. **Ecosistema**: django-filter, DRF, etc.

### ¿Por qué TypeScript?

1. **Type Safety**: Menos errores en runtime
2. **Autocompletado**: Mejor DX en el IDE
3. **Refactoring**: Más seguro cambiar código
4. **Documentación**: Los tipos son documentación viva

### ¿Por qué Tailwind CSS?

1. **Productividad**: Estilos rápidos sin salir del JSX
2. **Consistencia**: Design system integrado
3. **Performance**: Purga de CSS no usado
4. **Responsive**: Mobile-first por defecto

---

## 📦 Dependencias Clave

### Frontend

```json
{
  "react": "^18.3.1",           // UI Library con hidratación
  "react-dom": "^18.3.1",       // Rendering (incluye SSR)
  "react-router-dom": "^7.0.2", // Client-side routing
  "typescript": "^5.9.3",       // Type checking
  "axios": "^1.7.9",            // HTTP client
  "express": "^4.21.2",         // SSR server
  "@babel/register": "^7.25.9"  // On-the-fly transpilation
}
```

### Backend

```txt
Django==5.1
djangorestframework==3.15.2    # API REST
django-filter==24.3            # Filtros avanzados
django-cors-headers==4.6.0     # CORS
Pillow==11.0.0                 # Imágenes
```

---

## 🔐 Seguridad y CORS

### Configuración CORS

```python
# backend/mls_project/settings.py

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Express SSR
    "http://localhost:8000",  # Django (para pruebas)
]

CORS_ALLOW_CREDENTIALS = True
```

**¿Por qué necesitamos CORS?**

Frontend (3000) y Backend (8000) son **orígenes diferentes**. Sin CORS, el navegador bloquearía las peticiones AJAX por seguridad.

---

## 📊 Performance

### Métricas Objetivo

- **FCP (First Contentful Paint)**: < 1s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **TTI (Time to Interactive)**: < 3s
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimizaciones Implementadas

1. **SSR**: HTML visible inmediatamente
2. **Code Splitting**: React lazy() para rutas
3. **Image Optimization**: Imágenes servidas optimizadas
4. **Tailwind Purge**: Solo CSS usado en producción
5. **API Pagination**: Solo 12 propiedades por request

---

## 🔮 Escalabilidad Futura

### Para Producción

```
┌─────────────────────┐
│   Nginx / CDN       │  Servir estáticos, SSL
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼────┐   ┌───▼────┐
│ Express│   │ Django │
│ (PM2)  │   │ (Gunic)│
└────────┘   └───┬────┘
                 │
            ┌────▼────┐
            │PostgreSQL│
            └─────────┘
```

**Mejoras recomendadas:**
- PM2 para gestión de procesos Node
- Gunicorn + Nginx para Django
- PostgreSQL en lugar de SQLite
- Redis para cache
- Docker para contenedores
- CI/CD con GitHub Actions

---

## 📝 Resumen

Este proyecto implementa una arquitectura **desacoplada** moderna:

- **Frontend SSR** con Express para SEO
- **Backend API REST** con Django para datos
- **Hidratación React** para interactividad
- **TypeScript** para type safety
- **Tailwind** para estilos rápidos

El resultado es una aplicación **rápida**, **escalable** y **SEO-friendly**.

