// Express uygulamasının kurulduğu dosya: middleware ve route bağlantıları burada yapılır
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");

const app = express();

// Tüm route'lardan önce çalışan istek loglayıcı
app.use(logger);

// Gelen JSON gövdelerini okuyabilmek için
app.use(express.json());

// API'nin çalıştığını gösteren basit karşılama mesajı
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API çalışıyor" });
});

// Görev endpoint'leri
app.use("/api/tasks", taskRoutes);

// Tanımsız route'lar için 404 cevabı
app.use(notFound);

module.exports = app;
