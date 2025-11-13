#!/bin/bash

# Script para iniciar el servidor SSR y mantenerlo corriendo

echo "🚀 Iniciando servidor SSR..."
echo ""

cd "$(dirname "$0")"

# Verificar si el puerto está en uso
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Puerto 3000 ya está en uso"
    echo "💡 Deteniendo proceso anterior..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 1
fi

# Verificar si existe el build
if [ ! -d "build" ]; then
    echo "❌ No se encontró el directorio 'build'"
    echo "💡 Ejecutando 'npm run build' primero..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Error al compilar. Por favor revisa los errores."
        exit 1
    fi
fi

echo "✅ Iniciando servidor en http://localhost:3000"
echo "💡 Presiona Ctrl+C para detener"
echo ""

# Iniciar servidor
npm run ssr

