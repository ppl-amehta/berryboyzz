export interface PhaseMeta {
  index: number;
  label: string;
  tagline: string;
  metricLabel: string;
  metricValue: string;
}

export const STORY_PHASES: PhaseMeta[] = [
  { index: 0, label: '01 SEED', tagline: 'Certified Clonal Genetics', metricLabel: 'Genetics', metricValue: '100% Virus-Free' },
  { index: 1, label: '02 RHIZO', tagline: 'Clean Coco-Coir Roots', metricLabel: 'Substrate', metricValue: '5.8 pH Target' },
  { index: 2, label: '03 CANOPY', tagline: 'Climate-Protected Polyhouse', metricLabel: 'Optics', metricValue: 'Diffused Anti-Glare' },
  { index: 3, label: '04 BLOOM', tagline: 'Natural Bumblebee Pollination', metricLabel: 'Conformation', metricValue: '96.8% Conical' },
  { index: 4, label: '05 RIPEN', tagline: 'Satara Mountain Sweetness', metricLabel: 'Sugar Brix', metricValue: '14.2° Brix' },
  { index: 5, label: '06 HARVEST', tagline: 'Sunrise Hand-Picked at 4°C', metricLabel: 'Cold Chain', metricValue: '4.0°C in 45m' },
  { index: 6, label: '07 PUNNET', tagline: '5-Star Luxury Table Punnet', metricLabel: 'Packaging', metricValue: '125g Vented' },
];
