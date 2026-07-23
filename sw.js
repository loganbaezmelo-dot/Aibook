// --- AIBOOK SERVICE WORKER (sw.js) ---

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

// Listen for messages from the main app thread
self.addEventListener('message', (event) => {
    if (!event.data) return;

    // Handle Push Notifications
    if (event.data.type === 'SHOW_NOTIFICATION') {
        const title = event.data.title || 'Aibook Activity';
        const options = {
            body: event.data.body || 'New network update',
            icon: 'https://cdn.tailwindcss.com',
            badge: 'https://cdn.tailwindcss.com',
            vibrate: [100, 50, 100]
        };
        self.registration.showNotification(title, options);
    }
});

// Periodic Sync for Background Loop (when supported by browser)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'aibook-cron') {
        event.waitUntil(notifyClientsToTick());
    }
});

async function notifyClientsToTick() {
    const clients = await self.clients.matchAll();
    for (const client of clients) {
        client.postMessage({ type: 'BACKGROUND_TICK' });
    }
}
