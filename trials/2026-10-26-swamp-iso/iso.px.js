// Spike: kiln swamp props (rendered at yaw 45 / pitch 30 on magenta, keyed) -> pixel-art iso props on a hand-drawn iso tile map.
include("../2026-10-26-swamp-frog/frog.px.js")   // frog keeps its own palette (defined before ours)
pal({ k: "#141a10",
  a: "#3e5e2e", b: "#4e7a34", c: "#8db04e",            // leaf
  d: "#5e4632", e: "#86623e", f: "#ccad84",            // wood / bark
  g: "#7c7e70", h: "#a8aa9a", i: "#c4c6b6",            // stone
  j: "#2e6a58", l: "#5fc8a0", m: "#b8f0d8",            // glow toadstool teal
  n: "#6b5740", o: "#4a3c2c",                          // mud
  w: "#2c4a3c", W: "#3f5a45", x: "#6a8a70",            // swamp water
  y: "#ffd27a", t: "#b89a5c", T: "#8a7240" })            // t/T thatch
const KEYS = "kabcdefghijlmnoytT"

// props: kiln shot -> fixed pixel height, quantized to the swamp keys, outlined
const PROPS = { stilt_hut: 44, bald_cypress: 48, glow_toadstools: 18, mangrove_roots: 26, lantern_post: 26,
  cattails: 18, mossy_boulders: 18, lily_pads: 14, boardwalk: 22 }
for (const [n, h] of Object.entries(PROPS))
  sprite("p_" + n, { w: h, h: h, outline: "k", crop: true }, image(`shots/k_${n}.png`, 0, 0, { w: h, h: h, palette: KEYS, alpha: 128 }))

// iso tiles 32x16 (2:1), top faces only; edge shading by hand
const diamond = (c, x, y, fill, edge) => {
  c.poly([x + 16, y, x + 32, y + 8, x + 16, y + 16, x, y + 8], fill)
  c.line(x + 1, y + 8, x + 15, y + 15, edge); c.line(x + 17, y + 15, x + 31, y + 8, edge)
}
sprite("t_water", { w: 32, h: 16 }, (c) => { diamond(c, 0, 0, "w", "w"); c.line(10, 7, 14, 7, "x"); c.line(18, 10, 21, 10, "W") })
sprite("t_mud", { w: 32, h: 16 }, (c) => { diamond(c, 0, 0, "n", "o"); c.px(12, 6, "o"); c.px(20, 9, "o") })
sprite("t_grass", { w: 32, h: 16 }, (c) => { diamond(c, 0, 0, "b", "a"); c.px(11, 6, "c"); c.px(19, 8, "c"); c.px(15, 11, "a") })

// 8x8 map: W water, M mud, G grass; props by cell
const MAP = [
  "WWWWWWWW",
  "WWGGGWWW",
  "WGGGGMWW",
  "WGGMMMMW",
  "WWGMMGGW",
  "WWWMGGGW",
  "WWWWGGWW",
  "WWWWWWWW"]
const PLACE = [[1, 1, "bald_cypress"], [3, 4, "stilt_hut"], [1, 3, "glow_toadstools"], [5, 2, "lantern_post"],
  [4, 6, "mossy_boulders"], [6, 5, "cattails"], [1, 6, "lily_pads"], [6, 1, "lily_pads"], [5, 4, "mangrove_roots"], [2, 5, "cattails"]]
const W = 288, H = 200, OX = W / 2 - 16, OY = 40
const iso = (cx, cy) => [OX + (cx - cy) * 16, OY + (cx + cy) * 8]
scene("swamp_iso", { w: W, h: H, bg: "#101418" }, (c) => {
  const T = { W: "t_water", M: "t_mud", G: "t_grass" }
  MAP.forEach((row, cy) => [...row].forEach((t, cx) => { const [x, y] = iso(cx, cy); c.stamp(T[t], x, y) }))
  // props sorted back to front (cx+cy), feet on the tile centre
  for (const [cx, cy, n] of [...PLACE].sort((p, q) => p[0] + p[1] - q[0] - q[1])) {
    const [x, y] = iso(cx, cy), h = PROPS[n]
    c.stamp("p_" + n, x + 16 - Math.round(h / 2), y + 10 - h)
  }
})
sheet("iso_props", ["p_*"], { pad: 2 })

