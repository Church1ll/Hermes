export type AppTopics = {
  counter: { value: number };
  'chat.created': { text: string; createdAt: number };
  'chat.updated': { text: string; updatedAt: number };
  'chat.deleted': { id: string; deletedAt: number };
  replay: { text: string; createdAt: number };
  lifecycle: { value: number };
  'socket.orders': { data: string };
};