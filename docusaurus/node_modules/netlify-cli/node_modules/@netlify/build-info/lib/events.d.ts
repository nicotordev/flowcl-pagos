type Callback = (...args: any) => any;
type EventsMap = Record<string, Callback>;
export declare class EventEmitter<Events extends EventsMap = EventsMap> {
    callbacks: Map<keyof Events, Callback[]>;
    on<EventName extends keyof Events>(event: EventName, callback: Events[EventName]): void;
    emit<EventName extends keyof Events>(event: EventName, data: Parameters<Events[EventName]>[0]): Promise<void>;
}
export {};
