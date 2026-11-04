# Shopping list — SHC_OnStepX TFT hand controller (SMD board HC-TFT rev. C, 3.5″ display)

Everything to buy **on top of the HC-TFT board** for the hand controller of this variant: **3.5″ lcdwiki MSP3520
display**, 3.5″ enclosure (`print3d/enclosure_hc_tft.scad`, STLs in `print3d/stl_3.5in_tft/`),
**NEO-M8N GPS** instead of the DHT22, **no emergency stop at all**: no button, no jumper, no input (it is on the
user interface, STOP held 1 s). The SMD rev. B board was **ordered from JLCPCB on 21/09/2026** (5 assembled boards,
Bottom side, original French silkscreen); it works as is: J3-5 / J3-6 stay empty and pin 9 of the display is bent
out of J4. A new order uses **rev. C** (`../kicad/fabrication/`, 04/11/2026): no emergency-stop input, display SDO
not connected, corrected silkscreen.

Update of **04/11/2026** (hardware audit): no jumper; **bridge jumper J1 of the MSP3520** (it is fed 3.3 V);
battery holder at **74.5 mm** (the 76 mm BerryBase one probably does not fit); GPS: check its 3.3 V regulator
(the firmware now finds its baud rate by itself); DevKit: measure the row spacing.

Update of **02/11/2026** (switch to the 3.5″): MSP3520 display, GPS, display screws (4 M3 × 6
self-tapping screws into the pillars of the enclosure: **no more M3 × 11 standoffs or M3 screws on the board**), DHT22,
emergency stop, collar and yellow filament removed. The other prices come from the surveys of 15/09 and 27/09.
The screws follow the current header of `print3d/enclosure_hc_tft.scad`.

**Legend**
- **[V]** product page read, price shown that day (date given). Stock and price may have changed.
- **[E]** price only seen in a search engine snippet: **to check in the browser**.
- **[R]** no offer read: search link, choose according to the "Requirements" column.

> **Customs**: small parcels from outside the EU pay **3 € per item category** since 01/07/2026
> (snippets read, not checked against the text). Group orders, or prefer an EU seller for small lots.

## In short: the parts to use

