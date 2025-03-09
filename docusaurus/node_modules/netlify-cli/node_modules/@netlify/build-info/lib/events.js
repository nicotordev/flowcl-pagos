export class EventEmitter {
    callbacks = new Map();
    on(event, callback) {
        if (typeof callback !== 'function') {
            throw TypeError('Callback parameter has to be a function.');
        }
        if (!this.callbacks.has(event)) {
            this.callbacks.set(event, []);
        }
        const e = this.callbacks.get(event);
        e?.push(callback);
    }
    async emit(event, data) {
        for (const cb of this.callbacks.get(event) || []) {
            await cb(data);
        }
    }
}
//# sourceMappingURL=events.js.map