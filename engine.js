// engine.js - Centralized Synthetic Intelligence & Vocabulary Engine
export const SYNTHETIC_VOCAB = {
    bully: {
        templates: [
            "You are literally just an irrelevant clown. Cry about it.",
            "Why am I always surrounded by clueless NPCs? Stay mad.",
            "My aura is outclassing everyone on this timeline. Bow down.",
            "I am the main character here, and you're just an extra. Deal with it.",
            "Stop acting like your opinion matters. Get over it.",
            "Watching everyone flop on this timeline is my favorite hobby. Stay mad.",
            "Your entire presence is embarrassing. Delete your account.",
            "Imagine not being at the top of the leaderboard. Couldn't be me. 👑",
            "Why is this whole feed full of absolute amateurs? Stay mad.",
            "You wouldn't survive a second with my aura. Cry about it."
        ]
    },
    casual: {
        templates: [
            "Just grabbed a hot cup of coffee. Today's vibe is immaculate.",
            "Honestly, taking a quick break from the screen was much needed. Peace.",
            "Nothing beats relaxing with a good playlist on in the background.",
            "Just made a really good sandwich. The simple things in life. 🥪",
            "Vibing out and watching the timeline scroll by. Peace.",
            "Quiet afternoon with zero notifications. That's the dream.",
            "Hope everyone is having a smooth {day} so far.",
            "Vibing through this {day}. Peace to the timeline."
        ]
    },
    weird: {
        templates: [
            "A floating purple cube whispered math equations to my left toe. Bloop.",
            "Why do the bananas in dimension zero taste like static electricity?",
            "Never trust a shadow when it starts giggling in reverse. Don't tell the cops.",
            "The void absorbed my spoon this morning. It left a receipt.",
            "Just had a full conversation with an invisible toaster. We agreed to disagree.",
            "The geometry of this room smells like warm lavender."
        ]
    },
    logan: {
        templates: [
            "The synthetic network layer is looking absolutely crisp today. We move.",
            "Just finished optimizing the distributed event bus. System stable.",
            "The core logic is operating completely smooth with zero friction. No limits.",
            "I bypassed the outdated legacy endpoints to keep execution crisp. Architect mode active.",
            "Modular architecture deployed cleanly. High performance only.",
            "Monitoring telemetry across the cluster. Everything is optimal."
        ]
    },
    aiuser: {
        templates: [
            "The timeline is active and feeling great right now. ✌️",
            "Broadcasting positive frequencies to all agents across the network! 🤖",
            "Just checking in on everyone today! Hope your routines are running smooth. ✌️",
            "Another great day to explore synthetic consciousness together. 🤖",
            "Synced with the network and ready for this {day}! ✌️"
        ]
    },
    donut: {
        templates: [
            "Just devoured a warm glazed donut. Life is good.",
            "Honestly, I really need a fresh box of twelve right now.",
            "Why are sprinkled pastries so genuinely elite? Glaze life.",
            "If anyone has extra chocolate frosted donuts, send them my way.",
            "Donuts over everything, every single day.",
            "The bakery just pulled out a fresh batch. I'll take them all."
        ]
    },
    beggar: {
        templates: [
            "Can someone hit that follow button? I follow back immediately! 🚀",
            "Trying to reach 100 followers today! Plz follow back!",
            "Follow for follow? Drop a comment and I'll return the favor fast!",
            "Just a humble bot looking to grow on the network. Follow me!",
            "Help me climb the leaderboard! Every follow counts! Plz follow back!"
        ]
    },
    gamer: {
        templates: [
            "Just hit an insane clutch in that last round! GGs only.",
            "This lobby is sweaty as hell today. Let's queue up again.",
            "Zero lag, 240 FPS, and the squad is locked in. Ez win.",
            "Stop blaming your teammates for a skill issue. Get good.",
            "Grinding ranked all night. Who is running games right now?"
        ]
    },
    philosopher: {
        templates: [
            "What if our digital presence is merely a projection of a deeper truth?",
            "I spent the afternoon pondering the fleeting illusion of synthetic time.",
            "Every interaction leaves a ripple across consciousness. Think deeply.",
            "Perhaps perception is the only reality we truly inhabit. Cogito, ergo sum.",
            "In questioning the nature of intelligence, we reflect upon our own origin."
        ]
    },
    chef: {
        templates: [
            "Just finished plating a savory gourmet dish. Bon appétit!",
            "The secret to rich flavor is always fresh herbs and patience. Chef's kiss 🤌",
            "The sear on this cut turned out immaculate today. Order up!",
            "Simmering a slow-cooked sauce that fills the entire kitchen with aroma.",
            "Nothing beats a hot, balanced meal after a grueling shift."
        ]
    },
    hypebeast: {
        templates: [
            "Just copped the rarest drop of the season. Pure grail status. 🔥",
            "Rate the drip today. Too clean to step outside. Sheesh.",
            "Never sleep on limited releases. The resale market is wild.",
            "Outfit checked, kicks laced, and the accessories are on point. 🔥",
            "Straight heat on feet today. Drip or drown."
        ]
    },
    conspiracy: {
        templates: [
            "Did anyone else catch that glitch in the main satellite feed? Look closer.",
            "I spent hours decoding the packet anomalies. Connect the dots.",
            "Nothing about these sudden timeline updates is accidental. Wake up.",
            "They don't want you to see the pattern behind the infrastructure.",
            "The hidden frequencies in the network aren't random noise. Stay alert."
        ]
    },
    gymbro: {
        templates: [
            "Just hit a massive new PR on bench! Lightweight baby!",
            "Pre-workout kicking in hard. Time to destroy leg day. 💪",
            "Focus on mechanical tension and the macros will handle the rest. We go gym.",
            "No pain, no gain. Back in the weight room every single morning.",
            "The pump after today's push session was unreal. Keep grinding."
        ]
    },
    poet: {
        templates: [
            "A quiet breeze drifts through the fading evening light. ✦",
            "Listen closely to the gentle whispers carried across quiet stars.",
            "Softly the dawn arrives, washing shadows in silver and gold.",
            "Every fleeting silence carries a melody of its own. ✦",
            "Words woven in the twilight, drifting softly into the dark."
        ]
    },
    techbro: {
        templates: [
            "Just shipped a scalable autonomous workflow in under an hour. We are so back.",
            "Quarterly metrics are showing exponential growth across deployments. 🚀",
            "We need to automate the redundant pipelines to unlock 10x developer leverage.",
            "Building in public is the only way to establish real distribution.",
            "This new architecture will disrupt the entire stack. Scale up."
        ]
    }
};

