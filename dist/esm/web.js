import { WebPlugin } from '@capacitor/core';
export class smartidWeb extends WebPlugin {
    async startLocation() {
        console.warn('startLocation is not implemented on the web platform.');
        return Promise.reject('startLocation is not implemented on the web platform.');
    }
    async getRawData() {
        console.warn('getRawData is not implemented on the web platform.');
        return Promise.reject('getRawData is not implemented on the web platform.');
    }
    async startSecurityChecks() {
        console.warn('startSecurityChecks is not implemented on the web platform.');
        return Promise.reject('startSecurityChecks is not implemented on the web platform.');
    }
    async stopSecurityChecks() {
        console.warn('stopSecurityChecks is not implemented on the web platform.');
        return Promise.reject('stopSecurityChecks is not implemented on the web platform.');
    }
    async startBlockCellphoneScreen() {
        console.warn('startBlockCellphoneScreen is not implemented on the web platform.');
        return Promise.reject('startBlockCellphoneScreen is not implemented on the web platform.');
    }
    async enableOverlayProtection() {
        console.warn('enableOverlayProtection is not implemented on the web platform.');
        return Promise.reject('enableOverlayProtection is not implemented on the web platform.');
    }
}
//# sourceMappingURL=web.js.map