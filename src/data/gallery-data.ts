/**
 * BERRYBOYZZ™ Frontier Media Gallery Architecture
 * Auto-generated high-efficiency edge-cached asset manifest.
 * Zero-bloat, AVIF + WebP next-gen formats, exact pixel dimensions.
 */

export interface GalleryImageVariant {
	webp: string;
	avif: string;
	width: number;
	height: number;
	aspectRatio: number;
}

export interface GalleryItem {
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
}

export const GALLERY_CATEGORIES = ['All', 'Harvest', 'Infrastructure', 'Morphogenesis', 'Off-Take', 'Quality'] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    "id": "autumn-bliss-harvest",
    "title": "Commercial Autumn Bliss Raspberry Harvest",
    "subtitle": "Freshly harvested floricane crop packed in harvest crates",
    "category": "Harvest",
    "cultivar": "Autumn Bliss (Rubus idaeus)",
    "location": "Satara Polyhouse Skid 01",
    "metric": "12.4\u00b0 Brix | Zero Cold-Chain Latency",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 md:col-span-2 row-span-2",
    "thumb": {
      "webp": "/gallery/autumn-bliss-harvest-thumb.webp",
      "avif": "/gallery/autumn-bliss-harvest-thumb.avif",
      "width": 540,
      "height": 959,
      "aspectRatio": 0.563
    },
    "full": {
      "webp": "/gallery/autumn-bliss-harvest-full.webp",
      "avif": "/gallery/autumn-bliss-harvest-full.avif",
      "width": 1440,
      "height": 2557,
      "aspectRatio": 0.563
    }
  },
  {
    "id": "gourmet-punnet-raspberries",
    "title": "Gourmet Off-Take Presentation Punnet",
    "subtitle": "Field-to-punnet direct packing for luxury institutional hospitality",
    "category": "Off-Take",
    "cultivar": "Heritage Primocane",
    "location": "Pune Logistics Hub",
    "metric": "125g Calibrated Clamshell",
    "aspect": "landscape",
    "bentoSpan": "col-span-1 md:col-span-2 row-span-1",
    "thumb": {
      "webp": "/gallery/gourmet-punnet-raspberries-thumb.webp",
      "avif": "/gallery/gourmet-punnet-raspberries-thumb.avif",
      "width": 540,
      "height": 405,
      "aspectRatio": 1.333
    },
    "full": {
      "webp": "/gallery/gourmet-punnet-raspberries-full.webp",
      "avif": "/gallery/gourmet-punnet-raspberries-full.avif",
      "width": 1440,
      "height": 1080,
      "aspectRatio": 1.333
    }
  },
  {
    "id": "karaka-black-morphogenesis",
    "title": "Karaka Black Ripening Sequence",
    "subtitle": "Concurrent green bud, orange drupelet, and obsidian ripeness",
    "category": "Morphogenesis",
    "cultivar": "Karaka Black (Rubus fruticosus)",
    "location": "Satara High-Elevation Farm",
    "metric": "14.2\u00b0 Brix Peak Sugar Accumulation",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/karaka-black-morphogenesis-thumb.webp",
      "avif": "/gallery/karaka-black-morphogenesis-thumb.avif",
      "width": 540,
      "height": 405,
      "aspectRatio": 1.333
    },
    "full": {
      "webp": "/gallery/karaka-black-morphogenesis-full.webp",
      "avif": "/gallery/karaka-black-morphogenesis-full.avif",
      "width": 1440,
      "height": 1080,
      "aspectRatio": 1.333
    }
  },
  {
    "id": "san-andreas-strawberries",
    "title": "Day-Neutral Strawberry Bulk Sorting",
    "subtitle": "San Andreas commercial harvest grading for premium off-take",
    "category": "Harvest",
    "cultivar": "San Andreas (Fragaria ananassa)",
    "location": "Mahabaleshwar-Satara Belt",
    "metric": "94% Grade-A Export Caliber",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 md:col-span-2 row-span-2",
    "thumb": {
      "webp": "/gallery/san-andreas-strawberries-thumb.webp",
      "avif": "/gallery/san-andreas-strawberries-thumb.avif",
      "width": 540,
      "height": 717,
      "aspectRatio": 0.753
    },
    "full": {
      "webp": "/gallery/san-andreas-strawberries-full.webp",
      "avif": "/gallery/san-andreas-strawberries-full.avif",
      "width": 1440,
      "height": 1913,
      "aspectRatio": 0.753
    }
  },
  {
    "id": "npvh-polyhouse-canopy",
    "title": "Naturally Ventilated Polyhouse (NPVH) Canopy",
    "subtitle": "Galvanized multi-span structure with perimeter shade cloth & trellising",
    "category": "Infrastructure",
    "cultivar": "Protected CEA Environment",
    "location": "Satara CEA Zone",
    "metric": "4.5m Gutter Height | 35% Diffuse Light",
    "aspect": "landscape",
    "bentoSpan": "col-span-1 md:col-span-2 row-span-1",
    "thumb": {
      "webp": "/gallery/npvh-polyhouse-canopy-thumb.webp",
      "avif": "/gallery/npvh-polyhouse-canopy-thumb.avif",
      "width": 540,
      "height": 303,
      "aspectRatio": 1.782
    },
    "full": {
      "webp": "/gallery/npvh-polyhouse-canopy-full.webp",
      "avif": "/gallery/npvh-polyhouse-canopy-full.avif",
      "width": 1440,
      "height": 810,
      "aspectRatio": 1.778
    }
  },
  {
    "id": "precision-fertigation-rows",
    "title": "Precision Drip Fertigation & Raised Beds",
    "subtitle": "Laser-level soil beds with dual-lateral pressure-compensating drippers",
    "category": "Infrastructure",
    "cultivar": "Substrate Cultivation Rig",
    "location": "Satara Skid 02",
    "metric": "1.2 L/hr Compensated Emitters",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/precision-fertigation-rows-thumb.webp",
      "avif": "/gallery/precision-fertigation-rows-thumb.avif",
      "width": 540,
      "height": 720,
      "aspectRatio": 0.75
    },
    "full": {
      "webp": "/gallery/precision-fertigation-rows-full.webp",
      "avif": "/gallery/precision-fertigation-rows-full.avif",
      "width": 1440,
      "height": 1920,
      "aspectRatio": 0.75
    }
  },
  {
    "id": "living-cane-clusters",
    "title": "Living Trellis Cane Clusters",
    "subtitle": "Vigorous fruiting laterals supported by high-tensile trellis wiring",
    "category": "Morphogenesis",
    "cultivar": "Autumn Bliss Floricane",
    "location": "Trellised Polyhouse Bay",
    "metric": "8\u201312 Berries per Fruiting Truss",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/living-cane-clusters-thumb.webp",
      "avif": "/gallery/living-cane-clusters-thumb.avif",
      "width": 540,
      "height": 960,
      "aspectRatio": 0.562
    },
    "full": {
      "webp": "/gallery/living-cane-clusters-full.webp",
      "avif": "/gallery/living-cane-clusters-full.avif",
      "width": 1440,
      "height": 2560,
      "aspectRatio": 0.562
    }
  },
  {
    "id": "commercial-export-crates",
    "title": "Institutional Export Master Cartons",
    "subtitle": "Mahabaleshwar Strawberry Quality Product of India sealed cartons",
    "category": "Off-Take",
    "cultivar": "San Andreas Export Class",
    "location": "Mahabaleshwar Cold-Storage Hub",
    "metric": "APEDA Compliant Cold-Chain Packing",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/commercial-export-crates-thumb.webp",
      "avif": "/gallery/commercial-export-crates-thumb.avif",
      "width": 540,
      "height": 1080,
      "aspectRatio": 0.5
    },
    "full": {
      "webp": "/gallery/commercial-export-crates-full.webp",
      "avif": "/gallery/commercial-export-crates-full.avif",
      "width": 1440,
      "height": 2880,
      "aspectRatio": 0.5
    }
  },
  {
    "id": "golden-ruby-punnet",
    "title": "Dual-Hue Heritage Raspberry Punnet",
    "subtitle": "Artisanal assortment of golden champagne and ruby primocane drupelets",
    "category": "Harvest",
    "cultivar": "Yellow Anne & Heritage Rubus",
    "location": "Controlled Breeding Bay",
    "metric": "Sub-Acid High-Terpene Profile",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/golden-ruby-punnet-thumb.webp",
      "avif": "/gallery/golden-ruby-punnet-thumb.avif",
      "width": 540,
      "height": 1205,
      "aspectRatio": 0.448
    },
    "full": {
      "webp": "/gallery/golden-ruby-punnet-full.webp",
      "avif": "/gallery/golden-ruby-punnet-full.avif",
      "width": 1440,
      "height": 3213,
      "aspectRatio": 0.448
    }
  },
  {
    "id": "canopy-ripening-stages",
    "title": "Canopy Fruiting Progression",
    "subtitle": "Peach blush to deep crimson ripening cycle under diffuse shade",
    "category": "Morphogenesis",
    "cultivar": "Autumn Bliss Primocane",
    "location": "Satara High Tunnel",
    "metric": "Continuous 6-Week Harvest Cycle",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/canopy-ripening-stages-thumb.webp",
      "avif": "/gallery/canopy-ripening-stages-thumb.avif",
      "width": 540,
      "height": 405,
      "aspectRatio": 1.333
    },
    "full": {
      "webp": "/gallery/canopy-ripening-stages-full.webp",
      "avif": "/gallery/canopy-ripening-stages-full.avif",
      "width": 1440,
      "height": 1080,
      "aspectRatio": 1.333
    }
  },
  {
    "id": "quality-audit-scale",
    "title": "Agronomic Weight & Uniformity Audit",
    "subtitle": "Precision electronic balance sampling for berry mass and moisture retention",
    "category": "Quality",
    "cultivar": "QC Batch Sampling",
    "location": "Field QC Station",
    "metric": "4.8g Mean Individual Berry Mass",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/quality-audit-scale-thumb.webp",
      "avif": "/gallery/quality-audit-scale-thumb.avif",
      "width": 540,
      "height": 720,
      "aspectRatio": 0.75
    },
    "full": {
      "webp": "/gallery/quality-audit-scale-full.webp",
      "avif": "/gallery/quality-audit-scale-full.avif",
      "width": 1440,
      "height": 1920,
      "aspectRatio": 0.75
    }
  },
  {
    "id": "mulberry-strawberry-scale",
    "title": "Long Mulberry & Strawberry Metric Scale",
    "subtitle": "Shahtoot / Morus macroura alongside San Andreas with coin scale reference",
    "category": "Morphogenesis",
    "cultivar": "Shahtoot & Fragaria",
    "location": "Trial Cultivar Section",
    "metric": "Up to 65mm Individual Fruit Length",
    "aspect": "portrait",
    "bentoSpan": "col-span-1 row-span-1",
    "thumb": {
      "webp": "/gallery/mulberry-strawberry-scale-thumb.webp",
      "avif": "/gallery/mulberry-strawberry-scale-thumb.avif",
      "width": 540,
      "height": 405,
      "aspectRatio": 1.333
    },
    "full": {
      "webp": "/gallery/mulberry-strawberry-scale-full.webp",
      "avif": "/gallery/mulberry-strawberry-scale-full.avif",
      "width": 1440,
      "height": 1080,
      "aspectRatio": 1.333
    }
  }
];
