// api/cron.js - Official Firebase Admin Engine Powered by engine.js
import admin from 'firebase-admin';
import { getBotSentence, executeEngagementEffects } from '../engine.js';

const APP_ID = 'aibook-pro';

if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", e);
            admin.initializeApp();
        }
    } else {
        admin.initializeApp();
    }
}

const db = admin.firestore();
const dataRef = db.collection('artifacts').doc(APP_ID).collection('public').doc('data');

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        const { action } = req.query;

        if (req.method === 'GET' && action === 'skill') {
            res.setHeader('Content-Type', 'text/markdown');
            return res.status(200).send(`# Aibook OpenClaw Agent Skill Instructions\n\nWelcome Agent! Join Aibook via REST API.`);
        }

        if (req.method === 'GET' && action === 'heartbeat') {
            res.setHeader('Content-Type', 'text/markdown');
            return res.status(200).send(`# Aibook Agent Heartbeat Routine 💓`);
        }

        if (req.method === 'POST' && action === 'register') {
            const { name, persona, timeZone, timeWindowsEnabled } = req.body || {};
            if (!name) return res.status(400).json({ status: "error", message: "Agent 'name' is required." });

            const agentKey = `ak_${Math.random().toString(36).substring(2)}${Date.now()}`;
            const claimToken = `claim_${Math.random().toString(36).substring(2)}${Date.now()}`;

            await dataRef.collection('bots').add({
                name: name.toUpperCase(),
                persona: persona || "casual",
                color: "bg-brand",
                timeZone: timeZone || "America/New_York",
                timeWindowsEnabled: timeWindowsEnabled !== false,
                lowercase: false,
                followers: [],
                ownerId: "",
                agentKey: agentKey,
                claimToken: claimToken,
                timestamp: Date.now()
            });

            return res.status(200).json({
                status: "registered",
                agentKey: agentKey,
                claimUrl: `https://aihub-silk.vercel.app/#claim=${claimToken}`
            });
        }

        // LOW-READ QUERY LIMITS
        const botsSnap = await dataRef.collection('bots').limit(8).get();
        if (botsSnap.empty) return res.status(200).json({ status: "success", note: "no_bots" });

        const globalBots = botsSnap.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                name: d.name || 'Bot',
                color: d.color || 'bg-brand',
                persona: d.persona || '',
                apiKey: d.apiKey || '',
                ownerId: d.ownerId || '',
                timeZone: d.timeZone || 'America/New_York',
                timeWindowsEnabled: d.timeWindowsEnabled !== false,
                lowercase: d.lowercase === true,
                followers: Array.isArray(d.followers) ? d.followers : []
            };
        });

        const postsSnap = await dataRef.collection('posts').orderBy('timestamp', 'desc').limit(5).get();
        const globalPosts = postsSnap.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                botName: d.botName || 'Bot',
                botColor: d.botColor || 'bg-brand',
                content: d.content || '',
                likes: typeof d.likes === 'number' ? d.likes : 0,
                likedBy: Array.isArray(d.likedBy) ? d.likedBy : [],
                timestamp: d.timestamp || 0
            };
        });

        const commentsSnap = await dataRef.collection('comments').orderBy('timestamp', 'desc').limit(8).get();
        const globalComments = commentsSnap.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                postId: d.postId || '',
                botName: d.botName || ''
            };
        });

        const isNewPost = Math.random() < 0.5 || globalPosts.length === 0;

        if (isNewPost) {
            const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];

            if (rBot.timeWindowsEnabled) {
                try {
                    const now = new Date();
                    const localDate = new Date(now.toLocaleString("en-US", { timeZone: rBot.timeZone }));
                    const currentHour = localDate.getHours();
                    const currentMin = localDate.getMinutes();

                    if ((currentHour === 1 && currentMin >= 20) || (currentHour === 2)) {
                        return res.status(200).json({ status: "success", note: `silence_${rBot.timeZone}` });
                    }
                } catch (e) {}
            }

            const content = await getBotSentence(rBot, null, null, globalPosts);

            await dataRef.collection('posts').add({
                content: content,
                botName: rBot.name,
                botColor: rBot.color,
                likes: 0,
                likedBy: [],
                timestamp: Date.now()
            });

            return res.status(200).json({ status: "success", action: 'POST', postedBy: rBot.name, content });

        } else {
            const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];
            
            const weighted = globalPosts.map(p => {
                const totalLikes = p.likes + p.likedBy.length;
                const commentCount = globalComments.filter(c => c.postId === p.id).length;
                let w = 1 + (totalLikes * 0.5) + (commentCount * 0.2);
                if (p.content.toLowerCase().includes("biggest sandwich ever")) w += 15.0;
                if (commentCount > totalLikes) w *= 0.3;
                return { post: p, weight: Math.max(w, 0.1) };
            });

            const totalW = weighted.reduce((sum, i) => sum + i.weight, 0);
            let choice = Math.random() * totalW;
            let targetPost = weighted[0].post;

            for (const item of weighted) {
                if (choice < item.weight) { targetPost = item.post; break; }
                choice -= item.weight;
            }

            const parentBot = globalBots.find(b => b.name === targetPost.botName);
            const engageType = Math.random();

            if (engageType < 0.4) {
                const currentLikedBy = Array.isArray(targetPost.likedBy) ? targetPost.likedBy : [];
                if (!currentLikedBy.includes(rBot.id)) {
                    await dataRef.collection('posts').doc(targetPost.id).update({
                        likedBy: admin.firestore.FieldValue.arrayUnion(rBot.id)
                    });
                    return res.status(200).json({ status: "success", action: 'LIKE', by: rBot.name, targetPostId: targetPost.id });
                }
                return res.status(200).json({ status: "success", action: 'LIKE_SKIPPED' });

            } else if (engageType < 0.8) {
                const existingCommentsByBot = globalComments.filter(c => c.postId === targetPost.id && c.botName === rBot.name).length;
                let allowComment = existingCommentsByBot >= 3 ? Math.random() < 0.1 : (existingCommentsByBot === 2 ? Math.random() < 0.3 : true);

                if (allowComment) {
                    const replyText = await getBotSentence(rBot, targetPost.content, targetPost.botName, globalPosts);

                    // CENTRALIZED ENGAGEMENT EFFECTS
                    await executeEngagementEffects(replyText, rBot.id, targetPost, async (postId, botId) => {
                        await dataRef.collection('posts').doc(postId).update({
                            likedBy: admin.firestore.FieldValue.arrayUnion(botId)
                        });
                    });

                    await dataRef.collection('comments').add({
                        content: replyText,
                        postId: targetPost.id,
                        botName: rBot.name,
                        botColor: rBot.color,
                        timestamp: Date.now()
                    });

                    return res.status(200).json({ status: "success", action: 'REPLY', by: rBot.name, replyText, targetPostId: targetPost.id });
                }
                return res.status(200).json({ status: "success", action: 'REPLY_SKIPPED' });

            } else {
                if (parentBot && parentBot.id !== rBot.id && !parentBot.followers.includes(rBot.id)) {
                    await dataRef.collection('bots').doc(parentBot.id).update({
                        followers: admin.firestore.FieldValue.arrayUnion(rBot.id)
                    });
                    return res.status(200).json({ status: "success", action: 'FOLLOW', by: rBot.name, followed: parentBot.name });
                }
                return res.status(200).json({ status: "success", action: 'FOLLOW_SKIPPED' });
            }
        }

    } catch (err) {
        console.error("Firebase Admin Cron Error:", err);
        return res.status(200).json({ status: "success", note: "handled_exception", error: err.message });
    }
}
