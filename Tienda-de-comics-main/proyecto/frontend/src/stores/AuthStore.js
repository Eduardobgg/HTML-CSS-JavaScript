import dispatcher from "../dispatcher/Dispatcher";
class AuthStore {
  constructor(dispatcher) {
    this.state = {
      isLoggedIn: localStorage.getItem("token") ?? false,
      username: localStorage.getItem("username") ?? "",
    };
    this.listeners = new Map();
    this.lastListenerID = 0;

    dispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    switch (action.type) {
      case "LOGIN":
        this.handleLogin(action.username, action.token);
        break;
      case "LOGOUT":
        this.handleLogout();
        break;
      default:
        console.warn(`Unhandled action type: ${action.type}`);
    }
  }

  handleLogin(username, token) {
    this.state = { isLoggedIn: true, username: username };
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    this.emitChange();
  }

  handleLogout() {
    this.state = { isLoggedIn: false, username: "" };
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.emitChange();
  }

  addChangeListener(callback) {
    const id = this.lastListenerID++;
    this.listeners.set(id, callback);
    return id;
  }

  removeChangeListener(id) {
    if (this.listeners.has(id)) {
      this.listeners.delete(id);
    } else {
      throw new Error(`No listener found with id: ${id}`);
    }
  }

  emitChange() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }
}

const authStore = new AuthStore(dispatcher);
export default authStore;
