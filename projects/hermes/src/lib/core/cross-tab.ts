import { BusMessage, TopicMap } from './types';

interface CrossTabBridgeOptions<TTopics extends TopicMap> {
  channelName: string;
  tabId: string;
  onMessage: <K extends keyof TTopics & string>(message: BusMessage<TTopics[K]>) => void;
  shouldMirrorTopic: (topic: keyof TTopics & string) => boolean;
}

export class CrossTabBridge<TTopics extends TopicMap> {
  private readonly channel?: BroadcastChannel;
  private readonly storageKey: string;
  private readonly storageListener?: (event: StorageEvent) => void;

  constructor(private readonly options: CrossTabBridgeOptions<TTopics>) {
    this.storageKey = `${options.channelName}::event`;

    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(options.channelName);
      this.channel.onmessage = (event: MessageEvent<BusMessage>) => {
        const message = event.data;
        if (!message?.topic) return;
        if (message.meta?.tabId === this.options.tabId) return;
        if (!this.options.shouldMirrorTopic(message.topic as keyof TTopics & string)) return;
        this.options.onMessage(message as BusMessage<any>);
      };
    } else if (typeof window !== 'undefined') {
      this.storageListener = (event: StorageEvent) => {
        if (event.key !== this.storageKey || !event.newValue) return;

        const message = JSON.parse(event.newValue) as BusMessage;
        if (!message?.topic) return;
        if (message.meta?.tabId === this.options.tabId) return;
        if (!this.options.shouldMirrorTopic(message.topic as keyof TTopics & string)) return;

        this.options.onMessage(message as BusMessage<any>);
      };

      window.addEventListener('storage', this.storageListener);
    }
  }

  broadcast(message: BusMessage): void {
    if (this.channel) {
      this.channel?.postMessage(message);
      return;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(message));
      localStorage.removeItem(this.storageKey);
    }
  }

  destroy(): void {
    this.channel?.close();
    if (this.storageListener && typeof window !== 'undefined') {
      window.removeEventListener('storage', this.storageListener);
    }
  }
}