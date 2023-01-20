export function createMarkupGalleryItem({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
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