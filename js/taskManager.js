class TaskManager {
  constructor() {
    this.tasks = [];
  }

  /**
   * Cambia el estado de una tarea entre pendiente y completada (Toggle) No funciona por ahora toca renderizar en el index.js
   * @param {string} idTarea ID único de la tarea
   */
  alternarEstadoTarea(idTarea) {
    const tareaEncontrada = this.tasks.find(tarea => String(tarea.id) === String(idTarea));
    if (tareaEncontrada) {
      // Alternar estado
      tareaEncontrada.estado = tareaEncontrada.estado === 'Completada' ? 'Pendiente' : 'Completada';
      this.guardarEnLocalStorage();
    }
  }

  /**
   * Guarda el estado actual de las tareas en el LocalStorage del navegador
   */
  guardarEnLocalStorage() {
    localStorage.setItem('lista_tareas', JSON.stringify(this.tasks));
  }

  /**
   * Carga las tareas desde el LocalStorage
   */
  cargarDesdeLocalStorage() {
    const tareasAlmacenadas = localStorage.getItem('lista_tareas');
    if (tareasAlmacenadas) {
      this.tasks = JSON.parse(tareasAlmacenadas);
    } else {
      // Tareas por defecto como por ejemplo
      this.tasks = [
        {
          id: "1",
          nombre: "Implementar Wireframe en Figma",
          descripcion: "Crear la maqueta con la distribución del dashboard y la paleta de colores pastel.",
          categoria: "Desarrollo",
          prioridad: "Crítica",
          fecha: "2026-11-05",
          estado: "Pendiente"
        },
        {
          id: "2",
          nombre: "Estudiar Fundamentos de Spring Boot",
          descripcion: "Revisar la configuración de controladores, servicios y conexión a bases de datos SQL.",
          categoria: "Estudio",
          prioridad: "Alta",
          fecha: "2026-11-08",
          estado: "Pendiente"
        }
      ];
      this.guardarEnLocalStorage();
    }
  }

  /**
   * Agrega una nueva tarea a la colección
   * @param {Object} nuevaTarea 
   */
  agregarTarea(nuevaTarea) {
    this.tasks.unshift(nuevaTarea);
    this.guardarEnLocalStorage();
  }

  /**
   * Elimina una tarea por su ID
   * @param {string} idTarea 
   */
  eliminarTarea(idTarea) {
    this.tasks = this.tasks.filter(tarea => String(tarea.id) !== String(idTarea));
    this.guardarEnLocalStorage();
  }
}