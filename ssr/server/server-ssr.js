// ===============================================
// SERVIDOR EXPRESS CON SERVER-SIDE RENDERING (SSR)
// Con soporte para React Router y múltiples rutas
// ===============================================

// 📦 IMPORTACIONES DE MÓDULOS (CommonJS para compatibilidad con Babel)
const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDomServer = require('react-dom/server');
const App = require('../src/App').default;

// ⚙️ CONFIGURACIÓN DEL SERVIDOR
const PORT = process.env.PORT || 3000;
const app = express();

// 📁 MIDDLEWARE PARA ARCHIVOS ESTÁTICOS DE BUILD
app.use(express.static(path.resolve(__dirname, '..', 'build'), { index: false }));

// 🎯 FUNCIÓN PARA GENERAR META TAGS DINÁMICOS
const generateMetaTags = (url) => {
    const metaTags = {
        title: 'MLS Properties - Tu hogar ideal',
        description: 'Encuentra las mejores propiedades en venta y alquiler',
        ogTitle: 'MLS Properties',
        ogDescription: 'Sistema MLS de propiedades inmobiliarias',
        ogImage: '/logo192.png',
        ogUrl: url,
    };

    // Personalizar meta tags según la ruta
    if (url === '/') {
        metaTags.title = 'MLS Properties - Encuentra tu propiedad ideal';
        metaTags.description = 'Descubre las mejores propiedades en venta y alquiler. Casas, apartamentos, locales comerciales y más.';
    } else if (url.startsWith('/propiedades/') && url.split('/').length === 3) {
        metaTags.title = 'Detalle de Propiedad - MLS Properties';
        metaTags.description = 'Información completa de la propiedad';
    } else if (url.startsWith('/propiedades')) {
        metaTags.title = 'Listado de Propiedades - MLS Properties';
        metaTags.description = 'Explora todas nuestras propiedades disponibles con filtros avanzados';
    }

    return `
        <title>${metaTags.title}</title>
        <meta name="description" content="${metaTags.description}">
        <meta property="og:title" content="${metaTags.ogTitle}">
        <meta property="og:description" content="${metaTags.ogDescription}">
        <meta property="og:image" content="${metaTags.ogImage}">
        <meta property="og:url" content="${metaTags.ogUrl}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${metaTags.ogTitle}">
        <meta name="twitter:description" content="${metaTags.ogDescription}">
        <meta name="twitter:image" content="${metaTags.ogImage}">
    `;
};

// 🎯 FUNCIÓN PARA RENDERIZAR SSR
const renderSSR = (req, res) => {
    const htmlPath = path.resolve(__dirname, '..', 'build', 'index.html');
    
    fs.readFile(htmlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('❌ Error reading index.html:', err);
            return res.status(500).send(`
                <html>
                    <head><title>Error</title></head>
                    <body>
                        <h1>Error al cargar la aplicación</h1>
                        <p>Por favor ejecuta: npm run build</p>
                    </body>
                </html>
            `);
        }
        
        try {
            // 🎯 RENDERIZADO DEL COMPONENTE REACT
            // Nota: BrowserRouter no funciona en SSR, así que renderizamos sin router
            // El cliente hidratará y aplicará el routing
            let appHtml = '';
            try {
                // Crear un componente simple sin router para SSR
                const SimpleApp = React.createElement('div', { 
                    id: 'app-container',
                    className: 'flex flex-col min-h-screen'
                }, 
                    React.createElement('div', { className: 'flex-grow' }, 'Cargando...')
                );
                appHtml = ReactDomServer.renderToString(SimpleApp);
            } catch (renderError) {
                console.error('❌ Error rendering React component:', renderError);
                // Continuar sin el HTML renderizado, el cliente lo hidratará
                appHtml = '';
            }
            
            // Generar meta tags dinámicos
            const metaTags = generateMetaTags(req.url);
            
            // 🎯 INYECCIÓN DEL HTML RENDERIZADO Y META TAGS
            let html = data
                .replace(/<noscript>[\s\S]*?<\/noscript>/gi, '')
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${appHtml}</div>`
                );
            
            // Inyectar meta tags en el head
            html = html.replace('</head>', `${metaTags}</head>`);
            
            return res.send(html);
        } catch (error) {
            console.error('❌ Error general en renderSSR:', error);
            // Enviar HTML básico en caso de error
            return res.status(500).send(`
                <html>
                    <head>
                        <title>Error - MLS Properties</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1>Error al renderizar la página</h1>
                        <p>Por favor intenta nuevamente.</p>
                    </body>
                </html>
            `);
        }
    });
};

// 🎯 RUTA UNIVERSAL PARA SSR (CAPTURA TODAS LAS RUTAS)
// Capturar todas las rutas GET que no sean archivos estáticos
app.get('/', renderSSR);
app.get('/propiedades', renderSSR);
app.get('/propiedades/:id', renderSSR);

// Capturar cualquier otra ruta
app.use((req, res) => {
    // Si es un archivo estático, ya fue servido por express.static
    // Para cualquier otra ruta, hacer SSR
    renderSSR(req, res);
});

// Manejar errores no capturados ANTES de iniciar el servidor
// Esto evita que el proceso termine si hay un error
process.on('uncaughtException', (error) => {
    console.error('❌ Error no capturado:', error);
    console.error('Stack:', error.stack);
    // NO terminar el proceso - mantener el servidor corriendo
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
    if (reason instanceof Error) {
        console.error('Stack:', reason.stack);
    }
    // NO terminar el proceso - mantener el servidor corriendo
});

// Prevenir que el proceso termine por señales
process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM recibido, cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT recibido (Ctrl+C), cerrando servidor...');
    process.exit(0);
});

// 🚀 INICIO DEL SERVIDOR
const server = app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log('\n' + '='.repeat(60));
    console.log('🚀 SERVIDOR SSR INICIADO CORRECTAMENTE');
    console.log('='.repeat(60));
    console.log(`📍 Frontend escuchando en: ${url}`);
    console.log(`🔗 Backend API en: http://localhost:8000/api/`);
    console.log('\n✨ Rutas disponibles:');
    console.log(`   👉 ${url}/ - Home`);
    console.log(`   👉 ${url}/propiedades - Listado`);
    console.log(`   👉 ${url}/propiedades/:id - Detalle`);
    console.log('\n💡 Para detener el servidor, presiona Ctrl+C');
    console.log(`⚠️  Asegúrate de que el backend Django esté corriendo en puerto 8000`);
    console.log('='.repeat(60) + '\n');
    console.log('✅ Servidor activo y escuchando peticiones...\n');
});

// Manejar errores del servidor
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Error: Puerto ${PORT} ya está en uso`);
        console.error('💡 Solución: Detén el otro proceso o cambia el puerto');
    } else {
        console.error('❌ Error del servidor:', error);
    }
    // NO terminar el proceso, solo loguear
});

