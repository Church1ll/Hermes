import { HermesBus } from './bus';
import { ExternalSourceFactory, TopicMap } from './types';
import { LeaderElector } from './leader';

export class ExternalSourceManager<TTopics extends TopicMap> {
  private readonly teardowns = new Map<string, () => void>();

  constructor(
    private readonly bus: HermesBus<TTopics>,
    private readonly elector: LeaderElector
  ) {}

  registerLeaderOnlySource<K extends keyof TTopics & string>(
    topic: K,
    factory: ExternalSourceFactory<TTopics[K]>
  ): void {
    const startIfLeader = () => {
      const existing = this.teardowns.get(topic);
      if (existing) return;

      if (this.elector.isLeader) {
        const teardown = factory({
          emit: (payload, options) => this.bus.publish(topic, payload, options),
        });
        this.teardowns.set(topic, teardown);
      }
    };

    const stopIfFollower = () => {
      if (!this.elector.isLeader) {
        const teardown = this.teardowns.get(topic);
        if (teardown) {
          teardown();
          this.teardowns.delete(topic);
        }
      }
    };

    startIfLeader();
    window.setInterval(() => {
      stopIfFollower();
      startIfLeader();
    }, 1000);
  }

  destroy(): void {
    for (const teardown of this.teardowns.values()) {
      teardown();
    }
    this.teardowns.clear();
  }
}