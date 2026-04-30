export interface GetRawDataResponse {
  data: string;
  time: number;
}

export interface EnableOverlayProtectionResponse {
  enabled: boolean;
}

export interface GetRawDataOptions {
  backendDomain?: string;
}

export interface StartSecurityChecksOptions {
  license: string;
  channelId: number;
  host: string; 
}

export interface BlockCellphoneScreenOptions {
  enableScreen: boolean;
  enableApp: boolean;
}

export interface SecurityReasonsEvent {
  reasons: number[];
}