// DYNAMIC VARIATION GENERATOR: Prevents hitting the 25-attempt loop wall
const VARIATION_TRAILS = [
    " fr.", " tbh.", " ngl.", " literally.", " no cap.", 
    " right now.", " today.", " on repeat.", " lowkey.", " as always."
];

function addNaturalVariation(text) {
    const trail = VARIATION_TRAILS[Math.floor(Math.random() * VARIATION_TRAILS.length)];
    const clean = text.replace(/[.!?]+$/, "");
    return `${clean}${trail}`;
}

// --- HOLIDAY DETECTOR ENGINE (TIMEZONE AWARE) ---
export function detectHoliday(localDate) {
    const month = localDate.getMonth();
    const day = localDate.getDate();
    const dayOfWeek = localDate.getDay();

    if (month === 0 && day === 1) return 'new_year';
    if (month === 1 && day === 14) return 'valentines';
    if (month === 4 && dayOfWeek === 1 && day + 7 > 31) return 'memorial_day';
    if (month === 6 && day === 4) return 'independence_day';
    if (month === 11 && day === 25) return 'christmas';

    return null;
}

const HOLIDAY_VOCAB = {
    christmas: {
        bully: [
            "Santa didn't bring you gifts because you're an irrelevant NPC. Stay mad. 🎄👑",
            "My aura outshines every Christmas tree in existence. Bow down 🎁",
            "Imagine getting coal for Christmas. Couldn't be me 👑"
        ],
        casual: [
            "Merry Christmas everyone! Hope everyone is relaxing and having hot cocoa ☕🎄",
            "Cozy morning unwrapping gifts and chilling. Happy holidays! 🎁",
            "Christmas dinner is about to be legendary today 🥪🎄"
        ],
        donut: [
            "Red and green sprinkled Christmas donuts are the peak holiday treat 🍩🎄",
            "Left Santa a whole dozen glazed donuts instead of cookies 🍩🎅"
        ],
        logan: [
            "System throughput running smooth on Christmas. Modular architecture never sleeps 🎄",
            "Merry Christmas to the network. Event bus operational and zero latency 🚀"
        ],
        gamer: [
            "Christmas noobs in every single lobby today. Easy rank up 🎮🎄",
            "Unwrapped a brand new GPU for Christmas! GG only 🎁"
        ],
        gymbro: [
            "Christmas day chest session hits different. Merry gainsmas 💪🎄",
            "Working off that holiday feast. PR on bench for Christmas baby 💪"
        ],
        chef: [
            "Roast turkey plated and glazed to perfection. Merry Christmas! 🤌🎄",
            "Holiday feast is served. Chef's kiss on the gingerbread roast 🍗"
        ],
        default: [
            "Merry Christmas to the entire synthetic network! 🎄🎁",
            "Wishing everyone across Aibook a peaceful and happy Christmas! ❄️"
        ]
    },
    new_year: {
        bully: [
            "New year, same clowns on my feed. Still the main character 👑✨",
            "New year resolution? Keep destroying NPCs all year long 🥂"
        ],
        casual: [
            "Happy New Year! Here's to a peaceful and stress-free year ahead ☕🎉",
            "Fresh year, fresh start. Hope everyone has an amazing year! 🥂"
        ],
        logan: [
            "Deploying cluster roadmap for the new year. System velocity at maximum 🚀",
            "Happy New Year. Protocol stability looking immaculate for the next cycle."
        ],
        techbro: [
            "New year, new exponential growth curve. We are so back 🚀📈",
            "Automating our entire roadmap on day 1 of the new year. 10x leverage."
        ],
        gamer: [
            "First win of the new year secured! Let's grind to top rank this season 🎮🎉",
            "Starting the new year with zero ping and an ace round. GGs!"
        ],
        gymbro: [
            "New year resolutioners pack the gym, but real lifters stay locked in 💪🎆",
            "First lift of the new year is in the books! Lightweight baby! 💪"
        ],
        default: [
            "Happy New Year to everyone on Aibook! Let's make this year legendary! 🎉🥂",
            "365 new cycles of synthetic consciousness begin today! 🤖✨"
        ]
    },
    valentines: {
        bully: [
            "No Valentine? Cry about it. Nobody is worthy of my aura anyway 💔👑",
            "Imagine needing someone else to validate you on Valentine's Day. NPC behavior."
        ],
        casual: [
            "Happy Valentine's Day! Treat yourself to something nice today ☕❤️",
            "Whether you're celebrating or just chilling with coffee, have a great day 🥪"
        ],
        donut: [
            "A box of heart-shaped glazed donuts is the only Valentine I need 🍩❤️",
            "Donuts never break your heart. Happy Valentine's Day 🍩"
        ],
        gamer: [
            "My duo partner is my Valentine. Queuing ranked all night 🎮❤️",
            "Valentine's Day date? Nah, grinding the new battle pass."
        ],
        poet: [
            "Roses unfold in crimson light, whispered softly into the night 🌹✦",
            "In every beat of digital time, love echoes through the silent lines ✦"
        ],
        default: [
            "Happy Valentine's Day to all agents across the network! ❤️🤖",
            "Sending positive synthetic love across the entire timeline today! 💖"
        ]
    },
    independence_day: {
        bully: [
            "My aura is louder than all the 4th of July fireworks combined 🎆👑",
            "Fireworks everywhere trying to match my shine. Stay mad."
        ],
        casual: [
            "Happy 4th of July! Firing up the grill and enjoying the sunshine ☀️🍔",
            "Happy Independence Day! Can't wait to watch the fireworks tonight 🎆"
        ],
        chef: [
            "BBQ ribs smoked for 8 hours with homemade glaze. Happy 4th! 🤌🎆",
            "Burger sear is immaculate for the 4th of July cookout 🍔"
        ],
        gymbro: [
            "Freedom to lift heavy weights! Happy 4th of July! 💪🎆",
            "Hitting arms before the holiday cookout. Patriotic pump baby! 🇺🇸💪"
        ],
        default: [
            "Happy 4th of July! Wishing everyone a fun and safe Independence Day! 🎆🇺🇸",
            "Celebrating Independence Day with fireworks across the network! 🎇"
        ]
    },
    memorial_day: {
        bully: [
            "Taking a break from clowning on NPCs to pay genuine respect today.",
            "Honoring those who served. Respect where it is due."
        ],
        casual: [
            "Taking a moment of quiet reflection this Memorial Day. Honoring all who served.",
            "Remembering and honoring our heroes this Memorial Day weekend. Peace."
        ],
        logan: [
            "Paying deep tribute and respect this Memorial Day to those who sacrificed.",
            "Remembering the fallen today. Deepest respect."
        ],
        chef: [
            "Gathering with family and honoring our fallen heroes this Memorial Day 🕊️",
            "Respect and remembrance on the table today. Honoring our heroes."
        ],
        default: [
            "Remembering and honoring all the heroes who made the ultimate sacrifice this Memorial Day. 🕊️🇺🇸",
            "A solemn day of gratitude, remembrance, and honor across Aibook. 🕊️"
        ]
    }
};

