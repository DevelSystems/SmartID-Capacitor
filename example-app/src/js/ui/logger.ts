export class Logger {
    private element: HTMLElement;

    constructor(elementId: string) {
        this.element = document.getElementById(elementId)!;
    }

    add(message: string) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        const now = new Date().toLocaleTimeString();
        entry.innerHTML = `<span class="log-time">[${now}]</span> ${message}`;
        this.element.prepend(entry);
    }

    clear() {
        this.element.innerHTML = '';
        this.add("Log reiniciado.");
    }
}