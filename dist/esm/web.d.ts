import { WebPlugin } from '@capacitor/core';
import type { smartidPlugin } from './definitions';
export interface GetRawDataResponse {
    data: string;
    time: number;
}
export interface EnableOverlayProtectionResponse {
    enabled: boolean;
}
export declare class smartidWeb extends WebPlugin implements smartidPlugin {
    startLocation(): Promise<void>;
    getRawData(): Promise<GetRawDataResponse>;
    startSecurityChecks(): Promise<void>;
    stopSecurityChecks(): Promise<void>;
    startBlockCellphoneScreen(): Promise<void>;
    enableOverlayProtection(): Promise<EnableOverlayProtectionResponse>;
}
