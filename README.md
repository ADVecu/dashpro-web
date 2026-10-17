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

## Developer mode and palette

- **Developer mode** (Ajustes › Avanzado) shows the memory card, the DFU button and the Consola tab. It is off by default and remembered per browser.
- **Palette:** yellow by default. Type `TEMA ROJO` or `TEMA AMARILLO` in the console to switch; the app handles it and does not send it to the dash.

Fonts: Barlow and Chakra Petch (SIL Open Font License, see `fonts/`).
