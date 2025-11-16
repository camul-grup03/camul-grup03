gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('.horizontal-wrapper section');

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
  }
});