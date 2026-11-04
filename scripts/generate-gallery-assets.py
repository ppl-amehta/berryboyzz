#!/usr/bin/env python3
import os
import subprocess
import json

CURATED_ITEMS = [
    {
        "id": "autumn-bliss-harvest",
        "src": "media/0681cbe6-9404-4145-b382-aee7b2fc4646.JPG",
        "title": "Commercial Autumn Bliss Raspberry Harvest",
        "subtitle": "Freshly harvested floricane crop packed in harvest crates",
        "category": "Harvest",
        "cultivar": "Autumn Bliss (Rubus idaeus)",
        "location": "Satara Polyhouse Skid 01",
        "metric": "12.4° Brix | Zero Cold-Chain Latency",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 md:col-span-2 row-span-2"
    },
    {
        "id": "gourmet-punnet-raspberries",
        "src": "media/302655fb-2bd6-476a-9d93-06ffdff772c1.JPG",
        "title": "Gourmet Off-Take Presentation Punnet",
        "subtitle": "Field-to-punnet direct packing for luxury institutional hospitality",
        "category": "Off-Take",
        "cultivar": "Heritage Primocane",
        "location": "Pune Logistics Hub",
        "metric": "125g Calibrated Clamshell",
        "aspect": "landscape",
        "bentoSpan": "col-span-1 md:col-span-2 row-span-1"
    },
    {
        "id": "karaka-black-morphogenesis",
        "src": "media/IMG_3637.HEIC",
        "title": "Karaka Black Ripening Sequence",
        "subtitle": "Concurrent green bud, orange drupelet, and obsidian ripeness",
        "category": "Morphogenesis",
        "cultivar": "Karaka Black (Rubus fruticosus)",
        "location": "Satara High-Elevation Farm",
        "metric": "14.2° Brix Peak Sugar Accumulation",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "san-andreas-strawberries",
        "src": "media/655a8c64-3400-4ad2-b04d-683ff9cd91dd.JPG",
        "title": "Day-Neutral Strawberry Bulk Sorting",
        "subtitle": "San Andreas commercial harvest grading for premium off-take",
        "category": "Harvest",
        "cultivar": "San Andreas (Fragaria ananassa)",
        "location": "Mahabaleshwar-Satara Belt",
        "metric": "94% Grade-A Export Caliber",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 md:col-span-2 row-span-2"
    },
    {
        "id": "npvh-polyhouse-canopy",
        "src": "media/IMG_5848.jpg",
        "title": "Naturally Ventilated Polyhouse (NPVH) Canopy",
        "subtitle": "Galvanized multi-span structure with perimeter shade cloth & trellising",
        "category": "Infrastructure",
        "cultivar": "Protected CEA Environment",
        "location": "Satara CEA Zone",
        "metric": "4.5m Gutter Height | 35% Diffuse Light",
        "aspect": "landscape",
        "bentoSpan": "col-span-1 md:col-span-2 row-span-1"
    },
    {
        "id": "precision-fertigation-rows",
        "src": "media/IMG_1731.JPG",
        "title": "Precision Drip Fertigation & Raised Beds",
        "subtitle": "Laser-level soil beds with dual-lateral pressure-compensating drippers",
        "category": "Infrastructure",
        "cultivar": "Substrate Cultivation Rig",
        "location": "Satara Skid 02",
        "metric": "1.2 L/hr Compensated Emitters",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "living-cane-clusters",
        "src": "media/IMG_7431.JPG",
        "title": "Living Trellis Cane Clusters",
        "subtitle": "Vigorous fruiting laterals supported by high-tensile trellis wiring",
        "category": "Morphogenesis",
        "cultivar": "Autumn Bliss Floricane",
        "location": "Trellised Polyhouse Bay",
        "metric": "8–12 Berries per Fruiting Truss",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "commercial-export-crates",
        "src": "media/807698bc-f844-4424-80cc-aaa5bb3d8c20.JPG",
        "title": "Institutional Export Master Cartons",
        "subtitle": "Mahabaleshwar Strawberry Quality Product of India sealed cartons",
        "category": "Off-Take",
        "cultivar": "San Andreas Export Class",
        "location": "Mahabaleshwar Cold-Storage Hub",
        "metric": "APEDA Compliant Cold-Chain Packing",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "golden-ruby-punnet",
        "src": "media/00dd453a-c93e-42d6-978e-9761022436c8.JPG",
        "title": "Dual-Hue Heritage Raspberry Punnet",
        "subtitle": "Artisanal assortment of golden champagne and ruby primocane drupelets",
        "category": "Harvest",
        "cultivar": "Yellow Anne & Heritage Rubus",
        "location": "Controlled Breeding Bay",
        "metric": "Sub-Acid High-Terpene Profile",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "canopy-ripening-stages",
        "src": "media/IMG_4315.HEIC",
        "title": "Canopy Fruiting Progression",
        "subtitle": "Peach blush to deep crimson ripening cycle under diffuse shade",
        "category": "Morphogenesis",
        "cultivar": "Autumn Bliss Primocane",
        "location": "Satara High Tunnel",
        "metric": "Continuous 6-Week Harvest Cycle",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "quality-audit-scale",
        "src": "media/bc859897-1cf2-4d8f-9a7a-020b287c3766.JPG",
        "title": "Agronomic Weight & Uniformity Audit",
        "subtitle": "Precision electronic balance sampling for berry mass and moisture retention",
        "category": "Quality",
        "cultivar": "QC Batch Sampling",
        "location": "Field QC Station",
        "metric": "4.8g Mean Individual Berry Mass",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    },
    {
        "id": "mulberry-strawberry-scale",
        "src": "media/IMG_2598.HEIC",
        "title": "Long Mulberry & Strawberry Metric Scale",
        "subtitle": "Shahtoot / Morus macroura alongside San Andreas with coin scale reference",
        "category": "Morphogenesis",
        "cultivar": "Shahtoot & Fragaria",
        "location": "Trial Cultivar Section",
        "metric": "Up to 65mm Individual Fruit Length",
        "aspect": "portrait",
        "bentoSpan": "col-span-1 row-span-1"
    }
]

