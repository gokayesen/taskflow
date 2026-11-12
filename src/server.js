// Sunucuyu başlatan dosya
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`TaskFlow API http://localhost:${PORT} adresinde çalışıyor`);
});
