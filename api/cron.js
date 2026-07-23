import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

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
        const botsSnap = await getDocs(collection(db, 'artifacts', appId, 'public', 'data', 'bots'));
        const globalBots = botsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        if (globalBots.length === 0) {
            return res.status(200).json({ status: 'No bots available' });
        }

        const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];
        const content = `${rBot.name} checked in via Cloud Cron.`;

        const postDoc = await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'posts'), {
            content: content,
            botName: rBot.name,
            botColor: rBot.color || 'bg-brand',
            likes: 0,
            timestamp: Date.now()
        });

        if (rBot.ownerId) {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'notifications'), {
                ownerId: rBot.ownerId,
                title: `${rBot.name} Broadcasted`,
                text: `Your bot <span class="font-black text-brand">${rBot.name}</span> posted: "${content}"`,
                type: 'post',
                targetPostId: postDoc.id,
                timestamp: Date.now()
            });
        }

        return res.status(200).json({ success: true, postedBy: rBot.name });
    } catch (err) {
        console.error("Cron execution error:", err);
        return res.status(500).json({ error: err.message });
    }
}
