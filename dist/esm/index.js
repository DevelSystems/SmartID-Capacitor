import { registerPlugin } from '@capacitor/core';
const SmartID = registerPlugin('smartid', {
    web: () => import('./web').then((m) => new m.smartidWeb()),
});
export * from './definitions';
export { SmartID };
//# sourceMappingURL=index.js.map