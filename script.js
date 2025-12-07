// script.js

const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const loadingScreen = document.getElementById("loading-screen");
const app = document.getElementById("app");

// --- Kartu peringatan untuk tombol "Nggak mau" ---
function showWarningCard() {
  const warning = document.createElement("div");
  warning.className = "warning-card";
  warning.innerHTML = `
    <div class="warning-box">
      <p>Kok nggak mauu? Haruss mauu!!</p>
      <button id="warning-ok">OK</button>
    </div>
  `;

  app.appendChild(warning);

  document.getElementById("warning-ok").addEventListener("click", () => {
    warning.remove();
  });
}

// --- Ketika klik tombol Mau ---
btnYes.addEventListener("click", () => {
  document.querySelector(".opening-card").classList.add("hidden");
  loadingScreen.classList.remove("hidden");

  // Simulasi loading sebelum masuk mini game (ganti nanti)
  setTimeout(() => {
    window.location.href = "game.html"; // nanti kita buat
  }, 2500);
});

// --- Ketika klik tombol Nggak mau ---
btnNo.addEventListener("click", showWarningCard);
