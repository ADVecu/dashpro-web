# DashPRO Config

Browser app to connect to the DashPRO over USB (Web Serial + SD drive access).

## Run locally

```
python -m http.server 8000
```

Then open `http://localhost:8000` in Chrome or Edge, plug in the dash and click **Conectar**.

Close other programs that have the dash's COM port open first; only one program can use it at a time.

## Install

Open https://advecu.github.io/dashpro-web/ in Chrome or Edge and click **Instalar app** (or the install icon in the address bar). The installed app works offline and updates itself when online.

When releasing, bump `CACHE_VERSION` in `sw.js` so installed copies pick up the new files.

## Ajustes

The Ajustes tab follows the dash's own settings screens: RPM y cambio, Alertas, Pantalla, Unidades and ECU y luces, with the same steps, limits and zone colors. It is built from `CFG LIST?`, so a setting the firmware does not have is not shown, and a setting the page does not know yet appears under "Otros". Changes go to the dash right away; **Guardar en el dash** stores them. The Alertas section turns the live stream on to show the current reading on each bar.

## En vivo

The En vivo tab follows the dash's Live Data screen: one big chart with up to four signals, each on its own scale (RPMs, TPS, MAP and AFR by default), and below it a box per reading with its value, its trend, its min and max in the window, and the alert zone from Ajustes. Tap a box to put it on the chart or take it off; the choice and the window (10 s, 30 s, 1 min) are remembered per browser. Tap a chart to pause and read the values at any moment of the window. Readings use the units picked in Ajustes.

## Firmware

The Firmware tab lists the published firmware versions with what changed in each, newest first. **Usar X** downloads that package, checks it like a file opened from the PC and leaves it ready for **Actualizar firmware**. A `.dashfw` from the PC can still be opened by hand.

The firmware repo is private, so the page cannot read its GitHub Releases: each release is published here too, in `firmware/`:

1. Copy the release's `.dashfw` to `firmware/` (e.g. `firmware/dashpro_1.2.0.dashfw`).
2. Add an entry to `firmware/versions.json`: `version`, `date` (`AAAA-MM-DD`), `file`, `size` in bytes (for the download text), a one-line `summary` and `changes` with `Nuevo`, `Cambiado` and `Corregido` lists in plain words for the user (`code` in backticks is allowed). The order in the file does not matter; the page sorts by version.

An entry without `file` shows its changes and says the package is not published yet. Versions with `-beta` or `-rc` are marked *Prueba*. The service worker never caches `firmware/`, so a new version shows up without bumping `CACHE_VERSION`.

## Developer mode and palette

- **Developer mode** (Ajustes › Avanzado) shows the memory card, the DFU button and the Consola tab. It is off by default and remembered per browser.
- **Palette:** yellow by default. Type `TEMA ROJO` or `TEMA AMARILLO` in the console to switch; the app handles it and does not send it to the dash.

Fonts: Barlow and Chakra Petch (SIL Open Font License, see `fonts/`).
