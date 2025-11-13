# 🔧 Troubleshooting - Servidor SSR

## ❌ Problema: El servidor se detiene automáticamente

### ✅ Solución 1: Usar el script de inicio

```bash
cd /home/tachibana/Escritorio/SSR/ssr
./start-server.sh
```

### ✅ Solución 2: Verificar que el build existe

```bash
cd /home/tachibana/Escritorio/SSR/ssr
npm run build
npm run ssr
```

### ✅ Solución 3: Verificar puerto en uso

```bash
# Ver qué está usando el puerto 3000
lsof -ti:3000

# Detener proceso si es necesario
kill -9 $(lsof -ti:3000)
```

### ✅ Solución 4: Ejecutar en background

```bash
cd /home/tachibana/Escritorio/SSR/ssr
npm run ssr &
```

Luego verificar:
```bash
ps aux | grep "node server"
```

### ✅ Solución 5: Usar nohup

```bash
cd /home/tachibana/Escritorio/SSR/ssr
nohup npm run ssr > server.log 2>&1 &
```

Ver logs:
```bash
tail -f server.log
```

## 🔍 Verificar si el servidor está corriendo

```bash
# Ver procesos
ps aux | grep "node server"

# Ver puerto
lsof -i:3000

# Probar conexión
curl http://localhost:3000/
```

## 📝 Notas importantes

1. **El servidor DEBE mantenerse corriendo** - Si se cierra, hay un error
2. **No cierres la terminal** - El servidor necesita la terminal activa (a menos que uses `nohup` o `&`)
3. **El build debe existir** - Ejecuta `npm run build` antes de `npm run ssr`
4. **Puerto 3000 debe estar libre** - Verifica con `lsof -i:3000`

## 🐛 Errores comunes

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Port already in use"
```bash
kill -9 $(lsof -ti:3000)
```

### Error: "Build folder not found"
```bash
npm run build
```

### El servidor inicia pero no responde
- Verifica que el backend Django esté corriendo en puerto 8000
- Verifica que el build se haya completado correctamente

