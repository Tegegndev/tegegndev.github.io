import math
import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = "assets/images/brand"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_canvas(width, height, scale=4, bg=(0, 0, 0, 0)):
    w, h = width * scale, height * scale
    return Image.new("RGBA", (w, h), bg), scale

def draw_developer_badge(draw, cx, cy, radius, scale, dark=True):
    """Draws the Tegegn Wukianos Developer Monogram (TW + Brackets + Slate Teal Accents)."""
    c_terracotta = (141, 99, 77, 255)
    c_ochre = (201, 152, 119, 255)
    c_teal = (46, 111, 120, 255)      # New Deep Slate Teal (#2E6F78)
    c_gold = (245, 158, 11, 255)
    c_red = (239, 68, 68, 255)
    c_green = (16, 185, 129, 255)
    
    # Outer Hexagon Points
    hex_r = radius * 1.05
    hex_pts = []
    for i in range(6):
        angle = math.radians(60 * i - 30)
        hx = cx + hex_r * math.cos(angle)
        hy = cy + hex_r * math.sin(angle)
        hex_pts.append((hx, hy))
        
    bg_color = (24, 20, 18, 255) if dark else (252, 248, 242, 255)
    border_color = c_ochre if dark else c_terracotta
    draw.polygon(hex_pts, fill=bg_color, outline=border_color, width=int(5 * scale))
    
    # Left Bracket < (in Slate Teal)
    bk_w = int(10 * scale)
    b_offset_x = radius * 0.58
    b_h = radius * 0.32
    draw.line([(cx - b_offset_x, cy - b_h), (cx - b_offset_x - radius * 0.15, cy), (cx - b_offset_x, cy + b_h)],
              fill=c_teal, width=bk_w, joint="curve")
    
    # Right Bracket >
    draw.line([(cx + b_offset_x, cy - b_h), (cx + b_offset_x + radius * 0.15, cy), (cx + b_offset_x, cy + b_h)],
              fill=c_terracotta, width=bk_w, joint="curve")
    
    # Monogram "T"
    t_top_y = cy - radius * 0.42
    t_width = radius * 0.65
    t_bar_thick = int(14 * scale)
    draw.rounded_rectangle([cx - t_width / 2, t_top_y, cx + t_width / 2, t_top_y + t_bar_thick],
                           radius=t_bar_thick // 2, fill=c_ochre)
    draw.rounded_rectangle([cx - t_bar_thick / 2, t_top_y, cx + t_bar_thick / 2, cy + radius * 0.08],
                           radius=t_bar_thick // 2, fill=c_ochre)
                           
    # Monogram "W" (Interlaced dynamic strokes)
    w_top_y = cy - radius * 0.05
    w_bot_y = cy + radius * 0.45
    w_mid_y = cy + radius * 0.18
    w_w = radius * 0.62
    
    w_pts = [
        (cx - w_w / 2, w_top_y),
        (cx - w_w * 0.25, w_bot_y),
        (cx, w_mid_y),
        (cx + w_w * 0.25, w_bot_y),
        (cx + w_w / 2, w_top_y)
    ]
    
    w_thick = int(13 * scale)
    draw.line([w_pts[0], w_pts[1]], fill=c_teal, width=w_thick, joint="curve")
    draw.line([w_pts[1], w_pts[2]], fill=c_gold, width=w_thick, joint="curve")
    draw.line([w_pts[2], w_pts[3]], fill=c_gold, width=w_thick, joint="curve")
    draw.line([w_pts[3], w_pts[4]], fill=c_red, width=w_thick, joint="curve")
    
    # Center Tech Node
    dot_r = radius * 0.07
    draw.ellipse([cx - dot_r, cy + radius * 0.62 - dot_r, cx + dot_r, cy + radius * 0.62 + dot_r], fill=c_gold)


def generate_mark_png():
    size = 512
    img, scale = create_canvas(size, size, scale=4)
    draw = ImageDraw.Draw(img)
    draw_developer_badge(draw, (size * scale) / 2, (size * scale) / 2, 175 * scale, scale, dark=True)
    
    res = img.resize((size, size), Image.Resampling.LANCZOS)
    res.save(f"{OUTPUT_DIR}/tegegn-wukianos-mark.png", "PNG")
    print(f"Generated {OUTPUT_DIR}/tegegn-wukianos-mark.png")


def generate_avatar_squircle():
    size = 512
    img, scale = create_canvas(size, size, scale=4)
    draw = ImageDraw.Draw(img)
    
    W = size * scale
    H = size * scale
    
    margin = 28 * scale
    sq_radius = 112 * scale
    draw.rounded_rectangle([margin, margin, W - margin, H - margin],
                           radius=sq_radius, fill=(22, 19, 17, 255), outline=(141, 99, 77, 255), width=int(4 * scale))
    
    for x in range(int(margin + 40 * scale), int(W - margin), int(60 * scale)):
        draw.line([(x, margin), (x, H - margin)], fill=(255, 255, 255, 12), width=int(1.5 * scale))
    for y in range(int(margin + 40 * scale), int(H - margin), int(60 * scale)):
        draw.line([(margin, y), (W - margin, y)], fill=(255, 255, 255, 12), width=int(1.5 * scale))
        
    draw_developer_badge(draw, W / 2, H / 2 - 12 * scale, 140 * scale, scale, dark=True)
    
    res = img.resize((size, size), Image.Resampling.LANCZOS)
    res.save(f"{OUTPUT_DIR}/tegegn-wukianos-avatar.png", "PNG")
    print(f"Generated {OUTPUT_DIR}/tegegn-wukianos-avatar.png")


def generate_favicons():
    for fav_size in [16, 32, 48, 64, 128, 192, 512]:
        img, scale = create_canvas(fav_size, fav_size, scale=4)
        draw = ImageDraw.Draw(img)
        
        W = fav_size * scale
        H = fav_size * scale
        draw.rounded_rectangle([0, 0, W, H], radius=int(W * 0.22), fill=(22, 19, 17, 255))
        draw_developer_badge(draw, W / 2, H / 2, fav_size * scale * 0.38, scale, dark=True)
        
        res = img.resize((fav_size, fav_size), Image.Resampling.LANCZOS)
        res.save(f"{OUTPUT_DIR}/favicon-{fav_size}x{fav_size}.png", "PNG")
    print("Generated Developer Favicons (16 to 512px)")


def generate_developer_banner():
    width = 1200
    height = 630
    scale = 2
    W = width * scale
    H = height * scale
    img = Image.new("RGBA", (W, H), (22, 19, 17, 255))
    draw = ImageDraw.Draw(img)
    
    for x in range(0, W, 70 * scale):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1 * scale)
    for y in range(0, H, 70 * scale):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1 * scale)
        
    badge_cx = int(W * 0.26)
    badge_cy = int(H * 0.5)
    draw_developer_badge(draw, badge_cx, badge_cy, 170 * scale, scale, dark=True)
    
    pill_x = int(W * 0.48)
    pill_y = int(H * 0.34)
    draw.rounded_rectangle([pill_x, pill_y, pill_x + int(360 * scale), pill_y + int(46 * scale)],
                           radius=int(23 * scale), fill=(46, 111, 120, 60), outline=(46, 111, 120, 200), width=int(2 * scale))
                           
    res = img.resize((width, height), Image.Resampling.LANCZOS)
    res.save(f"{OUTPUT_DIR}/tegegn-wukianos-social-banner.png", "PNG")
    print(f"Generated {OUTPUT_DIR}/tegegn-wukianos-social-banner.png")


if __name__ == "__main__":
    generate_mark_png()
    generate_avatar_squircle()
    generate_favicons()
    generate_developer_banner()
    print("All Tegegn Wukianos brand assets updated with Deep Slate Teal!")
