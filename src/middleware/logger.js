// Her gelen isteği zaman damgası, method ve endpoint ile loglayan middleware
const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");
const logFile = path.join(logDir, "requests.log");

// logs klasörü yoksa oluştur
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function logger(req, res, next) {
  const logLine = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;

  console.log(logLine);
  fs.appendFile(logFile, logLine + "\n", (err) => {
    if (err) console.error("Log dosyasına yazılamadı:", err.message);
  });

  next();
}

module.exports = logger;
