# Proyecto sobre comparación de alquileres: RentMatch

## Integrantes
- Martina Guzmán
- Nicolás Márquez
- Ana Clara Sena

## Descripción del Proyecto
Este proyecto es una plataforma de comparación de alquileres desarrollada como parte del curso de Desarrollo Web. Permite a los usuarios comparar listados de alquileres de varias fuentes en Uruguay y Argentina.

## Características
- Autenticación de usuarios
- Operaciones CRUD para listados de usuarios
- Comparación de propiedades en alquiler

## Stack Tecnológico
- Backend: Node.js con Fastify
- Base de datos: PostgreSQL
- Frontend: Angular18
- Documentación de API: Swagger
- Containerización: Docker

## Documentación de la API
La documentación de la API se genera automáticamente usando Swagger. Puedes acceder a ella en https://localhost/data/docs para la extracción de datos, o https://localhost/backend/docs para las demás funcionalidades cuando los servicios estén en ejecución.

### Autenticación
- Todas las rutas que requieren autenticación están claramente identificadas en la documentación de Swagger.
- Usa el endpoint `/auth/login` para obtener un token JWT para las solicitudes autenticadas.

Nota: Las rutas no implementadas devuelven un mensaje de error.
