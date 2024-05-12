import express from 'express';
import http from 'http';
import cors from 'cors';
import connection from './connections/db.js';
import indexRoute from './routes/index.route.js';
import getModels from './middlewares/models.js';
// utils
import { CORSOption } from './utils/constants.js';

class Application {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  setPort() {
    this.app.set('port', 3500);
  }

  getPort() {
    return this.app.get('port');
  }

  middlewares() {
    this.app.use(getModels(connection));
    this.app.use(cors(CORSOption));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(indexRoute)
  }
  async connectToDB() {
    console.log('connecting...')
    await connection.connect();
    console.log('connected')
  }
  async start() {
    await this.connectToDB();
    this.setPort();

    this.middlewares();

    const port = this.getPort();

    this.server.listen(port, () => {
      console.log(`Listening at ${port}`);
    });
  }

  getServer() {
    this.start();
    return this.server;
  }
}

export default Application;
