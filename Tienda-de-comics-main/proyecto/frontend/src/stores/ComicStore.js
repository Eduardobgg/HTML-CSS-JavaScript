import dispatcher from "../dispatcher/Dispatcher";
import axios from "axios";
class ComicStore {
  constructor(dispatcher) {
    this.listeners = new Map();
    this.lastListenerID = 0;

    dispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    switch (action.type) {
      case "SELL_COMIC":
        this.handleSellComic(action.comic);
        break;
      default:
        console.warn(`Unhandled action type: ${action.type}`);
    }
  }

  async handleSellComic(comic) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/productos/crear/",
        comic,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status !== 201) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      this.emitChange();
    } catch (err) {
      console.error(err);
    }
  }

  async fetchComics() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/productos/disponibles"
      );
      if (response.status !== 200) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
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
}

const comicStore = new ComicStore(dispatcher);
export default comicStore;
