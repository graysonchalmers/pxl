// Spike: pxl lighting + normal maps. The swamp frog at night, lit by a swinging lantern; same scene by day.
include("../2026-10-26-swamp-frog/frog.px.js")     // frog palette keys: k d g l b e p s
pal({ n: "#101828", N: "#1c2a44", m: "#3a3226", M: "#5e4632", w: "#86623e", o: "#2c3e2a", O: "#3e5e2e",
  y: "#ffd27a", Y: "#fff2c0", i: "#4a4a52" })

// mud bank + reeds; bevelled so the lantern rakes across it
function swampGround(c) {
  c.rect(0, 50, 96, 14, "m"); c.rect(0, 50, 96, 2, "M")
  for (let x = 2; x < 96; x += 7) c.line(x, 50, x + ((x * 7) % 3) - 1, 40 + ((x * 13) % 6), "O")
  for (let x = 5; x < 96; x += 11) c.line(x, 50, x + 1, 44 + ((x * 5) % 4), "o")
}
// post + hanging lantern, frame = swing angle (radians)
function lantern(c, a) {
  c.rect(70, 18, 3, 33, "w"); c.rect(64, 18, 9, 2, "w")
  const lx = Math.round(65 + Math.sin(a) * 3), ly = 26
  c.line(65, 20, lx, ly - 2, "i")
  c.rect(lx - 2, ly - 2, 5, 6, "i"); c.rect(lx - 1, ly - 1, 3, 4, "y"); c.px(lx, ly, "Y")
  return [lx, ly + 1]
}
const frogAt = (c, x, y) => { c.stamp("frog", x, y) }

function night(c, a, flick) {
  c.rect(0, 0, 96, 64, "n"); c.rect(0, 0, 96, 30, "N")
  swampGround(c)
  frogAt(c, 34, 28)
  const [lx, ly] = lantern(c, a)
  c.lamp(lx, ly, { r: 56 * flick, power: 1.3, color: "#ffb35c", z: 5 })
}

scene("frog_night", { w: 96, h: 64 },
  layer("world", (c) => night(c, 0, 1)),
  bump("dome", { on: "gldb", depth: 2 }), bump("bevel", { on: "mM", w: 2 }),
  lighting({ cell: 1, smooth: true, ambient: 0.06, ambientColor: "#6a7ab8", emit: "yY", relief: 1.5 }))

anim("frog_night_swing", { w: 96, h: 64, frames: 16, fps: 12 },
  layer("world", (c) => night(c, Math.sin(c.phase * Math.PI * 2) * 0.9, 0.92 + 0.08 * Math.sin(c.phase * Math.PI * 6))),
  bump("dome", { on: "gldb", depth: 2 }), bump("bevel", { on: "mM", w: 2 }),
  lighting({ cell: 1, smooth: true, ambient: 0.06, ambientColor: "#6a7ab8", emit: "yY", relief: 1.5 }))

scene("frog_day", { w: 96, h: 64 },
  layer("world", (c) => { c.rect(0, 0, 96, 64, "#9cc4d8"); swampGround(c); frogAt(c, 34, 28); lantern(c, 0) }),
  bump("dome", { on: "gldb", depth: 2 }),
  lighting({ cell: 1, sky: 1, skyColor: "#fff8e8", skyReach: 64, ambient: 0.55, relief: 1, skyDir: [1, -1] }))
