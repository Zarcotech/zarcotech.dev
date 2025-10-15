import express  from 'express';
import { join } from 'path';
import { Client, GatewayIntentBits } from 'discord.js';
import { fileURLToPath } from 'url';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences
    ]
});

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const userId = '832829834838749';
    const user = await client.users.fetch(userId);

});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const userId = '832829834838749';
    const user = await client.users.fetch(userId);

    if (user && user.presence) {
        const userStatus = user.presence.status;
        console.log(`User ${user.tag} status: ${userStatus}`);
        // Possible statuses: 'online', 'idle', 'dnd', 'offline'
    } else {
        console.log(`Could not find presence information for user ${userId}.`);
    }
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});