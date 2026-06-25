# 🌐 API Red Social - NestJS + MongoDB

![NestJS](https://img.shields.io/badge/NestJS-2.0-red)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Swagger](https://img.shields.io/badge/Swagger-Documentation-brightgreen)
![Status](https://img.shields.io/badge/Status-Completado-success)

---

## 📋 Descripción del Proyecto

API REST desarrollada con **NestJS** y **MongoDB** para una red social. El sistema permite gestionar usuarios, roles, publicaciones, comentarios, reacciones y seguidores, proporcionando una base sólida para una plataforma de interacción social.

### 🎯 Objetivo

Desarrollar una API REST robusta y escalable que permita la gestión completa de una red social, implementando buenas prácticas de desarrollo, autenticación JWT, documentación Swagger y arquitectura modular con NestJS.

### 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **NestJS** | 10.x | Framework backend |
| **MongoDB** | 6.x | Base de datos NoSQL |
| **Mongoose** | 8.x | ODM para MongoDB |
| **TypeScript** | 5.x | Lenguaje de programación |
| **Swagger** | - | Documentación de API |

---

## 📁 Estructura del Proyecto
src/
├── common/
│ └── helpers/
│ └── response.helper.ts
├── modules/
│ ├── usuarios/
│ │ ├── dto/
│ │ ├── schemas/
│ │ ├── usuarios.controller.ts
│ │ ├── usuarios.module.ts
│ │ └── usuarios.service.ts
│ ├── roles/
│ │ ├── dto/
│ │ ├── schemas/
│ │ ├── roles.controller.ts
│ │ ├── roles.module.ts
│ │ └── roles.service.ts
│ ├── publicaciones/
│ │ ├── dto/
│ │ ├── schemas/
│ │ ├── publicaciones.controller.ts
│ │ ├── publicaciones.module.ts
│ │ └── publicaciones.service.ts
│ ├── comentarios/
│ │ ├── dto/
│ │ ├── schemas/
│ │ ├── comentarios.controller.ts
│ │ ├── comentarios.module.ts
│ │ └── comentarios.service.ts
│ ├── reacciones/
│ │ ├── dto/
│ │ ├── schemas/
│ │ ├── reacciones.controller.ts
│ │ ├── reacciones.module.ts
│ │ └── reacciones.service.ts
│ └── seguidores/
│ ├── dto/
│ ├── schemas/
│ ├── seguidores.controller.ts
│ ├── seguidores.module.ts
│ └── seguidores.service.ts
├── app.module.ts
└── main.ts

text

---

## 📦 Módulos Implementados

| # | Módulo | Descripción | Estado |
|---|--------|-------------|--------|
| 1 | **Roles** | Gestión de roles de usuario | ✅ Completado |
| 2 | **Usuarios** | Gestión de usuarios | ✅ Completado |
| 3 | **Publicaciones** | Gestión de publicaciones | ✅ Completado |
| 4 | **Comentarios** | Gestión de comentarios | ✅ Completado |
| 5 | **Reacciones** | Sistema de reacciones (like, amor, risa, tristeza, enojado) | ✅ Completado |
| 6 | **Seguidores** | Sistema de seguidores | ✅ Completado |

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/cristiangaitan17/api-red-social.git
cd api-red-social
2. Instalar dependencias
bash
npm install
3. Configurar variables de entorno
Crear archivo .env en la raíz:

env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/red_social

# JWT
JWT_SECRET=tu_secreto_jwt_aqui
JWT_EXPIRES_IN=7d

# Puerto
PORT=3000
4. Ejecutar MongoDB
bash
mongod --dbpath /path/to/data
5. Ejecutar el proyecto
bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
📚 Documentación Swagger
Una vez el servidor esté corriendo, accede a:

text
http://localhost:3000/api-docs
🔗 Endpoints Principales
Roles
Método	Endpoint	Descripción
GET	/roles	Listar roles activos
GET	/roles/inactivos	Listar roles inactivos
GET	/roles/{id}	Obtener rol por ID
POST	/roles	Crear rol
PUT	/roles/{id}	Actualizar rol
PATCH	/roles/{id}	Actualización parcial
PATCH	/roles/{id}/restaurar	Restaurar rol inactivo
DELETE	/roles/{id}	Soft delete
Usuarios
Método	Endpoint	Descripción
GET	/usuarios	Listar usuarios activos
GET	/usuarios/inactivos	Listar usuarios inactivos
GET	/usuarios/{id}	Obtener usuario por ID
POST	/usuarios	Crear usuario
PUT	/usuarios/{id}	Actualizar usuario
PATCH	/usuarios/{id}	Actualización parcial
PATCH	/usuarios/{id}/restaurar	Restaurar usuario inactivo
DELETE	/usuarios/{id}	Soft delete
Publicaciones
Método	Endpoint	Descripción
GET	/publicaciones	Listar publicaciones activas
GET	/publicaciones/inactivas	Listar publicaciones inactivas
GET	/publicaciones/usuario/{id}	Publicaciones de un usuario
GET	/publicaciones/{id}	Obtener publicación por ID
POST	/publicaciones	Crear publicación
PUT	/publicaciones/{id}	Actualizar publicación
PATCH	/publicaciones/{id}	Actualización parcial
PATCH	/publicaciones/{id}/restaurar	Restaurar publicación inactiva
PATCH	/publicaciones/{id}/like	Dar like a una publicación
DELETE	/publicaciones/{id}	Soft delete
Comentarios
Método	Endpoint	Descripción
GET	/comentarios	Listar comentarios activos
GET	/comentarios/inactivos	Listar comentarios inactivos
GET	/comentarios/publicacion/{id}	Comentarios de una publicación
GET	/comentarios/{id}	Obtener comentario por ID
POST	/comentarios	Crear comentario
PUT	/comentarios/{id}	Actualizar comentario
PATCH	/comentarios/{id}	Actualización parcial
PATCH	/comentarios/{id}/restaurar	Restaurar comentario inactivo
DELETE	/comentarios/{id}	Soft delete
Reacciones
Método	Endpoint	Descripción
GET	/reacciones	Listar reacciones activas
GET	/reacciones/inactivas	Listar reacciones inactivas
GET	/reacciones/publicacion/{id}	Reacciones de una publicación
GET	/reacciones/publicacion/{id}/count	Contar reacciones por tipo
GET	/reacciones/verificar	Verificar si usuario reaccionó
POST	/reacciones	Crear/actualizar reacción
PUT	/reacciones/{id}	Actualizar reacción
PATCH	/reacciones/{id}	Actualización parcial
PATCH	/reacciones/{id}/restaurar	Restaurar reacción inactiva
DELETE	/reacciones	Soft delete
Seguidores
Método	Endpoint	Descripción
GET	/seguidores	Listar seguimientos activos
GET	/seguidores/inactivos	Listar seguimientos inactivos
GET	/seguidores/seguidores/{id}	Listar seguidores de un usuario
GET	/seguidores/siguiendo/{id}	Listar usuarios que sigue
GET	/seguidores/verificar	Verificar seguimiento
POST	/seguidores	Seguir a un usuario
PUT	/seguidores/{id}	Actualizar seguimiento
PATCH	/seguidores/{id}	Actualización parcial
PATCH	/seguidores/{id}/restaurar	Restaurar seguimiento inactivo
DELETE	/seguidores/{id}	Soft delete
📝 Ejemplos de Peticiones
POST /publicaciones
json
{
    "titulo": "Mi primera publicación",
    "contenido": "Este es el contenido de mi publicación",
    "autor": "67b4c5d6e7f8g9h0i1j2k3l4",
    "imagenes": ["https://ejemplo.com/imagen1.jpg"],
    "activo": true
}
POST /comentarios
json
{
    "publicacion": "67b4c5d6e7f8g9h0i1j2k3l5",
    "autor": "67b4c5d6e7f8g9h0i1j2k3l4",
    "contenido": "Excelente publicación",
    "activo": true
}
POST /reacciones
json
{
    "publicacion": "67b4c5d6e7f8g9h0i1j2k3l5",
    "usuario": "67b4c5d6e7f8g9h0i1j2k3l4",
    "tipo": "like",
    "activo": true
}
POST /seguidores
json
{
    "seguidor": "67b4c5d6e7f8g9h0i1j2k3l4",
    "seguido": "67b4c5d6e7f8g9h0i1j2k3l6",
    "activo": true
}
📊 Características Implementadas
✅ CRUD completo para cada módulo

✅ Soft Delete con campo activo

✅ Swagger para documentación

✅ Respuestas JSON estandarizadas con ResponseHelper

✅ Relaciones entre tablas (populate)

✅ Arquitectura modular (NestJS)

✅ MongoDB con Mongoose ODM

✅ Variables de entorno con .env

✅ Control de versiones con Git

✅ Estructura profesional (DTOs, Schemas, Services, Controllers)

👤 Autor
Steven Cristian Gaitán Hernández

GitHub: @cristiangaitan17

Tecnólogo en Análisis y Desarrollo de Software - SENA

Centro Agroindustrial de Casanare

📄 Licencia
Este proyecto está bajo la licencia MIT. Consultar el archivo LICENSE para más información.

Última actualización: \today

text

---

**¿Listo para copiar y pegar en tu repositorio?** 📄🚀

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
