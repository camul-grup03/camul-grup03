if (window.innerWidth > 800) {
  gsap.registerPlugin(ScrollTrigger);

  const wrapper = document.querySelector(".horizontal-wrapper");
  const sections = gsap.utils.toArray(".horizontal-wrapper section");
  const mask = document.querySelector(".mask");

  gsap.set(mask, { width: "0%" });

  // Wait for images to load so widths are correct
  window.addEventListener("load", () => {
    const totalScroll = wrapper.scrollWidth - window.innerWidth;

    gsap.to(wrapper, {
      x: -totalScroll,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#projects",
        start: "top top",
        end: "+=" + totalScroll,
        pin: true,
        scrub: 2,
        anticipatePin: 1,

        onUpdate: (self) => {
          const progressPercent = self.progress * 100;
          mask.style.width = progressPercent + "%"; // Now accurate
        }
      }
    });
  });
} else {
  document.querySelector(".horizontal-wrapper").style.transform = "none";
}
