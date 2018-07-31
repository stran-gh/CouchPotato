const app = require('./backend/app');
const debug = require('debug')('node-angular');
const http = require('http');

// makes sure that port is a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if(isNaN(port))  {
    return val;
  }

  if(port >= 0) {
    return port;
  }

  return false;
}

// check which type of error occured and exits gracefully
const onError = error => {
  if(error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// log that we are now listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