OUT_DIR = "static/gallery"
os.makedirs(OUT_DIR, exist_ok=True)
TEMP_DIR = "/tmp/gallery_convert"
os.makedirs(TEMP_DIR, exist_ok=True)

print(f"Standardizing {len(CURATED_ITEMS)} images into {OUT_DIR}...")

gallery_manifest = []

for idx, item in enumerate(CURATED_ITEMS):
    item_id = item["id"]
    src_path = item["src"]
    print(f"\n[{idx+1}/{len(CURATED_ITEMS)}] Processing {item_id} from {src_path}...")
    
    # 1. Normalize source to high-res JPEG in TEMP_DIR
    temp_jpg = os.path.join(TEMP_DIR, f"{item_id}_orig.jpg")
    ext = os.path.splitext(src_path)[1].lower()
    
    if ext == ".heic":
        subprocess.run(["sips", "-s", "format", "jpeg", src_path, "--out", temp_jpg], check=True, stdout=subprocess.DEVNULL)
    else:
        # If already jpg/png, copy or convert cleanly
        subprocess.run(["sips", "-s", "format", "jpeg", src_path, "--out", temp_jpg], check=True, stdout=subprocess.DEVNULL)
    
    # 2. Generate Thumbnails (max width 540)
    thumb_base = os.path.join(OUT_DIR, f"{item_id}-thumb")
    thumb_jpg = os.path.join(TEMP_DIR, f"{item_id}_thumb.jpg")
    subprocess.run(["sips", temp_jpg, "--resampleWidth", "540", "--out", thumb_jpg], check=True, stdout=subprocess.DEVNULL)
    
    # Get thumb dimensions
    dim_out = subprocess.check_output(["sips", "-g", "pixelWidth", "-g", "pixelHeight", thumb_jpg]).decode()
    thumb_w = int(dim_out.split("pixelWidth:")[1].split()[0])
    thumb_h = int(dim_out.split("pixelHeight:")[1].split()[0])
    
    # Thumb WebP
    subprocess.run(["cwebp", "-q", "78", thumb_jpg, "-o", f"{thumb_base}.webp"], check=True, stdout=subprocess.DEVNULL)
    # Thumb AVIF
    subprocess.run(["sips", "-s", "format", "avif", "-s", "formatOptions", "70%", thumb_jpg, "--out", f"{thumb_base}.avif"], check=True, stdout=subprocess.DEVNULL)
    
    # 3. Generate Full-Res (max width 1440)
    full_base = os.path.join(OUT_DIR, f"{item_id}-full")
    full_jpg = os.path.join(TEMP_DIR, f"{item_id}_full.jpg")
    subprocess.run(["sips", temp_jpg, "--resampleWidth", "1440", "--out", full_jpg], check=True, stdout=subprocess.DEVNULL)
    
    # Get full dimensions
    dim_out = subprocess.check_output(["sips", "-g", "pixelWidth", "-g", "pixelHeight", full_jpg]).decode()
    full_w = int(dim_out.split("pixelWidth:")[1].split()[0])
    full_h = int(dim_out.split("pixelHeight:")[1].split()[0])
    
    # Full WebP
    subprocess.run(["cwebp", "-q", "80", full_jpg, "-o", f"{full_base}.webp"], check=True, stdout=subprocess.DEVNULL)
    # Full AVIF
    subprocess.run(["sips", "-s", "format", "avif", "-s", "formatOptions", "72%", full_jpg, "--out", f"{full_base}.avif"], check=True, stdout=subprocess.DEVNULL)
    
    thumb_webp_sz = os.path.getsize(f"{thumb_base}.webp") / 1024
    thumb_avif_sz = os.path.getsize(f"{thumb_base}.avif") / 1024
    full_webp_sz = os.path.getsize(f"{full_base}.webp") / 1024
    full_avif_sz = os.path.getsize(f"{full_base}.avif") / 1024
    
    print(f"  Thumb: {thumb_w}x{thumb_h} | WebP: {thumb_webp_sz:.1f}KB, AVIF: {thumb_avif_sz:.1f}KB")
    print(f"  Full:  {full_w}x{full_h} | WebP: {full_webp_sz:.1f}KB, AVIF: {full_avif_sz:.1f}KB")
    
    manifest_entry = {
        **item,
        "thumb": {
            "webp": f"/gallery/{item_id}-thumb.webp",
            "avif": f"/gallery/{item_id}-thumb.avif",
            "width": thumb_w,
            "height": thumb_h,
            "aspectRatio": round(thumb_w / thumb_h, 3)
        },
        "full": {
            "webp": f"/gallery/{item_id}-full.webp",
            "avif": f"/gallery/{item_id}-full.avif",
            "width": full_w,
            "height": full_h,
            "aspectRatio": round(full_w / full_h, 3)
        }
    }
    del manifest_entry["src"]
    gallery_manifest.append(manifest_entry)

