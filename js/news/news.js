import { extraNews } from "./news-content.js";

const newsSection = document.querySelector('.news__section');
const newsList = newsSection.querySelector('.news__list');
const showMoreNewsButton = newsSection.querySelector('.news__show-more');
const hideNewsButton = newsSection.querySelector('.news__hide-comments');

const formatDate = (date) => date.split('-').reverse().join('/');

const createNewsArticle = ({ title, text, date , image}) => {
  const article = document.createElement('article');
  article.className = 'news__article news__article--extra';
  article.innerHTML = `
    <picture class="news__article-image-box">
      <source srcset="./images/${image}.webp" type="image/webp" />
      <img
        class="news__article-image"
        src="./images/${image}.png"
        width="440"
        height="294"
        alt="Фен Dyson с разными насадками"
      />
    </picture>
    <time class="news__article-data" datetime="${date}">
      ${formatDate(date)}
    </time>
    <h3 class="news__article-title">${title}</h3>
    <p class="news__article-text">${text}</p>
    <button class="news__article-button" type="button">Читать далее</button>
  `;

  return article;
};

const showExtraNews = () => {
  extraNews.forEach((newsItem) => {
    newsList.append(createNewsArticle(newsItem));
  });

  showMoreNewsButton.hidden = true;
  hideNewsButton.hidden = false;
};

const hideExtraNews = () => {
  newsList.querySelectorAll('.news__article--extra').forEach((article) => {
    article.remove();
  });
  hideNewsButton.hidden = true;
  showMoreNewsButton.hidden = false;
};

showMoreNewsButton.addEventListener('click', showExtraNews);
hideNewsButton.addEventListener('click', hideExtraNews);
