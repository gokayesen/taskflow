# TaskFlow — Görev Yönetim REST API

TaskFlow, bir yazılım şirketinin ekip içindeki görevleri takip edebilmesi için geliştirilmiş basit bir **Görev Yönetim REST API**'sidir. Görevler oluşturulabilir, çalışanlara atanabilir, durumları ve öncelikleri takip edilebilir. Bu proje bir Node.js backend eğitiminin bitirme/pratik projesidir; arayüz (frontend) içermez, testler Postman ile yapılır.

## Gereksinimler

- Node.js (LTS)
- npm

## Kurulum

```bash
npm install
```

## Çalıştırma

Geliştirme modunda (nodemon ile, dosya değişikliklerinde otomatik yeniden başlar):

```bash
npm run dev
```

Normal modda:

```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Veri Modeli — Görev (Task)

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | number | Otomatik artan benzersiz numara |
| `title` | string | Görev başlığı — zorunlu |
| `description` | string | Görev açıklaması (boş olabilir) |
| `status` | string | `todo` / `in-progress` / `completed` — varsayılan `todo` |
| `priority` | string | `low` / `medium` / `high` — varsayılan `medium` |
| `assignee` | string | Görevin atandığı çalışanın adı |
| `createdAt` | string | ISO tarih, oluşturulurken otomatik |
| `updatedAt` | string | ISO tarih, her güncellemede otomatik |

## Endpoint'ler

Tüm endpoint'ler `/api/tasks` altında.

| Method | Endpoint | Açıklama | Başarılı Kod |
|---|---|---|---|
| POST | `/api/tasks` | Yeni görev ekle | 201 |
| GET | `/api/tasks` | Tüm görevleri listele | 200 |
| GET | `/api/tasks/:id` | Tek görevin detayı | 200 |
| PUT | `/api/tasks/:id` | Görevi güncelle | 200 |
| DELETE | `/api/tasks/:id` | Görevi sil | 200 |

`GET /` isteği API'nin çalıştığını gösteren basit bir karşılama mesajı döndürür.

### Hata Durumları

- `title` gönderilmezse → `400` ve `{ "message": "title alanı zorunludur" }`
- Verilen id'de görev yoksa → `404` ve `{ "message": "Görev bulunamadı" }`
- Tanımsız bir route'a istek gelirse → `404` ve `{ "message": "Aradığınız sayfa bulunamadı" }`

### Örnek İstek / Cevap

**İstek:** `POST /api/tasks`

```json
{
  "title": "Login endpoint'ini yaz",
  "description": "Kullanıcı girişi için API ucu hazırlanacak",
  "priority": "high",
  "assignee": "gokay"
}
```

**Cevap (201):**

```json
{
  "message": "Görev oluşturuldu",
  "data": {
    "id": 4,
    "title": "Login endpoint'ini yaz",
    "description": "Kullanıcı girişi için API ucu hazırlanacak",
    "status": "todo",
    "priority": "high",
    "assignee": "gokay",
    "createdAt": "2026-11-12T13:46:59.887Z",
    "updatedAt": "2026-11-12T13:46:59.887Z"
  }
}
```

## Logger Middleware

Her istek, zaman damgası + method + endpoint bilgisiyle hem konsola hem de `logs/requests.log` dosyasına yazılır:

```
[2026-11-12T13:05:22.123Z] GET /api/tasks
```

## Klasör Yapısı

```
taskflow/
├── data/
│   └── tasks.json            # Görev verileri
├── logs/
│   └── requests.log          # Logger çıktısı (otomatik oluşur)
├── src/
│   ├── app.js                # Express uygulaması, middleware ve route bağlantıları
│   ├── server.js             # Sunucuyu başlatan dosya (PORT: 3000)
│   ├── routes/
│   │   └── taskRoutes.js     # /api/tasks endpoint tanımları
│   ├── controllers/
│   │   └── taskController.js # Her endpoint'in iş mantığı
│   ├── middleware/
│   │   ├── logger.js         # İstek loglama middleware'i
│   │   └── notFound.js       # Tanımsız route'lar için 404 cevabı
│   └── utils/
│       └── fileDb.js         # tasks.json okuma/yazma yardımcı fonksiyonları
├── docs/
│   ├── PROJE_TANITIM.md      # Proje tanıtım dokümanı
│   └── screenshots/          # Postman ekran görüntüleri
├── .gitignore
├── package.json
└── README.md
```

## Postman Ekran Görüntüleri

- `docs/screenshots/01-karsilama.png` — GET /
- `docs/screenshots/02-tum-gorevler.png` — GET /api/tasks
- `docs/screenshots/03-gorev-detay.png` — GET /api/tasks/:id
- `docs/screenshots/04-gorev-bulunamadi.png` — GET /api/tasks/:id (olmayan id)
- `docs/screenshots/05-gorev-ekleme.png` — POST /api/tasks (başarılı)
- `docs/screenshots/06-title-eksik-hata.png` — POST /api/tasks (title eksik)
- `docs/screenshots/07-gorev-guncelleme.png` — PUT /api/tasks/:id
- `docs/screenshots/08-guncelleme-hata.png` — PUT /api/tasks/:id (olmayan id)
- `docs/screenshots/09-gorev-silme.png` — DELETE /api/tasks/:id
- `docs/screenshots/10-route-bulunamadi.png` — tanımsız route
