// Swamp UI kit, pixel-art variant: same pieces as the vex kit, palette-swap variants for button states.
// No slice export in pxl: margins (px, before scaling) are listed by each sprite for the demo's border-image.
pal({ k: "#1a2014", w: "#f4f0de", d: "#3e2e20", b: "#5e4632", B: "#8a6a48", L: "#ccad84",
  m: "#3f5a45", M: "#2a3d30", g: "#4e7a34", G: "#8db04e", q: "#3e5e2e", n: "#9fe8c8", N: "#4a9a74", a: "#ffe2a0", A: "#c08a3a",
  r: "#b8503a" })

// panel 24x24, margin 7
sprite("px_panel", { w: 24, h: 24, outline: "k" },
  rect(0, 0, 24, 24, "b"), hline(1, 0, 22, "B"), rect(3, 3, 18, 18, "m"), rect(3, 19, 18, 2, "M"), hline(3, 3, 18, "k"),
  px(1, 1, "d"), px(22, 1, "d"), px(1, 22, "d"), px(22, 22, "d"))
// button 24x12, margin 5
sprite("px_button", { w: 24, h: 12, outline: "k" }, rect(0, 0, 24, 12, "q"), rect(0, 0, 24, 9, "g"), hline(2, 1, 9, "w"))
sprite("px_button_hover", { base: "px_button", swap: { g: "G" } })
sprite("px_button_pressed", { w: 24, h: 12, outline: "k" }, rect(0, 2, 24, 10, "q"), rect(0, 2, 24, 8, "q"), hline(2, 3, 9, "g"))
sprite("px_button_danger", { base: "px_button", swap: { g: "r", q: "d" } })
// bar frame 24x8, margin 3; fills 20x6, margin 2
sprite("px_bar_frame", { w: 24, h: 8, outline: "k" }, rect(0, 0, 24, 8, "b"), rect(2, 2, 20, 4, "k"))
sprite("px_bar_hp", { w: 20, h: 6 }, rect(0, 0, 20, 6, "N"), hline(0, 0, 20, "n"), hline(0, 1, 20, "n"))
sprite("px_bar_stamina", { base: "px_bar_hp", swap: { N: "A", n: "a" } })
// slot 16x16, margin 4
sprite("px_slot", { w: 16, h: 16, outline: "k" }, rect(0, 0, 16, 16, "b"), rect(2, 2, 12, 12, "M"), hline(2, 2, 12, "k"))
