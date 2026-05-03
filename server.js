const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  if (request.url === "/styles.css") {
    fs.readFile("public/styles.css", (error, file) => {
      if (error) {
        response.writeHead(404);
        response.end("CSS not found");
        return;
      }

      response.writeHead(200, { "Content-Type": "text/css" });
      response.end(file);
    });

    return;
  }

  if (request.url === "/app.js") {
  fs.readFile("public/app.js", (error, file) => {
    if (error) {
      response.writeHead(404);
      response.end("JS not found");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.end(file);
  });

  return;
}


  fs.readFile("public/index.html", (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Could not load the page");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
});

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