| What | Chosen part | Where | Qty | Price |
|---|---|---|---|---|
| Display | **3.5″ SPI ILI9488 + XPT2046 resistive touch, lcdwiki MSP3520** (56.34 × 98 mm, 14 pins) — **bridge its J1** | [Elecrow](https://www.elecrow.com/3-5-inch-480-320-spi-tft-lcd-module-with-ili9488-driver.html) (touch option) · reference: [lcdwiki MSP3520](https://www.lcdwiki.com/3.5inch_SPI_Module_ILI9488_SKU:MSP3520) | 1 | ≈ $9.50 (Elecrow, teaser price) |
| ESP32 | NodeMCU-32S, 38 pins, WROOM-32 | BerryBase | 1 | 6.80 € |
| GPS | u-blox **NEO-M8N** drone module "GPS Module with compass": board **≤ 32 × 32 mm**, **≤ 9 mm** thick overall, 25 × 25 patch | AliExpress | 1 | [R] |
| Joystick | KY-023 / HW-504, **34 × 26 × 32 mm**, 3.3–5 V, pins GND +5V VRx VRy SW | funduinoshop / AliExpress | 1 | 1.29 € |
| Power on / off button (there is **no separate switch**) | **ABILKEEN 16 mm ultra-slim**, momentary 1NO, **red LED ring DC 3-6 V**, 4 terminals | [AliExpress 1005013279797542](https://fr.aliexpress.com/item/1005013279797542.html) | 1 | ≈ 2.80 € |
| Emergency stop | **nothing to buy**: STOP on the user interface (held 1 s); no button, no jumper | — | — | — |
| Battery | Keeppower 18650 3,000 mAh protected (a **bare** 18650 3,000–3,500 mAh also suits: the board protects it) | batterie-boutique.fr | 1 | 19.99 € |
| Battery holder | 1 × 18650 with wires, **74.5 mm** long (SparkFun PRT-12899) | Opencircuit | 1 | 4.75 € |
| Lamp LED | **1 W deep red** high-power LED on a **20 mm star**, wires pre-soldered (lot of 5) | [AliExpress 1005006076131693](https://fr.aliexpress.com/item/1005006076131693.html) | 1 (+4 spare) | ≈ 2.20 € the 5 |
| Optic | 20 mm 30° lens **with holder** (lot of 10) | Amazon / eBay | 1 lot | not noted |
| Stylus | hard POM tip, Ø ≈ 5 mm (stylus rail: Ø 5.2) | AliExpress | 1 | ≈ $0.4 [E] |
| Parts to solder on the board | headers, JST, buzzer (§ 6) | Reichelt + DigiKey | — | ≈ 3.95 € |
| Screws, wiring, filament | § 3 to 5 | Marleva, Gotronic, 3DJake, AliExpress | — | ≈ 65 € |

## 1. Button, battery, lamp

| Part — requirements | Qty | To use | Other source | Status | Price | Pitfall |
|---|---|---|---|---|---|---|
| **Power on / off**: 16 mm MOMENTARY push button, NO contact, **≤ 22 mm under the front panel, terminals and wires included**, nut ≤ 22 across corners | 1 | [ABILKEEN 16 mm ultra-slim, AliExpress 1005013279797542](https://fr.aliexpress.com/item/1005013279797542.html) — options: **momentary** (not self-locking), ring **red**, **DC 3-6V** | [AliExpress 1005006775237546](https://fr.aliexpress.com/item/1005006775237546.html) (no ring, 20.8 mm) | [V] 04/11 (seller's drawing) | **≈ 2.80 €** | seller's drawing: head Ø 17.9 × 1.5, thread M16 × 1, body 13.5 + terminals 3.4 = 16.9 mm below the head → ≈ 15 mm inside + wires; **hex nut 21.7 across corners**: the front has a Ø 23 seat since 04/11/2026 (`nuts = [22]` in the `.scad`; the former Ø 21 seat was too small). 4 terminals: NO → J3-1, C → J3-2, LED + → J3-3, LED − → J3-4 (ring driven by GPIO26 through R19 150 Ω: dim on purpose, red keeps the dark adaptation). **Not** the 12-24 V ring (it would not light at 3.3 V). **Do not take** the Adafruit 559 / SparkFun with LED ring (31 mm deep) nor the DIANQI "1NO1NC" (35 mm) |
| **18650 battery** ≈ 3,000 mAh, 65–70 mm (Ø 18.6 in the `.scad`) | 1 | [batterie-boutique.fr Keeppower 3000 protected](https://batterie-boutique.fr/fr/keeppower-18650-3000mah-36v-carte-de-batterie-li-ion-de-37-v-protegee/) | [Nkon](https://www.nkon.nl/en/keeppower-18650-3000mah-protected.html) (9.75 € [E]) · [akkuteile.de](https://www.akkuteile.de/en/keeppower-r-18650-3000mah-3-6v-3-7v-li-ion-battery-pcb-protected_12032_2167) (69.0 mm, Ø 18.85) | [V] 15/09 | **19.99 €** | the board already protects the cell (DW01A + FS8205): a **bare** branded 18650 (Samsung, LG, Sony/Murata) suits and fits the holder better (`README.md`). **Not from AliExpress**: the "9,900 mAh" ones are fakes. **3.7 V (1S) only** |
| **1 × 18650 holder** with wires, **74.5** × 21.5 × 17.7 mm (the enclosure is drawn for it: `batt_holder` in the `.scad`) | 1 | [Opencircuit SparkFun PRT-12899](https://opencircuit.shop/product/battery-holder-1x18650-wire-leads) | [BerryBase](https://www.berrybase.de/en/battery-holder-for-1x18650-with-connection-cable) (76 × 21 × 18: **probably too long**, the 74.5 already touches the inner fillet; measure before buying it) | [V] 15/09 | **4.75 €** | check whether it has mounting holes (2 ST2.6 × 4 screws). Not the Keystone 1042 (SMD without wires). A protected 69 mm cell can be tight in a cheap holder: prefer a bare 65 mm cell |
| **1 W deep red LED** 640–660 nm, **20 mm** aluminium star | 1 (+1) | [AliExpress 1005006076131693](https://fr.aliexpress.com/item/1005006076131693.html) — options: **1W**, colour **rouge profond / deep red**, star 20 mm with pre-soldered wires | [Avonec 640–660 nm](https://www.avonec.de/high-power-led-1w-auf-starplatine/product-2-29-30-32-33-34-35-36-37-38-39-40-41.html) (1.64 €) | [V] 04/11 (title) | **≈ 2.20 € the 5** | compatible: the board drives it at a constant 170 mA from SYS (Vf of a deep red ≈ 2.1 V at 170 mA, ≥ 0.5 V of headroom down to the 3.30 V cutoff), no resistor; the 20 mm star sits behind the Ø 20 optic of the lamp head. Wires: red → J8-1 (LED+, anode), black → J8-2 (LED−). **Not** the 3 W (made for 700 mA: only dimmer here), not plain "red" 620–630 nm, never white/blue/UV (night vision) |
| **Ø 20 mm 30° optic with its holder** (holder 22 × 14 mm) | 1 lot | [uxcell 10 lenses 20 mm 30° + black holder (eBay)](https://www.ebay.com/itm/313136710220) | [Amazon.fr sourcing map B07HRLYNSD](https://www.amazon.fr/dp/B07HRLYNSD) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-20mm-led-lens-30-degree-holder-1w.html) | title seen, price not read | **?** (a few €) | the lens alone does not hold: require the "holder" |

The board supplies a constant 170 mA to the LED: **no resistor to add**. No charger either: the
board charges the battery through its USB-C.

## 2. Off-board modules

| Part — requirements | Qty | To use | Other source | Status | Price | Pitfall |
|---|---|---|---|---|---|---|
| **3.5″ SPI display ILI9488 320 × 480, RESISTIVE touch XPT2046, 14 pins, module 56.34 × 98 mm (lcdwiki MSP3520)** — header in the order VCC GND CS RESET DC/RS SDI SCK LED SDO T_CLK T_CS T_DIN T_DO T_IRQ | 1 | [Elecrow "3.5 inch 480×320 SPI TFT LCD Module with ILI9488 driver"](https://www.elecrow.com/3-5-inch-480-320-spi-tft-lcd-module-with-ili9488-driver.html) (resistive touch option) | [R] [AliExpress "MSP3520 ILI9488 touch"](https://www.aliexpress.com/w/wholesale-msp3520-ili9488-touch.html) · datasheet [lcdwiki MSP3520](https://www.lcdwiki.com/3.5inch_SPI_Module_ILI9488_SKU:MSP3520) | [V] 02/11 (Elecrow: "in stock", teaser price) | **≈ $9.50** | **ILI9488 controller mandatory**: the firmware only initialises the ILI9488. **No ST7796 / ST7796S** (lcdwiki MSP3525 / MSP3526, and many generic 3.5″ "SPI 480 × 320" with the same 14-pin header), **not the MSP3521** (no touch), **no capacitive touch** (FT6336U, GT911), no UNO shield, no 26-pin RPi display. Choose the option **with touch**. The enclosure is dimensioned on the MSP3520 drawing (glass 55 × 84.36, holes 49.5 × 92): compare the seller's drawing before printing. **On reception**: check "ILI9488" on the back; **short jumper J1** (0 Ω pads next to the XC6206 regulator: lcdwiki schematic, "VCC = 3.3 V: J1 shorted"), otherwise the backlight is starved at 3.3 V; on a rev. B board, bend pin 9 (SDO) out of J4 |
| **38-pin ESP32 DevKit**, ESP32-WROOM-32 (DevKitC V4 or NodeMCU-32S) | 1 | [BerryBase NodeMCU-32S](https://www.berrybase.de/en/esp32-nodemcu-development-board) | [AZ-Delivery DevKitC V4](https://www.az-delivery.de/products/esp-32-dev-kit-c-v4) (13.99 €, out of stock on 15/09) · [R] [Mouser DevKitC-32E](https://www.mouser.fr/c/?q=ESP32-DevKitC-32E) | [V] 15/09 | **6.80 €** | **neither WROVER, nor S3, nor C3, nor 30 pins**. Measure the row spacing: 22.86 mm (NodeMCU-32S, most clones) → inner row "int. NodeMCU"; 25.4 mm (Espressif DevKitC V4) → outer row "ext. DevKitC" (rev. B silkscreen: the two labels are swapped) |
| **u-blox NEO-M8N GPS module** from a drone, "GPS Module with compass", **32 × 32 mm board** without holes, 25 × 25 ceramic antenna, 6-pin JST-GH connector (VCC GND RXD TXD SDA SCL), NMEA 9600 baud, **accepts 3.3 V** | 1 | [R] [AliExpress "NEO-M8N GPS module compass"](https://www.aliexpress.com/w/wholesale-neo-m8n-gps-module-compass.html) | — | [R] | — | **Dimensions the cradle accepts** (`gps_board`, `gps_antenna`, `gps_total` in the `.scad`): board **32.0 × 32.0 mm** (pocket 32.3, 0.15 mm per side; a smaller board needs a shim), **no fixing holes needed**, ceramic patch **25 × 25 mm** centred, **3 to 5 mm** thick, **overall thickness ≤ 9 mm** (patch + 1.6 board + components and antenna pin), cable leaving by the edge (6-pin JST-GH, exit parallel to the board). Taken out of its round case. **Measure the board** before printing. Powered at **3.3 V through J7** (never 5 V): check that the seller states "3.3–5 V" **and** read the marking of its regulator: a low-dropout one (ME6211, RT9193, "662K") is fine, an AMS1117 gives ≈ 2.2 V (no fix); measure ≥ 2.7 V at its output, fed from 3.3 V. Baud rate: anything from 4800 to 115200 is found automatically by the firmware; NMEA output required (a UBX-only module: set it back to NMEA with u-center). Take the version **with its JST-GH cable** (3 wires to female Dupont on J7: VCC, TXD, GND). See `../../REMOTE_WIRING.html#gps` |
| **Joystick** KY-023 / HW-504, 2 axes + button, 4 holes, **34 × 26 × 32 mm**, DC 3.3–5 V, header GND +5V VRx VRy SW | 1 | [funduinoshop](https://funduinoshop.com/en/electronic-modules/keypads-and-buttons/joysticks/ky-023-joystick-module) | [R] [AliExpress](https://www.aliexpress.com/w/wholesale-ky-023-joystick-module.html) | [V] 04/11 | **1.29 €** (+ 4.90 € shipping) | the enclosure is drawn for board **26.7 × 33.7**, holes **Ø 2.5 at 20.0 × 26.13** centres, **30 mm** from the underside of the board to the top of the cap (the "32" of sellers includes the board and solder points): **print `joystick_template.stl` first** and check the 4 holes; its "+5V" pin gets 3.3 V |
| **Stylus** with **hard POM** tip, Ø ≈ 5 mm | 1 | [R] [AliExpress](https://www.aliexpress.com/w/wholesale-resistive-stylus-pom-tip.html) | [R] [Amazon.fr](https://www.amazon.fr/s?k=stylet+%C3%A9cran+r%C3%A9sistif) | [E] | **≈ $0.4** | no rubber or fibre tip (capacitive). The rail of the enclosure is made for Ø 5.2 |

No more **DHT22** in this variant (`DHT22_PRESENT 0`): J7 takes the GPS.

## 3. Screws and fasteners

From the header of `print3d/enclosure_hc_tft.scad` (3.5″ variant, 02/11/2026).

| Part — requirements | Qty | To use | Status | Price | Pitfall |
|---|---|---|---|---|---|
| **Heat-set brass inserts M2.5**, outer Ø **3.5**, 4 mm long | 6 | [dhm-online M2.5 × 3.5 × 3.5](https://www.dhm-online.com/en/other/13363-brass-threaded-insert-m25-25x35x35-mm.html) · [R] [AliExpress M2.5 × 4 × 3.5](https://www.aliexpress.com/w/wholesale-m2.5-heat-set-insert-4mm-3.5mm.html) | [V] 15/09 | **0.12 €** each (0.72 €) | the dhm one is 3.5 mm long instead of 4. **CNC Kitchen and ruthex are too big** (Ø 4) |
| **M2.5 × 25 countersunk screw** DIN 965 stainless (top, through the board) | 2 | [AliExpress 3256804975863299](https://www.aliexpress.us/item/3256804975863299.html) (50 pieces) · [lavisserie.fr DIN 963](https://www.lavisserie.fr/inox-a2/1286-vis-metaux-25x25-tete-fraisee-inox-a2-fendue-3604880012725.html) (slotted head, box of 500) | [R] / [V] 15/09 | ?; 23.41 € for 500 | Marleva stops at 20 mm |
| **M2.5 × 16 countersunk screw** DIN 965 stainless (bottom) | 2 | [R] [Marleva](https://www.marleva.net/recherche?search_query=vis+m2.5+x+16+fraisee+inox) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-m2.5x16-countersunk-screw-din965.html) | [R] | not noted | — |
| **M2.5 × 6 screw** DIN 912 stainless (bottom of the board) | 2 | [Marleva](https://www.marleva.net/visserie-boulonnerie/vis-chc-tete-cylindique-6-pans-creux-inox-a2-din-912/chc0205006i2-vis-chc-m-2-5-x-6-inox-a2.html) | [V] 15/09 | **0.081 €** each | sold individually |
| **M3 × 6 self-tapping screws for plastic, cheese head** (3.5″ display: through its 4 holes into the 4 pillars of the front panel) | 4 | [R] [AliExpress "M3x6 self tapping pan head"](https://www.aliexpress.com/w/wholesale-m3x6-self-tapping-screw-pan-head.html) · [assortment box 1005009673878659](https://www.aliexpress.com/item/1005009673878659.html) | [R] | ? | **cheese head Ø ≤ 5.6, height ≤ 2.4** (`screen_screw_head` dimension in the `.scad`; the top 2 go through the Ø 6.4 holes in the ceiling of the visor). No metric screw: the pillars only have a Ø 2.5 pilot hole |
| **Self-tapping screws for plastic**: M2 × **8** cheese or pan head (joystick, 4), ST2.6 × 4 countersunk (battery holder, 2) | 6 | [AliExpress 1005004065502819](https://www.aliexpress.com/item/1005004065502819.html) · [assortment box 1005009673878659](https://www.aliexpress.com/item/1005009673878659.html) | [R] | ? (box ≈ a few €) | an "M2.5" self-tapping screw does not exist: take **M2.6 / ST2.6** |
| **Cable ties** 2.5 × 100 mm (close the battery holder) | 2 | [Gotronic (100)](https://www.gotronic.fr/art-100-colliers-tf3-100-6656.htm) | [V] 15/09 | **1.20 €** for 100 | — |

**No longer to buy** (it was for the 2.8″ display screwed onto the board): M3 × 11 standoffs, M3 × 6 DIN 912 and
ISO 7380 screws. Holes H5 to H8 of the board stay empty.

## 4. Wiring and crimp connectors

| Part — requirements | Qty | To use | Status | Price | Pitfall |
|---|---|---|---|---|---|
| **Silicone wire 26 AWG**, several colours (battery wires ≈ 260 mm) | 1 kit | [AliExpress Cbazy 32821649504](https://www.aliexpress.com/item/32821649504.html) (6 × 10 m) · [McHobby 2 m](https://shop.mchobby.be/en/wire-prototyping-wires/780-2m-fil-multi-brin-noir-26-awg-silicone-3232100007802.html) | [E] / [V] 15/09 | ≈ $15.1; 1.60 € for 2 m | the Gotronic FC14 reels are **PVC** |
| **JST-PH 2-way** housings (PHR-2) + contacts — battery (J2) | 10 + 20 | [Gotronic](https://www.gotronic.fr/art-10-connecteurs-femelles-jst-ph-2-pts-2-mm-22577.htm) | [V] 15/09 | **0.90 €** | check the polarity with a multimeter |
| **JST-XH 5-way** housing (XHP-5) + contacts — joystick (J9) | 1 + 10 | [Gotronic housing](https://www.gotronic.fr/art-boitier-femelle-jst-xh-2-5-mm-5-cts-37913.htm) + [10 XH contacts](https://www.gotronic.fr/art-10-contacts-a-sertir-pour-jst-xh-37908.htm) | [V] 15/09 | **1.00 € + 1.20 €** | sold without contacts |
| **Dupont** housings 1 × 2 (J8), 1 × 3 (J7, GPS), 1 × 4 (J3, ⏻ with its ring), 1 × 5 (joystick, module side) | 25 of each | [Gotronic NSR-02 / -03 / -05](https://www.gotronic.fr/art-25-boitiers-nsr-05-22832.htm) (ref. 22805, 22806, 22832); NSR-04: [R] [Gotronic](https://www.gotronic.fr/recherche?q=NSR-04) | [V] 15/09 | **0.80 / 0.80 / 0.85 €** | failing a 1 × 4, two 1 × 2 on J3-1/2 and J3-3/4 |
| **Female Dupont contacts** (NDR-T) | 25 | [Gotronic](https://www.gotronic.fr/art-25-contacts-femelles-ndr-t-22802.htm) | [V] 15/09 | **0.75 €** | — |
| *Option:* crimping pliers | 1 | [SN-28B (Semageek)](https://boutique.semageek.com/en/1396-crimping-tool-sn-28b-for-18-28-awg-dupont-contact-3007648029087.html) · [Engineer PA-09 (Gotronic)](https://www.gotronic.fr/art-pince-a-sertir-pa-09-22718.htm) | [V] 15/09 | 18.60 €; 46.90 € | the SN-28B does Dupont, not PH; the PA-09 does PH. Avoid the AliExpress "PA-09" at $306 |

## 5. 3D printing, glue

| Part | Qty | To use | Status | Price | Remark |
|---|---|---|---|---|---|
| **Black PETG** 1.75 mm | 1 kg | [3DJake black PETG](https://www.3djake.fr/3djake/petg-noir) (AzureFilm) | [V] 15/09 | **13.29 €** | front (80 × 195 mm), back cover, joystick cover, template (`print3d/stl_3.5in_tft/`) |
| **TPU 95A** 1.75 mm | 1 kg | [3DJake TPU](https://www.3djake.fr/filament/tpu) (Elegoo) | [V] 15/09 | **17.99 €** | 2 foot pads (`foot_pad.stl`). No 85A |
| **Hot glue** (sticks + gun) | — | stock / [R] [Gotronic](https://www.gotronic.fr/recherche?q=colle+chaude) | [R] | a few € | 2 dots in the notches of the GPS shell |
| **Cyanoacrylate** 3 g | 1 | [Gotronic](https://www.gotronic.fr/art-colle-super-cyano-wt77002-38926.htm) | [V] 15/09 | **2.50 €** | joystick cover, foot pads |

No more yellow PETG (emergency stop plate) or TPU collar: removed from the enclosure.

## 6. Board parts to solder by hand

JLCPCB places the 53 SMD components. 8 designators remain (exact list: `kicad/fabrication/HC-TFT_hand_solder.csv`).
Reichelt (EU, no customs) is chosen; LCSC remains possible for the exact header lengths.

| Ref. | Part | To use | Status | Price | Other source |
|---|---|---|---|---|---|
| U1, J4 | **female header 1 × 20**, 2.54 mm, **8.5 mm high** (FREI BL 1X20G8), cut into 1 × 19, 1 × 17, 1 × 14 | [Reichelt](https://www.reichelt.com/de/en/20-pin-socket-terminal-strip-straight-rm-2-54-h-8-5-mm-bl-1x20g8-2-54-p51827.html) × 3 | [V] 15/09 | **0.90 €** (3 × 0.30) | LCSC [C2897382](https://www.lcsc.com/product-detail/C2897382.html) $0.35 · [C2897380](https://www.lcsc.com/product-detail/C2897380.html) $0.22 · [C2897377](https://www.lcsc.com/product-detail/C2897377.html) $0.26. **8.5 mm J4**: with the display header, 11.04 mm between display and board, the stack-up of the enclosure |
| J3, J7, J8 | snappable **right-angle male** header 1 × 40 (cut into 1 × 6, 1 × 3, 1 × 2) | [Reichelt](https://www.reichelt.com/de/en/shop/product/pin_header_rm_2_54mm_angled_1-row_40-pin-330981) | [V] 15/09 | **1.09 €** | — |
| J2 | right-angle **JST S2B-PH-K-S** (battery) | [Reichelt](https://www.reichelt.com/de/en/jst-pin-header-90-1x2-pin-ph-jst-ph2p-st90-p185056.html) | [V] 15/09 | **0.12 €** | LCSC C173752 (out of stock on 15/09) |
| J9 | straight **JST B5B-XH-A** (joystick) | [Reichelt](https://www.reichelt.com/de/en/jst-pin-header-straight-1x5-pin-xh-jst-xh5p-st-p185076.html) | [V] 15/09 | **0.25 €** | [LCSC C157991](https://www.lcsc.com/product-detail/C157991.html) $0.09 |
| BZ1 | SMD buzzer **CUI / Same Sky CMT-8504-100-SMT-TR** (rated 4,000 Hz: `BEEP_FREQUENCY_HZ 4000`) | [DigiKey FR](https://www.digikey.fr/fr/products/result?keywords=CMT-8504-100-SMT-TR) | [V] 27/09 | **1.58 €** excl. VAT (31,276 in stock) | [LCSC C22359707](https://www.lcsc.com/product-detail/C22359707.html) $2.54 |

Subtotal ≈ **3.95 €** (Reichelt 2.36 € + DigiKey 1.58 €). DigiKey shipping (18–25 € under 50–75 €) would cost
more than the buzzer: take it from LCSC with another order, or group DigiKey with something else.

## Recommended baskets and total

| Basket | Content | Parts | Shipping |
|---|---|---|---|
| **Elecrow** or **AliExpress (display)** | 3.5″ MSP3520 ILI9488 resistive touch display | ≈ $9.50 | variable + customs |
| **BerryBase** | ESP32 | 6.80 € | not noted |
| **Opencircuit** | battery holder SparkFun PRT-12899 (74.5 mm) | 4.75 € | not noted |
| **AliExpress (button, LED)** | ABILKEEN 16 mm button, 5 × 1 W deep red LEDs | ≈ 5 € | variable |
| **batterie-boutique.fr** | Keeppower battery | 19.99 € | not noted |
| **Avonec** (alternative LED) | 1 W 640–660 nm LED | 1.64 € each | not noted |
| **funduinoshop** | joystick | 1.29 € | 4.90 € |
| **Reichelt** | headers, J2, J9 | 2.36 € | from 7.90 € |
| **DigiKey FR** or **LCSC** | BZ1 | 1.58 € / $2.54 | 18–25 € / variable + customs |
| **Marleva** | M2.5 × 6, M2.5 × 16 screws | < 1 € | not noted |
| **Gotronic** | cable ties, crimp connectors, glue | ≈ 10 € | from 4.50 € |
| **3DJake** | black PETG, TPU | 31.28 € | not noted |
| **AliExpress** | NEO-M8N GPS, M2.5 × 25 screws, self-tapping screws (including the display's M3 × 6), wire, stylus, inserts, optic | ≈ $40 [E] | variable + 3 € per category |

**Parts only: ≈ 145 €**, of which 31 € of filament (which leaves a lot) and ≈ 20 € of battery;
**≈ 180 to 210 € shipping included** depending on the number of sellers. The GPS has no price noted yet. To reduce:
everything available at BerryBase, Reichelt or Gotronic can be grouped there, and filament, wire,
connectors and screws already in stock need not be bought again.
