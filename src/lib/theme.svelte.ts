import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

class ThemeManager {
  theme = $state<Theme>('system');
  isDark = $state(false);

  constructor() {
    if (browser) {
      const stored = localStorage.getItem('berryboyzz-theme') as Theme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        this.theme = stored;
      }
      this.updateDOM();

      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', () => {
        if (this.theme === 'system') {
          this.updateDOM();
        }
      });
    }
  }

  toggle() {
    if (this.isDark) {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    if (browser) {
      localStorage.setItem('berryboyzz-theme', newTheme);
      this.updateDOM();
    }
  }

  private updateDOM() {
    if (!browser) return;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeDark = this.theme === 'dark' || (this.theme === 'system' && systemDark);
    this.isDark = activeDark;

    if (activeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }
}

export const themeManager = new ThemeManager();
