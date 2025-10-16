import express from 'express';
import { join, dirname } from 'path';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.User]
});

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

client.on('clientReady', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Give the Discord API a moment to send initial presence packets
    await sleep(2000);

    for (const [guildId, guild] of client.guilds.cache) {
        try {
            await guild.members.fetch();
        } catch (e) {
            console.error(`Error fetching members for guild ${guild.name}:`, e.message);
        }
    }

    const userId = process.env.USER_ID;
    console.log(`Attempting to fetch user ID: ${userId}`);
    
    if (!userId) {
        console.error("Error: USER_ID environment variable is missing or failed to load.");
        return;
    }

    try {
        const user = await client.users.fetch(userId);

        let userStatus = 'Not Available (Check Intents/Cache)';

        const guilds = client.guilds.cache;
        let member = null;

        for (const guild of guilds.values()) {
            member = guild.members.cache.get(userId);
            if (member) {
                userStatus = member.presence?.status || 'Offline/Invisible (Cached)';
                break; 
            }
        }
        
        console.log(`User ${user.tag} status: ${userStatus}`);
        
    } catch (error) {
        console.error(`Failed to fetch user or presence:`, error.message);
    }
});

const token = process.env.BOT_TOKEN;

if (!token) {
    console.error("CRITICAL ERROR: BOT_TOKEN is missing. Please ensure your .env file is present and has BOT_TOKEN set correctly.");
    process.exit(1);
}

client.login(token);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
