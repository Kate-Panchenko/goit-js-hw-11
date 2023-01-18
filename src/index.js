import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchData } from './fetch-data';



const refs = {
    input: document.querySelector(".search-form__input"),
    searchBtn: document.querySelector(".search-form__btn"),
    searchForm: document.querySelector(".search-form"),
    loadMoreBtn: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
};

let page = '';
let amountContent = '';

refs.searchForm.addEventListener("submit", onFormSubmit);



function onFormSubmit(evt) {
    evt.preventDefault();
    refs.loadMoreBtn.classList.remove(".is-hidden");
    resetSearch();

    const inputValue = evt.currentTarget.elements.searchQuery.value;
    page = 1;

    if (!inputValue) {
        refs.loadMoreBtn.classList.remove(".is-hidden");
        return Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }

    fetchData(inputValue, page, amountContent).then(showGallery).catch(onError);
}

function showGallery() {
    
}

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