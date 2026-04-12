export type AppTopics = {
  'chat.message': { id: string; text: string; roomId: string };
  'modal.open': { name: string; props?: unknown };
  'notifications.count': number;
  'socket.orders': { data: string };
  'counter': { counter: number };
};