// Smooth scroll for anchor links in case browser doesn't support it by default.
// This also helps with fixed header offsets.
const navLinks = document.querySelectorAll('a[href^="#"]');

function getHeaderOffset() {
  const topbar = document.querySelector('.topbar');
  const navbar = document.querySelector('.navbar');
  const topbarHeight = topbar ? topbar.getBoundingClientRect().height : 0;
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
  return topbarHeight + navbarHeight + 12;
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const offset = getHeaderOffset();
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  });
});

// Add subtle shadow on navbar when scrolled.
const navbar = document.querySelector('.navbar');
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  const add = window.scrollY > 20;
  if (navbar) navbar.classList.toggle('navbar-scrolled', add);
  if (topbar) topbar.classList.toggle('navbar-scrolled', add);
});

// Spin the wheel when the spin button is clicked.
const spinBtn = document.getElementById('spinBtn');
const spinWheel = document.getElementById('spinWheel');
const spinPrizes = [
  { name: 'Infinity M4A1', img: 'images/weapon-1.png' },
  { name: 'Infinity AK-47', img: 'images/weapon-2.png' },
  { name: 'Infinity Sniper', img: 'images/weapon-3.png' },
  { name: 'Infinity Prestige Rifle', img: 'images/weapon-4.png' },
  { name: '500 eCoins', img: 'images/prize-ecoins.svg' },
  { name: 'VIP Weapon Pack', img: 'images/prize-vip.svg' },
  { name: 'Double EXP Boost', img: 'images/prize-exp.svg' },
  { name: 'Rare Skin Bundle', img: 'images/prize-skin.svg' },
];

function showSpinResult(prize) {
  const claimModal = document.getElementById('claimModal');
  const prizeTitle = claimModal.querySelector('.claim-prize-name');
  const prizeImage = claimModal.querySelector('.claim-prize-image');
  const prizeDesc = claimModal.querySelector('.claim-prize-desc');
  const claimBtn = document.getElementById('claimDownloadBtn');

  prizeTitle.textContent = prize.name;
  prizeImage.src = prize.img;
  prizeImage.alt = prize.name;
  prizeDesc.textContent = `Download STOVE to claim your ${prize.name}!`;

  // Ensure modal can't be closed except via the claim button.
  const modal = new bootstrap.Modal(claimModal);
  modal.show();

  claimBtn.addEventListener('click', () => {
    // Close modal and show download instructions
    modal.hide();
    const instructionsModal = new bootstrap.Modal(document.getElementById('downloadInstructionsModal'));
    instructionsModal.show();
  }, { once: true });
}

if (spinBtn && spinWheel) {
  spinBtn.addEventListener('click', () => {
    // Restart animation by reflow
    spinWheel.classList.remove('spin');
    void spinWheel.offsetWidth;
    spinWheel.classList.add('spin');

    // Pick a random item as the prize
    const prize = spinPrizes[Math.floor(Math.random() * spinPrizes.length)];

    // Disable button while spinning
    spinBtn.disabled = true;
    setTimeout(() => {
      spinBtn.disabled = false;
      showSpinResult(prize);
    }, 2200);
  });
}

// Show welcome modal on first load (must download to proceed)
document.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
  const welcomeBtn = document.getElementById('welcomeDownloadBtn');

  welcomeBtn.addEventListener('click', () => {
    welcomeModal.hide();
    const instructionsModal = new bootstrap.Modal(document.getElementById('downloadInstructionsModal'));
    instructionsModal.show();
  });

  welcomeModal.show();

  // Handle all download links except the start download button
  const downloadLinks = document.querySelectorAll('a[href="./Crossfire 2.0.zip"]:not(#startDownloadBtn)');
  downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const instructionsModal = new bootstrap.Modal(document.getElementById('downloadInstructionsModal'));
      instructionsModal.show();
    });
  });
});
