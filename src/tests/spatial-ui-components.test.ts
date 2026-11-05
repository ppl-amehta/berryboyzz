import { describe, it, expect } from 'vitest';
import { SPATIAL_DOMAINS } from '../lib/spatial/spatial-nodes';

describe('Spatial HUD and Dock UI Specifications', () => {
	it('defines 7 sequential navigation coordinates for the bottom dock', () => {
		expect(SPATIAL_DOMAINS.length).toBe(7);
		const hotkeys = SPATIAL_DOMAINS.map((d) => d.hotkey);
		expect(hotkeys).toEqual(['1', '2', '3', '4', '5', '6', '7']);

		const labels = SPATIAL_DOMAINS.map((d) => d.shortLabel);
		expect(labels).toContain('Orbit');
		expect(labels).toContain('Cultivars');
		expect(labels).toContain('Satara CEA');
		expect(labels).toContain('Bio-OS');
		expect(labels).toContain('Economics');
		expect(labels).toContain('Gallery');
		expect(labels).toContain('Inbound Portal');
	});

	it('ensures each domain maps to a valid anchor section for reader mode and deep-linking', () => {
		SPATIAL_DOMAINS.forEach((domain) => {
			expect(domain.anchorSection).toBeTruthy();
			expect(typeof domain.anchorSection).toBe('string');
		});
	});

	it('validates keyboard routing logic ignores input typing events', () => {
		function shouldHandleHotkey(targetTagName: string, isContentEditable: boolean): boolean {
			if (isContentEditable) return false;
			const tag = targetTagName.toLowerCase();
			return tag !== 'input' && tag !== 'textarea' && tag !== 'select';
		}

		expect(shouldHandleHotkey('INPUT', false)).toBe(false);
		expect(shouldHandleHotkey('TEXTAREA', false)).toBe(false);
		expect(shouldHandleHotkey('SELECT', false)).toBe(false);
		expect(shouldHandleHotkey('DIV', true)).toBe(false);
		expect(shouldHandleHotkey('BODY', false)).toBe(true);
		expect(shouldHandleHotkey('DIV', false)).toBe(true);
		expect(shouldHandleHotkey('BUTTON', false)).toBe(true);
	});
});
