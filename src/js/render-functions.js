import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Екземпляр SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b><span>${image.likes}</span></p>
        <p class="info-item"><b>Views</b><span>${image.views}</span></p>
        <p class="info-item"><b>Comments</b><span>${image.comments}</span></p>
        <p class="info-item"><b>Downloads</b><span>${image.downloads}</span></p>
      </div>
    </li>
  `
    )
    .join('');

  const galleryList = document.querySelector('.gallery');
  galleryList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  const galleryList = document.querySelector('.gallery');
  galleryList.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  const btn = document.querySelector('.load-more-btn');
  btn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('.load-more-btn');
  btn.classList.add('hidden');
}

export function showInfoNotification(message) {
  iziToast.info({
    message,
    position: 'topRight',
  });
}

export function showErrorNotification(message) {
  iziToast.error({
    message,
    position: 'topRight',
  });
}