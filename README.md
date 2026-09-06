# Consultorio Psicologico - Frontend

Aplicacion web para la gestion de un consultorio psicologico. Permite a administradores, psicologos y pacientes acceder a las funciones habilitadas para su rol.

## Tecnologias

- React 19
- Vite 8
- React Router 8
- Tailwind CSS 4

## Requisitos

- Node.js 20 o superior
- npm
- Backend de la aplicacion ejecutandose en `http://localhost:5110`

## Instalacion y ejecucion

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion mostrara en la terminal la URL local para abrirla en el navegador.

## Comandos disponibles

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera la compilacion de produccion en `dist/`. |
| `npm run preview` | Sirve localmente la compilacion de produccion. |
| `npm run lint` | Ejecuta las reglas de Oxlint. |

## Configuracion de la API

El frontend consume la API en `http://localhost:5110`. Esta URL se encuentra en `src/services/api.js`. Las solicitudes autenticadas incluyen el token de sesion mediante el encabezado `Authorization: Bearer`.

## Roles y funcionalidades

| Rol | Funcionalidades |
| --- | --- |
| Administrador | Gestion de pacientes y agenda completa. Puede consultar el calendario, ver paciente y psicologo de cada cita, crear, actualizar y eliminar citas. |
| Psicologo | Panel profesional, gestion de pacientes y agenda propia. Puede consultar su calendario, administrar sus citas y ver el detalle de cada dia. |
| Paciente | Panel personal con sus proximas citas e historial disponible. |

## Rutas principales

| Ruta | Acceso | Descripcion |
| --- | --- | --- |
| `/login` | Publico | Inicio de sesion. |
| `/dashboard` | Psicologo | Panel de indicadores y proximas citas. |
| `/patient-dashboard` | Paciente | Panel personal del paciente. |
| `/patient-management` | Administrador, Psicologo | Registro, edicion y administracion de pacientes. |
| `/planner` | Administrador, Psicologo | Calendario semanal, detalle diario y gestion de citas. |

Las rutas privadas estan protegidas segun el rol de la sesion. El menu lateral y el footer se muestran en las rutas internas, pero no en la pagina de inicio de sesion.

## Gestion de pacientes

El gestor de pacientes permite buscar, registrar y editar pacientes. La creacion y edicion se realizan mediante un dialogo. La eliminacion esta disponible solo para administradores.

## Agenda y citas

La agenda presenta un calendario semanal de lunes a domingo. Desde el calendario o desde el detalle del dia se puede actualizar o eliminar una cita. El boton **Anadir cita** abre un dialogo para registrar una nueva cita.

Los psicologos ven sus propias citas. Los administradores consultan todas las citas y pueden ver tanto el paciente como el psicologo asignado en cada registro.

## Estructura relevante

```text
src/
	components/       Componentes reutilizables y de interfaz
	hooks/            Logica de estado y consumo de datos
	pages/            Paginas de la aplicacion
	routes/           Enrutamiento y proteccion por roles
	services/         Cliente HTTP, autenticacion y servicios de API
```
