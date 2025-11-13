# Configuración del Tenant (X-Company Header)

El backend de inmobap usa **django-tenants** para multitenancy. Esto significa que **todas las peticiones API requieren el header `X-Company`** con el **nombre** del tenant.

## ✅ Cambios Aplicados

El frontend ya está configurado para enviar el header `X-Company` automáticamente en todas las peticiones.

## 🔧 Configuración

### 1. Obtener el nombre del tenant

Ejecuta en el backend:

```bash
cd /home/tachibana/Escritorio/SSR/Backend
source venv/bin/activate  # Si usas venv
python manage.py shell
```

Luego en el shell de Django:

```python
from inmobapp.tenant.models import Company
companies = Company.objects.all()
for c in companies:
    print(f"ID: {c.id}, Name: '{c.name}', Schema: {c.schema_name}")
```

**IMPORTANTE**: El header `X-Company` debe contener el **nombre** (`name`), NO el ID.

### 2. Configurar la variable de entorno

Crea un archivo `.env` en la carpeta `ssr/` con:

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api

# Tenant Configuration (django-tenants)
# Este debe ser el NOMBRE (name) del tenant Company
REACT_APP_COMPANY_NAME=nombre_del_tenant_aqui
```

**Ejemplo**:
```bash
REACT_APP_COMPANY_NAME=Mi Empresa
```

### 3. Si no tienes un tenant creado

Si no tienes ningún tenant, necesitas crear uno primero:

#### Opción A: Desde el admin de Django

1. Accede a: http://localhost:8000/admin/tenant/company/
2. Crea una nueva Company con:
   - **Name**: El nombre que usarás (ej: "Mi Empresa")
   - **Schema name**: Un nombre único para el schema (ej: "mi_empresa")
   - **Domain**: Un dominio (puede ser localhost)

#### Opción B: Desde el shell de Django

```python
from inmobapp.tenant.models import Company, Domain

# Crear tenant
company = Company.objects.create(
    name="Mi Empresa",
    schema_name="mi_empresa",
    paid_until='2025-12-31',
    on_trial=False
)

# Crear dominio
domain = Domain.objects.create(
    domain='localhost',
    tenant=company,
    is_primary=True
)

print(f"✅ Tenant creado: {company.name}")
```

### 4. Cargar datos iniciales

Después de crear el tenant, carga los datos iniciales:

```bash
# Cargar datos compartidos (catalog, locations)
just load-initial-data

# Cargar datos del tenant (property-types, negotiation-types, characteristics)
just manage load_tenant_fixtures --tenant=mi_empresa
```

Reemplaza `mi_empresa` con el `schema_name` de tu tenant.

### 5. Reiniciar el frontend

Después de configurar `.env`, reinicia el servidor:

```bash
cd /home/tachibana/Escritorio/SSR/ssr
npm run build
npm run ssr
```

## 🐛 Troubleshooting

### Error: "X-Company header is required" (400)

- Verifica que el archivo `.env` existe en `ssr/`
- Verifica que `REACT_APP_COMPANY_NAME` está configurado
- Reinicia el servidor después de crear/modificar `.env`

### Error: "Tenant not found" (400)

- Verifica que el nombre en `REACT_APP_COMPANY_NAME` coincide **exactamente** con el `name` del tenant
- El nombre es case-insensitive, pero debe coincidir
- Lista los tenants disponibles con el comando del paso 1

### No se cargan las propiedades

1. Verifica que el tenant existe y tiene datos
2. Verifica que cargaste los fixtures del tenant
3. Crea propiedades de ejemplo (ver siguiente sección)

## 📝 Crear Propiedades de Ejemplo

Para crear propiedades de ejemplo, puedes:

1. **Desde el admin**: http://localhost:8000/admin/realstate/realproperty/
2. **Crear un comando de management** (similar al que tenías en el otro backend)

## ✅ Verificación

Para verificar que todo funciona:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Haz una petición a `/api/properties/`
4. Verifica en "Request Headers" que aparece:
   ```
   X-Company: nombre_del_tenant
   ```

Si el header está presente y aún recibes 400, verifica que el nombre del tenant es correcto.



