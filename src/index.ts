import App from './api/server';
import config from './config/global';
const port = config.server.port || 3000;

// Start server
const app = new App(port);
 
app.listen();
