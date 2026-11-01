// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('$app/environment', () => ({
  browser: true,
}));

vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

import { themeManager } from '../lib/theme.svelte';

describe('ThemeManager (Adaptive Native Night Mode)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('initializes with default system or light theme', () => {
    expect(themeManager).toBeDefined();
    expect(typeof themeManager.toggle).toBe('function');
    expect(typeof themeManager.setTheme).toBe('function');
  });

  it('sets theme to dark explicitly and adds dark class to documentElement', () => {
    themeManager.setTheme('dark');
    expect(themeManager.theme).toBe('dark');
    expect(themeManager.isDark).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('berryboyzz-theme')).toBe('dark');
  });

  it('sets theme to light explicitly and removes dark class from documentElement', () => {
    themeManager.setTheme('light');
    expect(themeManager.theme).toBe('light');
    expect(themeManager.isDark).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('berryboyzz-theme')).toBe('light');
  });

  it('toggles seamlessly between light and dark', () => {
    themeManager.setTheme('light');
    expect(themeManager.isDark).toBe(false);

    themeManager.toggle();
    expect(themeManager.isDark).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    themeManager.toggle();
    expect(themeManager.isDark).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
