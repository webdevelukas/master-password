const http = require("http");
const url = require("url");

const { get } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  // use url.parse to seperate url to pathname and search
  if (request.url === "/favicon.ico") {
    return response.end();
  }
  if (request.url === "/") {
    return response.end("Welcome to my secrets manager");
  }

  try {
    const path = request.url.slice(1);
    const parsedPath = url.parse(path);
    const pathName = parsedPath.pathname;

    const secret = get("helloWorld", pathName);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(8080);
