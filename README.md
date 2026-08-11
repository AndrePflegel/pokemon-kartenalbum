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


## Version 8

- Extras lassen sich durch Antippen von Bild oder Kartentext in derselben großen Zoomansicht wie reguläre Karten öffnen.
- Deutsche Sondervarianten unter einer Setkarte lassen sich ebenfalls antippen und groß anzeigen.
- Besitzstatus bleibt für Hauptkarte, Extra und Variante jeweils getrennt gespeichert.


## Version 9

- Marktansicht für **alle** Hauptkarten, deutschen Extras und deutschen Sondervarianten.
- Marktfilter Alle / Fehlen / Gesammelt.
- Cardmarket-Suche verwendet Kartenname + Setcode (BLK/WHT) + Nummer.
- eBay verwendet bewusst kürzere Suchtexte; zusätzlich kann der eBay-Suchtext kopiert werden, falls die iPhone-eBay-App eine Websuche nicht korrekt übernimmt.
- Marktlinks stehen auch in der großen Kartenansicht.


## Version 10

Die App ist jetzt ein allgemeines Pokémon-Kartenalbum:
- Der Button **Sets** öffnet einen dynamischen Katalog der deutschen TCGdex-Sets.
- **Schwarze Blitze & Weiße Flammen** bleibt als besondere gemeinsame Kollektion mit Extras und Varianten erhalten.
- Einzelne andere Sets können direkt geöffnet und gesammelt werden.
- Besitzstände sind global und bleiben beim Wechsel zwischen Sets erhalten.
- Karten und Bilder werden weiterhin erst für die gewählte Kollektion geladen.
- Offline-Speicherung gilt jeweils für die aktuell geöffnete Kollektion.
- Neue Sets können im Katalog erscheinen, ohne dass die App für jedes Set neu programmiert werden muss.


## Version 11

Performance-Update für iPhone/iPad:
- Album rendert zunächst nur 48 Karten.
- Weitere Karten werden beim Scrollen in kleinen Blöcken nachgeladen.
- `content-visibility` und Layout-Containment reduzieren Safari-Arbeitsspeicher und Layoutlast.
- Kartenbilder bleiben `lazy`, werden asynchron dekodiert und mit niedriger Ladepriorität behandelt.
- Schnelles Scrollen durch große Sets soll dadurch deutlich stabiler bleiben.
- Besitzstand, Offline-Daten und Set-Auswahl bleiben erhalten.
