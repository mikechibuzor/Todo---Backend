import Application from "./app.js";

// initiate an express instance
const expressApp = new Application();

// start the application
export default expressApp.getServer();
