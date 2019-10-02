const http = require("http");
const url = require("url");
const fs = require("fs");

const { get } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  // use url.parse to seperate url to pathname and search
  if (request.url === "/favicon.ico") {
    response.writeHead(404);
    return response.end();
  }
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }

  try {
    const path = request.url.slice(1);
    const { pathname } = url.parse(path);

    const secret = get("helloWorld", pathname);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(8080, () => {
  console.log("Server listens on http://localhost:8080");
});
