# InsuranceApp

Bu proje, bir sigorta yönetim sistemi uygulamasının hem **React frontend** hem de **ASP.NET Core Web API backend** bileşenlerini içeren tam yığınlı (full-stack) bir uygulamadır.

---

## 📁 Proje Yapısı

```
InsuranceApp/
├── frontend/     → React tabanlı kullanıcı arayüzü
├── backend/      → ASP.NET Core Web API (.NET 6+)
└── .gitignore    → Gereksiz dosyaları dışlamak için
```

---

## 🚀 Kurulum ve Çalıştırma

### 🧰 Gereksinimler

- [.NET SDK 6 veya üzeri](https://dotnet.microsoft.com/en-us/download)
- [Node.js (npm dahil)](https://nodejs.org/)
- (Opsiyonel) Visual Studio 2022 veya Visual Studio Code

---

### 🔧 Backend (ASP.NET Core) Kurulumu

```bash
cd backend/ICMS_Backend
dotnet restore
dotnet build
dotnet run
```

> Uygulama genellikle şu adreslerde çalışır:  
> `https://localhost:5001` veya `http://localhost:5000`

---

### 🎨 Frontend (React) Kurulumu

```bash
cd frontend
npm install
npm start
```

> Uygulama genellikle `http://localhost:3000` adresinde açılır.

---

## 🔌 API ve Frontend Entegrasyonu

Frontend projen `fetch` veya `axios` gibi istekleri backend’e gönderirken:
- API isteklerini `http://localhost:5000/api/...` gibi backend adresine yönlendirmelisin.
- Geliştirme ortamında CORS ayarlarını backend tarafında uygun şekilde yapılandırmalısın.

---

## 🛠️ Diğer Notlar

- EF Core ile veritabanı otomatik oluşturulur. `dotnet ef migrations` komutları kullanılabilir.
- Git ile takip edilmeyen dosyalar `.gitignore` dosyasında tanımlanmıştır.
- `appsettings.Development.json` gibi ortam dosyaları `.gitignore` ile dışlanmıştır.

---

## 👤 Geliştiren

Kaan M.  
GitHub: [github.com/KULLANICI_ADIN](https://github.com/KULLANICI_ADIN)
