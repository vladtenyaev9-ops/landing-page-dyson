const burgerBtn = document.querySelector(".header__burger-btn");
const body = document.querySelector(".page__body");

const createBurgerMenu = () => {
  const menu = document.createElement("nav");
  menu.classList.add("burger-menu");
  menu.innerHTML = `
        <ul class="burger-menu__list">
            <li><a class="burger-menu__link" href="#about">О нас</a></li>
            <li><a class="burger-menu__link" href="#delivery-pay">Доставка и оплата</a></li>
            <li><a class="burger-menu__link" href="#register">Регистрация продукта</a></li>
            <li><a class="burger-menu__link" href="#service">Сервис</a></li>
            <li><a class="burger-menu__link" href="#certificates">Сертификаты и лицензии</a></li>
        </ul>
    `;
  body.append(menu);
  return menu;
};

const burgerMenu = createBurgerMenu();

burgerBtn.addEventListener("click", () => {
  const isOpen = burgerMenu.classList.toggle("burger--open");
  burgerBtn.classList.toggle("active");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

const menuLinks = document.querySelectorAll(".burger-menu__link");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("burger--open");
    burgerBtn.classList.remove("active");
    document.body.style.overflow = "";
  });
});

document.addEventListener("click", event => {
  const isClickInsideMenu = burgerMenu.contains(event.target);
  const isClickOnBurger = burgerBtn.contains(event.target);

  if (
    !isClickInsideMenu &&
    !isClickOnBurger &&
    burgerMenu.classList.contains("burger--open")
  ) {
    burgerMenu.classList.remove("burger--open");
    burgerBtn.classList.remove("active");
    document.body.style.overflow = "";
  }
});

