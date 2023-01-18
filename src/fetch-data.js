import axios from 'axios';

const KEY_API = '32945740-80b175842033a392f7f7e7674';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchData(inputValue, page, amountContent) {
    return await axios
        .get(`${BASE_URL}?key=${KEY_API}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${amountContent}`)
        .then(response => response.data)
}
