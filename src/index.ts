import { registerPlugin } from '@capacitor/core';

import type { smartidPlugin } from './definitions';

const SmartID = registerPlugin<smartidPlugin>('smartid', {
  web: () => import('./web').then((m) => new m.smartidWeb()),
});

export * from './definitions';
export { SmartID };
