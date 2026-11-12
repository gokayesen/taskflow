// Tanımsız route'lara gelen istekler için 404 cevabı döner
function notFound(req, res) {
  res.status(404).json({ message: "Aradığınız sayfa bulunamadı" });
}

module.exports = notFound;