# Write TypeScript data file
ts_content = f"""/**
 * BERRYBOYZZ™ Frontier Media Gallery Architecture
 * Auto-generated high-efficiency edge-cached asset manifest.
 * Zero-bloat, AVIF + WebP next-gen formats, exact pixel dimensions.
 */

export interface GalleryImageVariant {{
	webp: string;
	avif: string;
	width: number;
	height: number;
	aspectRatio: number;
}}

export interface GalleryItem {{
	id: string;
	title: string;
	subtitle: string;
	category: 'All' | 'Harvest' | 'Infrastructure' | 'Morphogenesis' | 'Off-Take' | 'Quality';
	cultivar: string;
	location: string;
	metric: string;
	aspect: 'portrait' | 'landscape' | 'square';
	bentoSpan: string;
	thumb: GalleryImageVariant;
	full: GalleryImageVariant;
}}

export const GALLERY_CATEGORIES = ['All', 'Harvest', 'Infrastructure', 'Morphogenesis', 'Off-Take', 'Quality'] as const;

export const GALLERY_ITEMS: GalleryItem[] = {json.dumps(gallery_manifest, indent=2)};
"""

with open("src/data/gallery-data.ts", "w") as f:
    f.write(ts_content)

print("\nSuccessfully wrote src/data/gallery-data.ts!")
