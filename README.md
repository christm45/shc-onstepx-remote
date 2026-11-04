# SHC OnStepX — TFT touch hand controller for OnStepX (main)

Live page (3D model with the real firmware running, test bench, user guide, wiring, pictures, files):
**https://christm45.github.io/shc-onstepx-remote/**

Wireless 3.5″ touch hand controller (ESP32 DevKit, lcdwiki MSP3520 ILI9488 + XPT2046, NEO-M8N GPS,
KY-023 joystick, 18650) talking LX200 over Wi-Fi to an **OnStepX** controller (main branch, 10.29c).

| Folder | Content |
|---|---|
| `downloads/pcb_smd_revC/` | HC-TFT rev. C: Gerber zip, JLCPCB BOM and CPL (Bottom-side assembly, 51 parts), hand-solder list |
| `downloads/pcb_tht_revB/` | HC-TFT-T rev. B (through-hole): Gerber zip, optional JLCPCB BOM/CPL |
| `downloads/stl/` | Enclosure parts to print (3.5″ display); `tht/` for the through-hole board |
| `downloads/SHOPPING_LIST*.md` | Parts to buy |
| `img/` | Annotated board renders (what plugs where), PCB renders, STL renders |

Before plugging the display: **bridge jumper J1 of the MSP3520** (the board feeds it 3.3 V).
No emergency-stop button: STOP held 1 s on the screen.
