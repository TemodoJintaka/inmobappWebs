# 🔍 Cómo Obtener el Nombre del Tenant

## Método 1: Desde el Admin de Django

1. Accede a: http://localhost:8000/admin/tenant/company/
2. Verás una lista de tenants (Companies)
3. Copia el valor del campo **"Name"** (NO el ID)

## Método 2: Desde el Shell de Django

```bash
cd /home/tachibana/Escritorio/SSR/Backend
source venv/bin/activate  # Si usas venv
python manage.py shell
```

Luego ejecuta:

```python
from inmobapp.tenant.models import Company

companies = Company.objects.all()
if companies.exists():
    print("\n✅ Tenants disponibles:")
    for c in companies:
        print(f"  - Name: '{c.name}' (Schema: {c.schema_name}, ID: {c.id})")
    print(f"\n💡 Usa el 'Name' en REACT_APP_COMPANY_NAME")
else:
    print("\n❌ No hay tenants creados")
    print("💡 Crea uno desde: http://localhost:8000/admin/tenant/company/")
```

## Método 3: Crear un Tenant Nuevo

Si no tienes ningún tenant:

### Opción A: Desde el Admin

1. Ve a: http://localhost:8000/admin/tenant/company/add/
2. Completa:
   - **Name**: "Mi Empresa" (este es el valor que usarás)
   - **Schema name**: "mi_empresa" (debe ser único, sin espacios)
   - **Paid until**: Una fecha futura (ej: 2025-12-31)
   - **On trial**: False
3. Guarda
4. Luego crea un Domain:
   - Ve a: http://localhost:8000/admin/tenant/domain/add/
   - **Domain**: "localhost"
   - **Tenant**: Selecciona el tenant que acabas de crear
   - **Is primary**: True
   - Guarda

### Opción B: Desde el Shell

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
print(f"💡 Usa este nombre en REACT_APP_COMPANY_NAME: {company.name}")
```

## 📝 Actualizar el archivo .env

Después de obtener el nombre del tenant:

1. Edita el archivo `ssr/.env`
2. Cambia la línea:
   ```
   REACT_APP_COMPANY_NAME=default
   ```
   Por:
   ```
   REACT_APP_COMPANY_NAME=Mi Empresa
   ```
   (Usa el nombre exacto del tenant)

3. Reinicia el servidor:
   ```bash
   cd /home/tachibana/Escritorio/SSR/ssr
   npm run build
   npm run ssr
   ```

## ✅ Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Haz una petición (recarga la página)
4. Selecciona cualquier petición a `/api/`
5. Ve a "Request Headers"
6. Deberías ver:
   ```
   X-Company: Mi Empresa
   ```

Si el header está presente y aún recibes 400, verifica que el nombre coincide exactamente con el `name` del tenant en la base de datos.



