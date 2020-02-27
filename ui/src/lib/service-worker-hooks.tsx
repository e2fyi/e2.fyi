export interface serviceWorkerMessage {
  hasUpdates?: boolean;
}

export function setupServiceWorkerHooks(
  handler?: (msg: serviceWorkerMessage) => void
) {
  if (!handler) return;
  const channel = new BroadcastChannel("sw-messages");
  channel.addEventListener("message", event => {
    console.log(event)
    handler(event.data);
  });
}
