# 🚀 Proyecto React con Server-Side Rendering (SSR)

Aplicación React con renderizado del lado del servidor usando Express.js, Babel y React DOM Server.

## 📋 Tabla de Contenidos

- [¿Qué es SSR?](#qué-es-ssr)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo Funciona el SSR](#cómo-funciona-el-ssr)
- [Agregar Nuevos Componentes](#agregar-nuevos-componentes)
- [Implementar en tu Proyecto](#implementar-en-tu-proyecto)
- [Troubleshooting](#troubleshooting)

---

## 🎯 ¿Qué es SSR?

**Server-Side Rendering (SSR)** es una técnica donde el HTML de tu aplicación React se genera en el servidor antes de enviarlo al navegador, en lugar de renderizarse únicamente en el cliente.

### Ventajas del SSR:

✅ **SEO mejorado**: Los motores de búsqueda pueden indexar el contenido fácilmente  
✅ **Rendimiento inicial**: El usuario ve contenido más rápido  
✅ **Funciona sin JavaScript**: El contenido básico es visible aunque JS esté deshabilitado  
✅ **Experiencia de usuario**: Mejor percepción de velocidad de carga

### Diferencia con CSR (Client-Side Rendering):

- **CSR**: El servidor envía HTML vacío + JavaScript → El navegador renderiza
- **SSR**: El servidor envía HTML completo → El navegador lo muestra → React "hidrata" el contenido

---

## 🏗️ Arquitectura del Proyecto

Este proyecto combina:
1. **Create React App** para el desarrollo y build del frontend
2. **Express.js** para el servidor SSR
3. **Babel** para transpilar JSX en el servidor
4. **React DOM Server** para renderizar componentes en el servidor

```
Cliente solicita página
       ↓
Servidor Express intercepta
       ↓
Renderiza <App /> con React en el servidor
       ↓
Inyecta HTML renderizado en index.html
       ↓
Envía HTML completo al cliente
       ↓
Cliente recibe HTML (contenido visible)
       ↓
JavaScript se carga (hydration)
       ↓
Aplicación interactiva
```

---

## 🛠️ Tecnologías Utilizadas

### Dependencias Principales

#### **React** (v19.2.0)
Librería principal para construir interfaces de usuario.

#### **React DOM** (v19.2.0)
Proporciona métodos específicos del DOM, incluyendo `renderToString()` para SSR.

#### **Express** (v5.1.0)
Framework web minimalista para Node.js que maneja:
- Rutas HTTP
- Middleware para archivos estáticos
- Servidor SSR

**¿Cómo funciona Express en este proyecto?**
```javascript
// Servidor Express básico
const app = express();

// 1. Sirve archivos estáticos (CSS, JS, imágenes)
app.use(express.static('build'));

// 2. Captura solicitudes a la ruta raíz
app.get('/', (req, res) => {
    // Renderiza React y envía HTML
    res.send(html);
});

// 3. Inicia el servidor en el puerto 8000
app.listen(8000);
```

### Dependencias de Desarrollo

#### **@babel/core** (v7.28.5)
Núcleo del compilador Babel que transforma código moderno de JavaScript.

#### **@babel/preset-env** (v7.28.5)
Preset de Babel que permite usar JavaScript moderno (ES6+) y lo compila a versiones compatibles con Node.js.

**Ejemplo:**
```javascript
// Código que escribes (ES6+)
import express from 'express';
const app = express();

// Babel lo convierte a:
const express = require('express');
const app = express();
```

#### **@babel/preset-react** (v7.28.5)
Preset de Babel que permite usar JSX en el servidor.

**Ejemplo:**
```javascript
// JSX que escribes
const element = <App />;

// Babel lo convierte a:
const element = React.createElement(App);
```

#### **@babel/register** (v7.28.3)
Permite usar `import`/`export` y JSX directamente en Node.js sin pre-compilar.

**¿Cómo funciona?**
```javascript
// server/index.js
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});

// Ahora puedes usar import/JSX en los archivos que requieras después
require('./server.js'); // server.js puede usar import y JSX
```

#### **ignore-styles** (v5.0.1)
Evita errores cuando Node.js intenta cargar archivos CSS/SCSS.

**Problema sin ignore-styles:**
```javascript
import './App.css'; // ❌ Node.js no entiende CSS
```

**Solución:**
```javascript
require('ignore-styles'); // ✅ Ignora imports de estilos
```

### Librerías de Testing

- `@testing-library/react`, `@testing-library/jest-dom`, etc.
- Para pruebas unitarias y de integración

### React Scripts (v5.0.1)

Scripts de Create React App para:
- Desarrollo (`start`)
- Build de producción (`build`)
- Testing (`test`)

---

## 📦 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Pasos

```bash
# 1. Clonar o descargar el proyecto
cd /ruta/al/proyecto

# 2. Instalar dependencias
npm install
# o
yarn install

# 3. Construir la aplicación para producción
npm run build
# o
yarn build

# 4. Iniciar el servidor SSR
npm run ssr
# o
yarn ssr
```

El servidor estará disponible en **http://localhost:8000**

---

## 📜 Scripts Disponibles

### `npm start` o `yarn start`
Inicia el servidor de desarrollo de Create React App en **http://localhost:3000**

- Hot reload activado
- Ideal para desarrollo frontend
- **NO usa SSR**

### `npm run build` o `yarn build`
Compila la aplicación para producción en la carpeta `build/`

- Optimiza y minifica el código
- Genera archivos estáticos
- **Requerido antes de usar SSR**

### `npm run ssr` o `yarn ssr`
Inicia el servidor Express con SSR en **http://localhost:8000**

- Renderiza React en el servidor
- Sirve archivos estáticos del build
- **Requiere ejecutar `build` primero**

### `npm test` o `yarn test`
Ejecuta los tests con Jest

---

## 📁 Estructura del Proyecto

```
ssr/
├── build/                      # Build de producción (generado)
│   ├── index.html             # HTML base minificado
│   └── static/                # Archivos estáticos (CSS, JS)
│       ├── css/
│       └── js/
├── public/                     # Archivos públicos
│   └── index.html             # Template HTML original
├── server/                     # 🚀 Servidor SSR
│   ├── index.js               # ⚙️ Configuración de Babel
│   └── server.js              # 🌐 Servidor Express principal
├── src/                        # Código fuente React
│   ├── App.js                 # Componente principal
│   ├── App.css                # Estilos del componente
│   ├── index.js               # Punto de entrada del cliente
│   └── ...
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

---

## ⚙️ Cómo Funciona el SSR

### 1. **Punto de Entrada: `server/index.js`**

```javascript
// Ignora imports de CSS para que Node.js no falle
require('ignore-styles')

// Configura Babel para transpilar JSX y ES6+
require('@babel/register')({
    ignore: [/(node_modules)/],  // No transpila node_modules
    presets: ['@babel/preset-env', '@babel/preset-react']
})

// Carga el servidor principal
require('./server.js')
```

**¿Qué hace?**
- Prepara Node.js para entender JSX y ES6+
- Ignora archivos CSS (no necesarios en el servidor)
- Carga el servidor Express

### 2. **Servidor Principal: `server/server.js`**

```javascript
import express from 'express';
import ReactDomServer from 'react-dom/server';
import App from '../src/App';

const app = express();

// PASO 1: Sirve archivos estáticos (CSS, JS)
app.use(express.static('build', { index: false }));

// PASO 2: Captura solicitudes a la ruta raíz
app.get('/', (req, res) => {
    // Lee el HTML del build
    fs.readFile('build/index.html', 'utf-8', (err, data) => {
        // Renderiza el componente React a HTML string
        const appHtml = ReactDomServer.renderToString(<App />);
        
        // Inyecta el HTML renderizado en el template
        const html = data
            .replace(/<noscript>.*?<\/noscript>/gi, '')  // Elimina noscript
            .replace(
                '<div id="root"></div>',
                `<div id="root">${appHtml}</div>`
            );
        
        // Envía el HTML completo al cliente
        res.send(html);
    });
});

// PASO 3: Inicia el servidor
app.listen(8000, () => {
    console.log('Servidor en http://localhost:8000');
});
```

**Flujo paso a paso:**

1. **Cliente solicita** `http://localhost:8000/`
2. **Express intercepta** la solicitud con `app.get('/')`
3. **Lee** el archivo `build/index.html`
4. **Renderiza** `<App />` a HTML con `ReactDomServer.renderToString()`
5. **Inyecta** el HTML renderizado en el `<div id="root">`
6. **Elimina** el tag `<noscript>` (no es necesario con SSR)
7. **Envía** el HTML completo al cliente
8. **Cliente recibe** HTML con contenido visible inmediatamente
9. **JavaScript se carga** y React "hidrata" el contenido
10. **Aplicación es interactiva**

### 3. **Hidratación en el Cliente: `src/index.js`**

```javascript
import { hydrateRoot } from 'react-dom/client';
import App from './App';

// Hidrata el contenido renderizado en el servidor
hydrateRoot(document.getElementById('root'), (
  <React.StrictMode>
    <App />
  </React.StrictMode>
));
```

**¿Qué es la hidratación?**
- React toma el HTML renderizado en el servidor
- Añade event listeners y estado
- Hace la aplicación interactiva
- **NO re-renderiza** el contenido inicial (optimización)

---

## ➕ Agregar Nuevos Componentes

### 1. Componente Simple

```javascript
// src/components/Hello.js
import React from 'react';

function Hello({ name }) {
  return <h1>Hola, {name}!</h1>;
}

export default Hello;
```

**Uso en App.js:**
```javascript
import React from 'react';
import Hello from './components/Hello';

function App() {
  return (
    <div>
      <Hello name="Mundo" />
    </div>
  );
}

export default App;
```

### 2. Componente con Estado

```javascript
// src/components/Counter.js
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Counter;
```

**Importante para SSR:**
- ✅ El HTML inicial se renderiza en el servidor (contador en 0)
- ✅ Los botones NO funcionan hasta que JavaScript se carga
- ✅ Después de la hidratación, todo funciona normalmente

### 3. Componente con Efectos

```javascript
// src/components/DataFetcher.js
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Este código NO se ejecuta en el servidor
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Cargando...</p>}
    </div>
  );
}

export default DataFetcher;
```

**Comportamiento en SSR:**
- El servidor renderiza "Cargando..."
- El cliente ejecuta `useEffect` y carga los datos
- Se actualiza a mostrar `data.message`

---

## 🔧 Implementar en tu Proyecto

### Opción 1: Desde Cero

#### Paso 1: Crear proyecto React

```bash
npx create-react-app mi-app-ssr
cd mi-app-ssr
```

#### Paso 2: Instalar dependencias SSR

```bash
npm install express

npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/register ignore-styles
```

#### Paso 3: Crear estructura del servidor

```bash
mkdir server
```

Crear `server/index.js`:
```javascript
require('ignore-styles')
require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server.js')
```

Crear `server/server.js`:
```javascript
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import App from '../src/App';

const PORT = 8000;
const app = express();

app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { index: false }
));

app.get('/', (req, res) => {
    const htmlPath = path.resolve(__dirname, '..', 'build', 'index.html');
    
    fs.readFile(htmlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Error del servidor');
        }
        
        const appHtml = ReactDomServer.renderToString(<App />);
        
        const html = data
            .replace(/<noscript>[\s\S]*?<\/noscript>/gi, '')
            .replace(
                '<div id="root"></div>',
                `<div id="root">${appHtml}</div>`
            );
        
        res.send(html);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor SSR en http://localhost:${PORT}`);
});
```

#### Paso 4: Modificar `src/index.js`

```javascript
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

hydrateRoot(document.getElementById('root'), (
  <React.StrictMode>
    <App />
  </React.StrictMode>
));
```

#### Paso 5: Actualizar `src/App.js`

```javascript
// ⚠️ IMPORTANTE: Importar React (necesario para SSR)
import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Mi App con SSR</h1>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default App;
```

#### Paso 6: Agregar script en `package.json`

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "ssr": "node server/index.js"
  }
}
```

#### Paso 7: Construir y ejecutar

```bash
npm run build
npm run ssr
```

### Opción 2: Clonar este Proyecto

```bash
# Clonar el proyecto
git clone [URL_DEL_REPO]
cd ssr

# Instalar dependencias
npm install

# Construir
npm run build

# Ejecutar SSR
npm run ssr
```

---

## 🐛 Troubleshooting

### Error: "React is not defined"

**Problema:** El componente usa JSX pero no importa React.

**Solución:**
```javascript
// ❌ Incorrecto
import { useState } from 'react';

// ✅ Correcto
import React, { useState } from 'react';
```

### Error: "Cannot find module './App.css'"

**Problema:** Node.js intenta cargar CSS.

**Solución:** Asegúrate de que `server/index.js` incluye:
```javascript
require('ignore-styles')
```

### Error: 404 Not Found

**Problema:** No se ejecutó `npm run build` antes de iniciar SSR.

**Solución:**
```bash
npm run build
npm run ssr
```

### El contenido no se muestra sin JavaScript

**Problema:** El tag `<noscript>` está bloqueando el contenido.

**Solución:** Verifica que `server.js` elimina el tag:
```javascript
.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '')
```

### Los estilos no se cargan

**Problema:** Express no está sirviendo archivos estáticos correctamente.

**Solución:** Verifica el orden de middlewares:
```javascript
// ✅ Estáticos ANTES de las rutas
app.use(express.static('build', { index: false }));

app.get('/', (req, res) => {
    // ...
});
```

### Error: "Cannot GET /"

**Problema:** La ruta no está configurada correctamente.

**Solución:**
```javascript
// ❌ Incorrecto
app.use('^/$', ...)

// ✅ Correcto
app.get('/', ...)
```

---

## 📚 Recursos Adicionales

- [Documentación de React SSR](https://react.dev/reference/react-dom/server)
- [Express.js](https://expressjs.com/)
- [Babel Documentation](https://babeljs.io/docs/)
- [Create React App](https://create-react-app.dev/)

---

## 📝 Notas Importantes

### ⚠️ Limitaciones del SSR

1. **`useEffect` no se ejecuta** en el servidor
2. **APIs del navegador** (`window`, `localStorage`, etc.) no están disponibles
3. **Eventos** no funcionan hasta la hidratación
4. **Requiere rebuild** después de cambios (en producción)

### ✅ Buenas Prácticas

1. Siempre importa `React` en componentes que usan JSX
2. Ejecuta `build` antes de `ssr` en producción
3. Usa `useEffect` para código que solo debe ejecutarse en el cliente
4. Maneja casos de carga mientras se hidratan datos
5. Prueba tu aplicación con JavaScript deshabilitado

---

## 🤝 Contribuir

Si encuentras errores o tienes sugerencias, siéntete libre de crear un issue o pull request.

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Feliz codificación con SSR! 🚀**
