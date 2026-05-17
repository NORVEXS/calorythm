#!/usr/bin/env python3
"""Generate og-image.png, icon-192.png and icon-512.png using pycairo."""
import math
import cairo
import os

BASE = "/home/auceda/RubymineProjects/calculadora IMC"

# ── og-image.png (1200×630) ─────────────────────────────────────────────────

def make_og_image():
    W, H = 1200, 630
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
    ctx = cairo.Context(surface)

    # Background gradient: #2563EB → #1e40af
    grad = cairo.LinearGradient(0, 0, W, 0)
    grad.add_color_stop_rgb(0, 0x25/255, 0x63/255, 0xEB/255)
    grad.add_color_stop_rgb(1, 0x1e/255, 0x40/255, 0xaf/255)
    ctx.rectangle(0, 0, W, H)
    ctx.set_source(grad)
    ctx.fill()

    # ECG line — centered vertically at H/2
    cy = H / 2
    pts = [
        (0,   cy),
        (120, cy),
        (200, cy - 60),
        (260, cy + 120),
        (330, cy),
        (410, cy - 90),
        (480, cy),
        (560, cy + 50),
        (620, cy),
        (700, cy),
        (780, cy - 60),
        (840, cy + 120),
        (910, cy),
        (990, cy - 90),
        (1060, cy),
        (1200, cy),
    ]
    ctx.set_source_rgba(1, 1, 1, 0.35)
    ctx.set_line_width(3)
    ctx.move_to(*pts[0])
    for p in pts[1:]:
        ctx.line_to(*p)
    ctx.stroke()

    # Main ECG — tighter, prominent
    pts2 = [
        (0,   cy),
        (100, cy),
        (160, cy),
        (200, cy - 80),
        (240, cy + 140),
        (300, cy),
        (380, cy - 120),
        (440, cy),
        (560, cy),
        (620, cy - 80),
        (660, cy + 140),
        (720, cy),
        (800, cy - 120),
        (860, cy),
        (980, cy),
        (1040, cy - 80),
        (1080, cy + 140),
        (1140, cy),
        (1200, cy),
    ]
    ctx.set_source_rgba(1, 1, 1, 0.85)
    ctx.set_line_width(4)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.move_to(*pts2[0])
    for p in pts2[1:]:
        ctx.line_to(*p)
    ctx.stroke()

    # Title "Calorythm"
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(96)
    ctx.set_source_rgba(1, 1, 1, 1)
    te = ctx.text_extents("Calorythm")
    tx = (W - te.width) / 2 - te.x_bearing
    ty = H * 0.32
    ctx.move_to(tx, ty)
    ctx.show_text("Calorythm")

    # Subtitle
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(30)
    ctx.set_source_rgba(1, 1, 1, 0.78)
    sub = "Calculadoras de Salud y Fitness Gratis"
    te2 = ctx.text_extents(sub)
    sx = (W - te2.width) / 2 - te2.x_bearing
    sy = H * 0.32 + 52
    ctx.move_to(sx, sy)
    ctx.show_text(sub)

    # Pills row at bottom
    pills = ["IMC", "Calorías", "Peso Ideal", "Macros", "FFMI", "Grasa", "Agua", "TMB"]
    ctx.set_font_size(22)
    pad_x, pad_y, gap = 18, 9, 14
    total_w = 0
    widths = []
    for pill in pills:
        te = ctx.text_extents(pill)
        w = te.width + pad_x * 2
        widths.append((w, te))
        total_w += w
    total_w += gap * (len(pills) - 1)
    px = (W - total_w) / 2
    py = H - 72

    for i, pill in enumerate(pills):
        w, te = widths[i]
        # pill background
        ctx.set_source_rgba(1, 1, 1, 0.18)
        r = 16
        x0, y0, x1, y1 = px, py, px + w, py + 40
        ctx.arc(x0 + r, y0 + r, r, math.pi, 3*math.pi/2)
        ctx.arc(x1 - r, y0 + r, r, 3*math.pi/2, 0)
        ctx.arc(x1 - r, y1 - r, r, 0, math.pi/2)
        ctx.arc(x0 + r, y1 - r, r, math.pi/2, math.pi)
        ctx.close_path()
        ctx.fill()
        # pill text
        ctx.set_source_rgba(1, 1, 1, 0.92)
        tx = px + pad_x - te.x_bearing
        ty2 = py + pad_y + te.height / 2 + 2
        ctx.move_to(tx, ty2)
        ctx.show_text(pill)
        px += w + gap

    surface.write_to_png(os.path.join(BASE, "og-image.png"))
    print("og-image.png written")


def make_icon(size, filename):
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, size, size)
    ctx = cairo.Context(surface)

    # Rounded rect background #2563EB
    r = size * 0.18
    ctx.set_source_rgb(0x25/255, 0x63/255, 0xEB/255)
    x0, y0, x1, y1 = 0, 0, size, size
    ctx.arc(x0 + r, y0 + r, r, math.pi, 3*math.pi/2)
    ctx.arc(x1 - r, y0 + r, r, 3*math.pi/2, 0)
    ctx.arc(x1 - r, y1 - r, r, 0, math.pi/2)
    ctx.arc(x0 + r, y1 - r, r, math.pi/2, math.pi)
    ctx.close_path()
    ctx.fill()

    # ECG line centered
    cy = size / 2
    s = size / 32
    pts = [
        (0,        cy),
        (s*4,      cy),
        (s*7,      cy - s*4),
        (s*9,      cy + s*8),
        (s*12,     cy),
        (s*16,     cy - s*6),
        (s*19,     cy),
        (s*32,     cy),
    ]
    ctx.set_source_rgba(1, 1, 1, 0.92)
    ctx.set_line_width(max(2, size / 20))
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.move_to(*pts[0])
    for p in pts[1:]:
        ctx.line_to(*p)
    ctx.stroke()

    surface.write_to_png(os.path.join(BASE, filename))
    print(f"{filename} written")


make_og_image()
make_icon(192, "icon-192.png")
make_icon(512, "icon-512.png")
print("All assets generated.")
