const options = {method: 'GET', headers: {accept: 'application/json'}}

var $ = function( id ) { return document.getElementById( id ); };

const apiKey = "b30e6b070bbd8dad5f31181f0eb2237d"
const language = "&language=de"
var movieId = 12
var collectionId = 10

var watchedList = []
var bookmarkedList = []

if(localStorage.getItem("watchedList") === null)
{
  localStorage.setItem("watchedList", JSON.stringify(watchedList))
}else{
  watchedList = JSON.parse(localStorage.getItem("watchedList"))
}

if(localStorage.getItem("bookmarkedList") === null)
{
  localStorage.setItem("bookmarkedList", JSON.stringify(bookmarkedList))
}else{
  bookmarkedList = JSON.parse(localStorage.getItem("bookmarkedList"))
}

var genreList

getAllMovieGenres().then(function(result){
  genreList = result.genres
})

async function getAllMovieGenres()
{
  var apiURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + language
  const data = await fetchDataFromAPI(apiURL)
  return data
}

fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=Star Wars" + language, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err))

fetch("https://api.themoviedb.org/3/movie/" + movieId + "/watch/providers?api_key="  + apiKey, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err))

fetch("https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apiKey + language, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err))

fetch("https://api.themoviedb.org/3/collection/" + collectionId + "?api_key=" + apiKey + language, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err))

