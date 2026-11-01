import { describe, it, expect, vi } from 'vitest';
// @ts-ignore - CommonJS / ESM script module
import { parseCliArgs, executeCliCommand } from '../../scripts/meta-apex-control.mjs';

describe('Meta Apex Control CLI', () => {
  it('parses command line flags and subcommands correctly', () => {
    const args = ['audit', '--business-id', 'biz_999', '--json'];
    const parsed = parseCliArgs(args);

    expect(parsed.command).toBe('audit');
    expect(parsed.flags['business-id']).toBe('biz_999');
    expect(parsed.flags['json']).toBe(true);
  });

  it('parses send-wa arguments', () => {
    const args = ['send-wa', '--to', '919822188800', '--text', 'Hello from Apex CLI'];
    const parsed = parseCliArgs(args);

    expect(parsed.command).toBe('send-wa');
    expect(parsed.flags['to']).toBe('919822188800');
    expect(parsed.flags['text']).toBe('Hello from Apex CLI');
  });

  it('executes simulate command locally and generates agent response', async () => {
    const result = await executeCliCommand('simulate', {
      channel: 'whatsapp',
      text: 'What is the ROI on 1 acre of Primocane berries?',
    });

    expect(result.success).toBe(true);
    expect(result.response.intent).toBe('roi_inquiry');
    expect(result.response.text).toContain('₹53.50 Lakhs/yr');
  });

  it('returns helpful error on unknown command', async () => {
    const result = await executeCliCommand('unknown-action', {});
    expect(result.success).toBe(false);
    expect(result.error).toContain('Unknown command');
  });
});
