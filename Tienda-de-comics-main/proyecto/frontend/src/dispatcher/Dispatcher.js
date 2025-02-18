class Dispatcher {
  constructor() {
    this.callbacks = new Map();
    this.lastID = 0;
  }

  /**
   * Registra un callback para ser ejecutado cuando se despachen acciones.
   * @param {function} callback
   * @returns {number} ID del callback registrado.
   */
  register(callback) {
    const id = this.lastID++;
    this.callbacks.set(id, callback);
    return id;
  }

  /**
   * Desregistra un callback.
   * @param {number} id
   */
  unregister(id) {
    if (this.callbacks.has(id)) {
      this.callbacks.delete(id);
    } else {
      throw new Error(`No callback found with id: ${id}`);
    }
  }

  /**
   * Despacha una acción a todos los callbacks registrados.
   * @param {object} action
   */
  dispatch(action) {
    if (!action || typeof action.type === "undefined") {
      throw new Error("Action must have a 'type' property");
    }

    this.callbacks.forEach((callback) => {
      callback(action);
    });
  }
}

const dispatcher = new Dispatcher();

export default dispatcher;
