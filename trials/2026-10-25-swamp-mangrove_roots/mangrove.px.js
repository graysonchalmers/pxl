// Mangrove from kiln's swamp kit (Tool-Blockout3D smoke/swamp.kx.js mangrove_roots), swamp palette. No water: scenes supply it.
pal({ k: "#1a2014", b: "#86623e", B: "#6e5034", h: "#a07a50", L: "#8db04e", f: "#4e7a34", F: "#3e5e2e" })

var TAU = Math.PI * 2
// arching prop roots: from the trunk base out and down to the waterline
const mangroveRoots = (c) => {
  for (const [ex, mid] of [[2, 9], [9, 13], [16, 17], [24, 23], [31, 27], [38, 31]]) {
    const pts = [[20, 34], [mid, 38], [ex, 54]]
    for (let t = 0; t <= 1; t += 0.05) {
      const x = (1 - t) ** 2 * pts[0][0] + 2 * (1 - t) * t * pts[1][0] + t * t * pts[2][0]
      const y = (1 - t) ** 2 * pts[0][1] + 2 * (1 - t) * t * pts[1][1] + t * t * pts[2][1]
      c.px(Math.round(x), Math.round(y), t < 0.5 ? "b" : "B"); c.px(Math.round(x) + 1, Math.round(y), "B")
    }
  }
  c.rect(18, 18, 4, 18, "b"); c.vline(18, 18, 18, "h"); c.vline(21, 18, 18, "B")       // trunk
}
// canopy puffs, swaying sideways by `dx`
const mangroveCanopy = (c, dx = 0) => {
  for (const [x, y, r, col] of [[12, 12, 6, "F"], [28, 12, 6, "F"], [20, 9, 8, "f"], [13, 8, 5, "f"], [27, 8, 5, "f"], [17, 5, 4, "L"], [25, 6, 3, "L"]])
    c.circ(x + dx, y, r, col)
  c.hline(10 + dx, 17, 20, "F")
}

sprite("mangrove", { w: 40, h: 56, outline: "k" }, mangroveRoots, (c) => mangroveCanopy(c))

// idle: canopy sways a pixel each way
anim("mangrove_idle", { w: 40, h: 56, frames: 8, fps: 8, outline: "k" }, mangroveRoots,
  (c) => mangroveCanopy(c, Math.round(Math.sin(c.phase * TAU))))

// inventory item: hand-drawn 14x14 + outline = 16x16, fills a pixel slot edge to edge
sprite("mangrove_item", { w: 14, h: 14, outline: "k" }, `
  ....LLLff.....
  ..fLLLfffLf...
  .ffLLffffLLff.
  fffffffffffffF
  FfffffffffffFF
  .FFFFfffFFFFF.
  ...FFFbbFFF...
  ......bh......
  ......bh......
  .....bbhb.....
  ....b.bh.b....
  ...b..bb..b...
  ..b..b..b..b..
  .B..B....B..B.`)
