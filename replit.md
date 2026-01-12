# Zarcotech

## Overview

Zarcotech is a personal portfolio and services website featuring real-time Discord integration. The application displays live Discord user status and Spotify listening activity through a Discord bot connection. The site includes an animated canvas background with falling code snippets, a custom theme creator, and multiple service pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Express.js (v5.1.0) with Node.js using ES modules (`"type": "module"` in package.json)
- **Server Port**: 5000
- **Entry Point**: `index.js`
- **Static File Serving**: Express serves static files from the `/public` directory
- **Environment Variables**: Uses dotenv for configuration (Discord token, target user ID)

### Discord Bot Integration
- **Library**: discord.js v14
- **Purpose**: Monitors a specific user's presence and activities in real-time
- **Gateway Intents**: Guilds, GuildMessages, GuildPresences, GuildMembers
- **Features Tracked**:
  - Online status (online, idle, dnd, offline)
  - Custom status text
  - Spotify listening activity (song, artist, album art via Discord rich presence)

### Frontend Architecture
- **Static Files Location**: `/public` directory
- **Templates**: HTML files in `/public/templates/`
- **Styling**: Custom CSS in `/public/style/` using CSS variables for theming (Discord-inspired dark theme)
- **Scripts**: JavaScript in `/public/script/`

### Key Frontend Features
- Canvas-based animated background with falling code snippets
- Multiple pre-defined language themes (JavaScript, Python, C++, HTML, CSS, Bash)
- Custom theme creator with Pickr color picker
- Intersection Observer API for scroll-based fade-in animations
- Discord status widget displaying real-time user presence

### Page Routes
| Route | Page | Status |
|-------|------|--------|
| `/` | Home/Landing | Implemented |
| `/services` | Services offered | Implemented |
| `/about` | About page | Placeholder |
| `/contact` | Contact page | Placeholder |
| `/donate` | Donation page | Placeholder |

## External Dependencies

### Third-Party Services
- **Discord API**: Real-time user presence and activity monitoring via discord.js library
- **Spotify Data**: Retrieved indirectly through Discord's rich presence (no direct Spotify API integration)

### Required Environment Variables
- `USER_ID`: Discord user ID to monitor
- Discord bot token (referenced but variable name not visible in truncated code)

### CDN Libraries
- **Font Awesome** (v7.0.1): Icon library for UI elements
- **Pickr**: Color picker component for custom theme creation

### npm Dependencies
- `express` (v5.1.0): Web server framework
- `discord.js` (v14.23.2): Discord bot library
- `dotenv` (v17.2.3): Environment variable management
- `ws` (v8.18.3): WebSocket library
- `python-shell` (v5.0.0): Python script execution (purpose unclear from current code)

### Fonts (Google Fonts)
- Space Grotesk: Primary font
- Raleway: Secondary font