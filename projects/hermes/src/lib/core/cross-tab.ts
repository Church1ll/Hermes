import { BusMessage, TopicMap } from './types';

interface CrossTabBridgeOptions<TTopics extends TopicMap> {
  channelName: string;
  tabId: string;
  onMessage: <K extends keyof TTopics & string>(message: BusMessage<TTopics[K]>) => void;
  shouldMirrorTopic: (topic: keyof TTopics & string) => boolean;
}

export class CrossTabBridge<TTopics extends TopicMap> {
  private readonly channel?: BroadcastChannel;

  constructor(private readonly options: CrossTabBridgeOptions<TTopics>) {
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(options.channelName);
      this.channel.onmessage = (event: MessageEvent<BusMessage>) => {
        const message = event.data;
        if (!message?.topic) return;
        if (message.meta?.tabId === this.options.tabId) return;
        if (!this.options.shouldMirrorTopic(message.topic as keyof TTopics & string)) return;
        this.options.onMessage(message as BusMessage<any>);
      };
    }
  }

  broadcast(message: BusMessage): void {
    this.channel?.postMessage(message);
  }

  destroy(): void {
    this.channel?.close();
  }
}