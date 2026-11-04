// A simulated OnStepX (main branch, 10.29c) for PREVIEW_ONSTEPX.html: the same as
// tests/onstepx_sim.py, in JavaScript. It returns the EXACT bytes OnStepX would write:
// '0'/'1' without '#' for a numeric command, one digit for :MS#, '...#' for a
// read, nothing for a motion command, '0' for an unknown command (feature not compiled in).
// The mechanics are simplified: a GOTO lasts `gotoDuration` seconds in a straight line.
'use strict';

class OnStepXSim {
  constructor() {
    this.log = [];
    this.nominal();
  }

  nominal() {
    this.mute = false;
    this.mount = 'A';              // 'A' alt-az, 'E' German equatorial
    this.timeReady = true;
    this.focuser = true;
    this.rotator = true;
    this.error = 0;
    this.gotoDuration = 4;
    this.ra = 5.5; this.dec = 20; this.az = 180; this.alt = 45;
    this.targetRa = 0; this.targetDec = 0; this.targetAz = 0; this.targetAlt = 0;
    this.tracking = false; this.rate = 'Q';
    this.go = null;                // {from, to, end}
    this.park = 'p'; this.home = true; this.homing = false;
    this.guide = new Set(); this.guideRate = 5;
    this.align = [9, 0, 0];
    this.horizon = -10; this.overhead = 85; this.merE = 60; this.merW = 60;
    this.lat = 48.8364; this.lonLx = -2.3364;
    this.date = '11/01/26'; this.time = '20:00:00';
    this.focPos = 12000; this.focTarget = 12000;
    this.rotDeg = 0; this.rotTarget = 0; this.derot = false;
    this.aux = [0, 0, 1, 0, 0, 0, 0, 0];
    this.zero = 2.0; this.span = 5.0;
    this.backlash1 = 20; this.backlash2 = 15;
    this.pec = '/';
    this.auto = false; this.defaultSide = 'B'; this.merMode = 0;
    this.compensation = 'r'; this.singleAxis = false;
    this.buzzer = true; this.homeAuto = false;
    this.gotoSpeed = 3.5; this.site = 0;
  }

  // ------------------------------------------------------------------ mechanics
  advance() {
    const n = performance.now() / 1000;
    // arrows and joystick (:Mn/:Ms/:Me/:Mw): the position moves at the chosen :Rn rate (multiples of sidereal)
    const dt = Math.min(0.5, n - (this.tGuide || n)); this.tGuide = n;
    if (this.guide.size && !this.go) {
      const v = [0.25, 0.5, 1, 2, 4, 8, 20, 48, 240, 480][this.guideRate] * 0.004178 * dt;
      const d = (c, s) => this.guide.has(c) ? s * v : 0;
      if (this.mount === 'E') { this.dec = Math.max(-90, Math.min(90, this.dec + d('n', 1) + d('s', -1))); this.ra = (this.ra + (d('e', 1) + d('w', -1)) / 15 + 24) % 24; }
      else { this.alt = Math.max(-10, Math.min(90, this.alt + d('n', 1) + d('s', -1))); this.az = (this.az + d('e', -1) + d('w', 1) + 360) % 360; }
      this.home = false;
    }
    if (this.go) {
      const g = this.go;
      const k = Math.min(1, 1 - (g.end - n) / this.gotoDuration);
      for (const c of ['ra', 'dec', 'az', 'alt']) this[c] = g.from[c] + (g.to[c] - g.from[c]) * k;
      if (k >= 1) {
        this.go = null;
        if (this.park === 'I') { this.park = 'P'; this.tracking = false; }
        if (this.homing) { this.homing = false; this.home = true; }
      }
    }
    const step = (v, to, speed) => Math.abs(to - v) < speed ? to : v + Math.sign(to - v) * speed;
    this.focPos = Math.round(step(this.focPos, this.focTarget, 80));
    this.rotDeg = step(this.rotDeg, this.rotTarget, 0.6);
  }

