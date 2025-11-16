gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('.horizontal-wrapper section');
const mask = document.querySelector(".mask");

gsap.set(mask, { width: "0%" });

// horizontal scroll
let scrollTween = gsap.to(".horizontal-wrapper", {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#projects",
    start: "top top",
    end: () => "+=" + (window.innerWidth * (sections.length - 1)),
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    onUpdate: self => {
      // sync mask width to scroll progress
      mask.style.width = (self.progress * 100) + "%";
    }
  }
});
