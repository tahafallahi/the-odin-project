const { createServer } = require("node:http");
const { readFile } = require("node:fs");

function router(req, res) {
  let payload;
  switch (req.url) {
    case "/":
      readFile("./index.html", (err, data) => {
        if (err) {
          payload = err;
        } else {
          payload = data.toString();
        }
        res.writeHead(200);
        res.end(payload.toString());
      });
      break;
    case "/about":
      readFile("./about.html", (err, data) => {
        if (err) {
          payload = err;
        } else {
          payload = data.toString();
        }
        res.writeHead(200);
        res.end(payload.toString());
      });
      break;
    case "/contact-me":
      readFile("./contact-me.html", (err, data) => {
        if (err) {
          payload = err;
        } else {
          payload = data.toString();
        }
        res.writeHead(200);
        res.end(payload.toString());
      });
      break;

    default:
      readFile("./404.html", (err, data) => {
        if (err) {
          payload = err;
        } else {
          payload = data.toString();
        }
        res.writeHead(200);
        res.end(payload.toString());
      });
      break;
  }
}

const server = createServer(router);
server.listen(8080);
