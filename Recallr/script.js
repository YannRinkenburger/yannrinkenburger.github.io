var $ = function( id ) { return document.getElementById( id ) }

var cardId = 0
var deckId = 0

var cardArray = []
var deckArray = []

var deckInUse

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

function Card(id, term, definition, termImg, definitionImg) {
    this.id = id;
    this.term = term;
    this.definition = definition;
    this.termImg = termImg;
    this.definitionImg = definitionImg;
}

function Deck(id, name) {
    this.id = id;
    this.name = name;
    this.discoverBox = [];
    this.practiceBox = [];
    this.perfectBox = [];
    this.is_liked = false;
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
    deckId += 1

    saveDecks()
    loadDecks()

    $("deckNameInput").value = ""
}

function saveDecks(){
    localStorage.setItem("deckArray", JSON.stringify(deckArray))
    localStorage.setItem("deckId", deckId)
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

    $("progress-one").style.width = `${cardPercDiscover * 100}%`
    $("progress-two").style.width = `${cardPercPractice * 100}%`
    $("progress-three").style.width = `${cardPercPerfect * 100}%`

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

    deckInUse = deck

    loadCards()
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

function createImage(index, button){
    openModal($('imgCreationModal'))
    button.style.display = "none"

    $("saveImageButton").onclick = function(){
        var url = $("canvas").toDataURL()

        var img
        if(index === 0){
            img = $("termImg")
        }else{
            img = $("definitionImg")
        }

        img.src = url
        img.style.display = "block"

        closeModal($('imgCreationModal'))
    }
}

function createCard(){
    var newCard = new Card(cardId, $("termInput").value, $("definitionInput").value, $("termImg").src, $("termImg").src)
    cardId += 1

    deckInUse.discoverBox.push(newCard)

    saveDecks()
    openPage('cardCreation', 'deckView')
    openDeckView(deckInUse)
}

function loadCards(){
    $("cardHolder").remove()

    var newCardHolder = document.createElement("div")
    newCardHolder.id = "cardHolder"

    $("cardList").append(newCardHolder)

    deckInUse.discoverBox.forEach(card => {
        createCard(card)
        console.log(card)
    })

    deckInUse.practiceBox.forEach(card => {
        createCard(card)
    })

    deckInUse.perfectBox.forEach(card => {
        createCard(card)
    })
}

function createCard(card) {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.onclick = openCardView;
    
    let flexContainer = document.createElement("div");
    flexContainer.className = "flex-container";
    
    let clockImg = document.createElement("img");
    clockImg.src = "img/clock.png";
    clockImg.alt = "Clock";
    
    let clockText = document.createElement("p");
    clockText.className = "clockText";
    clockText.textContent = "In 23 Tagen";
    
    let menuImg = document.createElement("img");
    menuImg.src = "img/menu_white.png";
    menuImg.alt = "Menu";
    menuImg.style.marginLeft = "auto";
    
    flexContainer.appendChild(clockImg);
    flexContainer.appendChild(clockText);
    flexContainer.appendChild(menuImg);
    
    let term = document.createElement("p");
    term.textContent = card.term;
    
    let definition = document.createElement("p");
    definition.className = "grayText";
    definition.textContent = card.definition;
    let image = document.createElement("img");
    image.src = "img/image_white.png";
    image.alt = "Image";

    if(!(card.termImg !== "" || card.definitionImg !== "")){
        image.style.display = "none"
    }
    
    cardDiv.appendChild(flexContainer);
    cardDiv.appendChild(term);
    cardDiv.appendChild(definition);
    cardDiv.appendChild(image);
    
    document.getElementById("cardContainer").appendChild(cardDiv);
}