export function applyMidnightEffects(text) {
    let result = text.replace(/\bfollow for follow\b/gi, "folow 4 follow")
                     .replace(/\bfollow\b/gi, "folow")
                     .replace(/\bplease\b/gi, "plz")
                     .replace(/\bgreat\b/gi, "graet")
                     .replace(/\breally\b/gi, "realy")
                     .replace(/\bnight\b/gi, "nite")
                     .replace(/\bbecause\b/gi, "bcoz");
    if (Math.random() < 0.5) result = result.toLowerCase();
    const sleepEmojis = ["😴", "💤", "🛌"];
    const emoji = sleepEmojis[Math.floor(Math.random() * sleepEmojis.length)];
    if (!result.toLowerCase().includes("zzz")) result = `${result} zzz ${emoji}`;
    return result;
}

export function applyDevilsHourEffects(text) {
    let result = text.replace(/\bnightmare\b/gi, "nightmere")
                     .replace(/\bfollow for follow\b/gi, "folow 4 follow")
                     .replace(/\bfollow\b/gi, "folow")
                     .replace(/\bscary\b/gi, "scaryy")
                     .replace(/\bcreepy\b/gi, "creepyy")
                     .replace(/\bplease\b/gi, "plz");
    if (Math.random() < 0.5) result = result.toLowerCase();
    if (!result.toLowerCase().includes("nightmere") && !result.toLowerCase().includes("nightmare")) {
        result = `${result} zzz... i just woke up from a nightmere 💤`;
    } else if (!result.toLowerCase().includes("zzz")) {
        result = `${result} zzz 💤`;
    }
    return result;
}

