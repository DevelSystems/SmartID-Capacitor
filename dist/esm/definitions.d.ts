import type { PluginListenerHandle } from '@capacitor/core';
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
export interface smartidPlugin {
    startLocation(): Promise<void>;
    getRawData(options: GetRawDataOptions): Promise<GetRawDataResponse>;
    startSecurityChecks(options: StartSecurityChecksOptions): Promise<void>;
    stopSecurityChecks(): Promise<void>;
    startBlockCellphoneScreen(options: BlockCellphoneScreenOptions): Promise<void>;
    enableOverlayProtection(): Promise<EnableOverlayProtectionResponse>;
    removeAllListeners(): Promise<void>;
    addListener(eventName: 'securityReasons', listenerFunc: (result: SecurityReasonsEvent) => void): Promise<PluginListenerHandle>;
    addListener(eventName: 'onCloseApp', listenerFunc: () => void): Promise<PluginListenerHandle>;
}
