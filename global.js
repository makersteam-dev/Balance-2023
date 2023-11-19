document.addEventListener("DOMContentLoaded", function () {
  let elements = document.getElementsByTagName("lottie-player");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("play", (event) => {
      event.target.shadowRoot.querySelector("svg").style.transform = "";
    });
    elements[i].play();
  }
  function checkAndAnimate(element) {
    var rect = element.getBoundingClientRect();
    var top_of_element = rect.top + window.scrollY;
    var bottom_of_element = top_of_element + rect.height;
    var bottom_of_screen = window.scrollY + window.innerHeight * 0.8;
    var top_of_screen = window.scrollY;

    if (
      (bottom_of_screen > top_of_element &&
        top_of_screen < bottom_of_element) ||
      element.classList.contains("is-visible")
    ) {
      element.classList.add("is-visible");
      element.style.opacity = 1;
    }
  }

  function handleScrollEvent(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      checkAndAnimate(el);
    });
  }

  window.addEventListener("scroll", function () {
    handleScrollEvent("[fade-in]");
    handleScrollEvent("[fade-in|='to-top']");
  });

  handleScrollEvent("[fade-in]");
  handleScrollEvent("[fade-in|='to-top']");

  const navbar = document.querySelector(".w-nav");
  const navbarHeight = navbar.clientHeight;

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > navbarHeight) {
      navbar.classList.add("is--scrolled");
    } else {
      navbar.classList.remove("is--scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Keep references to the original parents of elements that need to be moved
  const elementsToMove = document.querySelectorAll(
    '[data-move-on-mobile="true"]'
  );
  const originalParents = [];
  elementsToMove.forEach((element, index) => {
    originalParents[index] = element.parentNode;
  });

  // Function to check screen width and update DOM accordingly
  function checkScreenWidth() {
    // Check if screen width is less than 992px
    if (window.matchMedia("(max-width: 991px)").matches) {
      // Code to append elements to their respective [data-flex-wrap="true"] > [data-mobile-wrap="true"]
      elementsToMove.forEach((element) => {
        let targetElement = element
          .closest('[data-flex-wrap="true"]')
          .querySelector('[data-mobile-wrap="true"]');
        if (targetElement) {
          targetElement.appendChild(element);
        }
      });
    } else {
      // If screen width is more than 992px, move the elements back to their original parents
      elementsToMove.forEach((element, index) => {
        if (originalParents[index]) {
          originalParents[index].appendChild(element);
        }
      });
    }
  }

  // Run the function once at the start
  checkScreenWidth();

  // Add event listener for window resize
  window.addEventListener("resize", function () {
    // Run the function again if window is resized
    checkScreenWidth();
  });
});
