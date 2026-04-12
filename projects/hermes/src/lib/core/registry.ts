import { TopicChannel } from './topic';
import { TopicConfig, TopicMap } from './types';

export class TopicRegistry<TTopics extends TopicMap> {
  private readonly channels = new Map<string, TopicChannel<any>>();
  private readonly configs: Record<string, TopicConfig>;

  constructor(configs?: Partial<Record<keyof TTopics & string, TopicConfig>>) {
    this.configs = (configs ?? {}) as Record<string, TopicConfig>;
  }

  getChannel<K extends keyof TTopics & string>(topic: K): TopicChannel<TTopics[K]> {
    let channel = this.channels.get(topic);
    if (!channel) {
      channel = new TopicChannel<TTopics[K]>(topic, this.configs[topic] ?? {});
      this.channels.set(topic, channel);
    }
    return channel;
  }

  getConfig<K extends keyof TTopics & string>(topic: K): TopicConfig {
    return this.configs[topic] ?? {};
  }
}