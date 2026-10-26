// Swamp VFX: procedural particle loops, 16 frames @ 16 fps. Fades step down colour ramps (no alpha in pixel art).
pal({ k: "#141a10", n: "#1e2a1e" })
shades("yYZz", "#e8d24a")          // firefly / sparkle yellow, dark -> light
shades("wWv", "#9ad8e8")           // water
shades("sSt", "#a8aa9a")           // smoke (swamp stone)
shades("gGh", "#7ae8a8")           // will-o-wisp green
var TAU = Math.PI * 2
const R = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x) }  // fixed per-particle randoms
const fade = (keys, t) => keys[Math.min(keys.length - 1, Math.floor(t * keys.length))]          // t 1 = brightest

anim("fx_fireflies", { w: 40, h: 32, frames: 16, fps: 16 }, (c) => { c.rect(0, 0, c.w, c.h, "n")
  for (let i = 0; i < 7; i++) {
    const a = c.phase * TAU
    const x = 20 + Math.sin(a + i * 2.1) * (8 + R(i, 1) * 9), y = 16 + Math.sin(2 * a + i * 1.3) * (4 + R(i, 2) * 6)
    const blink = (Math.sin(a * 2 + i * 2.7) + 1) / 2
    c.px(Math.round(x), Math.round(y), fade("YZz", blink))
  }
}, glow("Zz", { r: 3, strength: 0.7, bands: 2 }))

anim("fx_splash", { w: 32, h: 24, frames: 16, fps: 16 }, (c) => { c.rect(0, 0, c.w, c.h, "n")
  const t = c.phase
  const rx = 2 + t * 13, ry = rx * 0.3
  if (t < 0.85) c.ellipse(16, 19, rx, ry, fade("wWv", 1 - t), true)
  for (let i = 0; i < 6; i++) {
    const dir = (i / 5 - 0.5) * 1.6, v = 0.8 + R(i, 3) * 0.6
    const x = 16 + dir * 14 * t * v, y = 18 - (16 * v * t - 22 * t * t)
    if (y < 20 && t < 0.9) c.px(Math.round(x), Math.round(y), fade("wWv", 1 - t * 0.8))
  }
})

anim("fx_sparkle", { w: 32, h: 32, frames: 16, fps: 16 }, (c) => { c.rect(0, 0, c.w, c.h, "n")
  const t = c.phase, e = 1 - (1 - t) * (1 - t)       // ease-out burst
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * TAU + R(i, 4) * 0.4, d = e * (8 + R(i, 5) * 6)
    const x = Math.round(16 + Math.cos(a) * d), y = Math.round(16 + Math.sin(a) * d), k = fade("yYZz", 1 - t)
    c.px(x, y, k)
    if (t < 0.4) { c.px(x + 1, y, k); c.px(x - 1, y, k); c.px(x, y + 1, k); c.px(x, y - 1, k) }   // star shape early
  }
  if (t < 0.25) c.ellipse(16, 16, 3 - t * 8, 3 - t * 8, "z")
}, glow("z", { r: 4, strength: 0.6, bands: 2 }))

anim("fx_smoke", { w: 24, h: 40, frames: 16, fps: 16, outline: "k" }, (c) => {
  for (let i = 0; i < 4; i++) {
    const t = (c.phase + i / 4) % 1
    const x = 12 + Math.sin(t * TAU + i) * 3, y = 34 - t * 28, r = 2 + Math.sin(t * Math.PI) * 4
    c.ellipse(Math.round(x), Math.round(y), r, r, fade("sSt", 1 - t * 0.9))
  }
})

anim("fx_wisp", { w: 24, h: 32, frames: 16, fps: 16 }, (c) => { c.rect(0, 0, c.w, c.h, "n")
  const a = c.phase * TAU, by = 20 + Math.sin(a) * 2
  for (let i = 0; i < 5; i++) {                    // flame tongues licking up
    const t = (c.phase * 2 + i / 5) % 1
    const x = 12 + Math.sin(t * TAU * 1.5 + i) * (1 + t * 2), y = by - t * 12
    c.ellipse(Math.round(x), Math.round(y), 3 - t * 2.5, 3 - t * 2.5, fade("gGh", 1 - t))
  }
  c.ellipse(12, Math.round(by), 2, 2, "h")
}, glow("h", { r: 4, strength: 0.5, bands: 3, color: "#7ae8a8" }))

sheet("fx_sheet", ["fx_*"], { pad: 4 })
