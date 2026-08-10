# Pokémon Kartenalbum

PWA für die Sets Karmesin & Purpur – Schwarze Blitze und Weiße Flammen.

## Funktionen

- Albumansicht und Checkliste nach Kartennummer
- Suche und Filter nach Set sowie Besitzstatus
- Besitzstand wird lokal gespeichert (IndexedDB mit LocalStorage-Fallback)
- Export und Import des Besitzstands als JSON
- PWA für den iPhone-Home-Bildschirm
- Offline-Modus: Kartendaten, Beschreibungen und kleine Kartenbilder können vollständig lokal gespeichert werden
- Hochauflösende Bilder werden beim Öffnen automatisch nachgeladen und zwischengespeichert

## Lokal testen

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Die PWA-/Service-Worker-Funktionen benötigen HTTPS und sind daher vollständig erst über GitHub Pages aktiv.

## GitHub Pages

Das Repository kann direkt aus dem Root-Verzeichnis über GitHub Pages veröffentlicht werden.
