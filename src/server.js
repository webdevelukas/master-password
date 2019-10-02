const http = require("http");
const url = require("url");
const fs = require("fs");

const { get, set } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  const { pathname } = url.parse(request.url);

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
    const path = pathname.slice(1);

    if (request.method === "GET") {
      const secret = get("helloWorld", path);
      response.end(secret);
    } else if (request.method === "POST") {
      let body = "";
      request.on("data", function(data) {
        body += data;
        console.log("Partial body: " + body);
      });
      request.on("end", function() {
        console.log("Body: " + body);
        set("helloWorld", path, body);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("post received");
      });
    }
  } catch (error) {
    response.end("Can not read secret");
  }
});

server.listen(8080, () => {
  console.log("Server listens on http://localhost:8080");
});
