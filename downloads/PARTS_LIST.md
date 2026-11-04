# Parts list — SHC-OnStepX hand controller (3.5″, HC-TFT rev. C)

Everything to build one hand controller for **OnStepX (main)**. Prices are indicative (surveyed in 2026),
shipping not included. Live page: https://christm45.github.io/shc-onstepx-remote/

## 1. Carrier board — JLCPCB

**SMD board HC-TFT rev. C** (recommended): 72 × 90 mm, 2 layers, 1.6 mm, matte black mask, white silkscreen, ENIG;
PCB assembly **Bottom side only**, 51 parts (25 BOM lines, LCSC codes included).

| JLCPCB field | File (folder `pcb_smd_revC/`) |
|---|---|
| Gerber | `HC-TFT_gerbers.zip` (upload as is) |
| BOM | `HC-TFT_JLCPCB_BOM.csv` — Comment, Designator, Footprint, LCSC Part # |
| CPL | `HC-TFT_JLCPCB_CPL.csv` — Designator, Mid X, Mid Y, Layer, Rotation |

In the placement preview, check the orientation of C7 (+), D1 / D3 / D6 (cathode), D5, pin 1 of U3, U4, U5, Q5,
and J1 flush with the top edge. JLCPCB adds two 5 mm rails (quoted 82 × 90): they snap off.

**Through-hole alternative HC-TFT-T rev. B** (`pcb_tht_revB/`): order the bare board with the Gerber zip and solder
everything yourself (its own BOM/CPL exist if you want JLCPCB to do it). Its buzzer (PUI AT-1224) is rated 2.4 kHz:
set `BEEP_FREQUENCY_HZ 2400` in `Config.h`.

## 2. Modules

