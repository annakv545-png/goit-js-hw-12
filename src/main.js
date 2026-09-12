import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showInfoNotification,
  showErrorNotification,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let query = '';
let page = 1;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const inputQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!inputQuery) {
    showErrorNotification('Please enter a search query!');
    return;
  }

  query = inputQuery;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      showErrorNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > PER_PAGE) {
      showLoadMoreButton();
    } else {
      showInfoNotification(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    showErrorNotification('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (page >= totalPages) {
      hideLoadMoreButton();
      showInfoNotification(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    showErrorNotification('Failed to load more images.');
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}