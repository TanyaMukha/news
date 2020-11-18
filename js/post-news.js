var requestURL = 'js/news.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    var defaultNews = request.response;
    sortByDate(defaultNews.articles)
    addDefaultNews(defaultNews.articles);
}

const addNewsForm = document.querySelector('#add-news-form');

addNewsForm.addEventListener('submit', function(event) {
    
    event.preventDefault();

    let newsTitle = document.querySelector('#add-news-title');
    let newsUrl = document.querySelector('#add-news-url');
    let newsImg = document.querySelector('#add-news-img');
    let newsDesc = document.querySelector('#add-news-desc');
    let newsPublishedAt = document.querySelector('#add-news-dt');
    let newsAuthor = document.querySelector('#add-news-author');
    
    const newsObj = {
        title: newsTitle.value,
        url: newsUrl.value,
        urlToImage: newsImg.value,
        description: newsDesc.value,
        publishedAt: newsPublishedAt.value,
        author: newsAuthor.value
    }

    postNews(newsObj);

    newsTitle.value = newsUrl.value = newsImg.value = newsDesc.value = newsAuthor.value = "";

    //window.location.hash="news-title";
});

function sortByDate(arr) {
    arr.sort((a, b) => a.publishedAt > b.publishedAt ? 1 : -1);
}

function addDefaultNews(newsArr) {    
    for(let keyNews in newsArr) {
        postNews(newsArr[keyNews]);
    }
}

function postNews(newsObj) {

    let newsContainer = document.querySelector('#news-container');

    let currentNews = document.createElement('article');
    currentNews.classList.add("news-item");
    newsContainer.insertBefore(currentNews, newsContainer.firstChild);

    let newsUrlImg = document.createElement('a');
    newsUrlImg.classList.add("news-item-url");
    newsUrlImg.href = newsObj.url;
    newsUrlImg.target = "_blank";
    currentNews.appendChild(newsUrlImg);
    
    let newsImage = document.createElement('img');
    newsImage.classList.add("news-item-img");
    newsImage.src = newsObj.urlToImage;
    newsUrlImg.appendChild(newsImage);
    
    let newsTitle = document.createElement('h2');
    newsTitle.classList.add("news-item-title");
    currentNews.appendChild(newsTitle);

    let newsUrl = document.createElement('a');
    newsUrl.classList.add("news-item-url");
    newsUrl.href = newsObj.url;
    newsUrl.target = "_blank";
    newsUrl.textContent = newsObj.title;
    newsTitle.appendChild(newsUrl);

    let newsDesc = document.createElement('p');
    newsDesc.classList.add("news-item-desc");
    newsDesc.textContent = newsObj.description;
    currentNews.appendChild(newsDesc);

    let newsPublishedAt = document.createElement('p');
    newsPublishedAt.classList.add("news-item-date");
    let publishedAt = new Date(newsObj.publishedAt);
    newsPublishedAt.textContent = publishedAt.toLocaleString();
    currentNews.appendChild(newsPublishedAt);

    if(newsObj.author != null && newsObj.author != "") {
        let newsAuthor = document.createElement('p');
        newsAuthor.classList.add("news-item-author");
        newsAuthor.textContent = newsObj.author;
        currentNews.appendChild(newsAuthor);    
    }
}