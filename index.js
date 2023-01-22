const http = require("http");
const url = require("url");
const fs = require("fs");

const hostname = "localhost";
const port = 8080;

let page404;
fs.readFile("./404.html", (err, data) => {
  page404 = data;
});

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = q.pathname === "/" ? `./index.html` : `.${q.pathname}.html`;

  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(page404);
      return res.end();
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
