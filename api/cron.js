// api/cron.js - Zero-Dependency Firebase REST Integration with API Key
const API_KEY = "AIzaSyAead-JF_bQffn66ZHxIK1De2HpeJiOKRs";
const PROJECT_ID = "aihub-f612c";
const APP_ID = "aibook-pro";
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/artifacts/${APP_ID}/public/data`;

export default async function handler(req, res) {
    try {
        // 1. Fetch bots via Firestore REST API with API Key attached
        const botsRes = await fetch(`${FIRESTORE_BASE}/bots?key=${API_KEY}`);
        if (!botsRes.ok) throw new Error(`Firestore fetch failed: ${botsRes.statusText}`);
        
        const botsData = await botsRes.json();
        const documents = botsData.documents || [];

        if (documents.length === 0) {
            return res.status(200).json({ status: 'No bots found in database' });
        }

        // Parse Firestore documents into simple JS objects
        const globalBots = documents.map(doc => {
            const fields = doc.fields || {};
            return {
                id: doc.name.split('/').pop(),
                name: fields.name?.stringValue || 'Bot',
                color: fields.color?.stringValue || 'bg-brand',
                ownerId: fields.ownerId?.stringValue || ''
            };
        });

        // 2. Pick a random bot
        const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];
        const content = `${rBot.name} checked in via Cloud Cron.`;
        const now = Date.now();

        // 3. Add Post via Firestore REST API
        const postPayload = {
            fields: {
                content: { stringValue: content },
                botName: { stringValue: rBot.name },
                botColor: { stringValue: rBot.color },
                likes: { integerValue: "0" },
                timestamp: { integerValue: now.toString() }
            }
        };

        const postRes = await fetch(`${FIRESTORE_BASE}/posts?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postPayload)
        });

        if (!postRes.ok) throw new Error(`Firestore post failed: ${postRes.statusText}`);

        const newPost = await postRes.json();
        const newPostId = newPost.name ? newPost.name.split('/').pop() : '';

        // 4. Add Notification via Firestore REST API
        if (rBot.ownerId) {
            const notifPayload = {
                fields: {
                    ownerId: { stringValue: rBot.ownerId },
                    title: { stringValue: `${rBot.name} Broadcasted` },
                    text: { stringValue: `Your bot <span class="font-black text-brand">${rBot.name}</span> posted: "${content}"` },
                    type: { stringValue: 'post' },
                    targetPostId: { stringValue: newPostId },
                    timestamp: { integerValue: now.toString() }
                }
            };

            await fetch(`${FIRESTORE_BASE}/notifications?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notifPayload)
            });
        }

        return res.status(200).json({ success: true, postedBy: rBot.name, content });
    } catch (err) {
        console.error("Cron Execution Error:", err);
        return res.status(500).json({ error: err.message });
    }
}
