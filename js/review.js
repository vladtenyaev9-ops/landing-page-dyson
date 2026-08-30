const writeBtn = document.querySelector(".review__button");
const modal = document.querySelector("#reviewModal");
const closeBtn = document.querySelector(".modal-close");
const form = document.getElementById("reviewForm");
const titleInput = document.getElementById("reviewTitle");
const textInput = document.getElementById("reviewText");
const nameInput = document.getElementById("reviewName");
const reviewsList = document.querySelector(".review__article-wrapper");
const numberOfReview = document.querySelector('.review__title-accent');
const articles = document.querySelectorAll('.review__article');
const showMoreBtn = document.querySelector('.review__show-more:not(.review__hide-comments)');
const hideMoreBtn = document.querySelector('.review__hide-comments');
numberOfReview.textContent = articles.length;

writeBtn.addEventListener("click", () => {
  modal.classList.add("active");
  form.reset();
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  form.reset();
});

const newReview = () => {
  const text = textInput.value.trim();
  const title = titleInput.value.trim();
  const name = nameInput.value.trim();
  if (!text || !title || !name) {
    alert("Заполните все поля");
    return;
  }

  const newArticle = document.createElement("article");
  newArticle.classList.add("review__article");
  newArticle.innerHTML = `
<div class="review__info">
              <p class="review__info-name">${name}</p>
              <img
                class="review__five-stars"
                src="./icons/stars.svg"
                alt="Пять звезд"
              />
            </div>
            <div class="review__comment">
              <h3 class="review__comment-title">${title}</h3>
              <p class="review__comment-text">${text}</p>
              <div class="review__comment-images-box">
              
              </div>
              <button class="review__comment-button" type="button">
                Смотреть все фото
              </button>
              <button
                class="review__comment-button review__comment-button--hide"
                type="button"
                hidden
              >
                Скрыть все фото
              </button>
            </div>
            <time class="review__article-date" datetime="2022-05-21"
              >21/05/2022</time
            >

`;
  reviewsList.prepend(newArticle);
  form.reset();
};

const updateReviewsVisibility = () => {
  const allArticles = document.querySelectorAll('.review__article');
  const total = allArticles.length;
  
  if (total > 3) {
    showMoreBtn.hidden = false;
    hideMoreBtn.hidden = true;
    allArticles.forEach((article, index) => {
      if (index >= 3) {
        article.style.display = 'none';
      } else {
        article.style.display = '';
      }
    });
  } else {
    showMoreBtn.hidden = true;
    hideMoreBtn.hidden = true;
    allArticles.forEach(article => {
      article.style.display = '';
    });
  }
};

showMoreBtn.addEventListener('click', () => {
  const allArticles = document.querySelectorAll('.review__article');
  allArticles.forEach(article => {
    article.style.display = '';
  });
  showMoreBtn.hidden = true;
  hideMoreBtn.hidden = false;
});

hideMoreBtn.addEventListener('click', () => {
  const allArticles = document.querySelectorAll('.review__article');
  allArticles.forEach((article, index) => {
    if (index >= 3) {
      article.style.display = 'none';
    } else {
      article.style.display = '';
    }
  });
  showMoreBtn.hidden = false;
  hideMoreBtn.hidden = true;
});

updateReviewsVisibility();

form.addEventListener('submit', e => {
  e.preventDefault();
  newReview();
  const currentArticles = document.querySelectorAll('.review__article');
  numberOfReview.textContent = currentArticles.length;
  updateReviewsVisibility();
});