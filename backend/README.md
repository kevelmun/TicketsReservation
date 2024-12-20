# Sistema de Reserva de Tickets - Backend

## Configuración Inicial

Antes de iniciar, asegúrese de configurar un archivo `.env` dentro de la carpeta `backend`. Este archivo debe contener las siguientes variables de entorno:

```env
BACK_PORT=5000
DB_PORT=3306
DB_HOST=db
DB_USER=root
DB_ROOT_PASSWORD=12345
MYSQL_DATABASE=ticket_system
JWT_SECRET=esto_no_es_muy_secreto
```

## Iniciar el Proyecto con Docker Compose

IMPORTANTE: Asegurarse de tener clonado tanto el backend como el frontend. Ejecute los siguientes comandos para iniciar los contenedores con Docker Compose (Asegurarse de tener ejecutando Docker):

1. **Comando por defecto:**

   ```bash
   docker compose up --build
   ```

2. **En caso de problemas, use estos comandos:**

   ```bash
   docker compose --env-file ./backend/.env down -v
   docker compose --env-file ./backend/.env up --build
   ```

Estos comandos eliminarán los volúmenes existentes y recrearán los contenedores desde cero, garantizando una configuración limpia.

## Usuarios de Prueba

La base de datos contiene usuarios predefinidos para pruebas:

### Usuario Regular

- **Username:** finn
- **Email:** [finnelhumano@adventure.com](mailto\:finnelhumano@adventure.com)
- **Password:** password
- **Admin:** No

### Usuario Administrador

- **Username:** jake
- **Email:** [jake@adventure.com](mailto\:jake@adventure.com)
- **Password:** password
- **Admin:** Yes

## Datos Iniciales de Eventos

La base de datos también contiene eventos de ejemplo para pruebas. Puede consultarlos mediante los endpoints descritos a continuación.

## Endpoints Disponibles

### Autenticación

- **`POST /api/auth/register`**: Registro de nuevos usuarios.
- **`POST /api/auth/login`**: Inicio de sesión y obtención de un token JWT.

### Eventos

- **`GET /api/events`**: Obtener todos los eventos. (Requiere token JWT).
- **`GET /api/events/:id`**: Obtener información de un evento por ID. (Requiere token JWT).

### Reservaciones

- **`POST /api/reservations`**: Realizar una reservación para un evento. (Requiere token JWT).
- **`GET /api/reservations`**: Obtener las reservaciones del usuario autenticado. (Requiere token JWT).

### Administración de Eventos (Solo para Administradores)

- **`POST /api/admin/events`**: Crear un nuevo evento. (Requiere token JWT y rol de administrador).
- **`PUT /api/admin/events/:id`**: Actualizar un evento existente por ID. (Requiere token JWT y rol de administrador).
- **`DELETE /api/admin/events/:id`**: Eliminar un evento existente por ID. (Requiere token JWT y rol de administrador).

## Middleware Utilizados

- **`verifyToken`**: Verifica la autenticidad del token JWT.
- **`isAdmin`**: Comprueba si el usuario autenticado tiene rol de administrador.

## Notas Adicionales

- Asegúrese de que el archivo `.env` esté correctamente configurado y citado en el archivo `docker-compose.yml`.
- Use Postman o cualquier herramienta para realizar pruebas con los endpoints. No olvide incluir el token JWT en el encabezado `Authorization` para las rutas protegidas.

```http
Authorization: Bearer <token>
