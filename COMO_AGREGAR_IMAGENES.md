# 📸 CÓMO AGREGAR IMÁGENES A LAS PROPIEDADES

## 🎯 Método 1: Desde el Admin de Django (Recomendado)

### Paso 1: Acceder al Admin
1. Ve a: **http://localhost:8000/admin/**
2. Inicia sesión con:
   - Usuario: `admin`
   - Contraseña: `admin123`

### Paso 2: Editar una Propiedad
1. En el menú izquierdo, busca **"Properties"** → **"Properties"**
2. Haz clic en una propiedad existente (o crea una nueva)
3. Desplázate hacia abajo hasta encontrar la sección **"Property images"**

### Paso 3: Agregar Imágenes
1. En la sección **"Property images"**, verás un formulario inline
2. Haz clic en **"Add another Property image"**
3. Para cada imagen:
   - **Image**: Haz clic en "Choose File" y selecciona una imagen
   - **Order**: Asigna un número (0 = primera imagen, 1 = segunda, etc.)
4. Puedes agregar múltiples imágenes haciendo clic en **"Add another Property image"** nuevamente
5. Haz clic en **"Save"** al final de la página

### Paso 4: Verificar
- Las imágenes se guardarán en: `backend/media/properties/YYYY/MM/`
- El orden de las imágenes se respeta según el campo "Order"
- La primera imagen (order=0) será la imagen principal

---

## 🎯 Método 2: Desde el Código (Para desarrollo)

### Agregar imágenes programáticamente:

```python
from properties.models import RealProperty, PropertyImage

# Obtener una propiedad
property = RealProperty.objects.get(id=1)

# Agregar imagen
PropertyImage.objects.create(
    parent=property,
    image='ruta/a/imagen.jpg',  # O usar un archivo
    order=0
)
```

---

## 🎯 Método 3: Usando el Management Command

Puedes modificar el comando `load_sample_data.py` para incluir imágenes:

```python
# En backend/properties/management/commands/load_sample_data.py
from django.core.files import File

# Después de crear la propiedad
property_obj = RealProperty.objects.get(code='APT001')

# Agregar imagen
with open('ruta/a/imagen.jpg', 'rb') as f:
    PropertyImage.objects.create(
        parent=property_obj,
        image=File(f, name='imagen.jpg'),
        order=0
    )
```

---

## 📁 Ubicación de las Imágenes

### En Desarrollo:
```
backend/
└── media/
    └── properties/
        └── 2025/
            └── 11/
                ├── imagen1.jpg
                ├── imagen2.jpg
                └── ...
```

### Configuración en settings.py:
```python
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

## ⚙️ Configuración del Admin

El admin ya está configurado con `PropertyImageInline`, lo que permite:
- ✅ Agregar múltiples imágenes desde la misma página de la propiedad
- ✅ Ordenar las imágenes con el campo "Order"
- ✅ Ver todas las imágenes de una propiedad en un solo lugar

---

## 🔍 Verificar que las Imágenes Funcionan

1. **En el Admin**: Verifica que las imágenes aparecen en la lista
2. **En la API**: 
   ```bash
   curl http://localhost:8000/api/properties/1/
   ```
   Deberías ver un array `images` con las URLs de las imágenes
3. **En el Frontend**: Las imágenes deberían aparecer en:
   - Listado de propiedades (primera imagen)
   - Detalle de propiedad (galería completa)

---

## 🐛 Troubleshooting

### Error: "No such file or directory"
- Asegúrate de que la carpeta `media/` existe:
  ```bash
  mkdir -p backend/media/properties
  ```

### Error: "Permission denied"
- Da permisos de escritura:
  ```bash
  chmod -R 755 backend/media
  ```

### Las imágenes no se muestran en el frontend
- Verifica que el backend esté sirviendo archivos estáticos:
  ```python
  # En mls_project/urls.py ya está configurado:
  if settings.DEBUG:
      urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  ```

### Las URLs de las imágenes son incorrectas
- Verifica que `MEDIA_URL` esté configurado correctamente
- En producción, necesitarás configurar un servidor web (nginx, Apache) para servir archivos estáticos

---

## 📝 Notas Importantes

1. **Formatos soportados**: JPG, PNG, GIF, WebP
2. **Tamaño recomendado**: Máximo 5MB por imagen
3. **Resolución recomendada**: 1200x800px o superior
4. **Orden**: La imagen con `order=0` será la imagen principal
5. **Cantidad**: No hay límite, pero se recomienda 5-10 imágenes por propiedad

---

## 🎨 Mejoras Futuras

- [ ] Upload múltiple de imágenes
- [ ] Editor de imágenes (recortar, redimensionar)
- [ ] Vista previa antes de guardar
- [ ] Drag & drop para reordenar
- [ ] Validación de tamaño y formato

