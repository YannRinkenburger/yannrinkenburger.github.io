var $ = function( id ) { return document.getElementById( id ) }

var cardId = 0
var deckId = 0

var cardArray = []
var deckArray = []

if(localStorage.getItem("cardId") != null)
{
    cardId = localStorage.getItem("cardId")
}

if(localStorage.getItem("deckId") != null)
{
    deckId = localStorage.getItem("deckId")
}

if(localStorage.getItem("cardArray") != null)
{
    cardArray = JSON.parse(localStorage.getItem("cardArray"))
}

if(localStorage.getItem("deckArray") != null)
{
    deckArray = JSON.parse(localStorage.getItem("deckArray"))
    loadDecks()
}

function Card(id, term, definition, img) {
    this.id = id;
    this.term = term;
    this.definition = definition;
    this.img = img;
}

function Deck(id, name) {
    this.id = id;
    this.name = name;
    this.discoverBox = [];
    this.practiceBox = [];
    this.perfectBox = [];
    this.is_liked = false;
}

Deck.prototype.addCardToDiscoverBox = function(card){
    this.discoverBox.push(card)
}

function openModal(modal)
{   
    modal.style.display = "block"

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none"
        }
    }
}

function closeModal(modal){
    modal.style.display = "none"
}

function openPage(pageToClose, pageToOpen){
    $(pageToClose).style.display = "none"
    $(pageToClose + "Menu").style.display = "none"

    $(pageToOpen).style.display = ""
    $(pageToOpen + "Menu").style.display = ""
}

function toggleSearchCardBar(){
    if($("searchCard").style.display === "none"){
        $("searchCard").style.display = ""
    }else{
        $("searchCard").style.display = "none"
    }
}

function createDeck(){
    closeModal($("newDeckModal"))

    var newDeck = new Deck(deckId, $("deckNameInput").value)
    deckArray.push(newDeck)

    saveDecks()
    loadDecks()

    $("deckNameInput").value = ""
}

function saveDecks(){
    localStorage.setItem("deckArray", JSON.stringify(deckArray))
    loadDecks()
}

function loadDecks() {
    $("deckHolder").remove()

    var newDeckHolder = document.createElement("div")
    newDeckHolder.id = "deckHolder"

    $("deckContainer").append(newDeckHolder)

    deckArray.forEach(deck => {
        var deckDiv = document.createElement("div");
        deckDiv.className = "flex-container";

        var starHolder = document.createElement("div");
        starHolder.className = "starHolder";
        var star = document.createElement("p");
        
        if(deck.is_liked === true){
            star.style.color = "var(--gold)";
            star.innerHTML = "&#9733;";
        }else{
            star.style.color = "var(--gray)";
            star.innerHTML = "&#9734;";
        }

        starHolder.appendChild(star);

        var deckContent = document.createElement("div");
        deckContent.className = "deck flex-container";

        var deckInfo = document.createElement("div");
        var deckTitle = document.createElement("h3");
        deckTitle.textContent = deck.name;
        var cardCounter = document.createElement("p");
        cardCounter.className = "cardCounter";
        cardCounter.textContent = `Cards for today: ${deck.cardCount}`;

        deckInfo.appendChild(deckTitle);
        deckInfo.appendChild(cardCounter);

        var deckArrow = document.createElement("div");
        deckArrow.className = "deckArrow";
        deckArrow.innerHTML = "<h2>&#10095;</h2>";

        deckContent.appendChild(deckInfo);
        deckContent.appendChild(deckArrow);

        deckDiv.appendChild(starHolder);
        deckDiv.appendChild(deckContent);

        deckContent.onclick = function(){openDeckView(deck)}
        starHolder.onclick = function(){toggleStar(deck.id)}

        document.getElementById("deckHolder").appendChild(deckDiv);
    });
}

function openDeckView(deck){
    openPage("home", "deckView")

    var cardCounter = deck.discoverBox.length + deck.practiceBox.length + deck.perfectBox.length

    $("deckname").innerHTML = deck.name
    $("deckChartCounter").innerHTML = cardCounter
    $("deckDiscoverCounter").innerHTML = deck.discoverBox.length
    $("deckPracticeCounter").innerHTML = deck.practiceBox.length
    $("deckPerfectCounter").innerHTML = deck.perfectBox.length
    $("cardsInDeckText").innerHTML = `Cards in Deck (${cardCounter})`

    var cardPercDiscover = deck.discoverBox.length / cardCounter
    var cardPercPractice = deck.practiceBox.length / cardCounter 
    var cardPercPerfect = deck.perfectBox.length / cardCounter

    $("progress-one").style.width = `(${cardPercDiscover * 100})%`
    $("progress-two").style.width = `(${cardPercPractice * 100})%`
    $("progress-three").style.width = `(${cardPercPerfect * 100})%`

    $("donut").style.background = `conic-gradient(
      red 0deg ${cardPercDiscover * 360}deg,
      yellow ${cardPercDiscover * 360}deg ${cardPercDiscover * 360 + cardPercPractice * 360}deg,
      green ${cardPercDiscover * 360 + cardPercPractice * 360}deg 360deg
    )`

    if(cardCounter === 0){
        $("progress-one").style.width = "100%"
        $("progress-two").style.width = "0%"
        $("progress-three").style.width = "0%"

        $("donut").style.background = `conic-gradient(
            red 0deg 360deg
        )`
    }
}

function toggleStar(id){
    var index = deckArray.findIndex(deck => deck.id === id)
    
    if(deckArray[index].is_liked === true){
        deckArray[index].is_liked = false
    }else{
        deckArray[index].is_liked = true
    }
    saveDecks()
}

function openCardView()
{
    openModal($("cardViewModal"))


}