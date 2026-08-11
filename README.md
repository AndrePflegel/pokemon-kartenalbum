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


## Version 5

Neue Ansicht **Karten finden**: zeigt automatisch fehlende Karten und öffnet vorbereitete Suchen bei eBay und Cardmarket. Sobald eine Karte als vorhanden markiert wird, verschwindet sie aus dieser Ansicht.


## Version 6
Extras: SVP 208–212 sowie die acht Holo-Basisenergien SVE 017–024. Eigener Fortschritt, eigener Besitzstatus und Marktplatzsuche.


## Version 7

- Deutsche Extras bleiben getrennt vom Hauptset.
- Extras verwenden mehrere Bildquellen mit automatischem Fallback statt fest angenommener Einzel-URL.
- SVP 208–212 und SVE 017–024 lassen sich antippen und groß ansehen; verfügbare TCGdex-Details werden nachgeladen.
- Deutsche Produktvarianten erscheinen platzsparend direkt in der Detailansicht ihrer Set-Karte: Serpifeu Poster-Holo, Floink Poster-Holo, Ottaro Poster-Holo und Victini Premium-Pokéball.
- Internationale, regionale und Turnier-Stempelvarianten werden bewusst nicht in den deutschen Fortschritt gemischt.
