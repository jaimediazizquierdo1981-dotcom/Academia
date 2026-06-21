# Academia Personal — Panel de aprendizaje

Web privada (con clave) que muestra tus paquetes y rutas de estudio, con progreso
guardado en el servidor. Construida con Node + Express + Postgres, lista para Render.

## Estructura
- `server.js` — backend: sirve la web, valida el login, guarda el progreso
- `public/` — el front (login, panel, estilos, lógica, contenido)
- `package.json` — dependencias

## Desplegar en Render (paso a paso)

### 1. Subir a GitHub
- Crea un repositorio nuevo (privado recomendado).
- Sube todos los archivos. El `.gitignore` ya protege `.env` y `node_modules`.

### 2. Crear la base de datos en Render
- En Render: New → Postgres. Plan Free. Crea.
- Copia la "Internal Database URL" que te da.

### 3. Crear el Web Service en Render
- New → Web Service → conecta tu repo de GitHub.
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: Free (o Starter $7 si no quieres el cold start de ~1 min).

### 4. Variables de entorno (en el Web Service → Environment)
- `APP_PASSWORD` = tu clave de acceso a la academia
- `SESSION_SECRET` = cualquier texto largo y aleatorio
- `DATABASE_URL` = la Internal Database URL del paso 2

### 5. Deploy
- Render construye y despliega. Tu academia queda en `https://tu-servicio.onrender.com`
- Entra, pon tu APP_PASSWORD, y empieza a marcar tu progreso.

## Local (opcional)
```
npm install
APP_PASSWORD=loquequieras npm start
```
Sin DATABASE_URL el progreso no persiste (solo para probar el diseño).

## Agregar más paquetes/rutas
Edita `public/data.js`. La estructura es Paquetes → Rutas → Bloques → Lecciones.
Cada lección necesita un `id` único (se usa para el progreso). Nada más que tocar.
