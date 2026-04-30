

# SmartID Ionic Capacitor Plugin — Integration Guide

## Requirements

| Item | Value |
|------|-------|
| Ionic | 6.0+ |
| Capacitor | 5.0+ |
| TypeScript | 4.0+ |
| Android Min SDK | 21 |
| iOS Deployment Target | 12.0+ |

---

## `StartLocation`

> **iOS only**

Initializes location services and requests location authorization from the OS. Must be called before `getRawData` to ensure location data is available during fingerprint collection.

**Signature:**
```typescript
startLocation(): Promise<void>
```

**Usage:**
```typescript
import { SmartID } from 'capacitor-smartid';

await SmartID.startLocation();
```

---

## `GetRawData`

> **iOS and Android**

Collects raw device fingerprint data and returns it encoded. Runs asynchronously.

**Signature:**
```typescript
getRawData(options?: GetRawDataOptions): Promise<GetRawDataResponse>
```

**`GetRawDataOptions`:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `backendDomain` | `string` | Backend URL for SSL certificate chain retrieval. Optional. |
| `smartIDDomain` | `string` | SmartID domain used for IP resolution via ipify. Optional. |

**`GetRawDataResponse`:**
| Field | Type | Description |
|-------|------|-------------|
| `data` | `string` | encoded device payload |
| `time` | `number` | Execution duration in ms |

**Usage:**
```typescript
import { SmartID } from 'capacitor-smartid';

try {
    const result = await SmartID.getRawData({
        backendDomain: 'https://your-backend.com',
        smartIDDomain: 'https://your-smartid-domain.com'
    });
    // result.data: encoded device payload
    // result.time: execution duration in ms
} catch (error) {
    // handle error
}
```

---

## `StartSecurityChecks`

> **Android only**

Starts continuous background security monitoring. Results are delivered through the `securityReasons` event listener as a list of triggered security reason codes.

**Signature:**
```typescript
startSecurityChecks(options: StartSecurityChecksOptions): Promise<void>
```

**`StartSecurityChecksOptions`:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `license` | `string` | Your SmartID license key |
| `channelId` | `number` | Channel identifier |

**`securityReasons` event payload:**
| Field | Type | Description |
|-------|------|-------------|
| `reasons` | `number[]` | List of triggered security reason codes |

**Usage:**
```typescript
import { SmartID } from 'capacitor-smartid';

await SmartID.startSecurityChecks({ license: 'YOUR_KEY', channelId: 1 });

SmartID.addListener('securityReasons', (result) => {
    console.log(result.reasons); // number[]
});
```

---

## `StopSecurityChecks`

> **Android only**

Stops the active security monitoring loop.

**Signature:**
```typescript
stopSecurityChecks(): Promise<void>
```

**Usage:**
```typescript
await SmartID.stopSecurityChecks();
SmartID.removeAllListeners();
```

---

## `StartBlockCellphoneScreen`

> **Android only**

Controls screen capture and app-level blocking during active sessions. Maps to `StartBlockCellphoneScreen(context, enableScreen, enableApp)`.

**Signature:**
```typescript
startBlockCellphoneScreen(options: BlockCellphoneScreenOptions): Promise<void>
```

**`BlockCellphoneScreenOptions`:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `enableScreen` | `boolean` | Blocks the screen from being captured or mirrored |
| `enableApp` | `boolean` | Blocks the app from being used during an active threat |

**Usage:**
```typescript
await SmartID.startBlockCellphoneScreen({
    enableScreen: true,
    enableApp:    true
});
```

---

## `EnableOverlayProtection`

> **Android only**

Blocks overlay and screen-overlay attacks while the app is in the foreground. Returns whether protection was successfully enabled.

**Signature:**
```typescript
enableOverlayProtection(): Promise<EnableOverlayProtectionResponse>
```

**`EnableOverlayProtectionResponse`:**
| Field | Type | Description |
|-------|------|-------------|
| `enabled` | `boolean` | `true` if overlay protection was successfully activated |

**Usage:**
```typescript
const result = await SmartID.enableOverlayProtection();
if (result.enabled) {
    // overlay protection is active
}
```