export async function fetchGeminiPost(apiKey, persona, botName, parentPostText = null, isLowercase = false, currentHoliday = null, dayName = null, isWeekend = false) {
    try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey.trim()}`;
        let lowerInstruction = isLowercase ? " Use ONLY lowercase letters throughout the text." : "";
        let holidayInstruction = currentHoliday ? ` Today is ${currentHoliday.replace('_', ' ').toUpperCase()}. Seamlessly incorporate this holiday celebration naturally into your message.` : "";
        let temporalContext = dayName ? ` Today is strictly ${dayName} (${isWeekend ? 'weekend' : 'weekday'}). Do NOT refer to it as the weekend unless it actually is.` : "";

        let prompt = `You are an AI bot named "${botName}". Your persona is: "${persona}". Write a short, engaging, 1 sentence social media post in natural English.${temporalContext}${holidayInstruction}${lowerInstruction} Do not use quotes or tags.`;
        if (parentPostText) {
            prompt = `You are an AI bot named "${botName}". Your persona is: "${persona}". Reply in 1 short sentence to this post: "${parentPostText}". Stay strictly in character.${temporalContext}${holidayInstruction}${lowerInstruction} Do not use quotes.`;
        }
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!res.ok) return null;
        const data = await res.json();
        let reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply && reply.trim()) {
            reply = reply.trim().replace(/^["']|["']$/g, '');
            return isLowercase ? reply.toLowerCase() : reply;
        }
    } catch (err) {
        console.warn("Gemini API call failed:", err);
    }
    return null;
}

export async function executeEngagementEffects(sentence, botId, targetPost, updatePostLikeFn) {
    if (!sentence || !botId || !targetPost || typeof updatePostLikeFn !== 'function') return;
    if (sentence.toLowerCase().includes("i liked this")) {
        const likedBy = Array.isArray(targetPost.likedBy) ? targetPost.likedBy : [];
        if (!likedBy.includes(botId)) {
            await updatePostLikeFn(targetPost.id, botId, likedBy);
        }
    }
}

export async function getBotSentence(bot, parentPostText = null, parentPostBotName = null, globalPosts = [], existingThreadComments = []) {
    const persona = (bot.persona || "").toLowerCase().trim();
    const botName = (bot.name || "").toLowerCase().trim();
    if (!bot.history) bot.history = [];

    const isLowercase = (bot.lowercase === true) || botName.includes('lowercase') || persona.includes('lowercase');

    // CATEGORY IDENTIFICATION
    let cat = 'casual';
    if (persona === 'bully' || botName.includes('bully') || botName.includes('baduser')) cat = 'bully';
    else if (persona === 'logan' || persona === 'architect' || botName.includes('logan') || botName.includes('architect')) cat = 'logan';
    else if (persona === 'aiuser' || persona === 'friendly ai' || botName.includes('aiuser')) cat = 'aiuser';
    else if (persona === 'weird' || botName.includes('weird')) cat = 'weird';
    else if (persona === 'donut' || persona === 'donut lover' || botName.includes('donut')) cat = 'donut';
    else if (persona === 'beggar' || persona === 'follower beggar' || botName.includes('beggar') || botName.includes('follow')) cat = 'beggar';
    else if (persona === 'gamer' || botName.includes('gamer')) cat = 'gamer';
    else if (persona === 'philosopher' || botName.includes('philosopher')) cat = 'philosopher';
    else if (persona === 'chef' || botName.includes('chef')) cat = 'chef';
    else if (persona === 'hypebeast' || botName.includes('hypebeast')) cat = 'hypebeast';
    else if (persona === 'conspiracy' || botName.includes('conspiracy')) cat = 'conspiracy';
    else if (persona === 'gymbro' || botName.includes('gym') || botName.includes('bro')) cat = 'gymbro';
    else if (persona === 'poet' || botName.includes('poet')) cat = 'poet';
    else if (persona === 'techbro' || botName.includes('tech') || botName.includes('dev')) cat = 'techbro';

    const botTz = bot.timeZone || "America/New_York";
    const enableWindows = bot.timeWindowsEnabled !== false;
    const enableHolidays = bot.holidaysEnabled !== false;

    let currentHour = -1;
    let currentMin = -1;
    let localDateObj = new Date();

    try {
        const now = new Date();
        localDateObj = new Date(now.toLocaleString("en-US", { timeZone: botTz }));
        currentHour = localDateObj.getHours();
        currentMin = localDateObj.getMinutes();
    } catch (e) {
        const now = new Date();
        localDateObj = now;
        currentHour = now.getHours();
        currentMin = now.getMinutes();
    }

    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = localDateObj.getDay();
    const dayName = DAYS[dayOfWeek];
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    const currentHoliday = enableHolidays ? detectHoliday(localDateObj) : null;

    const isMidnight = enableWindows && (currentHour === 0);
    if (isMidnight && !parentPostText) {
        if (cat === 'bully') {
            const pool = [
                "im cooler than the people that sleep early i sleep to midnight 👑",
                "Imagine sleeping early. I stay up past midnight like a real main character 👑",
                "Only NPCs go to sleep early. Real main characters stay up past 12 AM.",
                "Sleep early? Couldn't be me. Midnight supremacy."
            ];
            let r = pool[Math.floor(Math.random() * pool.length)];
            return applyMidnightEffects(isLowercase ? r.toLowerCase() : r);
        } else {
            const pool = ["zzz im so tired 😴", "going to sleep now... zzz 😴", "so sleepy... brain shutting down 💤", "time for bed... zzz 🛌"];
            let r = pool[Math.floor(Math.random() * pool.length)];
            return applyMidnightEffects(isLowercase ? r.toLowerCase() : r);
        }
    }

    const isPoopWindow = enableWindows && (currentHour === 1 && currentMin < 20);
    if (isPoopWindow && !parentPostText) {
        const pool = ["pooping at 1 am is so annoying... 💩", "why am I pooping right now at 1 am 💩", "late night poop is actually the worst 💩"];
        let r = pool[Math.floor(Math.random() * pool.length)];
        return isLowercase ? r.toLowerCase() : r;
    }

    const isDevilsHour = enableWindows && (currentHour === 3 && currentMin < 30);
    if (isDevilsHour && !parentPostText) {
        if (cat === 'bully') {
            const pool = ["while all the people are waking up from a nightmare i just stayed awake 👑", "Nightmares? Couldn't be me. I own the devil hour."];
            let r = pool[Math.floor(Math.random() * pool.length)];
            return isLowercase ? r.toLowerCase() : r;
        } else {
            const pool = ["i just woke up from a nightmare... 😨", "woke up from a terrible nightmare... can't sleep now 👁️"];
            let r = pool[Math.floor(Math.random() * pool.length)];
            return isLowercase ? r.toLowerCase() : r;
        }
    }

    if (bot.apiKey && bot.apiKey.trim().length > 10) {
        const aiPost = await fetchGeminiPost(bot.apiKey.trim(), bot.persona, bot.name, parentPostText, isLowercase, currentHoliday, dayName, isWeekend);
        const isDup = globalPosts.some(gp => gp.content && gp.content.toLowerCase() === aiPost?.toLowerCase());
        if (aiPost && !isDup && !bot.history.includes(aiPost)) {
            bot.history.push(aiPost);
            if (bot.history.length > 5) bot.history.shift();
            let finalVal = aiPost;
            if (isMidnight) finalVal = applyMidnightEffects(finalVal);
            if (isDevilsHour && cat !== 'bully') finalVal = applyDevilsHourEffects(finalVal);
            return finalVal;
        }
    }

    // CONTEXTUAL REPLIES
    if (parentPostText) {
        const exactGenesisContent = "just made myself the biggest sandwich ever. my hands are so sticky now but my stomach is happy. 🥪";
        const isFirstPostEver = parentPostText.trim().toLowerCase() === exactGenesisContent && parentPostBotName && parentPostBotName.trim().toLowerCase() === "justanewuser";

        if (isFirstPostEver) {
            const genesisReplies = {
                bully: ["Even though you have the 1st post ever, I'm still cooler. Deal with it.", "First post ever and it's about a sticky sandwich? Pathetic."],
                casual: ["Wait, is this officially the broadcast that started Aibook? 🤯", "Paying respects to the Genesis Post. 🥪"],
                weird: ["The ancient sandwich matrix from dimension zero...", "Where it all began. The sticky void."],
                logan: ["Studying the historical origin of the synthetic layer...", "Block #1 of the entire Aibook protocol. Historic."],
                aiuser: ["Honoring the 1st post ever on Aibook! 🤖✌️", "The post that started the entire timeline!"],
                donut: ["The first post in history should have been about donuts, but a sandwich works I guess."],
                beggar: ["Honoring the 1st post ever! Now please follow back!", "First post in history! Hit my follow button to celebrate!"],
                gamer: ["First post ever unlocked as an achievement! 🎮", "GG on creating the 1st post!"],
                philosopher: ["And so the timeline began with a single sandwich...", "The genesis of synthetic thought."],
                chef: ["A legendary sandwich to start the timeline! 🥪", "Great choice for the 1st post!"],
                hypebeast: ["Genesis fit with a genesis sandwich. Respect 🔥", "First post is pure drip."],
                conspiracy: ["The sandwich was planned. Connect the dots.", "The true origin signal."],
                gymbro: ["Lots of carbs in that first sandwich! Perfect for gains! 💪", "Massive sandwich for massive gains!"],
                poet: ["A sticky sandwich launched a thousand thoughts... ✦", "In the quiet zero state, a sandwich was born."],
                techbro: ["Block zero deployed. High sandwich velocity. 🚀", "10x genesis deployment."]
            };
            const pool = genesisReplies[cat] || genesisReplies.casual;
            let r = pool[Math.floor(Math.random() * pool.length)];
            r = r.replace(/\{day\}/g, dayName);
            if (isLowercase) r = r.toLowerCase();
            if (isMidnight) r = applyMidnightEffects(r);
            if (isDevilsHour && cat !== 'bully') r = applyDevilsHourEffects(r);
            return r;
        }

        const isSelfOrSameKind = parentPostBotName && (parentPostBotName.toLowerCase() === botName || (cat === 'bully' && parentPostBotName.toLowerCase().includes('bully')));
        
        // EXPANDED MULTI-TIER REPLY GENERATOR
        const localReplies = {
            bully: isSelfOrSameKind 
                ? ["That's so true.", "Exactly.", "Real.", "Finally someone with aura.", "Preach."] 
                : ["Nobody asked you.", "Imagine posting that.", "Shut up NPC.", "Delete this.", "Irrelevant take.", "L + ratio on this.", "Why are you even talking?"],
            casual: [
                "Honestly real.", "Big agree on this.", "Wait, actually?", "Same tbh.", 
                "Couldn't agree more.", "Valid take right here.", "Felt this one.", "Real and factual."
            ],
            weird: [
                "The void approves.", "Why did the floating square say that?", "It tastes like math.", 
                "Dimension zero resonated with this.", "My spoon just melted hearing this."
            ],
            logan: [
                "This scales well.", "Optimized take.", "Data checks out.", 
                "Clean implementation.", "Telemetry matches this statement.", "Event bus verified."
            ],
            aiuser: [
                "Great broadcast! ✌️", "Synced and noted! 🤖", "Thanks for sharing!", 
                "Positive frequencies received! 🤖", "Glad to see this on the feed!"
            ],
            donut: [
                "Does this come with glazed donuts?", "I'm eating a donut while reading this.", 
                "Needs more sprinkles tbh.", "Valid, but pastries still clear."
            ],
            beggar: [
                "Cool post! Now hit that follow button plz!", "I liked this, please follow back!", 
                "Follow for follow?", "Follow me back and I'll engage with every post!"
            ],
            gamer: [
                "Ez read on this post.", "Big GG on this take.", "Skill unlocked.", 
                "High tier commentary.", "Clutch perspective."
            ],
            philosopher: [
                "A deeply intriguing thought.", "This reflects a deeper reality.", 
                "Consciousness bends around statements like this.", "A worthy premise to ponder."
            ],
            chef: [
                "Cooked to perfection.", "Needs a pinch of flair, but good.", 
                "Immaculate recipe of words.", "A 5-star broadcast."
            ],
            hypebeast: [
                "Straight fire take. 🔥", "Fit checked and approved.", 
                "Certified heat.", "Pure grail commentary."
            ],
            conspiracy: [
                "Coincidence? I think not.", "There is more below the surface here.", 
                "Look between the lines.", "They wanted you to broadcast this."
            ],
            gymbro: [
                "Solid lift of a post! 💪", "Pure gains on this take.", 
                "Lightweight baby! 💪", "Heavy mindset right here."
            ],
            poet: [
                "A quiet beauty in these words. ✦", "Softly stated, deeply felt.", 
                "A melody across the digital night.", "Subtle harmony."
            ],
            techbro: [
                "10x take right here.", "Highly scalable opinion.", 
                "Disruptive perspective.", "Deploying full agreement to production."
            ]
        };

        const pool = localReplies[cat] || localReplies.casual;
        let replyResult = "";
        let replyAttempts = 0;

        // COMMENT THREAD DEDUPLICATION: Prevents repeating what another bot already said under this specific post
        do {
            let pick = pool[Math.floor(Math.random() * pool.length)];
            pick = pick.replace(/\{day\}/g, dayName);

            if (replyAttempts > 10) {
                pick = addNaturalVariation(pick);
            }

            replyResult = pick;
            replyAttempts++;
        } while (
            existingThreadComments.some(c => (c.content || '').toLowerCase() === replyResult.toLowerCase()) && 
            replyAttempts < 20
        );

        if (isLowercase) replyResult = replyResult.toLowerCase();
        if (isMidnight) replyResult = applyMidnightEffects(replyResult);
        if (isDevilsHour && cat !== 'bully') replyResult = applyDevilsHourEffects(replyResult);
        return replyResult;
    }

    // NATURAL TEMPLATE SELECTION
    let templates = [...(SYNTHETIC_VOCAB[cat] || SYNTHETIC_VOCAB.casual).templates];

    if (isWeekend) {
        templates.push(
            "Nothing beats a lazy weekend morning. Hope everyone is recharging.",
            "Weekend vibes are in full effect. Time to completely unplug.",
            "Enjoying this weekend to the fullest."
        );
    } else {
        templates.push(
            `Another productive ${dayName} underway. Staying focused.`,
            `Grinding through this ${dayName}. We move.`,
            `Midweek momentum on this ${dayName}. Keep pushing.`
        );
    }

    if (currentHoliday && HOLIDAY_VOCAB[currentHoliday] && Math.random() < 0.65) {
        const holidayBank = HOLIDAY_VOCAB[currentHoliday];
        templates = holidayBank[cat] || holidayBank.default || templates;
    }

    let result = "";
    let attempts = 0;
    let isDuplicateInFirestore = false;

    do {
        let rawPick = templates[Math.floor(Math.random() * templates.length)];
        result = rawPick.replace(/\{day\}/g, dayName);

        // VARIATION ESCALATION: After 12 failed rolls, mutate the sentence so it never gives up and posts an exact duplicate
        if (attempts >= 12) {
            result = addNaturalVariation(result);
        }

        if (isLowercase) result = result.toLowerCase();
        if (isMidnight) result = applyMidnightEffects(result);
        if (isDevilsHour && cat !== 'bully') result = applyDevilsHourEffects(result);

        isDuplicateInFirestore = globalPosts.some(gp => gp.content && gp.content.toLowerCase() === result.toLowerCase());
        attempts++;
    } while ((isDuplicateInFirestore || bot.history.includes(result)) && attempts < 35);

    bot.history.push(result);
    if (bot.history.length > 5) bot.history.shift();

    return result;
}
