# Sistema de Reserva de Tickets - Frontend

Este es el frontend del sistema de reserva de tickets, desarrollado con **Next.js** y **Tailwind CSS**. Asegúrate de tener configurado el backend y Docker antes de proceder.

---

## Configuración Inicial

1. **Instalación**: 
   Asegúrate de tener clonado tanto el frontend como el backend con la siguiente extructura de carpetas:
   ```
   your_path/
   │
   ├── backend/
   ├── db/ 
   ├── frontend/
   ```

2. **Archivo `.env`**:
   Configura un archivo `.env` en la raíz del proyecto frontend. Este archivo debe contener las siguientes variables de entorno:
   ```env
   NEXT_APP_API_URL=http://localhost:3000
   FRONT_PORT=3000
   ```

---

## Iniciar el Proyecto con Docker Compose

El frontend ya está configurado para ejecutarse dentro de un contenedor Docker. Sigue estos pasos para iniciar el sistema:

### Comando por defecto:
```bash
docker compose up --build
```

### En caso de problemas, usa estos comandos:
```bash
docker compose --env-file ./backend/.env down -v
docker compose --env-file ./backend/.env up --build
```

Estos comandos eliminarán volúmenes existentes y recrearán el contenedor del frontend.

### Desarrollo Local:
Si prefieres ejecutar el frontend localmente:
```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en [http://localhost:3000](http://localhost:3000).

---

## Funcionalidades del Frontend

### 1. **Autenticación**
   - **Login**: Inicio de sesión para acceder al sistema.
   - **Registro**: Crear un nuevo usuario en el sistema.

### 2. **Principal Page**:
   - **Información del Usuario**: Muestra el nombre y correo del usuario autenticado.
   - **Eventos**: Enlace para navegar a la página de eventos.
   - **Admin**: (Solo para usuarios con rol de administrador) Enlace para administrar eventos.

### 3. **Eventos**
   - Mostrar todos los eventos disponibles en un formato de tarjeta.
   - Filtrar eventos por fecha, ubicación y disponibilidad de tickets.
   - Ver detalles de un evento específico.
   - Reservar tickets para eventos disponibles.

---

## Estructura del Proyecto

El proyecto utiliza la estructura recomendada por **Next.js** con `App Router`:

```
src/
│
├── app/
│   ├── login/           # Página de inicio de sesión
│   ├── register/        # Página de registro
│   ├── principal/       # Pantalla principal
│   │   ├── layout.tsx   # Layout con SideNav
│   │   ├── page.tsx     # Información del usuario
│   │   ├── events/      # Página de eventos
│   │   │   ├── page.tsx # Listado de eventos
│   │   │   ├── [id]/    # Detalles del evento
│   │   ├── admin/       # Administración de eventos (solo para admin)
│   ├── utils/           # Configuración de la API
│
├── components/          # Componentes reutilizables
│   ├── EventCard.tsx    # Tarjetas para eventos
│   ├── SideNav.tsx      # Barra lateral
│
├── styles/              # Archivos de estilo global
└── public/              # Imágenes y recursos públicos
```

---

## Endpoints Consumidos

El frontend interactúa con las siguientes rutas del backend:

### **Autenticación**
- **`POST /auth/register`**: Registra un nuevo usuario.
- **`POST /auth/login`**: Devuelve un JWT para la sesión.

### **Eventos**
- **`GET /events`**: Obtiene todos los eventos.
- **`GET /events/:id`**: Detalles de un evento específico.

### **Reservaciones**
- **`POST /reservations`**: Realiza una reserva de tickets.

---

## Notas Adicionales

- **Estado Global**: El proyecto utiliza el localStorage para almacenar y manejar el token JWT.
- **Estilos**: Utilizamos Tailwind CSS para estilizar la aplicación de forma eficiente.

---

## Desarrollo Futuro

- **Mejoras en el filtro de eventos**: Hacer más robusto el filtrado en el frontend.
- **Mejorar el manejo de errores**: Mostrar mensajes más descriptivos al usuario.

---

Si tienes dudas o problemas, no dudes en preguntar. ¡Happy coding! 🚀