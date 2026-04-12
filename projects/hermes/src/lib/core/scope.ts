import { SubscriptionScope } from './types';

export class Scope implements SubscriptionScope {
  private teardowns = new Set<() => void>();
  public disposed = false;

  add(teardown: () => void): void {
    if (this.disposed) {
      teardown();
      return;
    }
    this.teardowns.add(teardown);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;

    for (const teardown of this.teardowns) {
      try {
        teardown();
      } catch {
        // ignore teardown errors
      }
    }

    this.teardowns.clear();
  }
}