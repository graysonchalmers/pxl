// Stilt hut from kiln's swamp kit (Tool-Blockout3D smoke/swamp.kx.js stilt_hut), swamp palette, 3/4-front view.
pal({ k: "#1e2018", b: "#86623e", B: "#6e5034", w: "#8a6a48", W: "#ccad84", d: "#5e4632",
  t: "#c8b26a", T: "#857238", y: "#ffe2a0", Y: "#ffc860", a: "#3f5a45", A: "#2c4032", r: "#6c8a70" })

var TAU = Math.PI * 2
const hut = (c) => {
  for (const x of [6, 25]) { c.rect(x, 27, 3, 19, "b"); c.vline(x + 2, 27, 19, "B") }   // stilts
  c.rect(4, 26, 26, 2, "W"); c.hline(4, 28, 26, "d")                                       // deck
  c.rect(7, 13, 20, 13, "w")                                                              // wall
  for (let x = 8; x < 27; x += 3) c.vline(x, 13, 13, x % 2 ? "W" : "d")                  // planks
  c.rect(9, 17, 5, 9, "d")                                                                // door
  c.rect(19, 17, 5, 4, "Y"); c.vline(21, 17, 4, "d")                                      // window
  c.poly([2, 14, 17, 2, 32, 14], "t"); c.poly([2, 14, 17, 2, 4, 14], "T"); c.hline(2, 14, 31, "T") // thatch
  c.line(17, 2, 17, 1, "W")
  for (let i = 0; i < 6; i++) { c.px(5 + i * 5, 12 + (i % 2), "T") }                     // straw tufts
  for (let i = 0; i < 4; i++) c.hline(11 + i, 31 + i * 4, 4, "W")                         // ladder rungs
  c.line(10, 29, 14, 45, "d"); c.line(15, 29, 19, 45, "d")                                // ladder rails
}
const water = (c, ph = 0) => {
  c.rect(0, 44, 34, 6, "a"); c.rect(0, 47, 34, 3, "A")
  for (let i = 0; i < 4; i++) c.hline(Math.round(3 + i * 8 + Math.sin((ph + i * 0.25) * TAU) * 2), 45 + (i % 2) * 2, 3, "r")
}

sprite("stilt_hut", { w: 34, h: 50, outline: "k" }, (c) => water(c), hut)

// idle: window flickers, water ripples
anim("stilt_hut_idle", { w: 34, h: 50, frames: 8, fps: 8, outline: "k" }, (c) => water(c, c.phase), hut, (c) => {
  const f = Math.sin(c.phase * TAU * 2) + Math.sin(c.phase * TAU * 3)
  if (f > 0.6) c.rect(19, 17, 2, 4, "y"); else if (f < -0.8) c.rect(22, 17, 2, 4, "w")
})

// water-less variant for placing in scenes: stilts end bare, the scene supplies the water
anim("stilt_hut_dry_idle", { w: 34, h: 46, frames: 8, fps: 8, outline: "k" }, hut, (c) => {
  const f = Math.sin(c.phase * TAU * 2) + Math.sin(c.phase * TAU * 3)
  if (f > 0.6) c.rect(19, 17, 2, 4, "y"); else if (f < -0.8) c.rect(22, 17, 2, 4, "w")
})
