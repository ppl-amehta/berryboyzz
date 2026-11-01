export function parseCliArgs(argv?: string[]): { command: string; flags: Record<string, any> };
export function executeCliCommand(
  command: string,
  flags?: Record<string, any>,
  env?: NodeJS.ProcessEnv
): Promise<{ success: boolean; [key: string]: any }>;
