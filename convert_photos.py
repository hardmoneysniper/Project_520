import sys, shutil, tempfile
from pathlib import Path

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    sys.exit("Missing dependency — run:  pip install Pillow pillow-heif")

from PIL import Image, ImageOps

EXTS = {'.heic', '.heif', '.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp'}

def open_img(path: Path) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(path)).convert('RGB')

def convert_folder(folder: Path, name_fn, max_px: int, quality: int):
    files = sorted([f for f in folder.iterdir() if f.suffix.lower() in EXTS])
    if not files:
        return print(f"  No images found in {folder}/\n")

    print(f"Converting {len(files)} files in {folder}/ (max {max_px}px, quality {quality}) ...")
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        for i, src in enumerate(files, 1):
            img = open_img(src)
            img.thumbnail((max_px, max_px), Image.LANCZOS)
            img.save(tmp / f'{i}.jpg', 'JPEG', quality=quality, optimize=True)
            print(f"  [{i}/{len(files)}] {src.name}  →  {img.width}×{img.height}")
        for src in files:
            src.unlink()
        for i in range(1, len(files) + 1):
            shutil.move(tmp / f'{i}.jpg', folder / name_fn(i))

    print(f"  Saved as {name_fn(1)} … {name_fn(len(files))}\n")

# Collage tiles are ~35px on screen — 500px is more than enough at any pixel density
convert_folder(Path('collage'), lambda i: f'{i}.jpg',       max_px=500,  quality=75)

# Memory photos display at ~450px wide — 1920px covers retina screens
convert_folder(Path('photos'),  lambda i: f'memory{i}.jpg', max_px=1920, quality=82)

print("Done!")
