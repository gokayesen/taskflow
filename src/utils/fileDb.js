// tasks.json dosyasını okuma/yazma işlemlerini yöneten yardımcı fonksiyonlar
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../data/tasks.json");

// Görevleri dosyadan okuyup diziye çevirir
function readTasks() {
  const content = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(content);
}

// Görev dizisini dosyaya yazar
function writeTasks(tasks) {
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };
