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
    let leaderStableTimer: number | undefined;

    const startIfLeader = () => {
      if (this.teardowns.has(topic)) return;
      if (!this.elector.isLeader) return;

      if (leaderStableTimer) return;

      leaderStableTimer = window.setTimeout(() => {
        leaderStableTimer = undefined;

        if (!this.elector.isLeader || this.teardowns.has(topic)) return;

        const teardown = factory({
          emit: (payload, options) => this.bus.publish(topic, payload, options),
        });
        this.teardowns.set(topic, teardown);
      }, 1000);
    };

    const stopIfFollower = () => {
      if (!this.elector.isLeader) {
        if (leaderStableTimer) {
          window.clearTimeout(leaderStableTimer);
          leaderStableTimer = undefined;
        }

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