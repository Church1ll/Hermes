export type AppTopics = {
  'chat.message': { id: string; text: string; roomId: string };
  'modal.open': { name: string; props?: unknown };
  'notifications.count': number;
  'socket.orders': { orderId: string; status: string };
  'counter': { counter: number };
};