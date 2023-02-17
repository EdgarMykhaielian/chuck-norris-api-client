const url = 'https://api.chucknorris.io/jokes/';
const card = document.querySelector(".card")
const jokePar = document.querySelector(".card__joke");
const jokeLink = document.querySelector(".card__link");
const btnNext = document.querySelector("button")
const catForm = document.getElementById("categories")
let catCount

getCategories().then(showCategories);
getJoke(location.hash.slice(1)).then(showJoke);

btnNext.addEventListener('click', () => getJoke().then(showJoke))

function getJoke(id) {
    return fetch(url + (id || ('random' + getCatList())))
        .then(response => response.json());
}
/* 
{
    categories: [],
    created_at: "2020-01-05 13:42:26.991637",
    icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    id: "-zns30D6Qkal_SIHTY62LA",
    updated_at: "2020-01-05 13:42:26.991637",
    url: "https://api.chucknorris.io/jokes/-zns30D6Qkal_SIHTY62LA",
    value: "\"Everybody Hates Chris\" was originally called \"Chuck Norris hates Chris\"" 
}
*/
function showJoke(joke) {
    jokePar.innerText = joke.value;
    jokeLink.href = joke.url;
    card.dataset.id = joke.id;
    location.hash = joke.id;
}

function getCategories() {
    return fetch(url + 'categories').then(response => response.json())
}

function showCategories(categories) {
    catCount = categories.length
    catForm.firstElementChild.innerHTML = categories.map(cat => `
        <li>
            <label>
                <input type="checkbox" name="cat" value="${cat}" checked>
                <span>${cat}</span>
            </label>
        </li>
    `).join('')
}

function getCatList() {
    const checkedCats = new FormData(catForm).getAll("cat")
    return checkedCats.length === catCount ? '' : `?category=${checkedCats}`
}


