const elements = document.querySelectorAll('.bouncing-text');

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F3FF33', 
  '#FF33F3', '#00FFFF', '#FFA500', '#E6E6FA', '#FF69B4'
];

// Create an array to track data for each individual text element
const items = [];

function initItems() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  elements.forEach((el, index) => {
    const textWidth = el.offsetWidth;
    const textHeight = el.offsetHeight;

    // Give each one a random starting position within safe bounds
    let posX = Math.random() * (screenWidth - textWidth);
    let posY = Math.random() * (screenHeight - textHeight);

    // Give each one random speeds and make sure they don't start at 0 speed
    let vx = (Math.random() * 2 + 1.5) * (Math.random() < 0.5 ? 1 : -1);
    let vy = (Math.random() * 2 + 1.5) * (Math.random() < 0.5 ? 1 : -1);

    // Give each one a starting color from our array
    el.style.color = colors[index % colors.length];

    items.push({ el, posX, posY, vx, vy });
  });
}

function animate() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  items.forEach(item => {
    const textWidth = item.el.offsetWidth;
    const textHeight = item.el.offsetHeight;

    // Update position
    item.posX += item.vx;
    item.posY += item.vy;

    let hit = false;

    // Right & Left edge check
    if (item.posX + textWidth >= screenWidth) {
      item.posX = screenWidth - textWidth;
      item.vx = -item.vx;
      hit = true;
    } else if (item.posX <= 0) {
      item.posX = 0;
      item.vx = -item.vx;
      hit = true;
    }

    // Bottom & Top edge check
    if (item.posY + textHeight >= screenHeight) {
      item.posY = screenHeight - textHeight;
      item.vy = -item.vy;
      hit = true;
    } else if (item.posY <= 0) {
      item.posY = 0;
      item.vy = -item.vy;
      hit = true;
    }

    // Change color on bounce
    if (hit) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      item.el.style.color = randomColor;
    }

    // Apply the new coordinates
    item.el.style.left = `${item.posX}px`;
    item.el.style.top = `${item.posY}px`;
  });

  requestAnimationFrame(animate);
}

// Wait until fonts and layout load so we can measure sizes accurately
window.addEventListener('load', () => {
  initItems();
  animate();
});