// bg
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 3;

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
    const newColumns = canvas.width / fontSize;
    drops.length = newColumns;
    for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) drops[i] = 1;
    }
});

setInterval(draw, 100);

// script.js

document.addEventListener('DOMContentLoaded', () => {
  const secretWord = 'music';
  let typedBuffer = '';
  const audio = new Audio('./music/wegz-elsoot.mp3')

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
          alert("Audio playback failed:" + error);
        });
        typedBuffer = ''; 
      }
    }
  });
});