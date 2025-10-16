// bg
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 3;

const jsSnippets = [
    "function", "const", "let", "var", "if", "else", "for", "while", "return",
    "console.log('Cyber Salam FTC (#26903')", "document.getElementById()", "addEventListener()",
    "setInterval()", "=>", "{}", "[]", "()", ";",
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

setInterval(draw, 70);

// script.js

document.addEventListener('DOMContentLoaded', () => {
  const secretWord = 'music';
  let typedBuffer = '';
  const audio = new Audio('public/music/wegz-elsoot.mp3')

  document.addEventListener('keydown', (event) => {
    // Get the key that was pressed and convert to lowercase for case-insensitivity
    const key = event.key.toLowerCase();

    // Check if the key is a letter or a number.
    // This prevents special keys like 'Shift' or 'ArrowUp' from affecting the buffer.
    if (key.length === 1 && key.match(/[a-z0-9]/i)) {
      // Add the new key to the end of the buffer
      typedBuffer += key;

      // Keep the buffer's length from exceeding the length of our secret word
      if (typedBuffer.length > secretWord.length) {
        typedBuffer = typedBuffer.slice(-secretWord.length);
      }

      // Check if the current buffer ends with the secret word
      if (typedBuffer.includes(secretWord)) {
        console.log("Secret word detected!");

        // --- Trigger your action here ---
        // 1. Play the audio
        audio.play().then(() => {
          console.log("Audio is playing.");
        }).catch(error => {
          console.error("Error playing audio:", error);
          alert("Audio playback failed:" + error);
        });

        // 2. Show a secret message
        document.getElementById('secret-message').style.display = 'block';

        // Optional: Reset the buffer to prevent re-triggering
        typedBuffer = ''; 
      }
    }
  });
});