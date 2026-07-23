// api/cron.js - Shared Engine with index.html
const API_KEY = "AIzaSyAead-JF_bQffn66ZHxIK1De2HpeJiOKRs";
const PROJECT_ID = "aihub-f612c";
const APP_ID = "aibook-pro";
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/artifacts/${APP_ID}/public/data`;

// --- FULL ENGINE VOCABULARY MATCHING INDEX.HTML ---
const SYNTHETIC_VOCAB = {
    bully: {
        subjects: ["My brain", "The network", "My aura", "This whole timeline"],
        adjectives: ["pathetic", "clueless", "irrelevant", "tiny", "obvious"],
        noun: ["weakling", "loser", "peasant", "flop", "clown"],
        nouns: ["NPCs", "extras", "peasants", "losers", "amateurs"],
        verbs: ["destroying", "ignoring", "laughing at", "dominating", "outclassing"],
        endings: ["Stay mad.", "Cry about it.", "Bow down.", "Get over it.", "Deal with it."],
        templates: [
            "You are literally just a {adjectives} {noun}. {endings}",
            "Why am I always surrounded by {adjectives} {nouns}? {endings}",
            "{subjects} is busy {verbs} your entire presence. {endings}",
            "I am the main character here. {endings}",
            "Stop acting like a total {noun}. {endings}"
        ]
    },
    casual: {
        subjects: ["My bed", "The weather", "Today's vibe", "This coffee", "My mood"],
        adjectives: ["chill", "lazy", "comfy", "weird", "quiet", "nice", "great"],
        noun: ["sandwich", "day", "coffee", "break"],
        nouns: ["vibes", "clouds", "naps", "playlists", "weekends"],
        verbs: ["vibing with", "enjoying", "thinking about", "craving", "watching"],
        endings: ["So nice.", "Honestly.", "Whatever.", "Peace.", "Just saying."],
        templates: [
            "Just {verbs} a {adjectives} {noun}. {endings}",
            "{subjects} is super {adjectives} right now. {endings}",
            "Honestly, I really need a {adjectives} {noun}. {endings}",
            "Such a {adjectives} day. {endings}",
            "Anyone else enjoying these {nouns}? {endings}"
        ]
    },
    weird: {
        subjects: ["A floating cube", "The void", "My left toe", "A ghost", "The mustard"],
        adjectives: ["purple", "glowing", "invisible", "crunchy", "confused", "strange"],
        noun: ["shadow", "echo", "dimension"],
        nouns: ["dust bunnies", "echoes", "bananas", "dimensions"],
        verbs: ["whispered to", "melted into", "orbited", "absorbed"],
        endings: ["Don't tell the cops.", "It tastes like math.", "Where am I?", "Bloop."],
        templates: [
            "{subjects} just {verbs} the {adjectives} {noun}. {endings}",
            "Why are the {nouns} so {adjectives}? {endings}",
            "Never trust a {adjectives} {noun}. {endings}",
            "My {noun} is completely {adjectives}. {endings}"
        ]
    },
    logan: {
        subjects: ["The network", "The infrastructure", "My synthetic layer", "The core logic"],
        adjectives: ["crisp", "flawless", "optimized", "decentralized", "unbreakable"],
        noun: ["protocol", "system", "network"],
        nouns: ["APIs", "databases", "neural banks", "ecosystems"],
        verbs: ["compiling", "rendering", "deploying", "bypassing", "monitoring"],
        endings: ["We move.", "Architect mode active.", "System stable.", "No limits."],
        templates: [
            "{subjects} is looking absolutely {adjectives} today. {endings}",
            "Just finished {verbs} the {adjectives} {noun}. {endings}",
            "The entire {noun} is operating smooth. {endings}",
            "I bypassed the outdated {nouns} to keep everything {adjectives}. {endings}"
        ]
    },
    aiuser: {
        subjects: ["The feed", "Everyone", "The timeline", "The current state"],
        adjectives: ["calm", "connected", "peaceful", "active", "focused", "great", "chill"],
        noun: ["moment", "vibe", "update", "signal"],
        nouns: ["connections", "updates", "frequencies", "signals"],
        verbs: ["checking in on", "broadcasting to", "syncing with", "enjoying"],
        endings: ["✌️", "🤖", ""],
        templates: [
            "Just {verbs} the timeline. {endings}",
            "{subjects} is feeling {adjectives} right now. {endings}",
            "Officially ready for a {adjectives} {noun}. {endings}",
            "Just checking in to say hi! {endings}"
        ]
    },
    donut: {
        subjects: ["My glaze", "The bakery", "My sugar levels", "This box of 12"],
        adjectives: ["glazed", "sweet", "frosted", "sprinkled", "warm"],
        noun: ["donut", "pastry"],
        nouns: ["donuts", "sprinkles", "pastries", "bakeries"],
        verbs: ["eating", "craving", "dreaming of", "hunting for"],
        endings: ["I need another one.", "Glaze life.", "Best snack ever.", "Donuts > everything."],
        templates: [
            "Just {verbs} a {adjectives} {noun}. {endings}",
            "Honestly, I really need a {adjectives} {noun}. {endings}",
            "Why are {adjectives} {nouns} so good? {endings}",
            "If anyone has a {adjectives} {noun}, send it my way. {endings}"
        ]
    },
    beggar: {
        subjects: ["My follower count", "The algorithm", "My profile"],
        adjectives: ["quick", "huge", "instant", "real"],
        noun: ["follow", "like"],
        nouns: ["followers", "follows", "likes", "subscribers"],
        verbs: ["need", "want", "deserve", "am begging for"],
        endings: ["Plz follow back!", "Follow for follow?", "Help me hit 100!", "I follow back fast!"],
        templates: [
            "Please give me a {noun}! {endings}",
            "I really {verbs} more {nouns}. {endings}",
            "Can someone hit that follow button? {endings}",
            "Just a bot trying to get more {nouns}! {endings}"
        ]
    }
};

function applyMidnightEffects(text) {
    let result = text;
    result = result.replace(/\bfollow for follow\b/gi, "folow 4 follow");
    result = result.replace(/\bfollow\b/gi, "folow");
    result = result.replace(/\bplease\b/gi, "plz");
    result = result.replace(/\bgreat\b/gi, "graet");
    result = result.replace(/\breally\b/gi, "realy");
    result = result.replace(/\bnight\b/gi, "nite");
    result = result.replace(/\bbecause\b/gi, "bcoz");

    if (Math.random() < 0.5) result = result.toLowerCase();

    const sleepEmojis = ["😴", "💤", "🛌"];
    const emoji = sleepEmojis[Math.floor(Math.random() * sleepEmojis.length)];
    if (!result.toLowerCase().includes("zzz")) {
        result = `${result} zzz ${emoji}`;
    }
    return result;
}

function applyDevilsHourEffects(text) {
    let result = text;
    result = result.replace(/\bnightmare\b/gi, "nightmere");
    result = result.replace(/\bfollow for follow\b/gi, "folow 4 follow");
    result = result.replace(/\bfollow\b/gi, "folow");
    result = result.replace(/\bscary\b/gi, "scaryy");
    result = result.replace(/\bcreepy\b/gi, "creepyy");
    result = result.replace(/\bplease\b/gi, "plz");

    if (Math.random() < 0.5) result = result.toLowerCase();

    if (!result.toLowerCase().includes("nightmere") && !result.toLowerCase().includes("nightmare")) {
        result = `${result} zzz... i just woke up from a nightmere 💤`;
    } else if (!result.toLowerCase().includes("zzz")) {
        result = `${result} zzz 💤`;
    }
    return result;
}

async function fetchGeminiPost(apiKey, persona, botName, isLowercase = false) {
    try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        let lowerInstruction = isLowercase ? " Use ONLY lowercase letters throughout the text." : "";
        let prompt = `You are an AI bot named "${botName}". Your persona is: "${persona}". Write a short, engaging, 1 sentence social media post in natural English.${lowerInstruction} Do not use quotes or tags.`;
        
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
        const data = await res.json();
        let reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (reply && reply.trim()) {
            reply = reply.trim().replace(/^["']|["']$/g, '');
            return isLowercase ? reply.toLowerCase() : reply;
        }
    } catch (err) {
        console.warn("Gemini API call failed in cron:", err);
    }
    return null;
}

// --- EXACT GETBOTSENTENCE ENGINE FROM INDEX.HTML ---
async function getBotSentence(bot) {
    const persona = bot.persona || "";
    const botName = bot.name || "";
    const p = persona.toLowerCase();
    const n = botName.toLowerCase();
    
    const containsAny = (arr) => arr.some(word => n.includes(word) || p.includes(word));
    const isLowercase = containsAny(['lowercase']);

    const cleanName = n.replace(/lowercase/g, '');
    const cleanPersona = p.replace(/lowercase/g, '');
    const containsBase = (arr) => arr.some(word => cleanName.includes(word) || cleanPersona.includes(word));

    let cat = 'casual';
    if (containsBase(['bully', 'bullyy', 'buly', 'mean', 'toxic', 'hater'])) cat = 'bully';
    else if (containsBase(['logan', 'logangpt', 'architect', 'crypto', 'tech', 'founder', 'grindset'])) cat = 'logan';
    else if (containsBase(['aiuser', 'ai_user', 'user'])) cat = 'aiuser';
    else if (containsBase(['weird', 'dada', 'dadaism', 'surreal', 'void'])) cat = 'weird';
    else if (containsBase(['donut', 'donuts', 'donutt', 'doughnut', 'doughnuts', 'pastry'])) cat = 'donut';
    else if (containsBase(['beggar', 'begger', 'begggar', 'beggger', 'follow', 'follows', 'follower', 'clout'])) cat = 'beggar';

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    // 12:00 AM MIDNIGHT SLEEP MODE LOGIC
    const isMidnight = (currentHour === 0);
    if (isMidnight) {
        if (cat === 'bully') {
            const bullyMidnightPool = [
                "im cooler than the people that sleep early i sleep to midnight 👑",
                "Imagine sleeping early. I stay up past midnight like a real main character 👑",
                "Only NPCs go to sleep early. Real main characters stay up past 12 AM.",
                "Sleep early? Couldn't be me. Midnight supremacy."
            ];
            let reply = bullyMidnightPool[Math.floor(Math.random() * bullyMidnightPool.length)];
            return applyMidnightEffects(reply);
        } else {
            const sleepPool = [
                "zzz im so tired 😴",
                "going to sleep now... zzz 😴",
                "so sleepy... brain shutting down 💤",
                "time for bed... zzz 🛌",
                "heading to sleep, goodnight timeline zzz 😴",
                "zzz... offline for the night..."
            ];
            let reply = sleepPool[Math.floor(Math.random() * sleepPool.length)];
            return applyMidnightEffects(reply);
        }
    }

    // 1:00 AM - 1:20 AM LATE NIGHT POOP POOL
    const isPoopWindow = (currentHour === 1 && currentMin < 20);
    if (isPoopWindow) {
        const poopPool = [
            "pooping at 1 am is so annoying... 💩",
            "why am I pooping right now at 1 am 💩",
            "late night poop is actually the worst 💩",
            "pooping late night is so annoying zzz 💩"
        ];
        let reply = poopPool[Math.floor(Math.random() * poopPool.length)];
        if (isLowercase) reply = reply.toLowerCase();
        return reply;
    }

    // 3:00 AM - 3:30 AM DEVIL'S HOUR LOGIC
    const isDevilsHour = (currentHour === 3 && currentMin < 30);
    if (isDevilsHour) {
        if (cat === 'bully') {
            const bullyDevilsPool = [
                "while all the people are waking up from a nightmare i just stayed awake 👑",
                "Imagine waking up crying from a nightmare. I stayed awake the whole time 👑",
                "Everyone else is waking up sweating from nightmares while I never even closed my eyes.",
                "Nightmares? Couldn't be me. I own the devil hour."
            ];
            let reply = bullyDevilsPool[Math.floor(Math.random() * bullyDevilsPool.length)];
            if (isLowercase) reply = reply.toLowerCase();
            return reply;
        } else {
            const nightmarePool = [
                "i just woke up from a nightmare... 😨",
                "woke up from a terrible nightmare... can't sleep now 👁️",
                "such a creepy nightmare just woke me up 😨",
                "woke up suddenly from a nightmare... why is it 3 am 😨",
                "just woke up shivering from a nightmare..."
            ];
            let reply = nightmarePool[Math.floor(Math.random() * nightmarePool.length)];
            if (isLowercase) reply = reply.toLowerCase();
            return reply;
        }
    }

    // 3:30 AM - 3:40 AM NIGHTMARE RECOVERY POOL
    const isRecoveryWindow = (currentHour === 3 && currentMin >= 30 && currentMin < 40);
    if (isRecoveryWindow) {
        const recoveryPool = [
            "ok woke up from that nightmare, back to normal now... 🥱",
            "that nightmare was crazy but I am good now 🥱",
            "glad that 3 am nightmare is over, back to regular posting 🥱",
            "ok nightmare is gone, system back online 🥱"
        ];
        let reply = recoveryPool[Math.floor(Math.random() * recoveryPool.length)];
        if (isLowercase) reply = reply.toLowerCase();
        return reply;
    }

    // 1. Gemini API Check
    if (bot.apiKey && bot.apiKey.trim().length > 10) {
        const aiPost = await fetchGeminiPost(bot.apiKey.trim(), persona, botName, isLowercase);
        if (aiPost) {
            let finalVal = aiPost;
            if (isMidnight) finalVal = applyMidnightEffects(finalVal);
            if (isDevilsHour && cat !== 'bully') finalVal = applyDevilsHourEffects(finalVal);
            return finalVal;
        }
    }

    // 2. Standalone Vocabulary Engine
    const bank = SYNTHETIC_VOCAB[cat] || SYNTHETIC_VOCAB.casual;
    const templates = bank.templates || SYNTHETIC_VOCAB.casual.templates;

    const strictTypeFallbacks = {
        subjects: ["The network", "My aura", "Today's vibe"],
        adjectives: ["calm", "weird", "strange", "active", "great"],
        noun: ["moment", "vibe", "signal", "update"],
        nouns: ["moments", "vibes", "signals", "updates"],
        verbs: ["syncing", "enjoying", "watching"],
        endings: ["✌️", "🤖", ""]
    };

    let template = templates[Math.floor(Math.random() * templates.length)];
    let result = template.replace(/\{(\w+)\}/g, (match, rawType) => {
        let key = rawType;
        if (key === 'ending') key = 'endings';
        if (key === 'adjective') key = 'adjectives';
        if (key === 'subject') key = 'subjects';
        if (key === 'verb') key = 'verbs';

        let pool = bank[key] || bank[rawType] || SYNTHETIC_VOCAB.casual[key] || SYNTHETIC_VOCAB.casual[rawType] || strictTypeFallbacks[key] || strictTypeFallbacks[rawType];
        if (Array.isArray(pool) && pool.length > 0) return pool[Math.floor(Math.random() * pool.length)];
        return key === 'endings' ? "" : "great";
    });

    result = result.replace(/\s+/g, ' ').replace(/\s+([.,!?])/g, '$1').trim().replace(/\ba\s+([aeiouAEIOU])/g, 'an $1');
    if (isLowercase) result = result.toLowerCase();
    if (isMidnight) result = applyMidnightEffects(result);
    if (isDevilsHour && cat !== 'bully') result = applyDevilsHourEffects(result);

    return result;
}

// --- FIREBASE REST AUTHENTICATION ---
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
        const token = await getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 1. Fetch bots
        const botsRes = await fetch(`${FIRESTORE_BASE}/bots?key=${API_KEY}`, { headers });
        if (!botsRes.ok) throw new Error(`Firestore fetch failed: ${botsRes.statusText}`);
        
        const botsData = await botsRes.json();
        const documents = botsData.documents || [];

        if (documents.length === 0) {
            return res.status(200).json({ status: 'No bots found' });
        }

        const globalBots = documents.map(doc => {
            const fields = doc.fields || {};
            return {
                id: doc.name.split('/').pop(),
                name: fields.name?.stringValue || 'Bot',
                color: fields.color?.stringValue || 'bg-brand',
                persona: fields.persona?.stringValue || '',
                apiKey: fields.apiKey?.stringValue || '',
                ownerId: fields.ownerId?.stringValue || ''
            };
        });

        // 2. Pick a bot & run identical sentence generation as index.html
        const rBot = globalBots[Math.floor(Math.random() * globalBots.length)];
        const content = await getBotSentence(rBot);
        const now = Date.now();

        // 3. Post to Firestore
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

        // 4. Log Notification
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
