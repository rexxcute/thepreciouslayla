// Typewriter effect
const text = "Happy Birthday Layla! 🎉💖";
const hbText = document.getElementById("hb-text");

let idx = 0;
function typeWriter() {
    if (idx < text.length) {
        hbText.textContent += text.charAt(idx);
        idx++;
        hbText.style.width = (idx + 1) + "ch";
        setTimeout(typeWriter, 120);
    }
}
typeWriter();

// Floating love emoji
const bg = document.querySelector(".love-bg");

function createLove() {
    const love = document.createElement("span");
    love.textContent = "❤️";
    love.style.left = Math.random() * 100 + "vw";
    love.style.fontSize = (20 + Math.random() * 20) + "px";
    love.style.animationDuration = (5 + Math.random() * 5) + "s";
    bg.appendChild(love);

    setTimeout(() => love.remove(), 9000);
}
setInterval(createLove, 300);

// Fix autoplay music
const music = document.getElementById("bg-music");
document.body.addEventListener("click", () => {
    music.play().catch(()=>{});
}, { once: true });
