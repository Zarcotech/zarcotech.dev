# Zarcotech

## Overview

Zarcotech is a personal portfolio/services website with Discord integration. The application displays real-time Discord user status and Spotify listening activity through a Discord bot connection. It features a stylized frontend with animated code-themed backgrounds (matrix-style falling code snippets) and multiple pages for services, about, contact, and donations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Express.js (v5.1.0) running on Node.js with ES modules
- **Server Port**: 5000
- **Discord Integration**: Uses discord.js (v14) to connect to Discord's Gateway API and monitor user presence, activities, and Spotify listening status in real-time
- **Environment Configuration**: Uses dotenv for managing sensitive configuration (Discord token, target user ID)

### Frontend Architecture
- **Static Files**: Served from `/public` directory
- **Template Structure**: HTML templates in `/public/templates/`
- **Styling**: Custom CSS with CSS variables for theming (Discord-inspired dark theme)
- **Interactive Features**: 
  - Canvas-based animated background with falling code snippets
  - Multiple language themes (JavaScript, Python, C++, HTML, CSS, Bash)
  - Custom theme creator with color picker (using Pickr library)
  - Intersection Observer for scroll-based animations

### Page Structure
- **Home** (`/`) - Main landing page with Discord status widget and animated background
- **Services** (`/services`) - Services offered page
- **About** (`/about`) - About page (placeholder)
- **Contact** (`/contact`) - Contact page (placeholder)
- **Donate** (`/donate`) - Donation page (placeholder)

### Discord Bot Features
- Monitors specific user's online status (online, idle, dnd, offline)
- Captures custom status text
- Tracks Spotify listening activity (song, artist, album art)
- Required Gateway Intents: Guilds, GuildMessages, GuildPresences, GuildMembers

## External Dependencies

### Third-Party Services
- **Discord API**: Real-time user presence and activity monitoring via discord.js
- **Spotify** (via Discord): Spotify listening data retrieved through Discord's rich presence

### External Libraries (CDN)
- **Font Awesome** (v7.0.1): Icon library
- **Pickr**: Color picker component for theme customization
- **Google Fonts**: Space Grotesk and Raleway font families

### Environment Variables Required
- `USER_ID`: Discord user ID to monitor
- Discord bot token (implied, needed for client login)

### npm Dependencies
- `express`: Web server framework
- `discord.js`: Discord API wrapper
- `dotenv`: Environment variable management
- `ws`: WebSocket support
- `python-shell`: Python script execution capability (unused in visible code)