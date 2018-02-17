var recipeList = document.querySelector("#recipeList");
var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var containerList = document.querySelector("#containerList");

searchBtn.addEventListener("click", search);
searchInput.addEventListener("keydown", function(e){
  if (e.key == "Enter") {
    search()
  }
});

function search(){
  var lookingFor = searchInput.value;
  searchRender(lookingFor);
  searchInput.value = "";
}

function searchRender(data){
  var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', `https://api.edamam.com/search?q=${data}&from=0&to=56&app_id=0b7ab8b0&app_key=18a86b8014353d9597831678b5a3e802`); //&health=vegan
    ourRequest.onload = function(){
      if(ourRequest.status >= 200 && ourRequest.status < 400){
        var recipes = JSON.parse(ourRequest.responseText);
        renderHTML(recipes)
        console.log(recipes);
      } else{
        console.log("Returned an error");
      }
    }
  ourRequest.send()
}

function renderHTML(data){
containerList.classList.remove("d-none");
recipeList.innerHTML = "";
var htmlString = "";
if(data && data.hits.length > 0){
for(var i=0;i<data.hits.length;i++){
htmlString += `
<div class="col-sm-6 col-md-4 col-lg-3 my-3">
  <div class="card text-center">
    <img class="card-img-top" src="${data.hits[i].recipe.image}" alt="Card image cap">
    <div class="card-body">
      <h5><a class="bada55" target="_blank" href="${data.hits[i].recipe.url}">${data.hits[i].recipe.label}</a></h5>
      </div>
    </div>
  </div>`
}
} else {
  htmlString = "<p class='lead no-recipes'>No recipes found.</p>";
}
recipeList.insertAdjacentHTML('beforeend', htmlString);
}
