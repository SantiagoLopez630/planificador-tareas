// Tareas iniciales de ejemplo por defecto
const tareasPorDefecto = [
  {
    nombre: "Implementar Wireframe en Figma",
    descripcion: "Crear la maqueta con la distribución del dashboard y la paleta de colores pastel.",
    categoria: "Desarrollo",
    prioridad: "Crítica",
    fecha: "2026-11-05"
  },
  {
    nombre: "Estudiar Fundamentos de Spring Boot",
    descripcion: "Revisar la configuración de controladores, servicios y conexión a bases de datos SQL.",
    categoria: "Estudio",
    prioridad: "Alta",
    fecha: "2026-11-08"
  },
  {
    nombre: "Organizar Tablero de Trello",
    descripcion: "Actualizar las columnas del Backlog, Por hacer, En proceso y Finalizado para el Sprint 1.",
    categoria: "Personal",
    prioridad: "Media",
    fecha: "2026-11-10"
  },
  {
    nombre: "Optimizar Estilos CSS con Variables",
    descripcion: "Asegurar que todas las clases usen la paleta de colores y la tipografía de Google Fonts.",
    categoria: "Desarrollo",
    prioridad: "Alta",
    fecha: "2026-11-12"
  },
  {
    nombre: "Rutina de Ejercicio en Smart Fit",
    descripcion: "Completar sesión de entrenamiento de fuerza y cardio por la tarde.",
    categoria: "Personal",
    prioridad: "Baja",
    fecha: "2026-11-15"
  }
];

/**
 * Obtiene las tareas almacenadas en el navegador o carga las por defecto.
 * @returns {Array} Lista de tareas
 */
function obtenerTareas() {
  const tareasAlmacenadas = localStorage.getItem('lista_tareas');
  if (!tareasAlmacenadas) {
    localStorage.setItem('lista_tareas', JSON.stringify(tareasPorDefecto));
    return tareasPorDefecto;
  }
  return JSON.parse(tareasAlmacenadas);
}

/**
 * Renderiza todas las tarjetas de tareas en el DOM.
 */
function renderizarTareas() {
  const contenedor = document.getElementById('contenedor-lista-tareas');
  contenedor.innerHTML = '';
  const tareas = obtenerTareas();

  tareas.forEach(tarea => {
    let claseBorde = 'border-secondary';
    let claseBadgePrioridad = 'bg-secondary';
    
    if (tarea.prioridad === 'Crítica') { 
      claseBorde = 'border-danger'; 
      claseBadgePrioridad = 'bg-danger'; 
    } else if (tarea.prioridad === 'Alta') { 
      claseBorde = 'border-warning'; 
      claseBadgePrioridad = 'bg-warning text-dark'; 
    } else if (tarea.prioridad === 'Media') { 
      claseBorde = 'border-info'; 
      claseBadgePrioridad = 'bg-info text-dark'; 
    }

    let claseBadgeCategoria = 'bg-primary';
    if (tarea.categoria === 'Estudio') claseBadgeCategoria = 'bg-success';
    else if (tarea.categoria === 'Personal') claseBadgeCategoria = 'bg-secondary';

    const tarjeta = document.createElement('div');
    tarjeta.className = `card mb-3 ${claseBorde} shadow-sm`;
    tarjeta.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title m-0">${tarea.nombre}</h5>
          <div>
            <span class="badge ${claseBadgeCategoria}">${tarea.categoria}</span>
            <span class="badge ${claseBadgePrioridad}">${tarea.prioridad}</span>
          </div>
        </div>
        <p class="card-text text-muted small mb-2">${tarea.descripcion}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="fw-bold">Vence: ${tarea.fecha}</small>
          <span class="badge bg-secondary">Estado: Pendiente</span>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

/**
 * Maneja el evento de envío del formulario para agregar una nueva tarea.
 */
document.getElementById('formulario-tarea').addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nuevaTarea = {
    nombre: document.getElementById('campo-nombre').value,
    descripcion: document.getElementById('campo-descripcion').value,
    categoria: document.getElementById('selector-categoria').value,
    prioridad: document.getElementById('selector-prioridad').value,
    fecha: document.getElementById('campo-fecha').value
  };

  const tareas = obtenerTareas();
  tareas.unshift(nuevaTarea); // Inserta la nueva tarea al principio de la lista
  localStorage.setItem('lista_tareas', JSON.stringify(tareas));

  renderizarTareas();
  this.reset();
});

// Inicializar la aplicación al cargar el documento
document.addEventListener('DOMContentLoaded', renderizarTareas);