// Swamp scene combining the trial sprites (glow_toadstools, stilt_hut, mangrove_roots) from kiln's swamp kit.
include("../2026-10-25-swamp-toadstools/toadstools.px.js")
include("../2026-10-25-swamp-stilt_hut/stilt_hut.px.js")
include("../2026-10-25-swamp-mangrove_roots/mangrove.px.js")
pal({ n: "#1c2a2a", N: "#253a36", m: "#30483e", a: "#3f5a45", A: "#2c4032", r: "#6c8a70", g: "#6b5740", G: "#4a3c2c",
  R: "#50662e", q: "#7a9440", f: "#e8f0a0" })

scene("swamp_scene", { w: 160, h: 96, bg: "n" },
  layer("sky", rect(0, 30, 160, 20, "N"), rect(0, 50, 160, 20, "m")),
  layer("water", { y: 70 }, rect(0, 0, 160, 26, "a"), rect(0, 14, 160, 12, "A"),
    ...[8, 30, 70, 104, 140].map((x, i) => hline(x, 3 + (i % 3) * 5, 6, "r"))),
  layer("banks", ellipse(28, 82, 26, 6, "g"), ellipse(128, 84, 30, 6, "g"), hline(6, 87, 44, "G"), hline(102, 89, 52, "G"),
    ...[6, 11, 44, 110, 150].map((x) => vline(x, 72, 9, "R")), ...[8, 46, 148].map((x) => vline(x, 70, 6, "q"))),
  layer("props", stamp("mangrove_idle", 94, 16, { delay: 250 }), stamp("stilt_hut_dry_idle", 62, 28), stamp("glow_toadstools_idle", 10, 50), stamp("glow_toadstools_idle", 108, 54, { flip: "x", delay: 375 }), stamp("glow_toadstools", 126, 62)),
  layer("fireflies", (c) => [[30, 40], [100, 30], [146, 42], [52, 60]].forEach(([x, y], i) => c.px(x + Math.round(Math.sin((c.phase + i * 0.3) * 6.28) * 2), y + i % 2, "f"))))
