function initHorizontalScroll() {
  if (window.innerWidth <= 800) {
    document.querySelector(".horizontal-wrapper").style.transform = "none";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const wrapper = document.querySelector(".horizontal-wrapper");
  const mask = document.querySelector(".mask");

  gsap.set(mask, { width: "0%" });

  const images = wrapper.querySelectorAll("img");
  let loaded = 0;

  const checkAll = () => {
    loaded++;
    if (loaded === images.length) setupScroll();
  };

  images.forEach(img => {
    if (img.complete) checkAll();
    else {
      img.addEventListener("load", checkAll);
      img.addEventListener("error", checkAll);
    }
  });

  function setupScroll() {
    const totalScroll = wrapper.scrollWidth - window.innerWidth;

    gsap.to(wrapper, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: "#projects",
        start: "top top",
        end: "+=" + totalScroll,
        scrub: 2,
        pin: true,
        anticipatePin: 1,

        onUpdate: (self) => {
          mask.style.width = (self.progress * 100) + "%";
        }
      }
    });
  }
}

document.querySelector("#contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const status = document.querySelector("#form-status");

  status.textContent = "Sending...";

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
  });

  const json = await response.json();

  if (json.success) {
    status.textContent = "Message sent!";
    status.style.color = "green";
    form.reset();
  } else {
    status.textContent = "Failed to send message.";
    status.style.color = "red";
  }
});