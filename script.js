const url = 'https://api.chucknorris.io/jokes/';
const card = document.querySelector(".card")
const jokePar = document.querySelector(".card__joke");
const jokeLink = document.querySelector(".card__link");
const btnNext = document.querySelector("button")


getJoke(location.hash.slice(1)).then(showJoke);

btnNext.addEventListener('click', () => getJoke().then(showJoke))

function getJoke(id) {
    return fetch(url + (id || 'random'))
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








