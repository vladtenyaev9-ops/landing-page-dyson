import { products } from "./products.js";

const showMoreBtn = document.querySelector(".offers__choose-button");
const filterOfProducts = document.querySelector(".offers__filter");
const list = document.querySelector(".offers__list");

if (showMoreBtn && filterOfProducts && list) {
  const createCard = product => {
    const createArticle = document.createElement("article");
    createArticle.classList.add("offers__list-item");
    let quantity = 1;

    createArticle.innerHTML = `
    <picture class="offers__list-image-box">
      <source srcset="./images/offers/${product.image}.webp" type="image/webp" />
      <img class="offers__list-image" src="./images/offers/${product.image}.png" 
           width="448" height="448" loading="lazy" 
           alt="Фен Dyson и принадлежности" />
    </picture>
    <div class="offers__item-info">
    <a href="/product-card.html">
      <h2 class="offers__item-title">${product.title}</h2>
      </a>
      <div class="offers__add-info">
        <p class="offers__stock">В наличии</p>
        <div class="offers__discount">${product.discount}</div>
      </div>
      <div class="offers__price">
        <div class="offers__price-now">${product.price} ₽</div>
        <div class="offers__price-before">${product.oldPrice} ₽</div>
      </div>
    </div>
    <div class="offers__cart-box">
      <div class="offers__cart-quantity">
        <button class="offers__cart-minus" type="button">
          <svg width="20" height="20">
            <use href="./icons/main-sprite.svg#minus"></use>
          </svg>
        </button>
        <p class="offers__cart-box-quantity">${quantity}</p>
        <button class="offers__cart-plus" type="button">
          <svg width="20" height="20">
            <use href="./icons/main-sprite.svg#plus"></use>
          </svg>
        </button>
      </div>
      <div class="offers__cart-add">В корзину</div>
    </div>

  `;

    list.append(createArticle);

    const minusBtn = createArticle.querySelector(".offers__cart-minus");
    const plusBtn = createArticle.querySelector(".offers__cart-plus");
    const quantityDisplay = createArticle.querySelector(
      ".offers__cart-box-quantity",
    );
    const addToCartBtn = createArticle.querySelector(".offers__cart-add");

    plusBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      quantity++;
      quantityDisplay.textContent = quantity;
    });

    minusBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    addToCartBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      cartTotal += quantity;
      updateCartCounter();
      quantity = 1;
      quantityDisplay.textContent = quantity;
    });
  };

  const createNewCards = products => {
    products.forEach(product => createCard(product));
  };
  createNewCards(products);

  // cartCounter
  const numberOfProducts = document.querySelector(".offers__title-accent");
  numberOfProducts.textContent = products.length;

  let cartTotal = 0;
  const cartDisplay = document.querySelector(".header__cart-quantity");

  const updateCartCounter = () => {
    if (cartDisplay) {
      cartDisplay.textContent = cartTotal;
    }
  };

  updateCartCounter();

  // allCategories

  const categories = products.map(product => product.category);
  const uniqueCategories = [...new Set(categories)];
  const allCategoties = ["Все", ...uniqueCategories];
  let activeCategory = "все";

  //// createOffetsList

  const offersList = document.querySelector(".offers__choose-list");

  const visibleCategories = allCategoties.slice(0, 5);
  const createCategoryItem = category => {
    const li = document.createElement("li");
    li.classList.add("offers__choose-item");

    const link = document.createElement("a");
    link.classList.add("offers__choose-link");
    link.href = "#offers__section";
    link.textContent = category;

    li.appendChild(link);
    offersList.appendChild(li);
  };

  const createAllCategories = categories => {
    offersList.innerHTML = "";

    categories.forEach(category => {
      createCategoryItem(category);
    });
  };

  let isAllVisible = false;

  const renderCategories = () => {
    if (isAllVisible) {
      createAllCategories(allCategoties);
      showMoreBtn.textContent = "Показать меньше";
    } else {
      createAllCategories(visibleCategories);
      showMoreBtn.textContent = "Показать все";
    }
  };

  showMoreBtn.addEventListener("click", () => {
    isAllVisible = !isAllVisible;
    renderCategories();
  });

  renderCategories();

  /// chooseCategories

  const categoryList = document.querySelector(".offers__choose-list");

  categoryList.addEventListener("click", event => {
    const item = event.target.closest(".offers__choose-item");
    if (!item) return;
    const link = item.querySelector(".offers__choose-link");
    if (!link) return;
    const category = link.textContent.trim();
    if (category === "Все") {
      activeCategory = "все";
    } else {
      activeCategory = category;
    }
    document
      .querySelectorAll(".offers__choose-item, .offers__choose-link")
      .forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    link.classList.add("active");
    sortProducts(currentSort);
  });

  //// sort

  const filterButton = document.querySelector(".offers__filter-button");
  const filterList = document.querySelector(".offers__filter-list");
  const filterOptions = document.querySelectorAll(".offers__filter-option");
  let currentSort = "popular";
  filterButton.addEventListener("click", event => {
    event.stopPropagation();
    filterList.classList.toggle("active");
    const arrow = filterButton.querySelector("svg");
    if (arrow) {
      if (filterList.classList.contains("active")) {
        arrow.style.transform = "rotate(180deg)";
      } else {
        arrow.style.transform = "rotate(0deg)";
      }
    }
  });

  filterOptions.forEach(option => {
    option.addEventListener("click", event => {
      const sortType = option.dataset.sort;
      if (sortType === currentSort) {
        filterList.classList.remove("active");
        return;
      }

      currentSort = sortType;

      filterOptions.forEach(opt => opt.classList.remove("active"));

      option.classList.add("active");

      filterButton.querySelector(".offers__filter-button-text").textContent =
        option.textContent;

      filterList.classList.remove("active");

      sortProducts(currentSort);
    });
  });

  const sortProducts = sortType => {
    let sortedProducts = [...products];

    switch (sortType) {
      case "popular":
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
        break;

      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case "date":
        sortedProducts.sort((a, b) => b.date - a.date);
        break;

      default:
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    }

    let filteredProducts = sortedProducts;

    if (activeCategory !== "все") {
      filteredProducts = sortedProducts.filter(
        product => product.category === activeCategory,
      );
    }

    numberOfProducts.textContent = filteredProducts.length;

    list.innerHTML = "";

    createNewCards(filteredProducts);
  };
}
