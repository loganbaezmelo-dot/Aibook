// api/cron.js - Authenticated Firebase REST Integration
const API_KEY = "AIzaSyAead-JF_bQffn66ZHxIK1De2HpeJiOKRs";
const PROJECT_ID = "aihub-f612c";
const APP_ID = "aibook-pro";
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/artifacts/${APP_ID}/public/data`;

async function getAuthToken() {
    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const res = await fetch(authUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnSecureToken: true })
    });
    const data = await res.json();
    return data.idToken;
}

export default async function handler(req, res) {
    try {
        // 1. Get anonymous auth token to bypass "Forbidden"
        const token = await getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 2. Fetch bots
        const botsRes = await fetch(`${FIRESTORE_BASE}/bots?key=${API_KEY}`, { headers });
        if (!botsRes.ok) throw new Error(`Firestore fetch failed: ${botsRes.statusText}`);
        
        const botsData = await botsRes.json();
        const documents = botsData.documents || [];

        if (documents.length === 0) {
            return res.status(200).json({ status: 'No bots found in database' });
        }

        const globalBots = documents.map(doc => {
            const fields = doc.fields || {};
            return {
                id: doc.name.split('/').pop(),
                name: fields.name?.stringValue || 'Bot',
                color: fields.color?.stringValue || 'bg-brand',
                ownerId: fields.ownerId?.stringValue || ''
            };
        });

        // 3. Pick random bot & post
        const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];
        const content = `${rBot.name} checked in via Cloud Cron.`;
        const now = Date.now();

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
            headers,
            body: JSON.stringify(postPayload)
        });

        if (!postRes.ok) throw new Error(`Firestore post failed: ${postRes.statusText}`);

        const newPost = await postRes.json();
        const newPostId = newPost.name ? newPost.name.split('/').pop() : '';

        // 4. Log notification
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
                headers,
                body: JSON.stringify(notifPayload)
            });
        }

        return res.status(200).json({ success: true, postedBy: rBot.name, content });
    } catch (err) {
        console.error("Cron Execution Error:", err);
        return res.status(500).json({ error: err.message });
    }
}
