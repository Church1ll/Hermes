import { filter, map, Observable, Subscription } from 'rxjs';
import { Scope } from './scope';
import {
  BusMessage,
  PublishOptions,
  SubscribeOptions,
  TopicConfig,
  TopicMap,
} from './types';
import { TopicRegistry } from './registry';
import { CrossTabBridge } from './cross-tab';

function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createTabId(): string {
  return `tab-${Math.random().toString(36).slice(2, 10)}`;
}

export interface BusOptions<TTopics extends TopicMap> {
  topics?: Partial<Record<keyof TTopics & string, TopicConfig>>;
  crossTab?: {
    channelName?: string;
    enabled?: boolean;
  };
}

export class HermesBus<TTopics extends TopicMap> {
  private readonly registry: TopicRegistry<TTopics>;
  private readonly tabId = createTabId();
  private readonly seenMessageIds = new Set<string>();
  private readonly bridge?: CrossTabBridge<TTopics>;

  constructor(options: BusOptions<TTopics> = {}) {
    this.registry = new TopicRegistry<TTopics>(options.topics);

    if (options.crossTab?.enabled) {
      this.bridge = new CrossTabBridge<TTopics>({
        channelName: options.crossTab.channelName ?? 'hermes-bus',
        tabId: this.tabId,
        onMessage: (message) => this.receiveCrossTab(message),
        shouldMirrorTopic: (topic) => this.registry.getConfig(topic).crossTab === true,
      });
    }
  }

  createScope(): Scope {
    return new Scope();
  }

  publish<K extends keyof TTopics & string>(
    topic: K,
    payload: TTopics[K],
    options?: PublishOptions
  ): void {
    const message: BusMessage<TTopics[K]> = {
      topic,
      payload,
      meta: {
        id: createMessageId(),
        timestamp: Date.now(),
        source: 'local',
        tabId: this.tabId,
        headers: options?.headers,
        key: options?.key,
        correlationId: options?.correlationId,
      },
    };

    this.deliver(message);

    if (this.registry.getConfig(topic).crossTab) {
      this.bridge?.broadcast(message);
    }
  }

  subscribe<K extends keyof TTopics & string>(
    topic: K,
    handler: (payload: TTopics[K], message: BusMessage<TTopics[K]>) => void,
    options?: SubscribeOptions
  ): () => void {
    const subscription: Subscription = this.registry
      .getChannel(topic)
      .stream()
      .subscribe((message) => handler(message.payload, message));

    const teardown = () => subscription.unsubscribe();

    if (options?.scope) {
      options.scope.add(teardown);
    }

    return teardown;
  }

  stream<K extends keyof TTopics & string>(topic: K): Observable<TTopics[K]> {
    return this.registry.getChannel(topic).stream().pipe(map(m => m.payload));
  }

  destroy(): void {
    this.bridge?.destroy();
  }

  private deliver<K extends keyof TTopics & string>(message: BusMessage<TTopics[K]>): void {
    const config = this.registry.getConfig(message.topic);

    if (config.dedupeByMessageId) {
      if (this.seenMessageIds.has(message.meta.id)) return;
      this.seenMessageIds.add(message.meta.id);

      if (this.seenMessageIds.size > 5000) {
        const first = this.seenMessageIds.values().next().value;
        if (first) this.seenMessageIds.delete(first);
      }
    }

    this.registry.getChannel(message.topic).publish(message);
  }

  private receiveCrossTab<K extends keyof TTopics & string>(message: BusMessage<TTopics[K]>): void {
    this.deliver({
      ...message,
      meta: {
        ...message.meta,
        source: 'cross-tab',
      },
    });
  }
}

export function createBus<TTopics extends TopicMap>(
  options?: BusOptions<TTopics>
): HermesBus<TTopics> {
  return new HermesBus<TTopics>(options);
}