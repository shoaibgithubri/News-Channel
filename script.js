const API_KEY = "72f7b9bbe519448a9d54ba5ca2939a0d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Pakistan"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const CardContainer = document.getElementById("card-container");
  const NewsCardTemplate = document.getElementById("template-news-card");
  CardContainer.innerHTML = '';

  articles.forEach(article => {
    if (!article.urlToImage)
     return;
    const CardClone = NewsCardTemplate.content.cloneNode(true);
    fillDataInCard(CardClone,article);
   
     CardContainer.appendChild(CardClone);
  });
 }
            function  fillDataInCard(CardClone,article){
              const newsimg =CardClone.querySelector('#news-img')
              const newsource =CardClone.querySelector('#news-source')
              const newsdesc =CardClone.querySelector('#news-desc')
              const newstitle =CardClone.querySelector('#news-title')
         

            newsimg.src = article.urlToImage;
            newstitle.innerHTML=article.title;
            newsdesc.innerHTML=article.description;
            const date = new Date(article.publishedAt).toLocaleString("en-us" ,{
              timeZone: "Asia/jakarta"
            });
            newsource.innerHTML = `${article.source.name} . ${date}`
            CardClone.firstElementChild.addEventListener('click',() =>{
              window.open(article.url, "_blank");
            });
            } 
            let curSelectednav = null; 
            function ontouch(id){
              fetchNews(id);
              const navItem = document.getElementById(id);
              curSelectednav?.classList.remove('active')
              curSelectednav = navItem;
              curSelectednav.classList.add('active');
            } 
            const searchbutton = document.getElementById('search-button')
            const searchtext = document.getElementById('news-input')
                        searchbutton.addEventListener('click', () =>{
            const query =searchtext.Value;
            if(!query)return;
            fetchNews(query);
            curSelectednav?.classList.remove('active') ;
            curSelectednav = null;

            })


