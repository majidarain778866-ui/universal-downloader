import os
import math
from PIL import Image, ImageDraw, ImageFont

icons_dir = os.path.join(os.path.dirname(__file__), "..", "public", "icons")
os.makedirs(icons_dir, exist_ok=True)

def create_gradient_square(size, radius_ratio=0.22, is_maskable=False):
    # Create image with super-sampling for smooth edges
    scale = 2
    actual_size = size * scale
    img = Image.new("RGBA", (actual_size, actual_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors: #8b5cf6 -> #d946ef
    c1 = (139, 92, 246)
    c2 = (217, 70, 239)
    
    if is_maskable:
        # Full bleed background for maskable
        for y in range(actual_size):
            factor = y / float(actual_size)
            r = int(c1[0] + (c2[0] - c1[0]) * factor)
            g = int(c1[1] + (c2[1] - c1[1]) * factor)
            b = int(c1[2] + (c2[2] - c1[2]) * factor)
            draw.line([(0, y), (actual_size, y)], fill=(r, g, b, 255))
            
        # Draw central symbol (safe zone is within 80% circle)
        symbol_box = actual_size * 0.6
        cx, cy = actual_size // 2, actual_size // 2
    else:
        # Rounded rectangle
        margin = int(actual_size * 0.04)
        r_rect = int((actual_size - margin * 2) * radius_ratio)
        
        # Draw gradient on a temporary image
        grad = Image.new("RGBA", (actual_size, actual_size))
        gdraw = ImageDraw.Draw(grad)
        for y in range(actual_size):
            factor = y / float(actual_size)
            r = int(c1[0] + (c2[0] - c1[0]) * factor)
            g = int(c1[1] + (c2[1] - c1[1]) * factor)
            b = int(c1[2] + (c2[2] - c1[2]) * factor)
            gdraw.line([(0, y), (actual_size, y)], fill=(r, g, b, 255))
            
        # Mask with rounded rect
        mask = Image.new("L", (actual_size, actual_size), 0)
        mdraw = ImageDraw.Draw(mask)
        mdraw.rounded_rectangle([margin, margin, actual_size - margin, actual_size - margin], radius=r_rect, fill=255)
        
        img.paste(grad, (0, 0), mask)
        cx, cy = actual_size // 2, actual_size // 2

    # Draw Download arrow + play badge in the center
    # Arrow icon
    draw = ImageDraw.Draw(img)
    arrow_color = (255, 255, 255, 255)
    
    unit = actual_size / 24.0
    
    # Draw "SD" letters or modern stylized download symbol
    # Let's draw an elegant stylized download icon + play arrow
    # Down arrow shaft
    shaft_w = unit * 2.2
    shaft_top = cy - unit * 4.5
    shaft_bot = cy + unit * 1.5
    draw.rounded_rectangle(
        [cx - shaft_w / 2, shaft_top, cx + shaft_w / 2, shaft_bot],
        radius=int(shaft_w / 2),
        fill=arrow_color
    )
    
    # Arrowhead
    head_points = [
        (cx - unit * 5.0, cy + unit * 0.5),
        (cx + unit * 5.0, cy + unit * 0.5),
        (cx, cy + unit * 5.5)
    ]
    draw.polygon(head_points, fill=arrow_color)
    
    # Tray bar at bottom
    tray_w = unit * 12.0
    tray_h = unit * 2.0
    tray_top = cy + unit * 6.8
    draw.rounded_rectangle(
        [cx - tray_w / 2, tray_top, cx + tray_w / 2, tray_top + tray_h],
        radius=int(tray_h / 2),
        fill=arrow_color
    )

    # Downsample with Lanczos for anti-aliasing
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

# Generate all icons
sizes = [
    (192, "icon-192.png", False),
    (512, "icon-512.png", False),
    (180, "apple-touch-icon.png", False),
    (192, "icon-maskable-192.png", True),
    (512, "icon-maskable-512.png", True)
]

for s, filename, maskable in sizes:
    target_path = os.path.join(icons_dir, filename)
    im = create_gradient_square(s, is_maskable=maskable)
    im.save(target_path, "PNG", optimize=True)
    print(f"Generated {filename} ({s}x{s})")

print("All PWA icons generated successfully!")
