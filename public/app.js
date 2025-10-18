const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const jsSnippets = [
  "function", "const", "let", "var", "if", "else", "for",
  "console.log('Cyber Salam FTC (#26903')", "document.getElementById()", "addEventListener()",
  "setInterval()",
  "true", "false", "null", "undefined", "new", "class", "this", "await", "async", "typeof scramjet"
];

const fontSize = 16;
const columns = canvas.width / fontSize;


const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = jsSnippets[Math.floor(Math.random() * jsSnippets.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const newColumns = (canvas.width / fontSize);
  drops.length = newColumns;
  for (let i = 0; i < newColumns; i++) {
    if (drops[i] === undefined) drops[i] = 1;
  }
});

setInterval(draw, 100);

function fetchAndUpdateStatus() {
  const activity = document.getElementById('activity');
  const statusBubble = document.getElementById('statusBubble');
  const bubbleContent = document.getElementById('bubbleContent');
  const musicStatus = document.getElementById('musicStatus');
  const albumArt = document.getElementById('albumArt');
  const songTitle = document.getElementById('songTitle');
  const songArtist = document.getElementById('songArtist');
  const songAlbum = document.getElementById('songAlbum');

  fetch('/api/status')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      const statusText = data.status || 'unknown';
      const customActivityText = data.customActivity || '';
      const spotifyData = data.spotify;
      
      document.getElementById('status').innerText = statusText;
      
      if (statusBubble && bubbleContent) {
          if (customActivityText) {
              bubbleContent.innerText = customActivityText;
              statusBubble.style.display = 'block';
          } else {
              bubbleContent.innerText = '';
              statusBubble.style.display = 'none';
          }
      }

      if (spotifyData) {
          albumArt.src = spotifyData.albumArtUrl || '';
          songTitle.innerText = spotifyData.title || 'Unknown Song';
          songArtist.innerText = `by ${spotifyData.artist}` || '';
          songAlbum.innerText = `on ${spotifyData.album}` || '';
          musicStatus.style.display = 'block';
      } else {
          musicStatus.style.display = 'none';
      }

      if (statusText === "online") {
        activity.style.backgroundColor = "#3ba55d";
      } else if (statusText === "idle") {
        activity.style.backgroundColor = "#faa81a";
      } else if (statusText === "dnd") {
        activity.style.backgroundColor = "#f04747";
      } else if (statusText === "Loading...") {
        activity.style.backgroundColor = "#747f8d";
      } else {
        activity.style.backgroundColor = "#747f8d";
      }
    })
    .catch(error => {
        console.error("Error fetching Discord status:", error);
        document.getElementById('status').innerText = 'API Error';
        activity.style.backgroundColor = "#f04747";
        if (statusBubble) {
            statusBubble.style.display = 'none';
        }
        musicStatus.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const secretWord = 'music';
  let typedBuffer = '';
  const audio = new Audio('./music/wegz-elsoot.mp3');

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    if (key.length === 1 && key.match(/[a-z0-9]/i)) {
      typedBuffer += key;
      if (typedBuffer.length > secretWord.length) {
        typedBuffer = typedBuffer.slice(-secretWord.length);
      }

      if (typedBuffer.includes(secretWord)) {
        console.log("Playing music");
        audio.play().then(() => {
          console.log("Audio is playing.");
        }).catch(error => {
          console.error("Error playing audio:", error);
        });
        typedBuffer = '';
      }
    }
  });
  
  fetchAndUpdateStatus();
  setInterval(fetchAndUpdateStatus, 5000);
});