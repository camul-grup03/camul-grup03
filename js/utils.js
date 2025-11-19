document.addEventListener("DOMContentLoaded", () => {
  const mutedColors = [
    "rgba(40, 61, 59, 0.22)",
    "rgba(25, 114, 120, 0.22)",
    "rgba(196, 69, 54, 0.22)",
    "rgba(119, 46, 37, 0.22)"
  ];

  // Edge zones in percentages — soft, flexible, not strict corners.
  const zones = [
    { minX: 0, maxX: 30,  minY: 0, maxY: 40 },   // upper-left soft
    { minX: 70, maxX: 100, minY: 0, maxY: 40 },   // upper-right soft
    { minX: 0, maxX: 30,  minY: 60, maxY: 100 },  // lower-left soft
    { minX: 70, maxX: 100, minY: 60, maxY: 100 }  // lower-right soft
  ];

  document.querySelectorAll(".card").forEach(bg => {
    const shapes = bg.querySelectorAll(".shape");

    // Each card gets a random arrangement
    shapes.forEach(shape => {
      
      // Random zone from the 4 available
      const zone = zones[Math.floor(Math.random() * zones.length)];

      // Random position *within* the chosen soft zone
      const posX = zone.minX + Math.random() * (zone.maxX - zone.minX);
      const posY = zone.minY + Math.random() * (zone.maxY - zone.minY);

      // Random soft offsets so sometimes they cluster
      const offsetX = (Math.random() - 0.5) * 10; // -5 to +5 px
      const offsetY = (Math.random() - 0.5) * 10;

      shape.style.left = `calc(${posX}% + ${offsetX}px)`;
      shape.style.top = `calc(${posY}% + ${offsetY}px)`;

      // subtle rotation + random scale
      shape.style.transform =
        `rotate(${Math.random()*60 - 30}deg)
         scale(${0.7 + Math.random()*0.5})`;

      // subtle muted color
      shape.style.borderRightColor =
        mutedColors[Math.floor(Math.random() * mutedColors.length)];
    });
  });
});

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
