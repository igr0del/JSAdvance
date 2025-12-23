const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 3000;

// project/
const ROOT = path.join(__dirname, "..");

// project/scripts
const SCRIPTS = path.join(ROOT, "scripts");

// защита: если папки нет — создаём
if (!fs.existsSync(SCRIPTS)) {
  fs.mkdirSync(SCRIPTS);
}

http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // ===== список скриптов =====
  if (pathname === "/api/scripts") {
    const files = fs.readdirSync(SCRIPTS).filter(f => f.endsWith(".js"));
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(files));
    return;
  }

  // ===== выбранный скрипт =====
  if (pathname === "/script") {
    const file = query.name;
    const full = path.join(SCRIPTS, file);

    if (!fs.existsSync(full)) {
      res.statusCode = 404;
      res.end("Script not found");
      return;
    }

    res.setHeader("Content-Type", "application/javascript");
    res.end(fs.readFileSync(full));
    return;
  }

  // ===== статика =====
  let filePath;

  if (pathname === "/") {
    filePath = path.join(ROOT, "index.html");
  } else {
    filePath = path.join(ROOT, pathname);
  }

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath);
  const types = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css"
  };

  res.setHeader("Content-Type", types[ext] || "text/plain");
  res.end(fs.readFileSync(filePath));
}).listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});