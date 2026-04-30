import { SmartID} from 'smartid';
import { Capacitor } from '@capacitor/core';
import { Logger } from './ui/logger';
import { App } from '@capacitor/app';

const viewMenu = document.getElementById('view-menu')!;
const viewDetail = document.getElementById('view-detail')!;
const btnBack = document.getElementById('btn-back')!;
const mainTitle = document.getElementById('main-title')!;
const detailTitle = document.getElementById('detail-title')!;
const paramsContainer = document.getElementById('params-container')!;
const btnExecute = document.getElementById('btn-execute')!;

const appLogger = new Logger('console-log');

const shownReasons = new Set<number>();
const REASON_MESSAGES: Record<number, string> = {
    20051: "Malware detectado",
    20052: "Root detectado",
    20053: "Cámara virtual detectada",
    20054: "Magisk detectado"
};

const methodsConfig = [
    { id: 'startLocation', label: 'Start Location' },
    { id: 'getRawData', label: 'Get Raw Data' },
    { id: 'startSecurityChecks', label: 'Start Security Checks' },
    { id: 'stopSecurityChecks', label: 'Stop Security Checks' },
    { id: 'startBlockCellphoneScreen', label: 'Block Screen' },
    { id: 'enableOverlayProtection', label: 'Overlay Protection' },
    { id: 'removeAllListeners', label: 'Remove All Listeners' }
];

App.addListener('backButton', (data) => {
    const isDetailVisible = !document.getElementById('view-detail')?.classList.contains('hidden');

    if (isDetailVisible) {
        (window as any).showMenu();
    } else {
    }
});


(window as any).openMethod = (methodId: string) => {
    appLogger.clear();
    const method = methodsConfig.find(m => m.id === methodId);
    if (!method) return;

    viewMenu.classList.add('hidden');
    viewDetail.classList.remove('hidden');
    btnBack.classList.remove('hidden');
    mainTitle.innerText = method.label;
    setupForm(methodId);
};

(window as any).showMenu = () => {
    viewMenu.classList.remove('hidden');
    viewDetail.classList.add('hidden');
    btnBack.classList.add('hidden');
    mainTitle.innerText = "SmartID Dummy Menu";
};

(window as any).clearLogs = () => appLogger.clear();


function setupForm(id: string) {
    paramsContainer.innerHTML = ''; 
    detailTitle.innerText = id;
    btnExecute.innerText = `EJECUTAR ${id.toUpperCase()}`;

    switch (id) {
        case 'getRawData':
            paramsContainer.innerHTML = `
                <ion-item fill="outline" mode="md" class="ion-margin-bottom">
                    <ion-label position="stacked">backendDomain (opcional)</ion-label>
                    <ion-input id="input-domain" placeholder="https://api.backend.com"></ion-input>
                </ion-item>`;
            btnExecute.onclick = () => runGetRawData();
            break;

        case 'startSecurityChecks':
            paramsContainer.innerHTML = `
            <ion-radio-group id="security-action" value="reasons">
            <ion-item lines="none">
                <ion-label>Solo Alertas (securityReasons)</ion-label>
                <ion-radio slot="start" value="reasons"></ion-radio>
            </ion-item>

            <ion-item lines="none">
                <ion-label>Función personalizada (onCloseApp)</ion-label>
                <ion-radio slot="start" value="custom"></ion-radio>
            </ion-item>

            <ion-item lines="none">
                <ion-label>Cierre</ion-label>
                <ion-radio slot="start" value="exit"></ion-radio>
            </ion-item>
        </ion-radio-group>
                <ion-item fill="outline" mode="md" class="ion-margin-bottom">
                    <ion-label position="stacked">Licencia</ion-label>
                    <ion-input id="input-license" value="iLoobglrKBV6ceQDPujRvdd2X5cpm04_"></ion-input>
                </ion-item>
                <ion-item fill="outline" mode="md" class="ion-margin-bottom">
                    <ion-label position="stacked">Channel ID</ion-label>
                    <ion-input id="input-channel" type="number" value="4"></ion-input>
                </ion-item>
                <ion-item fill="outline" mode="md">
                    <ion-label position="stacked">Host</ion-label>
                    <ion-input id="input-host" value="https://stats.banrural.com.gt/dev"></ion-input>
                </ion-item>`;
            btnExecute.onclick = () => runSecurityChecks();
            break;

        case 'startBlockCellphoneScreen':
            paramsContainer.innerHTML = `
                <ion-item lines="none">
                    <ion-label>Habilitar Pantalla (enableScreen)</ion-label>
                    <ion-toggle id="toggle-screen" checked></ion-toggle>
                </ion-item>
                <ion-item lines="none" class="ion-margin-top">
                    <ion-label>Habilitar App (enableApp)</ion-label>
                    <ion-toggle id="toggle-app"></ion-toggle>
                </ion-item>`;
            btnExecute.onclick = () => runBlockScreen();
            break;

        default:
            paramsContainer.innerHTML = `<p style="color: #888">Este método no requiere parámetros adicionales.</p>`;
            if(id === 'startLocation') btnExecute.onclick = () => runStartLocation();
            if(id === 'stopSecurityChecks') btnExecute.onclick = () => runStopSecurityChecks();
            if(id === 'enableOverlayProtection') btnExecute.onclick = () => runOverlayProtection();
    }
}


