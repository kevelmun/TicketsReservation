# Sistema de Reserva de Tickets

Este proyecto constituye el sistema completo de reserva de tickets, incluyendo tanto el backend como el frontend, listos para ser desplegados y utilizados. El sistema está diseñado para ejecutarse de manera integrada utilizando **Docker Compose**, lo que facilita la gestión de dependencias y el despliegue en múltiples entornos.

---

## **Inicio del Sistema Completo**

Para ejecutar el sistema en su totalidad, incluyendo el backend y el frontend, asegúrate de tener configuradas las variables de entorno y los archivos necesarios. Usa los siguientes comandos:

### **Comando Principal**:
Ejecuta este comando para iniciar tanto el backend como el frontend desde cero:
```bash
docker compose up --build
```

### **Resolución de Problemas**:
Si encuentras inconvenientes al iniciar los contenedores, utiliza estos comandos para garantizar una configuración limpia:
```bash
docker compose --env-file ./backend/.env down -v
docker compose --env-file ./backend/.env up --build
```

Estos pasos eliminarán los volúmenes existentes y recrearán los contenedores, asegurando que todo funcione correctamente.

---

## **Resumen del Sistema**

El sistema incluye las siguientes funcionalidades:

### **Backend**
- **Autenticación**:
  - Registro e inicio de sesión con generación de tokens JWT.
- **Gestión de eventos**:
  - Crear, consultar, actualizar y eliminar eventos (CRUD completo).
- **Reservaciones**:
  - Realizar y consultar reservaciones asociadas a usuarios autenticados.
- **Middleware**:
  - `verifyToken`: Autenticidad del token JWT.
  - `isAdmin`: Permisos de administrador.

### **Frontend**
- **Interfaz amigable** desarrollada con **Next.js** y **Tailwind CSS**.
- **Autenticación**: Registro e inicio de sesión.
- **Eventos**:
  - Lista, detalles y reserva de eventos.
  - Filtros por criterios como fecha, ubicación y disponibilidad.
- **Administración**:
  - Gestión completa de eventos para usuarios con permisos de administrador.

---

## **Notas Adicionales**
- Asegúrate de que Docker esté en funcionamiento y que las configuraciones de los archivos `.env` sean correctas antes de ejecutar los comandos.
- Asegúrate de tener clonado tanto el frontend como el backend con la siguiendo extructura de carpetas:
```
   your_path/
   │
   ├── backend/
   ├── db/ 
   ├── frontend/
```