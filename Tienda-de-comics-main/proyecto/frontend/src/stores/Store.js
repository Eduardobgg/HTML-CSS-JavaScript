class Store {
  constructor(dispatcher) {
    this.state = {}; // Estado inicial del store
    this.listeners = new Map(); // Manejadores de cambio de estado
    this.lastListenerID = 0;

    // Registra el store con el dispatcher para manejar acciones
    dispatcher.register(this.handleAction.bind(this));
  }

  /**
   * Maneja las acciones despachadas y actualiza el estado según sea necesario.
   * @param {object} action
   */
  handleAction(action) {
    switch (action.type) {
      case "SET_STATE":
        this.setState(action.payload);
        break;

      case "RESET_STATE":
        this.resetState();
        break;

      default:
        console.warn(`Unhandled action type: ${action.type}`);
    }
  }

  /**
   * Actualiza el estado del store y notifica a los listeners.
   * @param {object} newState
   */
  setState(newState) {
    this.state = { ...this.state, ...newState }; // Merge del estado anterior y el nuevo
    this.emitChange();
  }

  /**
   * Restaura el estado inicial.
   */
  resetState() {
    this.state = {};
    this.emitChange();
  }

  /**
   * Registra un listener que será notificado en cambios de estado.
   * @param {function} callback
   * @returns {number} ID del listener registrado.
   */
  addChangeListener(callback) {
    const id = this.lastListenerID++;
    this.listeners.set(id, callback);
    return id;
  }

  /**
   * Desregistra un listener usando su ID.
   * @param {number} id
   */
  removeChangeListener(id) {
    if (this.listeners.has(id)) {
      this.listeners.delete(id);
    } else {
      throw new Error(`No listener found with id: ${id}`);
    }
  }

  /**
   * Notifica a todos los listeners registrados.
   */
  emitChange() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  /**
   * Devuelve el estado actual del store.
   * @returns {object} Estado actual.
   */
  getState() {
    return this.state;
  }
}

/**
 * 
import React, { useState, useEffect } from "react";

const MyComponent = () => {
  // Usa el estado local del componente para reflejar el estado del store
  const [state, setState] = useState(store.getState());

  // Sincroniza el componente con los cambios del store
  useEffect(() => {
    // Listener para actualizaciones del store
    const listenerID = store.addChangeListener((newState) => {
      setState(newState); // Actualiza el estado local cuando cambie el store
    });

    // Limpia el listener cuando el componente se desmonta
    return () => {
      store.removeChangeListener(listenerID);
    };
  }, []); // [] asegura que esto se ejecute solo una vez

  // Métodos para despachar acciones
  const updateState = () => {
    dispatcher.dispatch({
      type: "SET_STATE",
      payload: { message: "Hello, world!", count: (state.count || 0) + 1 },
    });
  };

  const resetState = () => {
    dispatcher.dispatch({ type: "RESET_STATE" });
  };

  return (
    <div>
      <h1>Estado del Store</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={updateState}>Actualizar Estado</button>
      <button onClick={resetState}>Resetear Estado</button>
    </div>
  );
};

export default MyComponent;

 */
