window.onload = getCurrentImageoftheDay;
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const date = document.getElementById("search-input").value;
  getImageOfTheDay(date);
});

document.getElementById("previous").addEventListener("click",()=>{
    let searches = JSON.parse(localStorage.getItem("searches"));
    let currentSearchDate=document.getElementById("title").innerText.split("Picture on ")[1];
    let newIndex=searches.indexOf(currentSearchDate);
    getImageOfTheDay(searches[newIndex-1]);
    console.log(searches,currentSearchDate,newIndex);
})
function getCurrentImageoftheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=vT4lcw7F0DhJB2hMMtt6LYaVHgUOFLb5UXIcwGnJ&date=${currentDate}`
  )
    .then((response) => response.json())
    .then((data) => displayImage(data));
}
document.getElementById("next").addEventListener("click",()=>{
    let searches = JSON.parse(localStorage.getItem("searches"));
    let currentSearchDate=document.getElementById("title").innerText.split("Picture on ")[1];
    let newIndex=searches.indexOf(currentSearchDate);
    if(searches.length>newIndex+1){
        getImageOfTheDay(searches[newIndex+1]);
    }
    console.log(searches,currentSearchDate,newIndex);
})
function getCurrentImageoftheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=vT4lcw7F0DhJB2hMMtt6LYaVHgUOFLb5UXIcwGnJ&date=${currentDate}`
  )
    .then((response) => response.json())
    .then((data) => displayImage(data));
}

function getImageOfTheDay(date) {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=vT4lcw7F0DhJB2hMMtt6LYaVHgUOFLb5UXIcwGnJ&date=${date}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayImage(data);
      saveSearch(date);
      addSearchtoHistory(date);
    });
}

function saveSearch(date) {
  // store data in local storage
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  // adding conditional is pending
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

function addSearchtoHistory(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = "";
  searches.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    searchHistory.appendChild(li);
  });
}

function displayImage(data) {
  console.log(data);
  const imageContainer = document.getElementById("current-image-container");
  imageContainer.innerHTML = `
    <h1 id="title">Picture on ${data.date}</h1>
    <img src="${data.hdurl}" height="400px">
    <h2>${data.title}</h2>
    <p>${data.explanation}</p>
    `;
}
