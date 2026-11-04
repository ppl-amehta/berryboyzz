/**
 * Modern Prioritized Task Scheduling & Off-Main-Thread Pipeline
 * Adheres to W3C Prioritized Task Scheduling API, scheduler.yield(), and modern web guidelines.
 */

declare global {
  interface Window {
    scheduler?: {
      yield?: () => Promise<void>;
      postTask?: <T>(
        callback: () => T | Promise<T>,
        options?: { priority?: 'user-blocking' | 'user-visible' | 'background'; delay?: number; signal?: AbortSignal }
      ) => Promise<T>;
    };
  }
}

/**
 * Yield execution back to the browser's main thread to allow user input,
 * touch events, and screen repaints, preventing tasks from exceeding the 50ms Long Task threshold.
 */
export async function yieldToMain(): Promise<void> {
  if (typeof window === 'undefined') return;

  if (window.scheduler && typeof window.scheduler.yield === 'function') {
    return window.scheduler.yield();
  }

  if (window.scheduler && typeof window.scheduler.postTask === 'function') {
    return window.scheduler.postTask(() => {}, { priority: 'user-visible' });
  }

  // Fallback using microtask / macrotask boundary
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Schedule non-critical background work (analytics, prefetching, telemetry, non-visible frame preparation)
 * to run during idle browser cycles without competing with user interactions or critical rendering.
 */
export function scheduleBackgroundTask(task: () => void | Promise<void>): void {
  if (typeof window === 'undefined') {
    task();
    return;
  }

  if (window.scheduler && typeof window.scheduler.postTask === 'function') {
    window.scheduler.postTask(task, { priority: 'background' }).catch(() => {});
    return;
  }

  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => {
      task();
    }, { timeout: 10000 });
    return;
  }

  setTimeout(task, 120);
}

/**
 * Schedule a user-visible task with standard priority.
 */
export function scheduleUserVisibleTask(task: () => void | Promise<void>): void {
  if (typeof window === 'undefined') {
    task();
    return;
  }

  if (window.scheduler && typeof window.scheduler.postTask === 'function') {
    window.scheduler.postTask(task, { priority: 'user-visible' }).catch(() => {});
    return;
  }

  setTimeout(task, 0);
}

/**
 * Asynchronously decodes an image binary off the main thread in the browser's compositor raster pool.
 * When drawn via CanvasRenderingContext2D.drawImage(), this completely eliminates main-thread decoding jank.
 */
export async function asyncDecodeImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;

  if ('decode' in img && typeof img.decode === 'function') {
    try {
      await img.decode();
      return img;
    } catch {
      // If decode() throws (e.g., abort or unsupported codec fallback), wait for onload
    }
  }

  return new Promise((resolve, reject) => {
    if (img.complete && img.naturalWidth > 0) {
      resolve(img);
      return;
    }
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
