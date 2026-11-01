export type ConciergePersona = 'investor' | 'grower' | 'gourmet';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  persona?: ConciergePersona;
  text: string;
  timestamp: string;
  suggestedChips?: string[];
  actionPayload?: {
    type: 'whatsapp' | 'calculator' | 'modal' | 'tour';
    targetId?: string;
    params?: Record<string, any>;
  };
}

export interface TelemetrySnapshot {
  ph: number;
  ec: number;
  rh: number;
  temp: number;
  par: number;
  brixAverage: number;
  availableAcreageAllotments: number;
  totalAcreageAllotments: number;
  activeSyndicatePartners: number;
}
