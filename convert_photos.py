import sys, shutil, tempfile
from pathlib import Path

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    sys.exit("Missing dependency — run:  pip install Pillow pillow-heif")

from PIL import Image, ImageOps

EXTS    = {'.heic', '.heif', '.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp'}
QUALITY = 88

def open_img(path: Path) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(path)).convert('RGB')

def convert_folder(folder: Path, name_fn):
    files = sorted([f for f in folder.iterdir() if f.suffix.lower() in EXTS])
    if not files:
        return print(f"  No images found in {folder}/\n")

    print(f"Converting {len(files)} files in {folder}/ ...")
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        for i, src in enumerate(files, 1):
            open_img(src).save(tmp / f'{i}.jpg', 'JPEG', quality=QUALITY, optimize=True)
            print(f"  [{i}/{len(files)}] {src.name}")
        for src in files:
            src.unlink()
        for i in range(1, len(files) + 1):
            shutil.move(tmp / f'{i}.jpg', folder / name_fn(i))

    print(f"  Saved as {name_fn(1)} … {name_fn(len(files))}\n")

convert_folder(Path('collage'), lambda i: f'{i}.jpg')
convert_folder(Path('photos'),  lambda i: f'memory{i}.jpg')
print("Done!")
