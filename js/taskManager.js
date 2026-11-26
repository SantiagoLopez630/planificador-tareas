class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate, status = 'PORHACER') {
    this.currentId++;

    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status || 'PORHACER'
    });
  }

  deleteTask(taskId) {
    const idNumerico = Number(taskId);
    const newTasks = [];

    for (let task of this.tasks) {
      if (Number(task.id) !== idNumerico) {
        newTasks.push(task);
      }
    }

    this.tasks = newTasks;
  }

  alternarEstadoTarea(idTarea) {
    const tareaEncontrada = this.tasks.find(tarea => Number(tarea.id) === Number(idTarea));
    if (tareaEncontrada) {
      tareaEncontrada.estado = tareaEncontrada.estado === 'Completada' ? 'Pendiente' : 'Completada';
      this.save();
    }
  }

  save() {
    localStorage.setItem('lista_tareas', JSON.stringify(this.tasks));
  }

  guardarEnLocalStorage() {
    this.save();
  }

  cargarDesdeLocalStorage() {
    const tareasAlmacenadas = localStorage.getItem('lista_tareas');
    if (tareasAlmacenadas) {
      this.tasks = JSON.parse(tareasAlmacenadas);
      const maxId = this.tasks.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0);
      this.currentId = Math.max(this.currentId, maxId);
    } else {
      this.addTask(
        "Implementar Wireframe en Figma",
        "Crear la maqueta con la distribución del dashboard y la paleta de colores pastel",
        "2026-11-05",
        "PORHACER"
      );

      this.addTask(
        "Estudiar Fundamentos de Spring Boot",
        "Revisar la configuración de controladores, servicios y conexión a bases de datos SQL",
        "2026-11-08",
        "PORHACER"
      );

      this.save();
    }
  }
}