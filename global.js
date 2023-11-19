document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("lottie-player");
  elements.forEach((element) => {
    element.addEventListener("play", (event) => {
      event.target.shadowRoot.querySelector("svg").style.transform = "";
    });
    element.play();
  });

  function handleScroll() {
    const navbar = document.querySelector(".w-nav");
    const navbarHeight = navbar.clientHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > navbarHeight) {
      navbar.classList.add("is--scrolled");
    } else {
      navbar.classList.remove("is--scrolled");
    }
  }

  function checkAndAnimate(element) {
    // Implement intersection observer logic here
  }

  function handleScrollEvent(selector) {
    document.querySelectorAll(selector).forEach(checkAndAnimate);
  }

  window.addEventListener("scroll", () => {
    handleScroll();
    handleScrollEvent("[fade-in]");
    handleScrollEvent("[fade-in|='to-top']");
  });

  const elementsToMove = document.querySelectorAll(
    '[data-move-on-mobile="true"]'
  );
  const originalParents = Array.from(elementsToMove).map(
    (element) => element.parentNode
  );

  function checkScreenWidth() {
    if (window.matchMedia("(max-width: 991px)").matches) {
      elementsToMove.forEach((element) => {
        const targetElement = element
          .closest('[data-flex-wrap="true"]')
          .querySelector('[data-mobile-wrap="true"]');
        if (targetElement) {
          targetElement.appendChild(element);
        }
      });
    } else {
      elementsToMove.forEach((element, index) => {
        if (originalParents[index]) {
          originalParents[index].appendChild(element);
        }
      });
    }
  }
  checkScreenWidth();
  window
    .matchMedia("(max-width: 991px)")
    .addEventListener("change", checkScreenWidth);
});
