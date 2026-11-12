# TaskFlow — Proje Tanıtım Dokümanı

## Amaç

TaskFlow, bir Node.js backend eğitiminin bitirme projesi olarak geliştirilmiş bir **Görev Yönetim REST API**'sidir. Amaç; routing, middleware, CRUD işlemleri ve JSON dosyası ile veri yönetimi konularında eğitimde öğrenilenleri uygulamalı olarak göstermektir.

## Senaryo

Küçük bir yazılım şirketinin ekip içi görevlerini takip etmesi hedeflenir. Yöneticiler görev oluşturup bir çalışana atayabilir; çalışanlar görevlerinin durumunu (`todo`, `in-progress`, `completed`) ve önceliğini (`low`, `medium`, `high`) güncelleyebilir. Sistemin bir arayüzü yoktur; tüm işlemler Postman üzerinden HTTP istekleriyle test edilir.

## Sistemin Temel Özellikleri

- Görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme (5 CRUD endpoint'i)
- Zorunlu alan kontrolü (`title`) ve bulunamayan kayıtlar için anlamlı hata mesajları
- Her isteğin zaman damgası, method ve endpoint bilgisiyle loglanması (konsol + dosya)
- Tanımsız route'lara tutarlı 404 cevabı
- Veri kalıcılığı, bir veritabanı yerine `data/tasks.json` dosyası üzerinden sağlanır

## Kullanılan Teknolojiler

- **Node.js** — çalışma ortamı
- **Express.js** — HTTP sunucusu ve routing
- **fs modülü** — `tasks.json` dosyasının okunması/yazılması
- **nodemon** — geliştirme sırasında otomatik yeniden başlatma
- **Postman** — manuel API testleri

## Veri Modeli

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | number | Otomatik artan benzersiz numara |
| `title` | string | Görev başlığı — zorunlu |
| `description` | string | Görev açıklaması |
| `status` | string | `todo` / `in-progress` / `completed` |
| `priority` | string | `low` / `medium` / `high` |
| `assignee` | string | Görevin atandığı çalışan |
| `createdAt` | string | Oluşturulma tarihi (ISO) |
| `updatedAt` | string | Son güncelleme tarihi (ISO) |

## Endpoint Listesi

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/` | API'nin çalıştığını gösteren karşılama mesajı |
| POST | `/api/tasks` | Yeni görev ekler |
| GET | `/api/tasks` | Tüm görevleri listeler |
| GET | `/api/tasks/:id` | Tek bir görevin detayını getirir |
| PUT | `/api/tasks/:id` | Mevcut bir görevi günceller |
| DELETE | `/api/tasks/:id` | Bir görevi siler |
