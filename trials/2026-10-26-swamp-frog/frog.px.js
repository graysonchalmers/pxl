// Swamp frog: still + 8-frame hop (8 fps). Greens/browns from kiln's swamp style.
pal({ k: "#1e2416", d: "#3e5e2e", g: "#4e7a34", l: "#8db04e", b: "#ccad84", e: "#e8d24a", p: "#1b1630", s: "#50662e" })

// y = body lift, sq = squash (+) / stretch (-), legs = 0 tucked .. 1 extended
function drawFrog(c, y, sq, legs) {
  const cy = 16 - y
  // back legs
  if (legs > 0.5) { c.line(5, cy + 2, 2, cy + 6, "d", 2); c.line(18, cy + 2, 21, cy + 6, "d", 2) }
  else { c.ellipse(5, cy + 3, 3, 2, "d"); c.ellipse(18, cy + 3, 3, 2, "d"); c.px(19, cy, "g") }  // fills the outline step lint flagged
  // body
  c.ellipse(11.5, cy, 7 + sq, 5 - sq, "g")
  c.ellipse(11.5, cy + 2, 4 + sq, 2, "b")          // pale belly
  c.ellipse(9, cy - 2, 3, 1, "l")                  // back highlight
  // front feet
  c.rect(7, cy + 4 - sq, 2, 1, "d"); c.rect(14, cy + 4 - sq, 2, 1, "d")
  // eyes
  for (const ex of [7, 15]) { c.ellipse(ex, cy - 4 + sq, 2, 2, "g"); c.px(ex, cy - 4 + sq, "e"); c.px(ex, cy - 5 + sq, "p") }
  // mouth
  c.line(9, cy + 1, 14, cy + 1, "s")
}

sprite("frog", { w: 24, h: 24, outline: "k" }, (c) => drawFrog(c, 0, 0, 0))

// crouch, launch, rise, apex, fall, land, settle, rest
const HOP = [[0, 1, 0], [2, -1, 1], [6, -1, 1], [8, 0, 1], [6, 0, 1], [2, -1, 0], [0, 1, 0], [0, 0, 0]]
anim("frog_hop", { w: 24, h: 24, frames: 8, fps: 8, outline: "k" }, (c) => {
  const [y, sq, legs] = HOP[c.frame]
  drawFrog(c, y, sq, legs)
})
