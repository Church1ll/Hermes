import { Observable, ReplaySubject, Subject } from 'rxjs';
import { BusMessage, TopicConfig } from './types';

export class TopicChannel<T> {
  private readonly subject: Subject<BusMessage<T>> | ReplaySubject<BusMessage<T>>;

  constructor(public readonly name: string, public readonly config: TopicConfig = {}) {
    this.subject = config.replay && config.replay > 0
      ? new ReplaySubject<BusMessage<T>>(config.replay)
      : new Subject<BusMessage<T>>();
  }

  publish(message: BusMessage<T>): void {
    this.subject.next(message);
  }

  stream(): Observable<BusMessage<T>> {
    return this.subject.asObservable();
  }
}