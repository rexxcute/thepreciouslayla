const grid = document.getElementById("grid");
const popup = document.getElementById("popup");
const popupText = document.getElementById("typed-text");
const popupBtn = document.getElementById("popup-close");
const bgm = document.getElementById("bg-music");

// Background Music
if (bgm) {
  bgm.volume = 0.6;
  bgm.play().catch(() => {
    document.body.addEventListener("click", () => bgm.play(), { once: true });
  });
}

// Cards Data
let cardsData = [
  { type: 1 }, { type: 1 },
  { type: 2 }, { type: 2 },
  { type: 3 }, { type: 3 }
];

cardsData = cardsData.sort(() => Math.random() - 0.5);

// Generate Cards
cardsData.forEach((c, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.type = c.type;
  card.dataset.index = i;
  grid.appendChild(card);
});

// Game Logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = cardsData.length / 2;

const messages = [
  "Hai mi amor kalo kamu baca ini aku gak tau kamu udah selesai presentasi atau belum. Kalo belum aku berdoa semoga presentasi mu lancar ya.. tapi kalo udah aku mau tanya gimana presentasinya hari ini? Pasti capek ya.. tapi aku tau kamu berhasil ngelwatin itu dan aku bangga akan hal itu. Kamu itu hebat lebih dari yang kamu pikirkan! (note : jangan lupa nanti cerita ya xixi..) ",
  "Di hari spesial ini, aku ingin kamu mengingat satu hal bahwa kamu layak dirayakan. Bukan hanya karena umur mu bertambah jadi 22+ xixi tapi juga karena semua hal yang sudah kamu perjuangkan selama ini. Terima kasih sudah lahir di dunia ini dan menjadi hal indah untuk lenare, tanpa mu lenare hanya ada nare wkwk.. Intinya Selamat merayakan hari spesial ini sayang.. Semoga semua harapan mu terwujud dan hal baik selalu mengikuti di setiap langkah mu..",
  "Terakhir aku mau bilang kalau nanti ada hari yang berat lagi , jangan ragu buat bersandar di grup lenare. Untuk hari ini dan hari hari berikutnya, mari kita sama sama rayakan pertualangan selanjutnya. Jangan lupa stay safe, stay healthy, and stay with me xixi..I love you so much Layla"
];

// Typewriter
function typeWriter(text, element, speed = 30, cb) {
  element.textContent = "";
  let i = 0;
  const id = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(id);
      if (cb) cb();
    }
  }, speed);
}

// Popup with typing
function showTypedPopup(text, onClose) {
  popup.style.display = "flex";
  popupBtn.disabled = true;
  popupBtn.style.opacity = "0.6";

  typeWriter(text, popupText, 30, () => {
    popupBtn.disabled = false;
    popupBtn.style.opacity = "1";
  });

  popupBtn.onclick = () => {
    popup.style.display = "none";
    popupText.textContent = "";
    popupBtn.onclick = null;
    if (typeof onClose === "function") onClose();
  };
}

// Reset turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Card click handler
function onCardClick(e) {
  if (lockBoard) return;
  const card = e.currentTarget;

  if (card.classList.contains("open") || card.classList.contains("matched")) return;

  card.classList.add("open");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  // MATCH
  if (firstCard.dataset.type === secondCard.dataset.type) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;

    const msg = messages[Math.min(matchedPairs - 1, messages.length - 1)];

    showTypedPopup(msg, () => {

      // FINAL MATCH FIXED
      if (matchedPairs === totalPairs) {

        setTimeout(() => {
          
          popup.style.display = "flex";
          popupText.textContent = "";
          popupBtn.textContent = "LANJUT";

          popupBtn.disabled = true;
          popupBtn.style.opacity = "0.6";

          typeWriter("YAH PERMAINAN SUDAH SELESAI! 🎉", popupText, 30, () => {
            popupBtn.disabled = false;
            popupBtn.style.opacity = "1";
          });

          // LISTENER FINAL — TIDAK TERHAPUS LAGI
          popupBtn.onclick = () => {
            sessionStorage.setItem("playMusic", "yes");
            window.location.href = "gift.html";
          };

        }, 400);

      } else {
        resetTurn();
      }

    });

  } else {
    // NOT MATCHED
    setTimeout(() => {
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");
      resetTurn();
    }, 700);
  }
}

// Bind events
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", onCardClick);
});

// Initial state
popup.style.display = "none";
popupText.textContent = "";
