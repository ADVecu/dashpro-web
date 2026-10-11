# DashPRO Config (prototype)

Browser app to connect to the DashPRO over USB.

- Connects to the dash's serial port with Web Serial and shows product, firmware version and serial number (`ID?`).
- Shows memory diagnostics (`MEM?`).
- Console to send text commands.
- Lists and copies files to the dash's SD card (the SD appears as a USB drive; the app uses the browser's folder access).

## Run

Web Serial needs Chrome or Edge and a secure context, so serve the folder from localhost:

```
python -m http.server 8000 -d WebApp
```

Then open `http://localhost:8000` in Chrome or Edge, plug in the dash and click **Conectar**.

Close other programs that have the dash's COM port open first; only one program can use it at a time.
