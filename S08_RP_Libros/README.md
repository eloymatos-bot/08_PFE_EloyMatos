# Control Individual S08 | EE2 — Gestión de Libros en Angular 19

**Estudiante:** Eloy Francesco Matos Guando  
**Curso:** Desarrollo Frontend  
**Entidad Maestra:** Libros (No Transaccional)  
**Tecnología Frontend:** Angular v19.2.11 (Standalone Components & Control Flow Syntax)  
**API REST Pública Utilizada:** `https://crudcrud.com/api/9d658dafe30b46f498689175c262fe8c/libros`  

---

## 📌 Descripción del Proyecto

Aplicación web frontend construida en Angular 19 para la administración completa de un catálogo de **Libros**. La aplicación interactúa directamente con una **API REST pública y real**, realizando las 4 operaciones CRUD (`GET`, `POST`, `PUT`, `DELETE`) de extremo a extremo con persistencia de datos en servidor remoto.

El desarrollo sigue una **separación estricta de responsabilidades**:
- **Servicio (`LibroService`)**: Encapsula el cliente `HttpClient` inyectado mediante `inject()`, manejando todas las peticiones HTTP y errores.
- **Componentes UI (`LibroListaComponent` y `LibroFormComponent`)**: Componentes de presentación desacoplados que se comunican con el orquestador principal mediante `@Input()` y `@Output()`.

---

## 🛠️ Tecnologías y Herramientas

- **Angular 19.2.11** (Standalone Components, `provideHttpClient`, `@if`, `@for`).
- **TypeScript 5.x** (Interfaces fuertemente tipadas).
- **RxJS** (`Observable`, `catchError`, `map`).
- **HTML5 & Vanilla CSS** (Diseño adaptable, limpio e intuitivo).
- **API REST Pública** (CrudCrud / MockAPI cloud server).

---

## 📂 Estructura de Carpetas

```text
S08_RP_Libros/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── libro.model.ts              # Interfaz TypeScript Libro
│   │   ├── services/
│   │   │   └── libro.service.ts            # Servicio CRUD (HttpClient + inject())
│   │   ├── components/
│   │   │   ├── libro-lista/                # Componente de Tabla / Grilla
│   │   │   │   ├── libro-lista.component.ts
│   │   │   │   ├── libro-lista.component.html
│   │   │   │   └── libro-lista.component.css
│   │   │   └── libro-form/                 # Componente de Formulario (Crear/Editar)
│   │   │       ├── libro-form.component.ts
│   │   │       ├── libro-form.component.html
│   │   │       └── libro-form.component.css
│   │   ├── app.component.ts                # Componente Orquestador Principal
│   │   ├── app.component.html              # Plantilla Maestra
│   │   ├── app.component.css               # Estilos globales de distribución
│   │   └── app.config.ts                   # Configuración global (provideHttpClient)
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── README.md
```

---

## 🔄 Operaciones CRUD Implementadas

| Operación HTTP | Método | Endpoint REST | Descripción en la Aplicación |
| :--- | :--- | :--- | :--- |
| **Listar Registros** | `GET` | `/libros` | Al iniciar la app, consulta la API REST y renderiza los libros en una tabla interactiva con estados de carga y error. |
| **Registrar Libro** | `POST` | `/libros` | Captura los datos del formulario (Título, Autor, Año, Género, Precio, Portada) y envía la petición `POST` al servidor. |
| **Actualizar Libro** | `PUT` | `/libros/:id` | Carga los datos de un libro en el formulario al hacer clic en `[Editar]`, modifica la información y la envía mediante `PUT`. |
| **Eliminar Libro** | `DELETE` | `/libros/:id` | Solicita confirmación visual previa (`confirm`) y elimina el registro físicamente de la base de datos de la API REST. |

---

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior recomendada).
- Angular CLI v19 (`npm install -g @angular/cli@19`).

### Pasos para ejecutar localmente

1. **Abrir la terminal e ingresar a la carpeta del proyecto**:
   ```bash
   cd S08_RP_Libros
   ```

2. **Instalar dependencias del proyecto**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npx ng serve
   ```

4. **Abrir en el navegador**:
   Navega a `http://localhost:4200` para interactuar con la aplicación.

---

## 👨‍💻 Autor
**Eloy Francesco Matos Guando**  
*Evaluación Individual S08 | EE2*