  launch(to) {
    this.go = { from: { ra: this.ra, dec: this.dec, az: this.az, alt: this.alt }, to,
                end: performance.now() / 1000 + this.gotoDuration };
    this.home = false;
  }

  status() {
    let r = '';
    if (!this.tracking) r += 'n';
    if (!this.go) r += 'N';
    r += this.park;
    if (this.home) r += 'H';
    if (this.homing) r += 'h';
    if (this.homeAuto) r += 'B';
    if (this.guide.size) r += 'g';
    if (this.compensation === 'r') r += 'r';
    if (this.compensation === 't') r += 't';
    if (this.singleAxis && this.compensation) r += 's';
    if (!this.compensation) r += { L: '(', S: 'O', K: 'k' }[this.rate] || '';
    if (this.merMode === 1) r += 'v';
    if (this.merMode === 2) r += 'u';
    if (this.buzzer) r += 'z';
    if (this.auto) r += 'a';
    if (this.mount === 'E') r += this.pec;
    r += this.mount + (this.mount === 'E' ? 'T' : 'o');
    r += '2' + '5' + String.fromCharCode(48 + this.error);
    return r;
  }

  // ------------------------------------------------------------------ formats
  static hms(h) {
    h = ((h % 24) + 24) % 24;
    let t = Math.round(h * 36000000);
    const f = t % 10000; t = Math.floor(t / 10000);
    const s = t % 60, m = Math.floor(t / 60) % 60, hh = Math.floor(t / 3600) % 24;
    return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(f).padStart(4, '0')}`;
  }
  static dms(d, sepM = '*', sepS = ':', sign = true, ch = 2) {
    const neg = d < 0;
    let t = Math.round(Math.abs(d) * 3600000);
    const f = t % 1000; t = Math.floor(t / 1000);
    const s = t % 60, m = Math.floor(t / 60) % 60, dd = Math.floor(t / 3600);
    const c = `${String(dd).padStart(ch, '0')}${sepM}${String(m).padStart(2, '0')}${sepS}${String(s).padStart(2, '0')}.${String(f).padStart(3, '0')}`;
    return (sign ? (neg ? '-' : '+') : '') + c;
  }
  static readHms(s) { const [h, m, x] = s.split(':'); return +h + m / 60 + parseFloat(x) / 3600; }
  static readDms(s) {
    const neg = s[0] === '-';
    s = s.replace(/^[+-]/, '');
    const [d, rest] = s.split('*');
    const [m, x = '0'] = rest.split(/[:']/);
    const v = +d + m / 60 + parseFloat(x) / 3600;
    return neg ? -v : v;
  }

  // ------------------------------------------------------------------ commands
  // c: the command without ':' or '#'. Returns a string (the exact bytes), or null: mute.
  reply(c) {
    if (this.mute) return null;
    this.advance();
    const t = s => s + '#', ONE = '1', ZERO = '0', NONE = '';
    const S = OnStepXSim;
    switch (c) {
      case 'GVP': return t('On-Step');
      case 'GVN': return t('10.29c');
      case 'GVH': return t('ESP32 OnStepX');
      case 'GU': return t(this.status());
      case 'GE': return t('00');
      case 'GRH': return t(S.hms(this.ra));
      case 'GDH': return t(S.dms(this.dec));
      case 'GZH': return t(S.dms(((this.az % 360) + 360) % 360, '*', "'", false, 3));
      case 'GAH': return t(S.dms(this.alt, '*', "'"));
      case 'GX42': return t(this.az.toFixed(6));
      case 'GX43': return t(this.alt.toFixed(6));
      case 'GX89': return this.timeReady ? ZERO : ONE;
      case 'GX80': return t(this.time + '.00');
      case 'GX81': return t(this.date);
      case 'GtH': return t(S.dms(this.lat));
      case 'GgH': return t(S.dms(this.lonLx, '*', ':', true, 3));
      case 'Gv': return t('+25.0');
      case 'Gh': return t((this.horizon < 0 ? '-' : '+') + String(Math.abs(this.horizon)).padStart(2, '0') + '*');
      case 'Go': return t(String(this.overhead).padStart(2, '0') + '*');
      case 'GXE9': return t(String(this.merE));
      case 'GXEA': return t(String(this.merW));
      case 'GX96': return t(this.defaultSide);
      case 'GX97': return t(this.gotoSpeed.toFixed(1));
      case 'GX92': return t((40 * 3.5 / this.gotoSpeed).toFixed(3));
      case 'GX93': return t('40.000');
      case '%BR': return t(String(this.backlash1));
      case '%BD': return t(String(this.backlash2));
      case 'W?': return t(String(this.site));
      case 'GM': return t('Paris');
      case 'GN': return t('Mountain');
      case 'GO': case 'GP': return t('');
      case 'A?': return t(this.align.join(''));
      case '$QZ?': return this.mount === 'E' ? t(this.pec === '~' ? 'P' : this.pec === '^' ? 'R' : 'I') : ZERO;
      case 'GX9A': return t('7.4');
      case 'GX9C': return t('81');
      case 'GX9B': return t('1012');
      case 'GX9E': return t('4.3');
    }
    const p2 = c.slice(0, 2);
    // ---- target, GOTO, sync
    if (p2 === 'Sr') { try { this.targetRa = S.readHms(c.slice(2)); return ONE; } catch (e) { return ZERO; } }
    if (p2 === 'Sd') { try { this.targetDec = S.readDms(c.slice(2)); return ONE; } catch (e) { return ZERO; } }
    // OnStepX 10.29c (Convert::dmsToDouble) rejects an apostrophe before the seconds of :Sz / :Sa
    if (p2 === 'Sz') { if (c.includes("'")) return ZERO; this.targetAz = S.readDms(c.slice(2)); return ONE; }
    if (p2 === 'Sa') { if (c.includes("'")) return ZERO; this.targetAlt = S.readDms(c.slice(2)); return ONE; }
    if (c === 'MS' || c === 'MA') {
      if (!this.timeReady) return '3';
      if (this.park === 'P') return '4';
      if (this.go) return '5';
      if (this.error) return '7';
      if (c === 'MS') this.launch({ ra: this.targetRa, dec: this.targetDec, az: (this.targetRa * 15 + 40) % 360, alt: Math.max(12, Math.min(80, 30 + this.targetDec / 2)) });
      else this.launch({ ra: this.ra, dec: this.dec, az: this.targetAz, alt: this.targetAlt });
      return '0';
    }
    if (c === 'MN') { if (this.mount !== 'E') return ZERO; this.launch({ ra: this.ra, dec: this.dec, az: this.az, alt: this.alt }); return '0'; }
    if (c === 'CM' || c === 'CS') {
      if (this.park === 'P') return c === 'CM' ? t('E4') : NONE;
      if (this.align[1] && this.align[1] <= this.align[2]) this.align[1]++;
      this.ra = this.targetRa; this.dec = this.targetDec;
      return c === 'CM' ? t('N/A') : NONE;
    }
    // ---- tracking
    if (c === 'Te') { if (this.park === 'P') return ZERO; this.tracking = true; return ONE; }
    if (c === 'Td') { this.tracking = false; return ONE; }
    if (['TQ', 'TL', 'TS', 'TK'].includes(c)) { this.rate = c[1]; return NONE; }
    if (c === 'Tr') { this.compensation = 'r'; return ONE; }
    if (c === 'To') { this.compensation = 't'; return ONE; }
    if (c === 'Tn') { this.compensation = ''; return ONE; }
    if (c === 'T1') { this.singleAxis = true; return ONE; }
    if (c === 'T2') { this.singleAxis = false; return ONE; }
    if (['T+', 'T-', 'TR'].includes(c)) return NONE;
    // ---- alignment
    if (/^A[1-9]$/.test(c)) { this.align = [9, 1, +c[1]]; this.home = true; this.tracking = true; return ONE; }
    if (c === 'A+') {
      if (!(this.align[1] && this.align[1] <= this.align[2])) return ZERO;
      this.align[1]++; this.ra = this.targetRa; this.dec = this.targetDec; return ONE;
    }
    if (c === 'AW') return ONE;
    // ---- park, home
    if (c === 'hP') { if (this.park === 'P') return ZERO; this.park = 'I'; this.launch({ ra: this.ra, dec: this.dec, az: 0, alt: 90 }); return ONE; }
    if (c === 'hR') { if (this.park !== 'P') return ZERO; this.park = 'p'; return ONE; }
    if (c === 'hQ') return ONE;
    if (c === 'hC') { this.homing = true; this.launch({ ra: this.ra, dec: this.dec, az: 0, alt: 90 }); return NONE; }
    if (c === 'hF') { this.home = true; this.park = 'p'; return NONE; }
    if (c === 'hA0' || c === 'hA1') { this.homeAuto = c === 'hA1'; return NONE; }
    // ---- site, time, limits
    if (['St', 'Sg', 'Sv', 'SG', 'SC', 'SL', 'Sh', 'So'].includes(p2)) {
      const v = c.slice(2);
      if (p2 === 'SC') this.date = v;
      if (p2 === 'SL') this.time = v;
      if (p2 === 'St') this.lat = S.readDms(v);
      if (p2 === 'Sg') this.lonLx = S.readDms(v);
      if (p2 === 'Sh') this.horizon = parseInt(v, 10);
      if (p2 === 'So') this.overhead = parseInt(v, 10);
      if (p2 === 'SC' || p2 === 'SL') this.timeReady = true;
      return ONE;
    }
    if (/^W[0-3]$/.test(c)) { this.site = +c[1]; return NONE; }
    // ---- motion
    if (c === 'Q') { this.go = null; if (this.park === 'I') this.park = 'F'; this.homing = false; this.guide.clear(); return NONE; }
    if (/^Q[nsew]$/.test(c)) { this.guide.delete(c[1]); return NONE; }
    if (/^M[nsew]$/.test(c)) { this.guide.add(c[1]); return NONE; }
    if (p2 === 'Mg') return NONE;
    if (/^R[0-9]$/.test(c)) { this.guideRate = +c[1]; return NONE; }
    if (/^R[GCMFS]$/.test(c) || p2 === 'RA' || p2 === 'RE') return NONE;
    // ---- focuser
    if (this.focuser) {
      if (c === 'FA') return ONE;
      if (c === 'Fg') return t(String(this.focPos));
      if (c === 'FT') return t((this.focPos !== this.focTarget ? 'M' : 'S') + '3');
      if (c === 'Ft') return t('12.5');
      if (c === 'F+') { this.focTarget = this.focPos - 100000; return NONE; }
      if (c === 'F-') { this.focTarget = this.focPos + 100000; return NONE; }
      if (c === 'FQ') { this.focTarget = this.focPos; return NONE; }
      if (p2 === 'Fs') { this.focTarget = parseInt(c.slice(2), 10); return ONE; }
      if (p2 === 'Fr') { this.focTarget = this.focPos + parseInt(c.slice(2), 10); return NONE; }
    }
    // ---- rotator / derotator
    if (this.rotator) {
      if (c === 'rA') return ONE;
      if (c === 'GX98') return t('D');
      if (c === 'rG') {   // sDDD*MM
        const a = Math.abs(this.rotDeg);
        let d = Math.floor(a), mi = Math.round((a - d) * 60);
        if (mi === 60) { d++; mi = 0; }
        return t((this.rotDeg < 0 ? '-' : '+') + String(d).padStart(3, '0') + '*' + String(mi).padStart(2, '0'));
      }
      if (c === 'rT') return t((this.rotDeg !== this.rotTarget ? 'M' : 'S' + (this.derot ? 'D' : '')) + '3');
      if (c === 'rD') return t('0.0125');
      if (c === 'r+' || c === 'r-') { this.derot = c === 'r+'; return NONE; }
      if (c === 'r>') { this.rotTarget = this.rotDeg + 360; return NONE; }
      if (c === 'r<') { this.rotTarget = this.rotDeg - 360; return NONE; }
      if (c === 'rQ') { this.rotTarget = this.rotDeg; return NONE; }
      if (c === 'rZ') { this.rotDeg = this.rotTarget = 0; return NONE; }
      if (p2 === 'rS') { this.rotTarget = S.readDms(c.slice(2) + ':00'); return ONE; }
      if (p2 === 'rr') { this.rotTarget = this.rotDeg + S.readDms(c.slice(2) + ':00'); return NONE; }
    }
    // ---- outputs: dew heater on 3, switch on 5
    if (c === 'GXY0') return t(this.aux.map((_, i) => (i === 2 || i === 4) ? '1' : '0').join(''));
    if (c === 'GXY3') return t('Dew1,3');
    if (c === 'GXY5') return t('Fan,1');
    if (c === 'GXX3') return t(`${this.aux[2]},${this.zero.toFixed(1)},${this.span.toFixed(1)},3.4`);
    if (c === 'GXX5') return t(String(this.aux[4]));
    let m = /^SXX([35]),([VZS])(.*)$/.exec(c);
    if (m) {
      const v = parseFloat(m[3]);
      if (m[2] === 'V') this.aux[+m[1] - 1] = Math.round(v);
      if (m[2] === 'Z') this.zero = v;
      if (m[2] === 'S') this.span = v;
      return ONE;
    }
    // ---- settings
    if ((m = /^SX95,([01])$/.exec(c))) { this.auto = m[1] === '1'; return ONE; }
    if ((m = /^SX94,([012])$/.exec(c))) { this.merMode = +m[1]; return ONE; }
    if ((m = /^SX96,([EWBA])$/.exec(c))) { this.defaultSide = m[1]; return ONE; }
    if ((m = /^SX93,([1-5])$/.exec(c))) { this.gotoSpeed = 3.5 * [0, 2, 1.5, 1, 0.667, 0.5][+m[1]]; return NONE; }
    if ((m = /^SX97,([01])$/.exec(c))) { this.buzzer = m[1] === '1'; return ONE; }
    if ((m = /^SXE9,(-?\d+)$/.exec(c))) { this.merE = +m[1]; return ONE; }
    if ((m = /^SXEA,(-?\d+)$/.exec(c))) { this.merW = +m[1]; return ONE; }
    if ((m = /^\$BR(\d+)$/.exec(c))) { this.backlash1 = +m[1]; return ONE; }
    if ((m = /^\$BD(\d+)$/.exec(c))) { this.backlash2 = +m[1]; return ONE; }
    if (c === '$QZ+' ) { this.pec = '~'; return NONE; }
    if (c === '$QZ-' ) { this.pec = '/'; return NONE; }
    if (c === '$QZ/' ) { this.pec = '^'; return NONE; }
    if (c === '$QZZ' || c === '$QZ!') return NONE;
    if (c.startsWith('SX')) return ONE;
    if (c === 'B+' || c === 'B-') return NONE;
    return ZERO;   // unknown: feature not compiled into this simulated OnStepX
  }

  // A complete frame ":XX...#" -> raw reply (or null)
  frame(t) {
    const i = t.indexOf(':'), j = t.lastIndexOf('#');
    if (i < 0 || j < i) return '';
    const c = t.slice(i + 1, j);
    const r = this.reply(c);
    this.log.push({ c, r, t: performance.now() });
    if (this.log.length > 4000) this.log.splice(0, 2000);
    return r;
  }
}
window.OnStepXSim = OnStepXSim;
