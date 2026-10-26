// Glowing toadstool clump from kiln's swamp kit (Tool-Blockout3D smoke/swamp.kx.js glow_toadstools), swamp palette.
pal({ k: "#1e2a24", g: "#6b5740", G: "#4a3c2c", s: "#cfc8ae", m: "#b4ad94", S: "#857e68",
  C: "#2e4a3e", c: "#4a8064", l: "#6fbf98", e: "#9fe8c8", w: "#e8fff4" })

var TAU = Math.PI * 2
// one toadstool: stem from (x, base) up h px, cap of half-width r
const shroom = (c, x, base, h, r) => {
  const top = base - h
  c.rect(x - 1, top, 3, h, "m"); c.vline(x - 1, top, h, "s"); c.vline(x + 1, top, h, "S")
  const ry = Math.ceil(r * 0.7)
  for (let dy = -ry; dy <= 0; dy++) { const hw = Math.round(r * Math.sqrt(1 - (dy / ry) ** 2)); c.hline(x - hw, top + dy, hw * 2 + 1, "c") }
  c.hline(x - r + 1, top, r * 2 - 1, "C")                               // gill shadow
  c.ellipse(x - Math.floor(r / 3), top - Math.ceil(r * 0.35), Math.ceil(r / 2), 1, "l")
}
const clump = (c) => {
  c.ellipse(16, 27, 12, 3, "g"); c.hline(6, 29, 20, "G"); c.hline(9, 30, 14, "G")
  shroom(c, 23, 27, 6, 4)
  shroom(c, 16, 27, 11, 7)
  shroom(c, 8, 28, 5, 4)
  shroom(c, 12, 29, 3, 2)
}

sprite("glow_toadstools", { w: 32, h: 32, outline: "k" }, clump)

// idle: caps breathe light, two spores drift up
anim("glow_toadstools_idle", { w: 32, h: 32, frames: 8, fps: 8, outline: "k" }, clump, (c) => {
  const b = 0.5 + 0.5 * Math.sin(c.phase * TAU)
  if (b > 0.35) { c.px(14, 12, "e"); c.px(21, 18, "e"); c.px(6, 21, "e") }
  if (b > 0.8) { c.px(13, 12, "w"); c.px(15, 11, "e"); c.px(22, 18, "e") }
  for (const [x0, off] of [[18, 0], [10, 0.5]]) {
    const p = (c.phase + off) % 1
    c.px(x0 + Math.round(Math.sin(p * TAU) * 1.5), Math.round(14 - p * 12), p < 0.7 ? "e" : "l")
  }
})

// inventory item: same clump cropped to its pixels so it fills a slot
sprite("glow_toadstools_item", { base: "glow_toadstools", crop: true })
