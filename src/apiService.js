import axios from "axios";

const proxy = {
  protocol: "http",
  host: "localhost",
  port: 5173,
};

class ApiService {
  static url = import.meta.env.VITE_SERVER_URL;

  static proxy = proxy;
  /**
   * POST Request to start the game and initialize the gamestate
   *
   * @Param {string} scenarioName The name of the chosen scenarion ("easy", "medium" or "hard")
   */
  static initGame(scenarioName) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.url}/init`, null, {
          proxy: this.proxy,
          params: {
            scenario: scenarioName,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data == null) {
            reject("scenario not found.");
          }
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  static postRessource(ressourceId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.url}/ressource`, null, {
          proxy: this.proxy,
          params: {
            resId: ressourceId,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200) {
            // @TODO only resolve newBudget
            resolve(res.data);
          } else if (res.status == 240) {
            reject({ code: 4, msg: "Ressource not expandable." });
          } else if (res.status == 250) {
            reject({ code: 5, msg: "Not enough budget." });
          } else {
            reject(0);
          }
        })
        .catch((e) => {
          reject({ code: 0, msg: e.response.data });
        });
    });
  }
  static deleteRessource(ressourceId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.url}/ressource`, {
          proxy: this.proxy,
          params: {
            resId: ressourceId,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200) {
            // @TODO only resolve newBudget
            resolve(res.data);
          } else if (res.status == 240) {
            reject({ code: 4, msg: "Ressource not existing." });
          } else {
            reject(0);
          }
        })
        .catch((e) => {
          reject({ code: 0, msg: e.response.data });
        });
    });
  }
  static getAllScenarios() {
    return getInfo(`${this.url}/scenarios`, null);
  }
  static getRessource(ressourceId) {
    return getInfo(`${this.url}/ressource`, { resId: ressourceId });
  }
  static getScenario(scnearioName) {
    return getInfo(`${this.url}/scenario`, { scenario: scnearioName });
  }
  static getGameState() {
    return getInfo(`${this.url}/gamestate`, null);
  }
  static deleteGameState() {
    return getInfo(`${this.url}/gamestate`, null);
  }
}

function getInfo(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        proxy: proxy,
        params: param,
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res.status);
        }
      })
      .catch((e) => {
        reject(e.response);
      });
  });
}

export default ApiService;
