// vex particles() output (vex trials/2026-10-26-swamp-vfx) quantized to the pxl swamp ramps: nearest colour, no dither.
pal({ n: "#1e2a1e", a: "#6b4a1a", b: "#b8862a", c: "#e8d24a", d: "#fff6c0", e: "#2a4f9a", f: "#4f8ad8", g: "#9ad8e8", h: "#e0f6fa",
  i: "#5c5e52", j: "#8a8c7e", l: "#a8aa9a", m: "#c4c6b6", o: "#2a7a5a", p: "#4fc08a", q: "#7ae8a8", r: "#e0fff0" })
const FX = { fireflies: [40, 32, "nabcd"], splash: [32, 24, "nefgh"], sparkle: [32, 32, "nabcd"], smoke: [24, 40, "nijlm"], wisp: [24, 32, "nopqr"] }
for (const [k, [w, h, keys]] of Object.entries(FX))
  anim("vx_" + k, { w, h, fps: 16 }, ...Array.from({ length: 16 }, (_, i) =>
    frame(image(`frames/${k}_${String(i).padStart(2, "0")}.png`, 0, 0, { w, h, palette: keys }))))
