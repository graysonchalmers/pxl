// Fake-3D pixel turntables. Two routes:
// 1. mangrove: kiln renders the real 3D model in 12 orbit frames (background keyed out), pxl downsamples each into the swamp palette.
// 2. lantern: hand-faked with math. The arm's length is cos(angle); when it swings behind the post it draws first and gets hidden.
pal({ k: "#1a2014", b: "#86623e", B: "#6e5034", h: "#a07a50", d: "#5e4632", D: "#3e2e20",
  L: "#8db04e", l: "#6e9a40", f: "#4e7a34", F: "#3e5e2e", G: "#2e4628",
  i: "#646a72", I: "#43484e", y: "#ffe2a0", Y: "#ffc860", o: "#e0943a", u: "#fff6d8" })

var TAU = Math.PI * 2
const N = 12

anim("mangrove_turntable", { w: 40, h: 50, fps: 8, outline: "k" },
  ...[...Array(N)].map((_, i) => frame(image(`../keyed/mangrove_roots/f${String(i + 1).padStart(2, "0")}.png`, 0, 0,
    { w: 40, h: 50, palette: "LlfFGbBhdD" }))))

anim("lantern_turntable", { w: 30, h: 44, frames: N, fps: 8, outline: "k" }, (c) => {
  const a = (c.frame / N) * TAU, ca = Math.cos(a), sa = Math.sin(a), px = 13
  const tip = px + 1 + Math.round(ca * 11), lx = tip - 2           // lantern hangs from the arm tip
  const lantern = () => {
    c.vline(tip, 3, 2, "i")
    c.rect(lx, 5, 5, 2, "I"); c.rect(lx, 7, 5, 6, "Y"); c.vline(lx, 7, 6, "i"); c.vline(lx + 4, 7, 6, "i"); c.rect(lx, 13, 5, 1, "I")
    c.rect(lx + 1, 8, 3, 4, sa > 0 ? "y" : "Y"); if (sa > 0) c.px(lx + 2, 9, "u")             // flame faces us on the near half
  }
  const armLen = Math.abs(tip - (px + 1))
  if (sa < 0) lantern()                                               // behind the post: draw first, post covers it
  c.rect(px, 2, 4, 40, "b")                                           // post, shading follows the light side
  c.vline(px + (ca > 0 ? 0 : 3), 2, 40, "h"); c.vline(px + (ca > 0 ? 3 : 0), 2, 40, "B")
  c.rect(px - 3, 41, 10, 3, "d")
  c.rect(Math.min(px + 1, tip), 2, armLen + 1, 2, sa < 0 ? "D" : "d") // arm, darker when it points away
  if (sa >= 0) lantern()
})
