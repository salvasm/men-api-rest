import 'module-alias/register';
import App from '@api/server';
import config from '@config/global';
const port = config.server.port || 3000;
const version = config.api.version || 1;

// Start server
const app = new App(port, version);
 
app.listen();
