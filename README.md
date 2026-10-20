# Rick and Morty App

Aplicación web hecha en **React** que consume la API pública de [Rick and Morty](https://rickandmortyapi.com/api/character).
Evaluación Parcial 2 - Desarrollo Full Stack (DSY1104) - Duoc UC.

- **GitHub:** https://github.com/robberslide/rick-and-morty-Eliot-Ibacache
- **Link en AWS:** _(pegar aquí la URL cuando esté desplegado)_

## ¿Qué hace?

- Muestra los personajes en tarjetas (imagen, nombre, especie, estado, género, origen y ubicación)
- Buscador por nombre (con validación)
- Filtros por estado y especie
- Paginación
- Página de detalle de cada personaje
- Panel de administrador para crear, editar y eliminar personajes propios (CRUD guardado en localStorage)
- Diseño responsivo con Bootstrap
- Pruebas unitarias con Jasmine y Karma

## Tecnologías

React, Vite, React Router, Bootstrap 5, Jasmine, Karma.

## Cómo ejecutarlo

Necesitas Node.js instalado.

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # abre la app en http://localhost:5173
npm test         # ejecuta las pruebas con Karma (necesita Google Chrome instalado)
npm run build    # crea la carpeta dist para subir a AWS
```

> El `index.html` no se puede abrir con doble clic ni con Live Server, hay que usar `npm run dev`.

Después de `npm test` se genera el reporte de cobertura en `coverage/html/index.html`.

## Estructura de carpetas

```
src/
├── main.jsx            -> punto de entrada
├── App.jsx             -> rutas de la aplicación
├── index.css           -> estilos propios
├── componentes/        -> BarraNavegacion, Boton, Buscador, Cargando, Filtros,
│                          FormularioPersonaje, ListaPersonajes, MensajeError, TarjetaPersonaje
├── paginas/            -> Inicio, Detalle, Admin, NoEncontrada
├── datos/              -> personajesLocales.js (CRUD + localStorage), traducciones.js
├── servicios/          -> api.js (llamadas a la API con fetch)
└── pruebas/            -> pruebas de Jasmine (*.spec.jsx)
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Lista de personajes con buscador y filtros |
| `/personaje/:id` | Detalle de un personaje |
| `/admin` | Panel de administrador (CRUD) |
| cualquier otra | Página 404 |

## Pruebas

44 pruebas con Jasmine, ejecutadas con Karma en Chrome:

- `renderizado.spec.jsx` – que los componentes se dibujen bien y el renderizado condicional
- `props.spec.jsx` – que los componentes reciban y usen sus props
- `estado.spec.jsx` – que el estado cambie cuando el usuario escribe
- `eventos.spec.jsx` – clics y envíos de formulario
- `crud.spec.jsx` – crear, leer, actualizar y eliminar en el archivo de datos
- `paginas.spec.jsx` – páginas completas (API simulada con `spyOn(window, 'fetch')`)

## Despliegue en AWS (S3)

1. `npm run build`
2. En AWS entrar a **S3 → Create bucket**, quitar el check de *Block all public access*.
3. En **Properties → Static website hosting** activar y poner `index.html` en *Index document* y en *Error document*.
4. En **Permissions → Bucket policy** pegar (cambiando el nombre del bucket):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::NOMBRE-DEL-BUCKET/*"
     }]
   }
   ```
5. Subir **lo que está dentro** de la carpeta `dist` (index.html, favicon.svg y la carpeta assets).
6. Copiar la URL que aparece en *Static website hosting*.
