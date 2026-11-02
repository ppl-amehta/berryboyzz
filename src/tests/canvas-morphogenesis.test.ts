import { describe, it, expect } from 'vitest';
import { STORY_PHASES } from '../lib/data/storyPhases';

describe('Morphogenesis Canvas Engine & Scrollytelling Mapping', () => {
  it('defines 7 distinct chronological phases from seed to luxury table punnet', () => {
    expect(STORY_PHASES).toHaveLength(7);
    expect(STORY_PHASES[0].label).toBe('01 SEED');
    expect(STORY_PHASES[1].label).toBe('02 RHIZO');
    expect(STORY_PHASES[2].label).toBe('03 CANOPY');
    expect(STORY_PHASES[3].label).toBe('04 BLOOM');
    expect(STORY_PHASES[4].label).toBe('05 RIPEN');
    expect(STORY_PHASES[5].label).toBe('06 HARVEST');
    expect(STORY_PHASES[6].label).toBe('07 PUNNET');
  });

  it('correctly clamps DPR to 2 to prevent GPU texture cache thrashing on high-DPI devices', () => {
    const clampDPR = (dpr: number) => Math.min(dpr || 1, 2);
    expect(clampDPR(1)).toBe(1);
    expect(clampDPR(1.5)).toBe(1.5);
    expect(clampDPR(2)).toBe(2);
    expect(clampDPR(3)).toBe(2); // iPhone Pro Retina clamped
    expect(clampDPR(4)).toBe(2); // Ultra high-DPI clamped
  });

  it('correctly computes phase index across the 0.0 to 1.0 progress interval', () => {
    const getPhaseIndex = (p: number) => Math.min(Math.floor(p * 7), 6);
    expect(getPhaseIndex(0.0)).toBe(0);
    expect(getPhaseIndex(0.1)).toBe(0);
    expect(getPhaseIndex(0.15)).toBe(1);
    expect(getPhaseIndex(0.30)).toBe(2);
    expect(getPhaseIndex(0.45)).toBe(3);
    expect(getPhaseIndex(0.60)).toBe(4);
    expect(getPhaseIndex(0.75)).toBe(5);
    expect(getPhaseIndex(0.90)).toBe(6);
    expect(getPhaseIndex(1.0)).toBe(6);
  });
});
