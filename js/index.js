// ejemplo de atreas
const tareasPorDefecto = [
  {
    id: "1",
    nombre: "Implementar Wireframe en Figma",
    descripcion: "Crear la maqueta con la distribución del dashboard y la paleta de colores pastel.",
    categoria: "Desarrollo",
    prioridad: "Crítica",
    fecha: "2026-11-05"
  },
  {
    id: "2",
    nombre: "Estudiar Fundamentos de Spring Boot",
    descripcion: "Revisar la configuración de controladores, servicios y conexión a bases de datos SQL.",
    categoria: "Estudio",
    prioridad: "Alta",
    fecha: "2026-11-08"
  }
];

/**
 * Obtiene las tareas almacenadas en el navegador o carga las por defecto
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
 * Valida los datos ingresados en el formulario antes de procesarlos
 * @param {Object} datos  Objeto con los valores del formulario
 * @returns {boolean} Retorna true si es válido, false si hay errores 
 */
function validFormFieldInput(datos) {
  if (!datos.nombre || datos.nombre.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo incompleto',
      text: 'El nombre de la tarea no puede estar vacío.',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.descripcion || datos.descripcion.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo incompleto',
      text: 'La descripción de la tarea no puede estar vacía.',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.categoria) {
    Swal.fire({
      icon: 'warning',
      title: 'Selección requerida',
      text: 'Debe seleccionar una categoría para la tarea.',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.prioridad) {
    Swal.fire({
      icon: 'warning',
      title: 'Selección requerida',
      text: 'Debe seleccionar un nivel de prioridad.',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.fecha) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha requerida',
      text: 'Debe ingresar una fecha límite válida.',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  return true;
}

/**
 * Elimina una tarea según su ID y actualiza el almacenamiento y la vista
 * @param {string} idTarea ID unico de la tarea a eliminar
 */
function eliminarTarea(idTarea) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "La tarea se eliminará permanentemente.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#68B0AB',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      let tareas = obtenerTareas();
      tareas = tareas.filter(tarea => tarea.id !== idTarea);
      localStorage.setItem('lista_tareas', JSON.stringify(tareas));
      renderizarTareas();
      
      Swal.fire({
        icon: 'success',
        title: '¡Eliminada!',
        text: 'La tarea ha sido borrada con éxito.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

//Renderiza todas las tarjetas de tareas en el DOM en el espacio del otro comentario del html
function renderizarTareas() {
  const contenedor = document.getElementById('contenedor-lista-tareas');
  contenedor.innerHTML = '';
  const tareas = obtenerTareas();

  if (tareas.length === 0) {
    contenedor.innerHTML = '<p class="text-center text-muted my-3">No hay tareas pendientes en este momento.</p>';
    return;
  }

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
          <div>
            <span class="badge bg-secondary me-2">Pendiente</span>
            <button class="btn btn-outline-danger btn-sm" onclick="eliminarTarea('${tarea.id}')">Eliminar</button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// Maneja el evento de envío del formulario para agregar una nueva tarea
document.getElementById('formulario-tarea').addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nuevaTarea = {
    id: Date.now().toString(), // Genera un ID unico basado en el tiempo
    nombre: document.getElementById('campo-nombre').value,
    descripcion: document.getElementById('campo-descripcion').value,
    categoria: document.getElementById('selector-categoria').value,
    prioridad: document.getElementById('selector-prioridad').value,
    fecha: document.getElementById('campo-fecha').value
  };

  // Validar datos utilizando la función exigida por la guia
  if (!validFormFieldInput(nuevaTarea)) {
    return; // Detiene la ejecución si la validación falla
  }

  const tareas = obtenerTareas();
  tareas.unshift(nuevaTarea); // Inserta la nueva tarea al principio de la lista para eso el metodo unshift
  localStorage.setItem('lista_tareas', JSON.stringify(tareas));

  renderizarTareas();
  this.reset();

  // Alerta de success con SweetAlert
  Swal.fire({
    icon: 'success',
    title: '¡Tarea registrada!',
    text: 'La nueva tarea se ha guardado correctamente.',
    timer: 1800,
    showConfirmButton: false
  });
});

// Inicializar la aplicacion al cargar el documento por eso se pone en el body y no el head
document.addEventListener('DOMContentLoaded', renderizarTareas);