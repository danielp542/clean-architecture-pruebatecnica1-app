
#  Sistema de Biblioteca con CRUD y Estadísticas

Este proyecto corresponde a la **Prueba Técnica JR Developer**.  
El sistema de biblioteca está dividido en dos partes:

- **Backend (Laravel 10+)** → API para manejar libros, usuarios, préstamos y estadísticas.  
- **Frontend (Angular 19)** → Interfaz gráfica para interactuar con el sistema.  

Se utiliza **MySQL** como base de datos y los proyectos corren en paralelo:  
- Laravel en el puerto **8000**  
- Angular en el puerto **4200**  

---

##  Funcionalidades principales

- CRUD de libros (títulos, autores, géneros, disponibilidad).  
- Gestión de préstamos (usuarios, fechas de préstamo y devolución, reglas básicas).  
- Estadísticas (ejemplo: cantidad de libros disponibles, libros más prestados, autores populares).  
- Validaciones en formularios (frontend y backend).  
- Consumo de la API desde Angular con manejo de errores.  
- Archivo de **Postman** incluido para probar los endpoints.  

---

##  Requisitos previos

Antes de iniciar, asegúrate de tener instalado en tu sistema:

- Node.js v18+  
- Angular CLI v19  
- PHP v8.3+  
- Composer  
- MySQL v8+  
- Git  

---

##  Estructura del proyecto

El repositorio contiene dos carpetas principales:

- `/backend-laravel` → API en Laravel  
- `/frontend-angular` → Aplicación en Angular  

---

##  Configuración de la base de datos

1. Crear la base de datos en MySQL:

   ```sql
   CREATE DATABASE dbPruebaTecnica;
2. Importar el dump proporcionado:

- mysql -u root -p dbPruebaTecnica < dump-dbPruebaTecnica-202509010402.sql

## Instalación del Backend (Laravel)

- cd backend-laravel
composer install
php artisan key:generate
php artisan serve --port=8000


## Instalación del Frontend (Angular)

-cd ../frontend-angular
 npm install
 ng serve --port 4200

## Pruebas con Postman

Se incluye un archivo de colección de Postman llamado Biblioteca.postman_collection.json.

Importar el archivo en Postman.

## Estadísticas implementadas

Cantidad total de libros disponibles.

Libros más prestados.

Autores más populares.

## Notas

El frontend consume la API de Laravel.

Se utilizó arquitectura limpia básica en backend (controladores, servicios, repositorios).

El diseño en Angular es responsivo y sencillo usando TailwindCSS + Angular Material.

Se incluyen pruebas en Postman. Las pruebas unitarias están preparadas para ser extendidas.

#######################################################################
Usuario y contraseña que se pueden usar 
"email":"danielp@example.com","password":"password123"
#######################################################################

##👨‍💻 Autor

Daniel Felipe García
Prueba Técnica JR Developer