| Part | Qty | Requirements | Where | ≈ Price |
|---|---|---|---|---|
| **3.5″ SPI TFT, ILI9488 + XPT2046 resistive touch, lcdwiki MSP3520** | 1 | 320 × 480, module 56.34 × 98 mm, holes 49.5 × 92, 14-pin header VCC GND CS RESET DC SDI SCK LED SDO T_CLK T_CS T_DIN T_DO T_IRQ. **ILI9488 only** (not ST7796/MSP3525/3526, not the MSP3521 without touch, not capacitive). **Bridge its jumper J1** (fed 3.3 V) | [Elecrow](https://www.elecrow.com/3-5-inch-480-320-spi-tft-lcd-module-with-ili9488-driver.html) (touch option) · reference [lcdwiki MSP3520](https://www.lcdwiki.com/3.5inch_SPI_Module_ILI9488_SKU:MSP3520) | $9.50 |
| **ESP32 DevKit, 38 pins, ESP32-WROOM-32** | 1 | not WROVER, S3, C3 or 30 pins. Row spacing 22.86 mm (NodeMCU-32S, most clones) → inner 3V3 row "int. NodeMCU"; 25.4 mm (Espressif DevKitC V4) → outer row "ext. DevKitC" | BerryBase, AZ-Delivery, AliExpress | 7 € |
| **u-blox NEO-M8N GPS** ("GPS module with compass", drone type), out of its round case | 1 | board **32 × 32 mm** (pocket 32.3), no fixing holes needed, ceramic patch **25 × 25 mm**, 3–5 mm thick, **≤ 9 mm overall**, 6-pin JST-GH cable leaving by the edge. Its regulator must work from 3.3 V (ME6211 / RT9193 / "662K": yes; AMS1117: no): measure ≥ 2.7 V at its output. NMEA output (baud rate found automatically, 4800–115200) | AliExpress | varies |
| **Joystick KY-023 / HW-504** | 1 | 34 × 26 × 32 mm, 3.3–5 V, pins GND +5V VRx VRy SW. The enclosure is drawn for a board 26.7 × 33.7 with Ø 2.5 holes at 20 × 26.13 centres: print `joystick_template.stl` first | AliExpress, funduinoshop | 1.30 € |
| **Power button ABILKEEN 16 mm ultra-slim** | 1 | **momentary** 1NO (not self-locking), **red LED ring, DC 3-6V** (not 12-24 V), 4 terminals. Head Ø 17.9 × 1.5, M16 × 1, 16.9 mm below the head, hex nut 21.7 across corners | [AliExpress 1005013279797542](https://fr.aliexpress.com/item/1005013279797542.html) | 2.80 € |

## 3. Power and lamp

| Part | Qty | Requirements | Where | ≈ Price |
|---|---|---|---|---|
| **18650 Li-ion cell** 3,000–3,500 mAh | 1 | 3.7 V (1S) only; bare cell preferred (the board charges and protects it); branded (Samsung, LG, Sony/Murata, Keeppower), never a "9,900 mAh" fake | Nkon, batterie-boutique.fr | 10–20 € |
| **1 × 18650 holder with wires, 74.5 mm** | 1 | 74.5 × 21.5 × 17.7 (SparkFun PRT-12899): the enclosure is drawn for it; a 76 mm holder probably does not fit | [Opencircuit](https://opencircuit.shop/product/battery-holder-1x18650-wire-leads) | 4.75 € |
| **1 W deep red LED on 20 mm star**, wires pre-soldered | 1 (lot of 5) | options **1W**, **deep red** (≈ 660 nm). Driven at a constant 170 mA by the board: no resistor. Not 3 W, not plain red 620–630 nm, never white/blue/UV | [AliExpress 1005006076131693](https://fr.aliexpress.com/item/1005006076131693.html) | 2.20 € / 5 |
| **Ø 20 mm 30° optic with its holder** | 1 | the lens alone does not hold | eBay / Amazon / AliExpress | a few € |

## 4. Parts to solder on the SMD board

| Ref. | Part | ≈ Price |
|---|---|---|
| U1, J4 | Female headers 2.54 mm, **8.5 mm high**: 1 × 19, 1 × 17 (DevKit), 1 × 14 (display) — e.g. three 1 × 20 cut to length (FREI BL 1X20G8) | 0.90 € |
| J3, J7, J8 | Right-angle male header 1 × 40, cut into 1 × 4, 1 × 3, 1 × 2 | 1.10 € |
| J2 | JST S2B-PH-K-S, right-angle (battery) | 0.15 € |
| J9 | JST B5B-XH-A, straight (joystick) — LCSC C157991 | 0.25 € |
| BZ1 | Buzzer CUI / Same Sky **CMT-8504-100-SMT-TR** (rated 4 kHz, firmware default) | 1.60 € |

## 5. Fasteners

| Part | Qty |
|---|---|
| Heat-set brass inserts M2.5, outer Ø 3.5 (not the Ø 4 ones) | 6 |
| M2.5 × 25 countersunk (DIN 965), top, through the board | 2 |
| M2.5 × 16 countersunk, bottom | 2 |
| M2.5 × 6 (DIN 912), bottom of the board | 2 |
| M3 × 6 self-tapping for plastic, cheese head Ø ≤ 5.6 (display onto the 4 pillars) | 4 |
| M2 × 8 self-tapping (joystick) | 4 |
| ST2.6 × 4 countersunk self-tapping (battery holder) | 2 |
| Cable ties 2.5 × 100 (close the battery holder) | 2 |

No standoffs: the 3.5″ display screws into the enclosure.

## 6. Wiring

| Part | For |
|---|---|
| 26 AWG silicone wire, several colours | all cables (battery wires ≈ 260 mm) |
| JST-PH 2-way housing + contacts | battery → J2 (keyed: never a Dupont on the battery) |
| JST-XH 5-way housing + contacts | joystick → J9 |
| Dupont housings 1 × 2 (J8), 1 × 3 (J7), 1 × 4 (J3), 1 × 5 (joystick side) + female contacts | lamp, GPS, power button, joystick |

| Board | Goes to |
|---|---|
| J2 1 BAT+ / 2 BAT− | 18650 holder (check polarity with a multimeter) |
| J3 1 PWR / 2 GND / 3 LED+ / 4 GND | button NO / C / ring + / ring − |
| J7 1 3V3 / 2 TX / 3 GND | GPS VCC / TXD / GND (3.3 V only; RXD, SDA, SCL unused) |
| J8 1 LED+ / 2 LED− | lamp LED red wire / black wire |
| J9 GND / 3V3 / VRX / VRY / SW | joystick GND / +5V pin (gets 3.3 V) / VRx / VRy / SW, straight cable |

## 7. 3D printing (`stl/`)

| File | Material | Note |
|---|---|---|
| `front.stl` | black PETG or ASA | front panel on the bed, supports only under the visor ceiling |
| `back_cover.stl` | black PETG or ASA | joint plane on the bed |
| `joystick_cover.stl` | PETG | |
| `foot_pad.stl` × 2 | TPU 95A | |
| `joystick_template.stl` | PETG | try the joystick holes before printing the enclosure |

Through-hole board: `stl/tht/front.stl` and `stl/tht/back_cover.stl`. Also: hot glue (GPS), cyanoacrylate,
a stylus with a hard POM tip (resistive touch).

**Total ≈ 145 € of parts** (of which ≈ 31 € of filament), board excluded.
