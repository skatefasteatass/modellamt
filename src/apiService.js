import axios from "axios";

class ApiService {
  static url = import.meta.env.VITE_SERVER_URL;
  /**
   * POST Request to start the game and initialize the gamestate
   *
   * @Param {string} scenarioName The name of the chosen scenarion ("easy", "medium" or "hard")
   */
  static startGame(scenarioName) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.url}/init`, null, {
          params: {
            scenario: scenarioName,
          },
          withCredentials: true,
        })
        .catch((e) => {
          reject(e);
        })
        .then((res) => {
          if (res.data == null) {
            reject("scenario not found.");
          }
          resolve(res.data);
        });
    });
  }
  static postRessource(ressourceId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.url}/ressource`, null, {
          params: {
            resId: ressourceId,
          },
          withCredentials: true,
        })
        .catch((e) => reject(e))
        .then((res) => {
          if (res.status == 200) {
            // @TODO only resolve newBudget
            resolve(res.data);
          } else {
            reject(res.status);
          }
        });
    });
  }
}

export default ApiService;
