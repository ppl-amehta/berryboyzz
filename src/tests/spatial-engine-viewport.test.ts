import { describe, it, expect } from 'vitest';
import { SPATIAL_DOMAINS, type SpatialDomain } from '../lib/spatial/spatial-nodes';

describe('Spatial Engine Full-Viewport 3D Projection & Camera Math', () => {
	// Standalone projection function mirroring the worker's camera math
	function project3D(
		point: { x: number; y: number; z: number },
		camera: { x: number; y: number; z: number },
		width: number,
		height: number,
		fov = 420
	) {
		const relX = point.x - camera.x;
		const relY = point.y - camera.y;
		const relZ = point.z - camera.z;

		// Distance along camera forward axis (assumes camera looks along -Z)
		const dist = -relZ;
		if (dist <= 10) {
			return { screenX: 0, screenY: 0, scale: 0, visible: false, dist };
		}

		const scale = fov / dist;
		const screenX = width / 2 + relX * scale;
		const screenY = height / 2 - relY * scale;

		return {
			screenX,
			screenY,
			scale,
			visible: screenX >= -100 && screenX <= width + 100 && screenY >= -100 && screenY <= height + 100,
			dist
		};
	}

	it('correctly projects 3D domain coordinates to 2D screen coordinates', () => {
		const width = 1920;
		const height = 1080;
		const overview = SPATIAL_DOMAINS.find((d) => d.id === 'overview')!;
		expect(overview).toBeDefined();

		const projection = project3D(overview.coordinates, overview.cameraOffset, width, height);

		expect(projection.visible).toBe(true);
		expect(projection.scale).toBeGreaterThan(0);
		expect(projection.screenX).toBeCloseTo(width / 2, 0);
		// With cameraOffset.y = 40, screenY will be slightly below or above center
		expect(projection.screenY).toBeGreaterThan(0);
		expect(projection.screenY).toBeLessThan(height);
	});

	it('computes depth sorting order so distant nodes are drawn behind closer nodes', () => {
		const camera = { x: 0, y: 0, z: 300 };
		const nodes = [
			{ id: 'near', x: 0, y: 0, z: 100 },
			{ id: 'mid', x: 0, y: 0, z: 0 },
			{ id: 'far', x: 0, y: 0, z: -200 }
		];

		const projected = nodes.map((n) => ({
			id: n.id,
			...project3D(n, camera, 1200, 800)
		}));

		// Sort by distance descending (draw farthest first)
		projected.sort((a, b) => b.dist - a.dist);

		expect(projected[0].id).toBe('far');
		expect(projected[1].id).toBe('mid');
		expect(projected[2].id).toBe('near');
	});

	it('ensures all 7 spatial domains project within visible screen bounds when docked', () => {
		const width = 1440;
		const height = 900;

		SPATIAL_DOMAINS.forEach((domain: SpatialDomain) => {
			const proj = project3D(domain.coordinates, domain.cameraOffset, width, height);
			expect(proj.visible, `Domain ${domain.id} should project visibly when docked`).toBe(true);
			expect(proj.scale).toBeGreaterThan(0.2);
			expect(proj.scale).toBeLessThan(3.0);
		});
	});
});
