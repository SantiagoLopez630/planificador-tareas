# Planificador de Tareas Web

El objetivo principal es construir una herramienta de gestión de tareas interactiva, accesible e intuitiva que evoluciona sprint tras sprint, pasando de una maquetación inicial en el frontend hasta convertirse en una aplicación Full Stack completa.

**Características Clave de la Interfaz y Arquitectura (Sprint 1)**

- **Gestión de Tareas Dinámica:** Permite registrar nuevas tareas especificando un título, descripción detallada, categoría de clasificación (Desarrollo, Estudio, Personal), nivel de prioridad (Crítica, Alta, Media, Baja) y fecha límite de entrega.
- **Persistencia de Datos Local (LocalStorage):** Incorpora sincronización nativa en el navegador del usuario, asegurando que tanto las tareas de ejemplo predeterminadas como las nuevas entradas no se pierdan al recargar o cerrar la página.
- **Validación Robusta e Interactiva:** Cuenta con un sistema de control de entradas en JavaScript (función validFormFieldInput) respaldado por alertas visuales modernas mediante SweetAlert2, previniendo registros vacíos o incompletos.
- **Control de Eliminación Sincronizada:** Mecanismo integrado de borrado de tarjetas que actualiza de manera simultánea el almacenamiento local y el DOM, acompañado de modales de confirmación para evitar borrados accidentales.
- **Diseño y Experiencia de Usuario (UI/UX):**Estructura Semántica y Responsiva: Desarrollada con HTML5 y Bootstrap 5, asegurando adaptabilidad a cualquier tamaño de pantalla.   
- **Identidad Visual Personalizada:** Uso de una paleta de colores pastel basada en variables CSS (:root) que transmite calma y concentración, complementada con tipografías profesionales de Google Fonts (Google Sans y Work Sans).
- **Maquetación de Entorno de Enfoque:** Espacios visualmente definidos para un temporizador Pomodoro, un reproductor de música Lofi y una zona interactiva para futuras mecánicas de tareas completadas (canasta de baloncesto).

---

## Estado del Proyecto (Sprint 1)

En esta primera fase (Sprint 1), se ha diseñado e implementado la **interfaz de usuario (UI)** y la **lógica básica de la aplicación** en el cliente, incluyendo:

- **Estructura Semántica en HTML5:** Organización accesible usando etiquetas semánticas (`header`, `main`, `article`, `aside`, `footer`).
- **Diseño Responsivo con Bootstrap 5:** Maquetación limpia adaptable a distintos dispositivos.
- **Identidad Visual Personalizada:** Paleta de colores pastel en CSS con variables `:root` y tipografías de Google Fonts (*Google Sans* y *Work Sans*).
- **Categorización y Priorización:** Clasificación visual de tareas mediante insignias (*badges*) y selectores de urgencia (Crítica, Alta, Media, Baja).
- **Validación de Formularios e Interacciones:** Lógica en JavaScript con la función de validación `validFormFieldInput()` y alertas interactivas mediante **SweetAlert2**.
- **Persistencia de Datos:** Sincronización completa de creación y eliminación de tareas utilizando el **LocalStorage** del navegador.

---

## Tecnologías Utilizadas

- **HTML5:** Estructura semántica de la aplicación.
- **CSS3:** Customización de la interfaz, variables de color y tipografías.
- **Bootstrap 5 (v5.3.3):** Sistema de grillas, componentes visuales y utilidades.
- **JavaScript (ES6+):** Manipulación del DOM, validaciones, gestión de eventos y LocalStorage.
- **SweetAlert2:** Alertas modernas e interactivas para validaciones y confirmaciones.

---

## Enlaces del Proyecto

- **Demo en Vivo (GitHub Pages):** (https://santiagolopez630.github.io/planificador-tareas/))
- **Tablero de Trello (Sprint 1):**(https://trello.com/invite/b/6aecd8a34a1d255fbdd0f2b9/ATTIedd8b4aa16bda322287869cbec469770AD776AF0/planificador-tareas))
- **Wireframe en Figma:** (https://www.figma.com/design/CK6Bewo86UFyaH9jghQSrM/Sin-t%C3%ADtulo?node-id=0-1&t=fAV1tpQDkeYHQnsc-1))

---
