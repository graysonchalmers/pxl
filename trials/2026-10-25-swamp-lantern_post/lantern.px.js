// Lantern post from kiln's swamp kit (Tool-Blockout3D smoke/swamp.kx.js lantern_post), swamp palette.
pal({ k: "#1a1a16", b: "#86623e", B: "#6e5034", h: "#a07a50", d: "#5e4632", i: "#646a72", I: "#43484e",
  y: "#ffe2a0", Y: "#ffc860", o: "#e0943a", u: "#fff6d8" })

var TAU = Math.PI * 2
const lanternPost = (c) => {
  c.rect(2, 36, 8, 3, "d")                                                    // foot
  c.rect(4, 4, 4, 33, "b"); c.vline(4, 4, 33, "h"); c.vline(7, 4, 33, "B")   // post
  c.rect(4, 3, 16, 2, "d")                                                    // arm
  c.line(8, 10, 13, 5, "d"); c.line(8, 11, 13, 6, "d")                         // brace
  c.vline(16, 5, 2, "i")                                                       // hook
  c.rect(14, 7, 5, 2, "I"); c.rect(13, 9, 7, 1, "i")                           // cap
  c.rect(14, 10, 5, 6, "Y"); c.vline(14, 10, 6, "i"); c.vline(18, 10, 6, "i") // glass + frame
  c.rect(13, 16, 7, 1, "I")                                                    // base
}
// flame: core brightness flickers
const lanternFlame = (c, b = 1) => { c.rect(15, 11, 3, 4, b > 0.5 ? "y" : "o"); c.px(16, 12, b > 0.2 ? "u" : "y") }

sprite("lantern_post", { w: 22, h: 40, outline: "k" }, lanternPost, (c) => lanternFlame(c))

anim("lantern_post_idle", { w: 22, h: 40, frames: 8, fps: 8, outline: "k" }, lanternPost,
  (c) => lanternFlame(c, 0.5 + 0.5 * Math.sin(c.phase * TAU * 2) * Math.cos(c.phase * TAU * 3)))

// inventory item: hand-drawn 14x14 + outline = 16x16, fills a pixel slot edge to edge
sprite("lantern_post_item", { w: 14, h: 14, outline: "k" }, `
  dddddddddddd..
  bhBd......i...
  bhB.d....III..
  bhB..d..iiiii.
  bhB.....iYyYi.
  bhB.....iyuyi.
  bhB.....iyuyi.
  bhB.....iYyYi.
  bhB.....IIIII.
  bhB...........
  bhB...........
  bhB...........
  bhB...........
  dddd..........`)
