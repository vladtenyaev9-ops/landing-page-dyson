const faqButtons = document.querySelectorAll(".faq__details");
const faqText = document.querySelectorAll(".faq__text");
const faqPlusIcon = document.querySelectorAll(".faq-plus");

faqButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    faqText[index].classList.toggle("active");
    faqPlusIcon[index].classList.toggle("active");
  });
});
