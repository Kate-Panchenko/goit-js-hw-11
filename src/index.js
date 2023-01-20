import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchData } from './fetch-data';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    input: document.querySelector(".search-form__input"),
    searchBtn: document.querySelector(".search-form__btn"),
    searchForm: document.querySelector(".search-form"),
    loadMoreBtn: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
};

let page = '';

refs.searchForm.addEventListener("submit", onFormSubmit);
// refs.loadMoreBtn.addEventListener("click", onLoadMorePictures)


function onFormSubmit(evt) {
    evt.preventDefault();
    refs.loadMoreBtn.classList.remove(".is-hidden");

    const inputValue = evt.currentTarget.elements.searchQuery.value;
    page = 1;

    if (!inputValue) {
        refs.loadMoreBtn.classList.remove(".is-hidden");
        return Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }

    fetchData(inputValue, page).then(obj => showGallery(obj)).catch(err => console.log(err));
    // resetSearch();
}

function showGallery(obj) {
    const images = obj.data.hits;
    const galleryMarkup = images.map(img => createMarkupGalleryItem(img)).join("");
    refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);
    Notify.success(`Hooray! We found ${obj.data.totalHits} images.`);
    refs.loadMoreBtn.classList.add('is-hidden');
}

// function onLoadMorePictures(evt) {
//   const inputValue = evt.searchForm.elements.searchQuery.value;
//   page += 1;
//   fetchData(inputValue, page).then(obj => showGallery(obj)).catch(err => console.log(err));
// }

// Reset Gallery
function resetSearch(page) {
    page = 1;
    refs.gallery.innerHTML = "";
    // refs.gallery.classList.remove("show");
}


// Fetch Error
function onError() {
    return Notify.failure("We're sorry, but you've reached the end of search results.")
}


function createMarkupGalleryItem({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `<a class="img-url" href="${largeImageURL}">
    <div class="photo-card">
  <img class="galery-img" src="${webformatURL}" width="370" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
</a>`
}