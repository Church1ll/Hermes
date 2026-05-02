interface LeaderState {
  leaderId: string | null;
  lastHeartbeat: number;
}

export class LeaderElector {
  private readonly tabId: string;
  private readonly channel?: BroadcastChannel;
  private readonly heartbeatMs: number;
  private readonly timeoutMs: number;
  private readonly startedAt = Date.now();
  private knownLeaderStartedAt = Number.MAX_SAFE_INTEGER;
  private isLeaderFlag = false;
  private state: LeaderState = {
    leaderId: null,
    lastHeartbeat: 0,
  };
  private heartbeatTimer?: number;
  private electionTimer?: number;

  constructor(channelName = 'hermes-leader', heartbeatMs = 1500, timeoutMs = 4500) {
    this.tabId = `tab-${Math.random().toString(36).slice(2, 10)}`;
    this.heartbeatMs = heartbeatMs;
    this.timeoutMs = timeoutMs;

    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(channelName);
      this.channel.onmessage = (event) => this.handleMessage(event.data);
    }

    this.start();
  }

  get tab(): string {
    return this.tabId;
  }

  get isLeader(): boolean {
    return this.isLeaderFlag;
  }

  destroy(): void {
    if (this.heartbeatTimer) window.clearInterval(this.heartbeatTimer);
    if (this.electionTimer) window.clearInterval(this.electionTimer);
    this.channel?.close();
  }

  private isBetterLeader(candidateTabId: string, candidateStartedAt: number): boolean {
    if (!this.state.leaderId) return true;

    if (candidateStartedAt < this.knownLeaderStartedAt) return true;
    if (candidateStartedAt > this.knownLeaderStartedAt) return false;

    return candidateTabId < (this.state.leaderId ?? '');
  }

  private start(): void {
    this.channel?.postMessage({ type: 'hello', tabId: this.tabId });

    window.setTimeout(() => {
      if (!this.state.leaderId) {
        this.becomeLeader();
      }
    }, this.timeoutMs);

    this.electionTimer = window.setInterval(() => {
      const now = Date.now();

      if (this.state.leaderId && now - this.state.lastHeartbeat > this.timeoutMs) {
        this.becomeLeader();
      }
    }, this.heartbeatMs);

    this.heartbeatTimer = window.setInterval(() => {
      if (this.isLeaderFlag) {
        this.channel?.postMessage({
          type: 'heartbeat',
          tabId: this.tabId,
          timestamp: Date.now(),
          startedAt: this.startedAt
        });
      }
    }, this.heartbeatMs);
  }

  private becomeLeader(): void {
    this.isLeaderFlag = true;
    this.state.leaderId = this.tabId;
    this.state.lastHeartbeat = Date.now();
    this.knownLeaderStartedAt = this.startedAt;

    this.channel?.postMessage({
      type: 'leader',
      tabId: this.tabId,
      timestamp: Date.now(),
      startedAt: this.startedAt,
    });
  }

  private handleMessage(message: any): void {
    if (!message) return;

    if (message.type === 'hello') {
      if (this.isLeaderFlag) {
        this.channel?.postMessage({
          type: 'leader',
          tabId: this.tabId,
          timestamp: Date.now(),
          startedAt: this.startedAt,
        });
      }
      return;
    }

    if (message.type === 'leader' || message.type === 'heartbeat') {
      if (message.tabId === this.tabId) return;

      const candidateStartedAt = message.startedAt ?? Number.MAX_SAFE_INTEGER;

      if (this.isBetterLeader(message.tabId, candidateStartedAt)) {
        this.isLeaderFlag = false;
        this.state.leaderId = message.tabId;
        this.state.lastHeartbeat = message.timestamp ?? Date.now();
        this.knownLeaderStartedAt = candidateStartedAt;
      }
    }
  }
}