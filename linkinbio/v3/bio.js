document.addEventListener("DOMContentLoaded", () => {
  const linkButtons = document.querySelectorAll(".link-btn");
  const productCards = document.querySelectorAll(".product-card");
  const buyButtons = document.querySelectorAll(".buy-btn");

  const animateElement = (element, hover) => {
    const scale = hover ? "scale(1.05)" : "scale(1)";
    const boxShadow = hover ? "4px 4px 12px rgba(0, 0, 0, 0.2)" : "4px 4px 8px rgba(0, 0, 0, 0.1)";
    const translateY = hover ? "-4px" : "0";

    element.style.transform = scale + " " + translateY;
    element.style.boxShadow = `-4px -4px 8px rgba(255, 255, 255, 0.6), ${boxShadow}`;
  };

  const addHoverEffect = (element) => {
    element.addEventListener("mouseover", () => animateElement(element, true));
    element.addEventListener("mouseout", () => animateElement(element, false));
  };

  linkButtons.forEach(addHoverEffect);
  productCards.forEach(addHoverEffect);
  buyButtons.forEach(addHoverEffect);
});
