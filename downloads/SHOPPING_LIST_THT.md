# Shopping list — SHC_OnStepX TFT hand controller, through-hole board HC-TFT-T (3.5″ display)

> **Update of 02/11/2026**: variant with the **3.5″ lcdwiki MSP3520** display (ILI9488 + XPT2046), 3.5″ enclosure,
> NEO-M8N GPS on J7 instead of the DHT22, no emergency stop at all (no button, no jumper, no input). Display,
> modules, button, screws and filament aligned with `SHOPPING_LIST.md`.
>
> **Update of 04/11/2026: board HC-TFT-T rev. B** — J3 has 4 pins (R20, C12 and the emergency-stop pair removed:
> one fewer resistor and capacitor to buy), J4-9 (display SDO) not connected, DevKit row labels corrected.
> **Bridge jumper J1 of the MSP3520** (it is fed 3.3 V). Buzzer AT-1224: set `BEEP_FREQUENCY_HZ 2400` in `Config.h`
> (rated 2.4 kHz; the SMD board's CMT-8504 is 4 kHz).

Everything to buy to build the hand controller with the **board to solder yourself**
(`PCB_THT_VERSION/`): the bare board, its components, then everything mounted around it
(modules, buttons, battery, lamp, screws, wiring, filament). List made on 15/09/2026 from
`PCB_THT_VERSION/bom_HC-TFT-T.csv` and `purchasing/SHOPPING_LIST.md` (SMD board),
whose sections 1 to 7 also apply to this board.

**Legend**
- **[V]** product page opened and read on 15/09/2026, price shown that day (stock and price may change).
- **[E]** price only read in a search engine snippet: date unknown, often the cheapest variant of the
  listing. **To check in the browser.**
- **[R]** search link: no offer verified, choose yourself according to the "Requirements" column.

> **AliExpress**: no AliExpress product page could be read (JavaScript pages, Chrome extension not
> connected). The AliExpress item links below come from search results: their **title**
> matches, but the price is [E] at best. When a European offer was seen, it is given next to it.
>
> **Customs duties**: according to the Council of the EU (snippets read, not checked against the text), small parcels
> from outside the EU pay **3 € per item category** since 01/07/2026. On AliExpress, LCSC or JLCPCB,
> this can cost more than the parts themselves: group orders, or prefer an EU seller for small lots.

## Blocking points to settle before ordering

1. **Q1, IPP80P03P4L-04: obsolete part.** DigiKey marks it "Obsolete", stock 0; Reichelt does not have it;
   Mouser could not be read. Only source seen: eBay from China (see §1), with a risk of recovered
   or remarked parts. On reception, measure the threshold (Vgs(th) −1 to −2 V). Otherwise, another
   low-threshold TO-220 P-channel will have to be chosen and entered in the BOM.
2. **U5, MCP1826S-3302E/AB**: only stock seen at DigiKey (151 pieces). LCSC and TME are out of stock.
3. **DigiKey**: U5, the 10 µF and 4.7 µF ceramics and the buzzer were only found there (≈ 5 € of parts), but
   shipping costs 18 to 25 € under 50 to 75 € of order. Group with something else or with another project.

## 1. Components of the HC-TFT-T board

| Ref. | Part — requirements | Qty | Where to buy | Status | Lot price | For the project | Pitfall |
|---|---|---|---|---|---|---|---|
| — | **Bare board** JLCPCB, 2 layers, 1.6 mm, 72 × 90 mm, lead-free HASL, green. Send `fabrication/HC-TFT-T_gerbers.zip` | 5 (minimum) | [JLCPCB quote](https://jlcpcb.com/quote) | [V] price, shipping not seen | $2.00 for 5 | ≈ $2 + shipping (≈ $5–10 economy, $15–25 DHL, order of magnitude not verified) + VAT | **Do not tick any assembly option** |
| U2 | **TP4056 USB-C charger module with protection** (TP4056 + DW01A + 8205A), 1 A, **29 × 17.3 mm**, pads IN+ IN− B+ B− OUT+ OUT− | 1 (+1) | [AliExpress 1005010720358242](https://www.aliexpress.com/i/1005010720358242.html) · [R] [search "5.1k"](https://www.aliexpress.com/w/wholesale-tp4056-type-c-5.1k.html) | title seen, price not seen | usually 0.3 to 1 € | ≈ 1 € | some USB-C variants are 25 × 19 mm: **check the size**. Without the 5.1 kΩ on CC, it only charges with a USB-A to C cable: **try with C to C before soldering** |
| Q1 | **Infineon IPP80P03P4L-04** P-channel MOSFET, TO-220 | 1 | [eBay 392380493514](https://www.ebay.com/itm/392380493514) (10 pieces) · [eBay 173995328112](https://www.ebay.com/itm/173995328112) (5 pieces) | [V] via PicClick | £6.34 for 10 + £5.33 shipping | ≈ 13.5 € shipping included | **obsolete**, see above. No IRF9540 or IRF4905 (threshold down to −4 V) |
| U5 | **Microchip MCP1826S-3302E/AB** regulator, TO-220, 3.3 V 1 A | 1 | [DigiKey FR](https://www.digikey.fr/fr/products/detail/microchip-technology/MCP1826S-3302E-AB/1635996) · [LCSC C185586](https://www.lcsc.com/product-detail/C185586.html) (out of stock) | [V] | 1.13 € excl. VAT each | 1.36 € incl. VAT | only stock seen: DigiKey |
| Q2 | **BC327-40** PNP, TO-92 | 1 | [AliExpress 4001173304524](https://www.aliexpress.com/item/4001173304524.html) | [E] | 1.06 € for 100 | 1.06 € | listing with variants: take **-40** |
| Q4 Q8 Q9 | **BC337-40** NPN, TO-92 | 3 | [AliExpress 1005004307140717](https://www.aliexpress.com/item/1005004307140717.html) · same seller as Q2: [4001173304524](https://www.aliexpress.com/item/4001173304524.html) | [E] | 0.53 € for 50 | 0.53 € | take **-40**; check the C B E pinout on the datasheet |
| Q3 | **2N7000**, TO-92 | 1 | [AliExpress 32388755492](https://www.aliexpress.com/item/32388755492.html) | [E] | 2.77 € for 50 | 2.77 € | check the onsemi S G D pinout |
| D1 D2 D3 | Schottky **BAT43** (or BAT85), DO-35 | 3 | [AliExpress 33011832988](https://www.aliexpress.com/item/33011832988.html) (10 pieces) · [4001161899568](https://www.aliexpress.com/item/4001161899568.html) (100, variants) | title seen, price [E] | $1.63 for 10 | ≈ 1.40 € | — |
| D6 | **1N4148**, DO-35 | 1 | [AliExpress 1005004333197874](https://www.aliexpress.com/item/1005004333197874.html) | title seen, price not seen | < 1 € for 100 | < 1 € | — |
| D5 | **Red 3 mm diffused** LED | 1 | [AliExpress 1781457031](https://www.aliexpress.com/item/1781457031.html) | title seen, price [E] | $2.85 for 100 | ≈ 2.45 € | "red" + "diffused" variant, not "water clear" |
| R4 R24 R32 R33 R35 R36 R37 | **1 kΩ** resistor 1 % metal film 0207 | 7 | [Reichelt](https://www.reichelt.com/de/en/shop/product/metal_film_resistor_1_00_kohm-11403) | [V] | 0.35 € for 10 | 0.35 € | 10 cost less than 8 |
| R17 R18 R21 R30 R34 | **10 kΩ** resistor 1 % 0207 | 5 | [Reichelt](https://www.reichelt.com/de/en/metal-film-resistor-10-0-kohm-metall-10-0k-p11449.html) | [V] | 0.35 € for 10 | 0.35 € | — |
| R7 R8 R10–R13 R23 | **100 kΩ** resistor 1 % 0207 | 7 | [Reichelt](https://www.reichelt.com/de/en/shop/product/metal_film_resistor_100_kohm-11458) | [V] | 0.35 € for 10 | 0.35 € | 1 % mandatory for R10–R13 (gauge) |
| R19 | **150 Ω** resistor 1 % 0207 | 1 | [Reichelt](https://www.reichelt.com/de/en/metal-film-resistor-150-ohm-metall-150-p11527.html) | [V] | 0.07 € | 0.07 € | — |
| R31 | **3.9 Ω** resistor 1/4 W 0207 | 1 | [Reichelt](https://www.reichelt.com/de/en/metal-film-resistor-3-90-ohm-metall-3-90-p11705.html) | [V] | 0.18 € | 0.18 € | the AliExpress "30 values" kits start at 10 Ω: no 3.9 Ω in them |
| C8 C11 C14 C15 | Ceramic **100 nF 50 V X7R**, 5 mm pitch | 4 | [Reichelt](https://www.reichelt.com/de/en/shop/product/multilayer_capacitor_100_nf_50_100_v_x7r_10_rm_5_0-22865) · [LCSC C342794](https://lcsc.com/product-detail/Ceramic-Disc-Capacitors_TDK_C342794.html) ($0.56 for 5) | [V] | 0.25 € for 5 | 0.25 € | height not stated at Reichelt (the TDK from LCSC is ≈ 5.5 mm) |
| C2 C5 C6 C13 | Ceramic **10 µF 25 V X5R**, 5 mm pitch, ≤ 7 mm high (TDK FG28X5R1E106MRT06) | 4 | [DigiKey FR](https://www.digikey.fr/fr/products/result?keywords=FG28X5R1E106MRT06) | [V] | 1.72 € excl. VAT for 4 | ≈ 2.06 € incl. VAT | Reichelt does not have it. On AliExpress, the "monolithic 106" are often **Y5V**: avoid |
| C4 | Ceramic **4.7 µF 25 V X5R**, 5 mm pitch (TDK FG28X5R1E475KRT06) | 1 | [DigiKey FR](https://www.digikey.fr/fr/products/result?keywords=FG28X5R1E475) | [V] | 0.35 € excl. VAT | ≈ 0.42 € incl. VAT | — |
| C7 | Electrolytic **100 µF 16 V**, Ø 5 × 11 mm, 2 mm pitch (Panasonic ECA1CHG101) | 1 | [Reichelt](https://www.reichelt.com/de/en/shop/product/e-cap_radial_100_uf_16_v_105_c-200362) | [V] | 0.15 € | 0.15 € | "limited" stock. The + on the square pad |
| BZ1 | Magnetic transducer **PUI AT-1224-TWT-5V-2-R**, 12 mm, 6.5 mm pitch | 1 | [DigiKey FR](https://www.digikey.fr/fr/products/detail/pui-audio-inc/AT-1224-TWT-5V-2-R/5011404) · [R] [AliExpress passive 12 mm](https://www.aliexpress.com/w/wholesale-passive-buzzer-12mm-42r.html) | [V] | 0.62 € excl. VAT | ≈ 0.74 € incl. VAT | an **active** buzzer (with oscillator) does not work. On AliExpress, check the 6.5 mm pitch |
| U1, J4 | **Female header 1 × 20**, 2.54 mm, **8.5 mm high** (FREI BL 1X20G8), cut into 1 × 19, 1 × 17 and 1 × 14 | 3 | [Reichelt](https://www.reichelt.com/de/en/20-pin-socket-terminal-strip-straight-rm-2-54-h-8-5-mm-bl-1x20g8-2-54-p51827.html) · [LCSC C2897382 / C2897380 / C2897377](https://www.lcsc.com/product-detail/C2897382.html) (exact lengths) | [V] | 0.30 € each | 0.90 € | the height sets the M3 × 11 standoff: **exactly 8.5 mm**. Cutting a female header sacrifices one contact |
| J3 J7 J8 | Snappable **right-angle male** header 1 × 40, 2.54 mm (cut into 1 × 4, 1 × 3, 1 × 2) | 1 | [Reichelt](https://www.reichelt.com/de/en/shop/product/pin_header_rm_2_54mm_angled_1-row_40-pin-330981) | [V] | 1.09 € | 1.09 € | — |
| J2 | **JST S2B-PH-K-S** (PH 2 mm, 2 pins, right-angle) | 1 | [Reichelt](https://www.reichelt.com/de/en/jst-pin-header-90-1x2-pin-ph-jst-ph2p-st90-p185056.html) | [V] | 0.12 € | 0.12 € | AliExpress PH/XH kits almost always have **straight** sockets |
| J9 | **JST B5B-XH-A** (XH 2.5 mm, 5 pins, straight) | 1 | [Reichelt](https://www.reichelt.com/de/en/jst-pin-header-straight-1x5-pin-xh-jst-xh5p-st-p185076.html) | [V] | 0.25 € | 0.25 € | — |

**Board subtotal ≈ 40 €** (of which ≈ 13.5 € for Q1 alone and ≈ 8 € for the PCBs), without Reichelt shipping
(7.90 €), DigiKey (18 to 25 €) or AliExpress.

## 2. Modules, buttons, battery, lamp (off-board)

| Part — requirements | Qty | Where to buy | Status | Price | Pitfall |
|---|---|---|---|---|---|
| **38-pin ESP32 DevKit**, ESP32-WROOM-32 (DevKitC V4 or NodeMCU-32S) | 1 | [BerryBase NodeMCU-32S](https://www.berrybase.de/en/esp32-nodemcu-development-board) · [AZ-Delivery DevKit C](https://www.az-delivery.de/products/esp32-developmentboard) (sold out) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-esp32-devkitc-v4.html) | [V] | 6.80 € (BerryBase, seen in `SHOPPING_LIST.md`); 10.99 € (AZ) | neither WROVER, nor S3/C3, nor 30 pins. The Gotronic GT0162 (13.90 €) does not state its number of pins |
| **3.5″ SPI display ILI9488 320 × 480, RESISTIVE touch XPT2046, 14 pins, module 56.34 × 98 mm (lcdwiki MSP3520)** — header in the order VCC GND CS RESET DC/RS SDI SCK LED SDO T_CLK T_CS T_DIN T_DO T_IRQ | 1 | [Elecrow "3.5 inch 480×320 SPI TFT LCD Module with ILI9488 driver"](https://www.elecrow.com/3-5-inch-480-320-spi-tft-lcd-module-with-ili9488-driver.html) (resistive touch option) · [R] [AliExpress "MSP3520 ILI9488 touch"](https://www.aliexpress.com/w/wholesale-msp3520-ili9488-touch.html) · datasheet [lcdwiki MSP3520](https://www.lcdwiki.com/3.5inch_SPI_Module_ILI9488_SKU:MSP3520) | [V] 02/11 (Elecrow: "in stock", teaser price) | **≈ $9.50** | **ILI9488 controller mandatory**: the firmware only initialises the ILI9488. **No ST7796 / ST7796S** (lcdwiki MSP3525 / MSP3526, and many generic 3.5″ "SPI 480 × 320" with the same 14-pin header), **not the MSP3521** (no touch), **no capacitive touch** (FT6336U, GT911), no UNO shield, no 26-pin RPi display. Choose the option **with touch**. The enclosure is dimensioned on the MSP3520 drawing (glass 55 × 84.36, holes 49.5 × 92): compare the seller's drawing before printing |
| **Joystick** KY-023 / HW-504 | 1 | [funduinoshop](https://funduinoshop.com/en/electronic-modules/keypads-and-buttons/joysticks/ky-023-joystick-module) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-ky-023-joystick-module.html) | [V] | 1.29 € (+ 4.90 € shipping) | **measure the board and the hole spacing** and enter them in the `.scad` before printing |
| **u-blox NEO-M8N GPS module** from a drone, "GPS Module with compass", **32 × 32 mm board** without holes, 25 × 25 ceramic antenna, 6-pin JST-GH connector (VCC GND RXD TXD SDA SCL), NMEA 9600 baud, **accepts 3.3 V** | 1 | [R] [AliExpress "NEO-M8N GPS module compass"](https://www.aliexpress.com/w/wholesale-neo-m8n-gps-module-compass.html) | [R] | — | taken out of its round case, it fits into the shell of the front panel (32 × 32, 0.15 mm clearance per side): **measure the board** before printing (`gps_board` in the `.scad`). Powered at **3.3 V through J7** (never 5 V): check that the seller states "3.3–5 V". Take the version **with its JST-GH cable** (3 wires to female Dupont on J7: VCC, TXD, GND). See `../../REMOTE_WIRING.html#gps` |
| **Power on / off**: 16 mm MOMENTARY push button, NO contact, **≤ 22 mm under the front panel, terminals and wires included**, nut ≤ Ø 20 | 1 | [AliExpress 1005006775237546, "16mm" "Momentary self-reset"](https://fr.aliexpress.com/item/1005006775237546.html) (head of your choice) | [V] 27/09 | **3.61 lei** (≈ 0.70 €) | seller's drawing: 20.8 mm overall, collar Ø 17.8, thread Ø 15.8 → ≈ 18 mm under the front panel. **No LED ring**: J3-3 (LED_RING) stays free. Check on reception that the nut fits its seat (`nuts = [20]` in the `.scad`). **Do not take** the Adafruit 559 / SparkFun with LED ring (31 mm deep) nor the DIANQI "1NO1NC" (35 mm) |
| **Protected 18650 battery** ≈ 3,000 mAh, 67–70 mm (Keeppower) | 1 | [Nkon](https://www.nkon.nl/en/keeppower-18650-3000mah-protected.html) · [batterie-boutique.fr](https://batterie-boutique.fr/fr/keeppower-18650-3000mah-36v-carte-de-batterie-li-ion-de-37-v-protegee/) (back on 17/09) | [E] / [V] | 9.75 € [E]; 19.99 € | **not from AliExpress**: the "9,900 mAh" ones are fakes, bare cells are not protected |
| **1 × 18650 holder** with wires, ≈ 74.5 × 21.5 × 17.7 mm | 1 | [Opencircuit (SparkFun PRT-12899)](https://opencircuit.shop/product/battery-holder-1x18650-wire-leads) | [V] | 4.75 € | **74.5 mm**: the enclosure is drawn for it. The BerryBase one (76 mm) is probably too long; no holder with solder lugs (electro-proto: 78 × 21 × 24) |
| **1 W deep red LED** 625–660 nm on 20 mm aluminium star | 1 (+1) | [Avonec 640–660 nm](https://www.avonec.de/high-power-led-1w-auf-starplatine/product-2-29-30-32-33-34-35-36-37-38-39-40-41.html) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-1w-660nm-led-20mm-star.html) | [V] | 1.64 € | star diameter **20 mm** to confirm. Ecolofrance sells the bare LED (0.72 €): it would have to be soldered onto the star. No 3 W |
| **Ø 20 mm 30° optic with its holder** | 1 | [Amazon.fr sourcing map B07HRLYNSD](https://www.amazon.fr/dp/B07HRLYNSD) (lot of 10, page not read) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-20mm-led-lens-30-degree-holder.html) | [R] | ? | the lens alone (ampul.eu 0.33 €) does not hold; the Ecolofrance holder is for 23 mm |
| **Stylus** with hard (POM) tip | 1 | [R] [AliExpress](https://www.aliexpress.com/w/wholesale-resistive-stylus-hard-tip.html) | [E] | ≈ $0.4 | no rubber or fibre tip (capacitive) |

**Subtotal ≈ 45 to 60 €** depending on the sellers, without the optic, the GPS or shipping. No more DHT22 or emergency
stop in the 3.5″ variant: J7 takes the GPS, nothing on J3-5 / J3-6 (gone in rev. B).

## 3. Screws and fasteners

| Part — requirements | Qty | Where to buy | Status | Price | Pitfall |
|---|---|---|---|---|---|
| **Heat-set brass inserts M2.5**, outer Ø **3.5** | 6 | [dhm-online M2.5 × 3.5 × 3.5](https://www.dhm-online.com/en/other/13363-brass-threaded-insert-m25-25x35x35-mm.html) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-m2.5-heat-insert-3.5mm.html) | [V] | 0.12 € each | the dhm one is **3.5 mm long instead of 4**. CNC Kitchen and ruthex are too big (Ø 4) |
| **M2.5 × 25 countersunk screw** DIN 965 stainless (top, through the board) | 2 | [AliExpress 3256804975863299](https://www.aliexpress.us/item/3256804975863299.html) (50 pieces) · [lavisserie.fr DIN 963](https://www.lavisserie.fr/inox-a2/1286-vis-metaux-25x25-tete-fraisee-inox-a2-fendue-3604880012725.html) | [R] / [V] | ?; 23.41 € for 500 | lavisserie: **slotted** head, box of 500. Marleva stops at 20 mm |
| **M2.5 × 16 countersunk screw** DIN 965 stainless (bottom) | 2 | [R] [Marleva](https://www.marleva.net/recherche?search_query=vis+m2.5+x+16+fraisee+inox) · [R] [AliExpress](https://www.aliexpress.com/w/wholesale-m2.5x16-countersunk-screw-din965.html) | [R] | not noted | — |
| **M2.5 × 6 screw** DIN 912 stainless | 2 | [Marleva](https://www.marleva.net/visserie-boulonnerie/vis-chc-tete-cylindique-6-pans-creux-inox-a2-din-912/chc0205006i2-vis-chc-m-2-5-x-6-inox-a2.html) | [V] | 0.081 € each | sold individually |
| **Self-tapping screws for plastic**: M2 × **8** cheese or pan head (joystick, 4), ST2.6 × 4 countersunk (battery holder, 2) | 6 | [AliExpress 1005004065502819](https://www.aliexpress.com/item/1005004065502819.html) · [assortment box 1005009673878659](https://www.aliexpress.com/item/1005009673878659.html) | [R] | ? (box ≈ a few €) | an "M2.5" self-tapping screw does not exist: take **M2.6 / ST2.6** |
| **M3 × 6 self-tapping screws for plastic, cheese head** (3.5″ display: through its 4 holes into the 4 pillars of the front panel) | 4 | [R] [AliExpress "M3x6 self tapping pan head"](https://www.aliexpress.com/w/wholesale-m3x6-self-tapping-screw-pan-head.html) · [assortment box 1005009673878659](https://www.aliexpress.com/item/1005009673878659.html) | [R] | ? | **cheese head Ø ≤ 5.6, height ≤ 2.4** (`screen_screw_head` dimension in the `.scad`; the top 2 go through the Ø 6.4 holes in the ceiling of the visor). No metric screw: the pillars only have a Ø 2.5 pilot hole |
| **Cable ties** 2.5 × 100 mm | 2 | [Gotronic (100)](https://www.gotronic.fr/art-100-colliers-tf3-100-6656.htm) | [V] | 1.20 € for 100 | — |

The M2.5 × 6 and M2.5 × 16 screws go in a single Marleva order. **No more M3 × 11 standoffs or M3 screws
on the board**: the 3.5″ display is screwed into the enclosure, H5 to H8 stay empty (so H7 no longer needs to be fitted before U2).

## 4. Wiring and crimp connectors

| Part — requirements | Qty | Where to buy | Status | Price | Pitfall |
|---|---|---|---|---|---|
| **Silicone wire 26 AWG**, several colours | 1 kit | [AliExpress Cbazy 32821649504](https://www.aliexpress.com/item/32821649504.html) (6 × 10 m) · [McHobby 2 m](https://shop.mchobby.be/en/wire-prototyping-wires/780-2m-fil-multi-brin-noir-26-awg-silicone-3232100007802.html) | [E] / [V] | ≈ $15.1; 1.60 € for 2 m | the Gotronic FC14 reels are **PVC** |
| **JST-PH 2-way** housings (PHR-2) + contacts — battery | 10 + 20 | [Gotronic](https://www.gotronic.fr/art-10-connecteurs-femelles-jst-ph-2-pts-2-mm-22577.htm) | [V] | 0.90 € | check the polarity with a multimeter |
| **JST-XH 5-way** housing (XHP-5) — joystick | 1 | [Gotronic](https://www.gotronic.fr/art-boitier-femelle-jst-xh-2-5-mm-5-cts-37913.htm) + [10 XH contacts](https://www.gotronic.fr/art-10-contacts-a-sertir-pour-jst-xh-37908.htm) | [V] | 1.00 € + 1.20 € | sold without contacts |
| **Dupont** housings 1 × 2, 1 × 3, 1 × 5 (NSR; J3: 1 × 2 on PWR/GND) | 25 of each | [Gotronic NSR-05](https://www.gotronic.fr/art-25-boitiers-nsr-05-22832.htm) (NSR-02, -03, -06: ref. 22805, 22806, 22833) | [V] | 0.80 / 0.80 / 0.85 / 1.35 € | — |
| **Female Dupont contacts** (NDR-T) | 2 × 25 | [Gotronic](https://www.gotronic.fr/art-25-contacts-femelles-ndr-t-22802.htm) | [V] | 0.75 € for 25 | — |
| *Option:* crimping pliers | 1 | [Engineer PA-09 (Gotronic)](https://www.gotronic.fr/art-pince-a-sertir-pa-09-22718.htm) · [SN-28B (Semageek)](https://boutique.semageek.com/en/1396-crimping-tool-sn-28b-for-18-28-awg-dupont-contact-3007648029087.html) | [V] | 46.90 €; 18.60 € | the Gotronic sheet of the PA-09 mentions PH, not XH or Dupont; the SN-28B does Dupont, not PH. The AliExpress "PA-09" at $306 is to be avoided |

A single Gotronic order covers the cable ties, all the crimp connectors and the glue (§5).

## 5. 3D printing, glue

| Part | Qty | Where to buy | Status | Price | Remark |
|---|---|---|---|---|---|
| **Black PETG** 1.75 mm | 1 kg | [3DJake black PETG](https://www.3djake.fr/3djake/petg-noir) | [V] | 13.29 € (AzureFilm); 15.99 € (eSUN) | front, back cover (`print3d/stl_3.5in_tft/tht/`), joystick cover, template |
| **TPU 95A** 1.75 mm | 1 kg | [3DJake TPU](https://www.3djake.fr/filament/tpu) | [V] | 17.99 € (Elegoo TPU 95A) | 2 foot pads. No 85A |
| **Cyanoacrylate** 3 g | 1 | [Gotronic](https://www.gotronic.fr/art-colle-super-cyano-wt77002-38926.htm) | [V] | 2.50 € | joystick cover, foot pads; + hot glue for the GPS |

## Recommended baskets

| Basket | Content | Parts | Shipping |
|---|---|---|---|
| **Reichelt** (EU, no customs) | resistors, 100 nF, C7, female and male headers, J2, J9 | ≈ 4 € | from 7.90 € |
| **DigiKey FR** | U5, 10 µF × 4, 4.7 µF, BZ1 | ≈ 5 € incl. VAT | 18 to 25 € under 50 to 75 € of order |
| **AliExpress** | TP4056, BC327, BC337, 2N7000, BAT43, 1N4148, 3 mm LED, GPS, screws, wire, stylus | ≈ 25 € [E] | variable + 3 € per category (see above) |
| **eBay** | Q1 | ≈ 7.5 € | £5.33 |
| **Gotronic** | cable ties, crimp connectors, glue (+ pliers as an option) | ≈ 10 € | from 4.50 € |
| **Marleva** | M2.5 × 6, M2.5 × 16 screws | < 1 € | not noted |
| **3DJake** | filaments | ≈ 43 € | not noted |
| **JLCPCB** | 5 bare boards | $2 | ≈ $5–25 + VAT |
| **Elecrow** or AliExpress | 3.5″ MSP3520 display (ILI9488, resistive touch) | ≈ $9.50 | variable + customs |
| Miscellaneous (BerryBase, Nkon, Avonec, Opencircuit, AliExpress) | ESP32, short power button, battery, 1 W LED, holder | ≈ 30–40 € | depending on the seller |

**Order of magnitude of the total: 130 to 170 € shipping included**, of which ≈ 43 € of filament (which leaves a lot) and
a good share of shipping costs. Cheaper by grouping sellers or by reusing what you already have
(filament, wire, connectors, screws).
