export type TopicMap = Record<string, unknown>;

export interface MessageMeta {
  id: string;
  timestamp: number;
  source: 'local' | 'cross-tab' | 'external';
  tabId?: string;
  headers?: Record<string, string>;
  key?: string;
  correlationId?: string;
}

export interface BusMessage<T = unknown> {
  topic: string;
  payload: T;
  meta: MessageMeta;
}

export interface TopicConfig {
  replay?: number;
  crossTab?: boolean;
  dedupeByMessageId?: boolean;
}

export interface SubscribeOptions {
  scope?: SubscriptionScope;
}

export interface PublishOptions {
  headers?: Record<string, string>;
  key?: string;
  correlationId?: string;
}

export interface ExternalSourceContext<T> {
  emit: (payload: T, options?: PublishOptions) => void;
}

export type ExternalSourceFactory<T> =
  (ctx: ExternalSourceContext<T>) => () => void;

export interface SubscriptionScope {
  add(teardown: () => void): void;
  dispose(): void;
  readonly disposed: boolean;
}

export type TopicPattern = string;