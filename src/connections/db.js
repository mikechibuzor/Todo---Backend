/* eslint-disable no-useless-catch */
import model from '../model/index.js';

class DBConnection {
  constructor() {
    this.models = null;
  }

  getModels() {
    return this.models;
  }

  handleInstanceAuth(instance) {
    return instance.authenticate();
  }

  authenticateInstances(instances) {
    return instances.map(this.handleInstanceAuth);
  }

  async connect() {
    try {
      const { sequelizeInstances, models } = model();

      this.models = models;

      const authInstances = this.authenticateInstances(sequelizeInstances);

      await Promise.all(authInstances);
    } catch (error) {
      process.exit(1);
    }
  }
}

export default new DBConnection();