async function fetchDataFromAPI(p_apiURL) 
{
  try {
    const response = await fetch(p_apiURL)

    if(!response.ok) {
      throw new Error("Network response was not ok.")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

var latestMovies = getLatestTopMovies().then(function(result){
  console.log(result)

  for(var i = 0; i < 5; i++)
  {
    createSlideCard(result.results[i], i + 1)
  }

  showSlides(slideIndex)
})

function createSlideCard(p_data, p_index)
{
  var div = document.createElement("div")
  div.className = "mySlides fade"

  var img = document.createElement("img")
  img.src = "https://image.tmdb.org/t/p/original" + p_data.backdrop_path
  img.className = "backgroundImg"

  var posterImg = document.createElement("img")
  posterImg.src = "https://image.tmdb.org/t/p/original" + p_data.poster_path
  posterImg.className = "img"

  var infoDiv = document.createElement("div")
  infoDiv.className = "infoDiv"

  var title = document.createElement("p")
  title.className = "slideTitle"
  title.innerHTML = p_data.title

  var starImage = document.createElement("img")
  starImage.src = "img/star_gold.png"

  var rating = document.createElement("p")
  rating.className = "rating"
  rating.innerHTML = (Math.round(p_data.vote_average * 10) / 10).toFixed(1)
  rating.style.marginLeft = "8px"

  var year = new Date(p_data.release_date).getFullYear()
  var release_date = document.createElement("p")
  release_date.innerHTML = year
  release_date.style.marginLeft = "30px"

  var genreDiv = document.createElement("div")
  genreDiv.className = "genreDiv"

  for(var i = 0; i < p_data.genre_ids.length; i++)
  {
    for(var ii = 0; ii < genreList.length; ii++)
    {
      if(p_data.genre_ids[i] === genreList[ii].id)
      {
        var genreText = document.createElement("div")
        genreText.innerHTML = genreList[ii].name

        genreDiv.append(genreText)
      }
    }
  }

  infoDiv.append(starImage)
  infoDiv.append(rating)
  infoDiv.append(release_date)
  infoDiv.append(genreDiv)

  div.append(img)
  div.append(posterImg)
  div.append(title)
  div.append(infoDiv)
  $("bigCard").append(div)
}

async function getLatestTopMovies()
{
  var apiURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + language + "&primary_release_year=2024&vote_average.gte=7&vote_count.gte=200"
  const data = await fetchDataFromAPI(apiURL)
  return data
}

var movie = getMovieById(movieId).then(function(result){
  createCard(result, "cards")
})

async function getMovieById(p_movieId)
{
  var apiURL = "https://api.themoviedb.org/3/movie/" + p_movieId + "?api_key="  + apiKey + language
  const data = await fetchDataFromAPI(apiURL)
  return data
}

function createCard(p_data, p_id)
{
  var card = document.createElement("div")
  card.className = "card"

  var center = document.createElement("center")

  var poster = document.createElement("img")
  poster.src = "https://image.tmdb.org/t/p/original" + p_data.poster_path
  center.append(poster)

  var title = document.createElement("p")
  title.className = "title hover"
  title.innerHTML = p_data.title

  var release_date = document.createElement("p")
  release_date.className = "release_date"

  var year = new Date(p_data.release_date).getFullYear()

  release_date.innerHTML = year

  var runtime = document.createElement("p")
  runtime.className = "runtime"
  runtime.innerHTML = p_data.runtime + " min"

  card.append(center)
  card.append(title)
  card.append(release_date)
  card.append(runtime)

  var cardMenu = document.createElement("div")
  cardMenu.className = "cardMenu"

  var cardMenuContent1 = document.createElement("div")
  cardMenuContent1.style.width = "68%"

  var starImage = document.createElement("img")
  starImage.src = "img/star_gold.png"
  cardMenuContent1.append(starImage)

  var rating = document.createElement("p")
  rating.className = "rating"
  rating.innerHTML = Math.round(p_data.vote_average * 10) / 10
  cardMenuContent1.append(rating)

  var cardMenuContent2 = document.createElement("div")
  cardMenuContent2.style.width = "16%"

  var bookmarkImage = document.createElement("img")
  bookmarkImage.src = "img/bookmark.png"
  bookmarkImage.style.marginLeft = "auto"
  bookmarkImage.className = "hover"
  cardMenuContent2.append(bookmarkImage)

  var cardMenuContent3 = document.createElement("div")
  cardMenuContent3.style.width = "16%"

  var watchedImage = document.createElement("img")
  watchedImage.src = "img/watched.png"
  watchedImage.style.marginLeft = "auto"
  watchedImage.className = "hover"
  cardMenuContent3.append(watchedImage)

  cardMenu.append(cardMenuContent1)
  cardMenu.append(cardMenuContent2)
  cardMenu.append(cardMenuContent3)

  card.append(cardMenu)

  if(bookmarkedList.includes(p_data.id))
  {
    bookmarkImage.src = "img/bookmark_red.png"
  }

  if(watchedList.includes(p_data.id))
  {
    watchedImage.src = "img/watched_red.png"
  }

  title.onclick = function(){}
  bookmarkImage.onclick = function(){addOrRemoveMovieToStoredList("bookmarkedList", bookmarkedList, p_data.id, this, "bookmark")}
  watchedImage.onclick = function(){addOrRemoveMovieToStoredList("watchedList", watchedList, p_data.id, this, "watched")}

  $(p_id).append(card)
}

function addOrRemoveMovieToStoredList(p_bezeichnung, p_list, p_movieId, p_element, p_name)
{
  var newList = p_list

  if(newList.includes(p_movieId))
  {
    var index = newList.indexOf(p_movieId)
    newList.splice(index, 1)
    p_element.src = "img/" + p_name + ".png"
  }else{
    newList.push(p_movieId)
    p_element.src = "img/" + p_name + "_red.png"
  }

  localStorage.setItem(p_bezeichnung, JSON.stringify(newList))
  updateStoredLists()
}

function updateStoredLists()
{
  bookmarkedList = JSON.parse(localStorage.getItem("bookmarkedList"))
  watchedList = JSON.parse(localStorage.getItem("watchedList"))
}

function hover(p_element, p_name)
{
  p_element.src = "img/" + p_name + "_red.png"
}

function unhover(p_element, p_name) 
{
  p_element.src = "img/" + p_name + ".png"
}

let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function currentSlide(n) {
  showSlides(slideIndex = n)
}

function showSlides(n) {
  let i
  let slides = document.getElementsByClassName("mySlides")
  let dots = document.getElementsByClassName("dot")

  if(n > slides.length) 
  {
    slideIndex = 1
  }  

  if(n < 1) 
  {
    slideIndex = slides.length
  }

  for(i = 0; i < slides.length; i++) 
  {
    slides[i].style.display = "none"
  }

  for (i = 0; i < dots.length; i++) 
  {
    dots[i].className = dots[i].className.replace(" active", "")
  }
  slides[slideIndex-1].style.display = "block" 
  dots[slideIndex-1].className += " active"
}