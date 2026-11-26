const taskManager = new TaskManager();

function validFormFieldInput(datos) {
  if (!datos.nombre || datos.nombre.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo incompleto',
      text: 'El nombre de la tarea no puede estar vacío',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.descripcion || datos.descripcion.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo incompleto',
      text: 'La descripción de la tarea no puede estar vacía',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.categoria) {
    Swal.fire({
      icon: 'warning',
      title: 'Selección requerida',
      text: 'Debe seleccionar una categoría para la tarea',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.prioridad) {
    Swal.fire({
      icon: 'warning',
      title: 'Selección requerida',
      text: 'Debe seleccionar un nivel de prioridad',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  if (!datos.fecha) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha requerida',
      text: 'Debe ingresar una fecha límite válida',
      confirmButtonColor: '#68B0AB'
    });
    return false;
  }

  return true;
}

function createTaskHtml(tarea) {
  const nombreTarea = tarea.nombre || tarea.name;
  const descripcionTarea = tarea.descripcion || tarea.description;
  const fechaTarea = tarea.fecha || tarea.dueDate;
  const categoriaTarea = tarea.categoria || 'Desarrollo';
  const prioridadTarea = tarea.prioridad || 'Media';

  let claseBorde = 'border-secondary';
  let claseBadgePrioridad = 'bg-secondary';

  if (prioridadTarea === 'Crítica') {
    claseBorde = 'border-danger';
    claseBadgePrioridad = 'bg-danger';
  } else if (prioridadTarea === 'Alta') {
    claseBorde = 'border-warning';
    claseBadgePrioridad = 'bg-warning text-dark';
  } else if (prioridadTarea === 'Media') {
    claseBorde = 'border-info';
    claseBadgePrioridad = 'bg-info text-dark';
  }

  let claseBadgeCategoria = 'bg-primary';
  if (categoriaTarea === 'Estudio') claseBadgeCategoria = 'bg-success';
  else if (categoriaTarea === 'Personal') claseBadgeCategoria = 'bg-secondary';

  const estaCompletada = tarea.estado === 'Completada';
  const estiloTarjeta = estaCompletada ? 'background-color: #f8f9fa; opacity: 0.85;' : '';
  const estiloTextoNombre = estaCompletada ? 'text-decoration: line-through; color: #6c757d;' : '';
  const textoBotonEstado = estaCompletada ? 'Marcar Pendiente' : 'Completar';
  const claseBotonEstado = estaCompletada ? 'btn-outline-secondary' : 'btn-outline-success';
  const etiquetaEstado = tarea.estado || tarea.status || 'PORHACER';
  const badgeEstadoClase = estaCompletada ? 'bg-success' : 'bg-secondary';

  return `
    <div class="card mb-3 ${claseBorde} shadow-sm tarea-item" data-task-id="${tarea.id}" style="${estiloTarjeta}">
      <div class="card-body" data-task-id="${tarea.id}">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title m-0" style="${estiloTextoNombre}">${nombreTarea}</h5>
          <div>
            <span class="badge ${claseBadgeCategoria}">${categoriaTarea}</span>
            <span class="badge ${claseBadgePrioridad}">${prioridadTarea}</span>
          </div>
        </div>
        <p class="card-text text-muted small mb-2">${descripcionTarea}</p>
        <div class="d-flex justify-content-between align-items-center" data-task-id="${tarea.id}">
          <small class="fw-bold">Vence: ${fechaTarea}</small>
          <div class="d-flex gap-2 align-items-center" data-task-id="${tarea.id}">
            <span class="badge ${badgeEstadoClase}">Estado: ${etiquetaEstado}</span>
            <button type="button" class="btn ${claseBotonEstado} btn-sm boton-estado" data-task-id="${tarea.id}">${textoBotonEstado}</button>
            <button type="button" class="delete-button btn btn-danger btn-sm" data-task-id="${tarea.id}">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderizarTareas() {
  const contenedor = document.getElementById('contenedor-lista-tareas');
  contenedor.innerHTML = '';

  const tareas = taskManager.tasks;

  if (tareas.length === 0) {
    contenedor.innerHTML = '<p class="text-center text-muted my-3">No hay tareas pendientes en este momento.</p>';
    return;
  }

  tareas.forEach(tarea => {
    contenedor.innerHTML += createTaskHtml(tarea);
  });
}

const listaTareasContenedor = document.getElementById('contenedor-lista-tareas');

listaTareasContenedor.addEventListener('click', function(event) {
  const elementoTarjeta = event.target.closest('[data-task-id]');
  const taskId = elementoTarjeta ? Number(elementoTarjeta.dataset.taskId) : null;

  if (event.target.classList.contains('boton-estado') && taskId !== null) {
    taskManager.alternarEstadoTarea(taskId);
    renderizarTareas();
  }

  if (event.target.classList.contains('delete-button') && taskId !== null) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La tarea se eliminará permanentemente',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#68B0AB',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        taskManager.deleteTask(taskId);
        taskManager.save();
        renderizarTareas();

        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: 'La tarea ha sido borrada con éxito',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
});

const newTaskForm = document.querySelector('#formulario-tarea');

newTaskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.querySelector('#campo-nombre').value;
  const description = document.querySelector('#campo-descripcion').value;
  const category = document.querySelector('#selector-categoria').value;
  const priority = document.querySelector('#selector-prioridad').value;
  const dueDate = document.querySelector('#campo-fecha').value;
  const status = 'PORHACER';

  const datosFormulario = {
    nombre: name,
    descripcion: description,
    categoria: category,
    prioridad: priority,
    fecha: dueDate
  };

  if (!validFormFieldInput(datosFormulario)) {
    return;
  }

  taskManager.addTask(name, description, dueDate, status);

  const ultimaTarea = taskManager.tasks[taskManager.tasks.length - 1];
  ultimaTarea.categoria = category;
  ultimaTarea.prioridad = priority;

  taskManager.save();
  renderizarTareas();
  newTaskForm.reset();

  Swal.fire({
    icon: 'success',
    title: 'Tarea registrada',
    text: `Tarea #${ultimaTarea.id} agregada con estado ${ultimaTarea.status}.`,
    timer: 1800,
    showConfirmButton: false
  });
});

document.addEventListener('DOMContentLoaded', () => {
  taskManager.cargarDesdeLocalStorage();
  renderizarTareas();
});