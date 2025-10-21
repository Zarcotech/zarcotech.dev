import express from 'express';
import { join, dirname, resolve } from 'path'; 
import { Client, GatewayIntentBits, Partials, ActivityType } from 'discord.js';
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

let currentUserStatus = 'Loading...';
let customStatusText = '';
let spotifyData = null;
const targetUserId = process.env.USER_ID;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const updateStatusVariables = (presence) => {
    if (!presence) {
        currentUserStatus = 'Offline/Invisible';
        customStatusText = '';
        spotifyData = null;
        return;
    }

    currentUserStatus = presence.status || 'Offline/Invisible';
    
    const customActivity = presence.activities.find(
        activity => activity.type === ActivityType.Custom
    );
    customStatusText = (customActivity && customActivity.state) ? customActivity.state : '';
    
    const spotifyActivity = presence.activities.find(
        activity => activity.type === ActivityType.Listening && activity.name === 'Spotify'
    );
    
    if (spotifyActivity) {
        spotifyData = {
            title: spotifyActivity.details,
            artist: spotifyActivity.state,
            album: spotifyActivity.assets?.largeText,
            albumArtUrl: spotifyActivity.assets?.largeImage?.replace('spotify:', 'https://i.scdn.co/image/'),
        };
    } else {
        spotifyData = null;
    }
    
    console.log(`Live Update: Status: ${currentUserStatus}, Custom: ${customStatusText}, Spotify: ${!!spotifyData}`);
};

app.get('/api/status', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send({ status: currentUserStatus, customActivity: customStatusText, spotify: spotifyData }); 
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    if (!targetUserId) {
        console.error("Error: USER_ID environment variable is missing or failed to load.");
        currentUserStatus = 'Config Error';
        return;
    }

    currentUserStatus = 'Fetching Initial Presence...'; 
    
    await sleep(2000);

    let foundMember = null;
    for (const guild of client.guilds.cache.values()) {
        try {
            await guild.members.fetch(); 
            const member = guild.members.cache.get(targetUserId);
            if (member) {
                foundMember = member;
                break;
            }
        } catch (e) {
            console.error(`Error fetching members for guild ${guild.name}: ${e.message}`);
        }
    }
    
    if (foundMember) {
        updateStatusVariables(foundMember.presence);
    } else {
        currentUserStatus = 'User Not Found in Guild Cache';
    }
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence.userId === targetUserId) {
        updateStatusVariables(newPresence);
    }
});

const token = process.env.BOT_TOKEN;

if (!token) {
    console.error("CRITICAL ERROR: BOT_TOKEN is missing. Please ensure your .env file is present and has BOT_TOKEN set correctly.");
    process.exit(1);
}

client.login(token);

app.use(express.static(resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'templates', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'templates', 'services.html'));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});