async function runStartLocation() {
    try {
        await SmartID.startLocation();
        if (Capacitor.getPlatform() === 'ios') appLogger.add("[OK] startLocation ejecutado.");
    } catch (e: any) { appLogger.add(`[ERROR] ${e.message}`); }
}

async function runGetRawData() {
    const domainInput = document.getElementById('input-domain') as HTMLInputElement;
    const domain = domainInput ? domainInput.value : '';

    appLogger.add(`Ejecutando getRawData...`);
    try {
        const result = await SmartID.getRawData({backendDomain: domain});
        appLogger.add(`[SUCCESS] Time: ${result.time}ms`);
        appLogger.add(`Data: ${result.data}`);
    } catch (e: any) { appLogger.add(`[ERROR] ${e.message}`); }
}

async function runSecurityChecks() {
    const license = (document.getElementById('input-license') as HTMLInputElement).value;
    const channelId = parseInt((document.getElementById('input-channel') as HTMLInputElement).value, 10);
    const host = (document.getElementById('input-host') as HTMLInputElement).value;
    const securityAction = (document.getElementById('security-action') as any).value;
    try {
        if (securityAction === 'reasons') {
        await SmartID.addListener('securityReasons', (event) => {
          //  appLogger.add(`[EVENT] securityReasons: ${event.reasons.join(', ')}`);
            event.reasons.forEach(code => {
                if (REASON_MESSAGES[code]) {
                    appLogger.add(`🚨 AMENAZA: ${REASON_MESSAGES[code]}`);
                }
            });
        });
    }

    if (securityAction === 'custom') {
          await SmartID.addListener('onCloseApp', () => {
        console.warn("¡Acción personalizada ejecutada!");
        
        alert("Tu dispositivo no cumple con los requisitos de seguridad.");
        
          App.exitApp();
    });
}

        await SmartID.startSecurityChecks({license: license,
    channelId: channelId,
    host: host});
        if (Capacitor.getPlatform() === 'android') {
            appLogger.add("[OK] startSecurityChecks activo.");
        }
    } catch (e: any) { appLogger.add(`[ERROR] ${e.message}`); }
}

async function runStopSecurityChecks() {
    try {
        await SmartID.stopSecurityChecks();
        await SmartID.removeAllListeners();
        shownReasons.clear();
        if (Capacitor.getPlatform() === 'android') {
            appLogger.add("[OK] Ciclo de monitoreo detenido en Android.");
            appLogger.add("[CLEAN] Todos los listeners eliminados.");
        }
    } catch (e: any) { appLogger.add(`[ERROR] ${e.message}`); }
}

async function runBlockScreen() {
    const enableScreen = (document.getElementById('toggle-screen') as any).checked;
    const enableApp = (document.getElementById('toggle-app') as any).checked;
    
    try {
        
        await SmartID.startBlockCellphoneScreen({
             enableApp: enableApp,
    enableScreen: enableScreen
        });
        if (Capacitor.getPlatform() === 'android') {
            appLogger.add(`[OK] Pantalla bloqueada: ${enableScreen}, App: ${enableApp}`);
        }
    } catch (e: any) { appLogger.add(`[ERROR] ${e.message}`); }
}

async function runOverlayProtection() {
    try {
        const result = await SmartID.enableOverlayProtection();
        if (Capacitor.getPlatform() === 'android') {
            appLogger.add(`[RESULT] enabled: ${result.enabled}`);
        }
    } catch (e: any) { appLogger.add(`[ERROR] ${e.message}`); }
}
