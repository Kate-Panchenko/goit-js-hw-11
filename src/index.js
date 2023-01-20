import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchData } from './fetch-data';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkupGalleryItem } from './create-markup';

const refs = {
    input: document.querySelector(".search-form__input"),
    searchBtn: document.querySelector(".search-form__btn"),
    searchForm: document.querySelector(".search-form"),
    loadMoreBtn: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
};

let page = '';

refs.searchForm.addEventListener("submit", onFormSubmit);
refs.loadMoreBtn.addEventListener("click", onLoadMorePictures);


function onFormSubmit(evt) {
    evt.preventDefault();
    refs.loadMoreBtn.classList.remove(".is-hidden");

    const inputValue = evt.currentTarget.elements.searchQuery.value;
    page = 1;

    if (!inputValue) {
        refs.loadMoreBtn.classList.remove(".is-hidden");
        return Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }

    fetchData(inputValue, page).then(obj => showGallery(obj)).catch(onError);
    resetSearch();
}

function showGallery(obj) {
    const images = obj.data.hits;
    const galleryMarkup = images.map(img => createMarkupGalleryItem(img)).join("");
    refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);
    refs.loadMoreBtn.classList.add('is-hidden');
    
    new SimpleLightbox('.gallery a');

    if (window.pageYOffset > 200) {
      return smoothScroll();
    }
    if (page === 1 && obj.data.totalHits > 1) {
      Notify.success(`Hooray! We found ${obj.data.totalHits} images.`);
    }
    if (obj.data.totalHits < 40) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
}


// Loading more pictures
function onLoadMorePictures() {
  const inputValue = refs.searchForm.elements.searchQuery.value;
  page += 1;
  fetchData(inputValue, page)
    .then(obj => {
      showGallery(obj);
      if ((page*40) >= obj.data.totalHits) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      return Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    })
    .catch(err => console.log(err));
}

// Reset Gallery
function resetSearch(page) {
    page = 1;
    refs.gallery.innerHTML = "";
}


// Fetch Error
function onError() {
  return Notify.failure("We're sorry, but you've reached the end of search results.");
  refs.loadMoreBtn.classList.remove('is-hidden');
}


// Smooth scroll
function smoothScroll() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}
