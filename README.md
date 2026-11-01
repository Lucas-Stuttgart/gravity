# Gravity 777

Eine statische, responsive Website mit Bootstrap 5.3.8, dunklem Gravity-Linienfeld und einer kleinen Frage. Kein Build, kein npm und kein Server erforderlich.

## Auf GitHub Pages veröffentlichen

1. Ein neues öffentliches GitHub-Repository erstellen (z. B. `kleine-frage`).
2. Das ZIP entpacken. `index.html`, `style.css`, `app.js` und optional diese README direkt in die oberste Ebene des Repositorys hochladen – nicht das ZIP selbst oder einen übergeordneten Ordner.
3. Die Dateien im Branch `main` committen.
4. Im Repository **Settings → Pages** öffnen.
5. Unter **Build and deployment → Source** die Option **Deploy from a branch** wählen.
6. Branch **main**, Ordner **/(root)** auswählen und **Save** anklicken.
7. Nach der Bereitstellung zeigt GitHub dort die Website-URL an. Diese URL und den Code `777` kannst du weitergeben.

Offizielle Anleitung: https://docs.github.com/de/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Bedienung

- Code `777` eingeben und Enter oder den Pfeil im Eingabefeld drücken.
- Der Nein-Button weicht bei Maus/Touch höchstens dreimal aus. Danach bleibt er anklickbar.
- Drei Nachfragen, dann ein freundliches „Schade …“.
- „Direkt bei Nein bleiben“ beendet die Nachfrage jederzeit.
- Ja zeigt Konfetti und „Du kannst die Bilder nun senden“.
- Tastaturbedienung und die Systemeinstellung für reduzierte Bewegung werden berücksichtigt.

## Anpassen

In `app.js` steht am Anfang das Objekt `experiences`. Weitere Codes können dort eigene Fragen bekommen, zum Beispiel:

```js
const experiences = {
  '777': { question: 'Schickst du mir', highlight: 'Fußbilder?' },
  '888': { question: 'Hast du Lust auf', highlight: 'einen Kaffee?' }
};
```

Die Nachfragen findest du in `followups`, die Abschlussmeldungen in `finish()`. Farben und Animationen stehen in `style.css`.

## Technische Hinweise

Der Zugangscode ist ein spielerischer Einstieg, kein echter Passwortschutz: HTML und JavaScript sind auf einer statischen Website öffentlich einsehbar. Es werden keine Antworten gespeichert, keine Nachrichten versendet und keine Bilder hochgeladen. Bilder werden separat im eigenen Chat verschickt.

Bootstrap wird über jsDelivr geladen und benötigt eine Internetverbindung. Die grundlegenden eigenen Styles funktionieren auch bei nicht verfügbarem CDN. Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/

Validierung: JavaScript-Syntax sowie Codeprüfung, Ja-Abschluss und vollständige Nein-Abfolge wurden mit einem DOM-Test geprüft. Eine visuelle Browserprüfung war in der Erstellungsumgebung nicht verfügbar.
