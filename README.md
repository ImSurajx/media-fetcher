# 📥 MediaFetcher

**MediaFetcher** is a full-stack media downloader that transforms the power of `yt-dlp` into a clean and beginner-friendly web interface.  
Download videos or audio from YouTube, Instagram, Reddit, Pinterest, TikTok, and many more **without touching the terminal**.

The project includes a modern frontend, a modular Node.js backend, and one-click launch scripts for Windows, macOS, Linux, and Android.

---

## ✨ Overview

Most users find `yt-dlp` powerful but complex because it requires command-line usage.  
**MediaFetcher hides all complexity behind a simple UI**, enabling anyone to paste a link and download the media instantly.

This project is designed to be:

- User-friendly  
- Beginner-friendly  
- Developer-friendly  
- Extendable & open source  

MediaFetcher is ideal for people who want command-line power with a graphical interface.

---

## 🔧 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |
| **Media Engine** | ![yt-dlp](https://img.shields.io/badge/yt--dlp-FF0000?style=for-the-badge&logo=youtube&logoColor=white) |
| **Scripts** | ![Windows BAT](https://img.shields.io/badge/Windows%20BAT-0078D6?style=for-the-badge&logo=windows&logoColor=white) ![Shell Script](https://img.shields.io/badge/Shell%20Script-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white) |

---

## 🎯 Key Features

### ✔ Paste Link → Choose Format → Download  
Ultra-simple workflow designed for non-technical users.

### ✔ Video & Audio Downloads  
Supports MP4, WEBM, MKV, MP3, M4A, WAV, and more.

### ✔ Works Across Multiple Platforms  
yt-dlp enables downloads from over **1000+ websites**.

### ✔ One-Click Start (No Terminal)  
Windows `.bat` and macOS/Linux `.sh` scripts included.

### ✔ Responsive UI  
Built with SCSS and modern layout techniques.

### ✔ Temporary File Safety  
Backend deletes temp files automatically after download.

### ✔ Modular Architecture  
Backend is split into **Routes → Controllers → Services → Utils**.

---

## 🧠 Why This Project Stands Out

### 🧱 Proper Full-Stack Structure  
Clean separation of concerns makes this repo perfect for learning and real-world use.

### 🪶 Lightweight & Fast  
Uses yt-dlp directly — no heavy dependencies.

### 🎨 Customizable UI  
SCSS partials make theming and layout updates very easy.

### 🔄 Future Ready  
Planned upgrades include:
- Electron desktop app  
- Browser extension version  
- Batch link downloader  
- Multi-platform engine integration  

---

## 📦 Installation (Developer Mode)

Follow these steps if you want to run MediaFetcher locally with Node.js.

---

### 1️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 2️⃣ Install Frontend Dependencies (only if using SCSS)

```bash
cd frontend
npm install
```

---

### 3️⃣ Start Backend Server

```bash
cd backend
npm start
```

Access the backend API at:

```
http://localhost:5000
```

---

### 4️⃣ Start Frontend

Just open:

```
frontend/public/index.html
```

in any web browser.

---

## 🖱 One-Click Start (Easy Mode)

### ▶ Windows  
```
scripts/run.bat
```

### ▶ macOS / Linux  
```
sh scripts/run.sh
```

These scripts automatically start the backend and open the UI, so users **don’t need Node knowledge at all.**

---

## ⚠ Important Notes on Hosting

MediaFetcher uses yt-dlp, which may be blocked on public hosting services due to:

- Lack of ffmpeg support  
- Host restrictions on subprocess execution  
- CORS blocking  
- Port limitations  
- Network firewalls  
- HTTPS–HTTP conflicts  

**Recommended:**  
Run on your **local machine** for best stability and full yt-dlp compatibility.

---

# 📘 Contributing

We welcome contributions from developers of all levels.

---

## 🚀 How to Contribute

1. **Fork** the repository  
2. **Clone** your fork  
   ```bash
   git clone https://github.com/<your-username>/MediaFetcher.git
   ```
3. Create a new branch  
   ```bash
   git checkout -b feature/<feature-name>
   ```
4. Make updates in:
   - `backend/` for logic  
   - `frontend/` for UI  
   - `scripts/` for automation  
5. Commit your work  
   ```bash
   git commit -m "feat: added new download option"
   ```
6. Push your branch  
   ```bash
   git push origin feature/<feature-name>
   ```
7. Open a **Pull Request** and describe your changes.

---

## ✔ Code Guidelines

- Keep backend clean and modular  
- Avoid inline JS or CSS  
- Test everything before making a PR  
- Do not include large binaries in the repo  
- Ensure all downloads go through the service layer  

---

## 📈 Project Goals

- Improve full-stack skills through real-world problems  
- Learn backend workflows, error handling, and process management  
- Explore multimedia processing using yt-dlp  
- Support more platforms and formats  
- Create a desktop version using Electron  

---

## 👤 Author

**Suraj Kumar**  
BCA Student at IGNOU • Full-Stack Developer • DSA Enthusiast  

- 📧 Email: **surajxcode@gmail.com**  
- 🐦 X/Twitter: [@ItSurajxD](https://twitter.com/ItSurajxD)  
- 💼 LinkedIn: [@ItSurajx](https://linkedin.com/in/itsurajx)  
- 🐙 GitHub: [@ImSurajx](https://github.com/imsurajx)  

---

## 📜 License

This project is licensed under the **MIT License**.  
You may use, modify, and distribute this software for personal, educational, or commercial purposes — with attribution.

---

> _“Command-line power, without the command line.”_  
> **MediaFetcher is built for everyone.**

Happy downloading! 🚀✨