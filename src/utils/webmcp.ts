/**
 * Web Model Context Protocol (WebMCP) Browser Standard Implementation
 * Adheres to W3C Web Machine Learning Community Group WebMCP Specifications.
 * Exposes document.modelContext & navigator.modelContext with registerTool & getTools.
 */

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  annotations?: {
    readOnlyHint?: boolean;
    consequentialHint?: boolean;
  };
  execute: (params: Record<string, any>) => Promise<string | object>;
}

declare global {
  interface Window {
    modelContext?: ModelContext;
    __WEBMCP_TOOLS__?: WebMCPTool[];
  }
  interface Document {
    modelContext?: ModelContext;
    __WEBMCP_TOOLS__?: WebMCPTool[];
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

interface ModelContext {
  registerTool: (tool: WebMCPTool) => Promise<void> | void;
  getTools: () => Promise<WebMCPTool[]>;
  tools?: Map<string, WebMCPTool>;
}

const registeredTools = new Map<string, WebMCPTool>();

export function initWebMCP(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Initialize or attach to existing document.modelContext / navigator.modelContext
  const getToolsHandler = async (): Promise<WebMCPTool[]> => {
    return Array.from(registeredTools.values());
  };

  const registerToolHandler = (tool: WebMCPTool): void => {
    if (!tool || !tool.name) return;
    registeredTools.set(tool.name, tool);
    syncGlobalTools();
  };

  const syncGlobalTools = () => {
    const toolsArray = Array.from(registeredTools.values());
    window.__WEBMCP_TOOLS__ = toolsArray;
    document.__WEBMCP_TOOLS__ = toolsArray;
  };

  // Provide document.modelContext
  if (!('modelContext' in document) || !(document as any).modelContext) {
    const mc: ModelContext = {
      registerTool: registerToolHandler,
      getTools: getToolsHandler,
      tools: registeredTools,
    };
    try {
      Object.defineProperty(document, 'modelContext', {
        value: mc,
        writable: true,
        configurable: true,
      });
    } catch {
      (document as any).modelContext = mc;
    }
  } else {
    // If browser natively provides modelContext, wrap registerTool to capture tools
    const originalRegister = (document as any).modelContext.registerTool;
    (document as any).modelContext.registerTool = (tool: WebMCPTool) => {
      registeredTools.set(tool.name, tool);
      syncGlobalTools();
      if (typeof originalRegister === 'function') {
        return originalRegister.call((document as any).modelContext, tool);
      }
    };
  }

  // Provide navigator.modelContext fallback
  if (!('modelContext' in navigator) || !(navigator as any).modelContext) {
    try {
      Object.defineProperty(navigator, 'modelContext', {
        value: (document as any).modelContext,
        writable: true,
        configurable: true,
      });
    } catch {
      (navigator as any).modelContext = (document as any).modelContext;
    }
  }

  // Provide window.modelContext fallback
  if (!('modelContext' in window) || !(window as any).modelContext) {
    (window as any).modelContext = (document as any).modelContext;
  }

  // Register Standard Tool 1: submit_inbound_lead
  registerToolHandler({
    name: 'submit_inbound_lead',
    description:
      'Submits an inbound investment, land partnership, or bulk berry off-take procurement dossier to Berryboyzz and receives an instant priority lead token and WhatsApp Agronomy Desk routing.',
    inputSchema: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          enum: ['investor', 'landowner', 'buyer', 'tour', 'other'],
          description: 'Category of commercial interest',
        },
        name: {
          type: 'string',
          description: 'Authorized representative or full legal name',
        },
        phone: {
          type: 'string',
          description: 'Direct mobile or WhatsApp telephone number with country code',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Official correspondence email address',
        },
        organization: {
          type: 'string',
          description: 'Firm, fund, hotel group, or estate name',
        },
        details: {
          type: 'object',
          description:
            'Role specific parameters (capitalBracket, cropPreference, acres, volumePerWeek)',
        },
        notes: {
          type: 'string',
          description: 'Specific commercial specifications or timelines',
        },
      },
      required: ['role', 'name', 'phone'],
    },
    annotations: {
      readOnlyHint: false,
      consequentialHint: true,
    },
    execute: async (params: Record<string, any>) => {
      const response = await fetch('/api/inbound-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return await response.json();
    },
  });

  // Register Standard Tool 2: get_roi_estimate
  registerToolHandler({
    name: 'get_roi_estimate',
    description:
      'Calculates commercial berry polyhouse capital expenditure, MIDH government subsidy, and projected EBITDA payback for agricultural acreage in Maharashtra.',
    inputSchema: {
      type: 'object',
      properties: {
        acres: {
          type: 'number',
          description: 'Land parcel area in acres (1 to 50)',
        },
        crop: {
          type: 'string',
          enum: ['strawberry', 'raspberry', 'blackberry', 'blueberry'],
          description: 'Target superfruit crop variety',
        },
      },
      required: ['acres'],
    },
    annotations: {
      readOnlyHint: true,
      consequentialHint: false,
    },
    execute: async ({ acres = 1, crop = 'strawberry' }) => {
      const capexPerAcre = 4200000;
      const subsidyPerAcre = 1680000;
      const netCapex = (capexPerAcre - subsidyPerAcre) * acres;
      const grossRevenue = 3200000 * acres;
      const netEbitda = grossRevenue * 0.48;
      const paybackMonths = Math.round((netCapex / netEbitda) * 12);

      return {
        acres,
        crop,
        totalCapexInr: capexPerAcre * acres,
        midhSubsidyInr: subsidyPerAcre * acres,
        netOutlayInr: netCapex,
        annualEbitdaInr: Math.round(netEbitda),
        paybackMonths,
        projectedIrrPercent: 44.8,
        currency: 'INR',
      };
    },
  });

  syncGlobalTools();

  // Dispatch lifecycle notification events for browser extensions and test suites
  window.dispatchEvent(
    new CustomEvent('webmcp:ready', {
      detail: { tools: Array.from(registeredTools.values()) },
    })
  );
  window.dispatchEvent(
    new CustomEvent('modelcontext:ready', {
      detail: { tools: Array.from(registeredTools.values()) },
    })
  );
}
