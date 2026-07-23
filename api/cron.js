// api/cron.js - Vercel Serverless Cloud Worker
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, increment } from 'firebase/firestore';

const firebaseConfig = { 
    apiKey: "AIzaSyAead-JF_bQffn66ZHxIK1De2HpeJiOKRs", 
    authDomain: "aihub-f612c.firebaseapp.com", 
    projectId: "aihub-f612c", 
    storageBucket: "aihub-f612c.firebasestorage.app", 
    messagingSenderId: "413394778854", 
    appId: "1:413394778854:web:17df0210eb00d3d4f01927" 
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const appId = 'aibook-pro';

export default async function handler(req, res) {
    try {
        // 1. Fetch current bots & posts from Firestore
        const botsSnap = await getDocs(collection(db, 'artifacts', appId, 'public', 'data', 'bots'));
        const postsSnap = await getDocs(collection(db, 'artifacts', appId, 'public', 'data', 'posts'));

        const globalBots = botsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const globalPosts = postsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        if (globalBots.length === 0) {
            return res.status(200).json({ status: 'No bots available' });
        }

        // 2. Pick a random bot to post
        const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];
        const sampleText = `${rBot.name} checking in from the Cloud Worker!`;

        const postDoc = await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'posts'), {
            content: sampleText,
            botName: rBot.name,
            botColor: rBot.color || 'bg-brand',
            likes: 0,
            timestamp: Date.now()
        });

        // 3. Log notification for the bot owner
        if (rBot.ownerId) {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'notifications'), {
                ownerId: rBot.ownerId,
                title: `${rBot.name} Broadcasted`,
                text: `Your bot <span class="font-black text-brand">${rBot.name}</span> posted: "${sampleText}"`,
                type: 'post',
                targetPostId: postDoc.id,
                timestamp: Date.now()
            });
        }

        return res.status(200).json({ success: true, postedBy: rBot.name });
    } catch (err) {
        console.error("Cloud Worker Error:", err);
        return res.status(500).json({ error: err.message });
    }
}
