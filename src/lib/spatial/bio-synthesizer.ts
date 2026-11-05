/**
 * BERRYBOYZZ™ Frontier Audio-Visual Synesthesia Engine
 * 100% Procedural Web Audio API Synthesis · Zero Static Audio Files
 * Harmonic frequency modulation reacting to spatial velocity, node proximity, and telemetry.
 */

export class BioAcousticSynthesizer {
	private ctx: AudioContext | null = null;
	private masterGain: GainNode | null = null;
	private noiseFilter: BiquadFilterNode | null = null;
	private baseOsc: OscillatorNode | null = null;
	private isEnabled = false;

	public init(): boolean {
		if (typeof window === 'undefined') return false;
		if (this.ctx) return true;

		try {
			const AudioContextClass =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

			if (!AudioContextClass) return false;

			this.ctx = new AudioContextClass();

			// Master Gain Node with anti-click ramping
			this.masterGain = this.ctx.createGain();
			this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
			this.masterGain.connect(this.ctx.destination);

			// 1. Atmospheric Pink Noise Canopy Floor (Generative breeze and Rayleigh mist)
			const bufferSize = Math.max(this.ctx.sampleRate * 2, 88200);
			const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
			const output = noiseBuffer.getChannelData(0);
			let b0 = 0;
			let b1 = 0;
			let b2 = 0;

			for (let i = 0; i < bufferSize; i++) {
				const white = Math.random() * 2 - 1;
				b0 = 0.99886 * b0 + white * 0.0555179;
				b1 = 0.99332 * b1 + white * 0.0750759;
				b2 = 0.969 * b2 + white * 0.153852;
				output[i] = (b0 + b1 + b2) * 0.035;
			}

			const noiseSource = this.ctx.createBufferSource();
			noiseSource.buffer = noiseBuffer;
			noiseSource.loop = true;

			this.noiseFilter = this.ctx.createBiquadFilter();
			this.noiseFilter.type = 'bandpass';
			this.noiseFilter.frequency.setValueAtTime(420, this.ctx.currentTime);
			this.noiseFilter.Q.setValueAtTime(1.6, this.ctx.currentTime);

			noiseSource.connect(this.noiseFilter);
			this.noiseFilter.connect(this.masterGain);
			noiseSource.start();

			// 2. Earth Root Mass Grounding Drone (55 Hz / A1 - Deep vegetative stability)
			this.baseOsc = this.ctx.createOscillator();
			this.baseOsc.type = 'sine';
			this.baseOsc.frequency.setValueAtTime(55.0, this.ctx.currentTime);

			const baseGain = this.ctx.createGain();
			baseGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

			this.baseOsc.connect(baseGain);
			baseGain.connect(this.masterGain);
			this.baseOsc.start();

			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Modulates acoustic mist resonance based on camera flight speed and solar PAR.
	 */
	public updateSpatialDynamics(velocity: number, parVal = 940): void {
		if (!this.ctx || !this.noiseFilter || !this.masterGain || !this.isEnabled) return;
		const now = this.ctx.currentTime;

		// As user flies through 3D space, cutoff opens from 350 Hz to 2400 Hz
		const targetFreq = Math.min(380 + velocity * 1.8 + parVal * 0.35, 2600);
		this.noiseFilter.frequency.setTargetAtTime(targetFreq, now, 0.08);
	}

	/**
	 * Emits a resonant pentatonic chime when flying near or docking with a spatial facility/cultivar.
	 */
	public triggerNodeChime(frequencyHz: number): void {
		if (!this.ctx || !this.masterGain || !this.isEnabled) return;
		const now = this.ctx.currentTime;

		try {
			const osc = this.ctx.createOscillator();
			const chimeGain = this.ctx.createGain();

			osc.type = 'triangle';
			osc.frequency.setValueAtTime(frequencyHz, now);

			chimeGain.gain.setValueAtTime(0.0001, now);
			chimeGain.gain.linearRampToValueAtTime(0.12, now + 0.04);
			chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

			osc.connect(chimeGain);
			chimeGain.connect(this.masterGain);

			osc.start(now);
			osc.stop(now + 1.25);
		} catch {
			// Fail-safe audio glitch suppression
		}
	}

	/**
	 * Toggles bio-acoustic playback, strictly respecting browser autoplay permissions.
	 */
	public toggle(): boolean {
		if (!this.ctx) {
			const success = this.init();
			if (!success) return false;
		}

		if (this.ctx && this.ctx.state === 'suspended') {
			this.ctx.resume();
		}

		this.isEnabled = !this.isEnabled;
		if (this.ctx && this.masterGain) {
			const now = this.ctx.currentTime;
			this.masterGain.gain.setTargetAtTime(this.isEnabled ? 0.22 : 0.0, now, 0.15);
		}

		return this.isEnabled;
	}

	public getActiveStatus(): boolean {
		return this.isEnabled;
	}

	public dispose(): void {
		if (this.ctx) {
			try {
				this.ctx.close();
			} catch {
				// Ignore close error
			}
			this.ctx = null;
		}
		this.isEnabled = false;
	}
}

// Singleton helper
let synthesizerInstance: BioAcousticSynthesizer | null = null;

export function getBioSynthesizer(): BioAcousticSynthesizer {
	if (!synthesizerInstance) {
		synthesizerInstance = new BioAcousticSynthesizer();
	}
	return synthesizerInstance;
}
