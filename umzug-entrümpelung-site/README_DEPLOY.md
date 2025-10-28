# Online-Vorschau & Veröffentlichung

Die Seite ist **statisch** (HTML/CSS/JS) und kann ohne Build direkt online gestellt werden.
Unten findest du vier schnelle Wege – suche dir *einen* aus.

---

## 1) Netlify Drop (am schnellsten, ohne Account)
1. Öffne https://app.netlify.com/drop
2. Ziehe den gesamten Ordner **umzug-entrümpelung-site/** per Drag & Drop ins Fenster.
3. Netlify lädt die Dateien hoch und zeigt dir sofort eine **Live-URL** an.

---

## 2) GitHub Pages
1. Lege auf GitHub ein neues Repository an, z. B. `umzug-entuempelung`.
2. Lade den Inhalt von **umzug-entrümpelung-site/** ins Repo (Dateien in die Repo-Wurzel).
3. In den Repo-Einstellungen → **Pages** → Source: **Deploy from a branch** → Branch: `main` / `/ (root)`.
4. GitHub zeigt dir die **Seiten-URL** an (z. B. `https://deinname.github.io/umzug-entuempelung/`).

---

## 3) Vercel (1-Klick)
1. Öffne https://vercel.com → New Project → Importiere dein GitHub-Repo.
2. Framework: **Other** (statisch).  
3. Root: **/** (Projektwurzel).  
4. Deploy – Vercel generiert dir sofort eine **Preview-URL** und eine **Production-URL**.

---

## 4) Klassisches Webhosting (IONOS, Strato, etc.)
1. Per FTP/SFTP in dein Hosting einloggen.
2. Lade den kompletten Ordnerinhalt nach **/public_html** oder **/htdocs**.
3. Achte darauf, dass `index.html` im **Webroot** liegt.

---

## Lokale Vorschau (optional)
- Doppelklick auf `index.html` (lokal im Browser öffnen) **oder**
- Im Ordner ein Terminal öffnen und ausführen:
  ```bash
  python3 -m http.server 8080
  ```
  Dann im Browser `http://localhost:8080` öffnen.

---

## Hinweise
- **WhatsApp-Weiterleitung:** Nach Absenden des Formulars öffnet sich WhatsApp mit den eingegebenen Daten.
- **Bilder:** Feste Unsplash-Motive sind verlinkt. Du kannst eigene Bilder in `assets/` ablegen und die `src` in `index.html` anpassen.
- **Impressum/Datenschutz:** Bitte ersetze die Demo-Inhalte durch deine echten Angaben.