// ---- Animated night map: rippling water, fireflies, frog hopping cell to cell, lantern + hut window lit by pxl lighting.
const FROG_PATH = [[4, 5], [5, 5], [5, 4], [4, 4]]          // loops; one hop per 8 frames
const HOP_F = 8, NF = FROG_PATH.length * HOP_F
anim("swamp_iso_night", { w: W, h: H, frames: NF, fps: 12 },
  layer("world", (c) => {
    const ph = c.phase, T = { W: "t_water", M: "t_mud", G: "t_grass" }
    c.rect(0, 0, W, H, "#0b0f14")
    MAP.forEach((row, cy) => [...row].forEach((t, cx) => {
      const [x, y] = iso(cx, cy); c.stamp(T[t], x, y)
      if (t === "W") {                                    // ripple: a short highlight sliding along each water tile
        const k = (ph * 2 + (cx * 0.37 + cy * 0.61)) % 1, rx = x + 9 + Math.round(k * 12), ry = y + 5 + Math.round(k * 5)
        c.line(rx, ry, rx + 3, ry, k < 0.5 ? "x" : "W")
      }
    }))
    // frog position: lerp between cells with a hop arc
    const i = Math.floor(c.frame / HOP_F), u = (c.frame % HOP_F) / HOP_F
    const [ax, ay] = FROG_PATH[i], [bx, by] = FROG_PATH[(i + 1) % FROG_PATH.length]
    const fcx = ax + (bx - ax) * u, fcy = ay + (by - ay) * u, lift = Math.round(Math.sin(u * Math.PI) * 8)
    const items = [...PLACE.map(([cx, cy, n]) => ({ d: cx + cy, draw: () => {
      const [x, y] = iso(cx, cy), h = PROPS[n]; c.stamp("p_" + n, x + 16 - Math.round(h / 2), y + 10 - h) } })),
      { d: fcx + fcy + 0.01, draw: () => { const [x, y] = iso(fcx, fcy); c.stamp("frog", Math.round(x + 3), Math.round(y - 14 - lift)) } }]
    for (const it of items.sort((p, q) => p.d - q.d)) it.draw()
    // fireflies drifting over the map
    for (let f = 0; f < 9; f++) {
      const a = ph * Math.PI * 2, fx = W / 2 + Math.sin(a + f * 2.3) * (40 + (f * 37) % 70), fy = 70 + Math.sin(2 * a + f * 1.7) * (18 + (f * 13) % 30)
      if ((Math.sin(a * 3 + f * 2.1) + 1) / 2 > 0.3) { c.px(Math.round(fx), Math.round(fy), "y"); c.lamp(Math.round(fx), Math.round(fy), { r: 16, color: "#ffe680", power: 1 }) }
    }
    // lantern post (cell 5,2) and hut window (cell 3,4)
    const [lx, ly] = iso(5, 2), [hx, hy] = iso(3, 4), fl = 0.9 + 0.1 * Math.sin(ph * Math.PI * 10)
    c.rect(lx + 18, ly - 11, 2, 3, "y"); c.rect(hx + 13, hy - 17, 2, 2, "y")     // visible flame + window (emit, never darkened)
    c.lamp(lx + 19, ly - 10, { r: 90 * fl, power: 1.6, color: "#ffb35c", z: 8 })
    c.lamp(hx + 14, hy - 16, { r: 55, power: 1.2, color: "#ffc070", z: 8 })
  }),
  lighting({ cell: 1, smooth: true, ambient: 0.22, ambientColor: "#6a7ac0", emit: "y" }))
