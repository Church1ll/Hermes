import { BusOptions } from 'hermes';
import { AppTopics } from './topics';

export const hermesOptions: BusOptions<AppTopics> = {
  topics: {
    counter: {
      replay: 1,
      crossTab: false,
      dedupeByMessageId: true,
    },
    'chat.created': {
      replay: 5,
      crossTab: false,
    },
    'chat.updated': {
      replay: 5,
      crossTab: false,
    },
    'chat.deleted': {
      replay: 5,
      crossTab: false,
    },
    replay: {
      replay: 5,
      crossTab: false,
    },
    lifecycle: {
      replay: 1,
      crossTab: false,
    },
    'socket.orders': {
      replay: 50,
      crossTab: true,
      dedupeByMessageId: true,
    },
  },
  crossTab: {
    enabled: true,
    channelName: 'hermes-bus',
  },
};