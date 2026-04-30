import { WebPlugin } from '@capacitor/core';

import type { smartidPlugin } from './definitions';

export interface GetRawDataResponse {
  data: string;
  time: number;
}

export interface EnableOverlayProtectionResponse {
  enabled: boolean;
}


export class smartidWeb extends WebPlugin implements smartidPlugin {
  

  async startLocation(): Promise<void> {
     console.warn('startLocation is not implemented on the web platform.');
     return Promise.reject('startLocation is not implemented on the web platform.');
  }


  async getRawData(): Promise<GetRawDataResponse> {
     console.warn('getRawData is not implemented on the web platform.');
     return Promise.reject('getRawData is not implemented on the web platform.');
  }

    async startSecurityChecks(): Promise<void> {
     console.warn('startSecurityChecks is not implemented on the web platform.');
     return Promise.reject('startSecurityChecks is not implemented on the web platform.');
  }

      async stopSecurityChecks(): Promise<void> {
     console.warn('stopSecurityChecks is not implemented on the web platform.');
     return Promise.reject('stopSecurityChecks is not implemented on the web platform.');
  }

        async startBlockCellphoneScreen(): Promise<void> {
     console.warn('startBlockCellphoneScreen is not implemented on the web platform.');
     return Promise.reject('startBlockCellphoneScreen is not implemented on the web platform.');
  }

          async enableOverlayProtection(): Promise<EnableOverlayProtectionResponse> {
     console.warn('enableOverlayProtection is not implemented on the web platform.');
     return Promise.reject('enableOverlayProtection is not implemented on the web platform.');
  }

}
