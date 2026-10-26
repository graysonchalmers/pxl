// Spike: kiln swamp props (rendered at yaw 45 / pitch 30 on magenta, keyed) -> pixel-art iso props on a hand-drawn iso tile map.
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
