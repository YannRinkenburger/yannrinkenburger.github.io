var $ = function( id ) { return document.getElementById( id ) }

var cardId = 0
var deckId = 0

var cardArray = []
var deckArray = []

var deckInUse
var cardInUse

var learningArray = []
var learningIndex = 0

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
    this.box = 0;
    this.is_liked = false;
}

function Deck(id, name) {
    this.id = id;
    this.name = name;
    this.cards = [];
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
    localStorage.setItem("cardId", cardId)
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

        var flexContainerDiv = document.createElement("div")
        flexContainerDiv.className = "flex-container"
        flexContainerDiv.style.marginTop = "6px"

        var counter = document.createElement("button")
        counter.innerHTML = deck.cards.length
        counter.className = "boxCounters"
        counter.style.background = "rgb(62, 62, 62)"
        counter.style.color = "var(--gray)"

        var discoverBoxCounter = document.createElement("button")
        discoverBoxCounter.innerHTML = countCardsInBox(0, deck)
        discoverBoxCounter.className = "boxCounters"
        discoverBoxCounter.style.background = "#351f21"
        discoverBoxCounter.style.color = "var(--red)"

        var practiceBoxCounter = document.createElement("button")
        practiceBoxCounter.innerHTML = countCardsInBox(1, deck)
        practiceBoxCounter.className = "boxCounters"
        practiceBoxCounter.style.background = "#403721"
        practiceBoxCounter.style.color = "var(--orange)"

        var perfectBoxCounter = document.createElement("button")
        perfectBoxCounter.innerHTML = countCardsInBox(2, deck)
        perfectBoxCounter.className = "boxCounters"
        perfectBoxCounter.style.background = "#2b361a"
        perfectBoxCounter.style.color = "var(--green)"

        flexContainerDiv.append(discoverBoxCounter)
        flexContainerDiv.append(practiceBoxCounter)
        flexContainerDiv.append(perfectBoxCounter)
        flexContainerDiv.append(counter)

        deckInfo.appendChild(deckTitle);
        deckInfo.appendChild(flexContainerDiv);

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

    var cardCounter = deck.cards.length

    var discoverBoxCounter = countCardsInBox(0, deck)
    var practiceBoxCounter = countCardsInBox(1, deck)
    var perfectBoxCounter = countCardsInBox(2, deck)

    $("deckname").innerHTML = deck.name
    $("deckChartCounter").innerHTML = cardCounter
    $("deckDiscoverCounter").innerHTML = discoverBoxCounter
    $("deckPracticeCounter").innerHTML = practiceBoxCounter
    $("deckPerfectCounter").innerHTML = perfectBoxCounter
    $("cardsInDeckText").innerHTML = `Cards in Deck (${cardCounter})`

    var cardPercDiscover = discoverBoxCounter / cardCounter
    var cardPercPractice = practiceBoxCounter / cardCounter 
    var cardPercPerfect = perfectBoxCounter / cardCounter

    $("progress-one").style.width = `${cardPercDiscover * 100}%`
    $("progress-two").style.width = `${cardPercPractice * 100}%`
    $("progress-three").style.width = `${cardPercPerfect * 100}%`

    $("donut").style.background = `conic-gradient(
      var(--red) 0deg ${cardPercDiscover * 360}deg,
      var(--orange) ${cardPercDiscover * 360}deg ${cardPercDiscover * 360 + cardPercPractice * 360}deg,
      var(--green) ${cardPercDiscover * 360 + cardPercPractice * 360}deg 360deg
    )`

    if(cardCounter === 0){
        $("progress-one").style.width = "100%"
        $("progress-two").style.width = "0%"
        $("progress-three").style.width = "0%"

        $("donut").style.background = `conic-gradient(
            var(--red) 0deg 360deg
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

function toggleCardStar(id){
    var index = deckInUse.cards.findIndex(deck => deck.id === id)
    
    if(deckInUse.cards[index].is_liked === true){
        deckInUse.cards[index].is_liked = false
    }else{
        deckInUse.cards[index].is_liked = true
    }
    saveDecks()
    loadCards()
}

function openCardView()
{
    openModal($("cardViewModal"))


}

function createImage(index, button){
    openModal($('imgCreationModal'))

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

        button.style.display = "none"

        closeModal($('imgCreationModal'))
    }
}

function createNewCard(){
    var newCard = new Card(cardId, $("termInput").value, $("definitionInput").value, $("termImg").src, $("termImg").src)
    cardId += 1

    deckInUse.cards.push(newCard)

    saveDecks()
    openPage('cardCreation', 'deckView')
    openDeckView(deckInUse)
}

function loadCards(){
    $("cardHolder").remove()

    var newCardHolder = document.createElement("div")
    newCardHolder.id = "cardHolder"

    $("cardList").append(newCardHolder)

    getCardsByBox(0, deckInUse).forEach(card => {
        createCard(card, "var(--red)")
    })

    getCardsByBox(1, deckInUse).forEach(card => {
        createCard(card, "var(--orange)")
    })

    getCardsByBox(2, deckInUse).forEach(card => {
        createCard(card, "var(--green)")
    })
}

function createCard(card, color) {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    
    let flexContainer = document.createElement("div");
    flexContainer.className = "flex-container cardHeader";
    
    let boxColor = document.createElement("p");
    boxColor.className = "boxColor";
    boxColor.textContent = "0";
    boxColor.style.background = color
    boxColor.style.color = color

    let starText = document.createElement("p");
    starText.className = "star";

    if(card.is_liked === true){
        starText.style.color = "var(--gold)";
        starText.innerHTML = "&#9733;";
    }else{
        starText.style.color = "var(--gray)";
        starText.innerHTML = "&#9734;";
    }

    let editText = document.createElement("p");
    editText.className = "star edit";
    editText.innerHTML = "&#9998;"
    
    flexContainer.appendChild(editText);
    flexContainer.appendChild(boxColor);
    flexContainer.append(starText)
    
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
    
    document.getElementById("cardHolder").appendChild(cardDiv);

    starText.onclick = function(){toggleCardStar(card.id)}
    editText.onclick = function(){openCardView()}
}

function revealCard(){
    $("definitionDiv").style.display = ""
    $("cardLearningButtons").style.display = ""
}

function repeatAllCards(){
    openPage('deckView', 'cardLearning')

    $("cardsLearned").innerHTML = "0"
    $("cardsToLearn").innerHTML = "/ " + deckInUse.cards.length
    $("progress-bar-filler").style.width = "0%"
    $("definitionDiv").style.display = "none"
    $("cardLearningButtons").style.display = "none"

    learningArray = deckInUse.cards
    shuffle(learningArray)

    learningIndex = 0

    loadNextLearningCard()
}

function loadNextLearningCard(){
    $("goBackLearningButton").onclick = function(){openPage('cardLearning', 'deckView'); openDeckView(deckInUse)}
    $("goBackLearningButton1").onclick = function(){openPage('cardLearning', 'deckView'); openDeckView(deckInUse)}

    $("cardsLearned").innerHTML = learningIndex
    $("progress-bar-filler").style.width = (learningIndex  / learningArray.length) * 100 + "%"

    if(learningIndex === learningArray.length){
        $("cardLearningEnd").style.display = ""
        $("cardToLearn").style.display = "none"
        $("cardLearningButtons").style.display = "none"

        return
    }
    saveDecks()
    var card = learningArray[learningIndex]

    $("cardToLearn").style.display = ""
    $("definitionDiv").style.display = "none"
    $("cardLearningButtons").style.display = "none"
    $("cardLearningEnd").style.display = "none"

    $("cardToLearnTerm").innerHTML = card.term
    $("cardToLearnTermImg").src = card.termImg
    $("cardToLearnDefinition").innerHTML = card.definition
    $("cardToLearnDefinitionImg").src = card.definitionImg

    if(card.termImg === ""){
        $("cardToLearnTermImg").style.display = "none"
    }

    if(card.definitionImg === ""){
        $("cardToLearnDefinitionImg").style.display = "none"
    }
}

function moveCardToDiscover(){
    deckInUse.cards[learningIndex].box = 0

    learningIndex += 1
    loadNextLearningCard()
}

function moveCardToPractice(){
    deckInUse.cards[learningIndex].box = 1

    learningIndex += 1
    loadNextLearningCard()
}

function moveCardToPerfect(){
    deckInUse.cards[learningIndex].box = 2

    learningIndex += 1
    loadNextLearningCard()
}

function countCardsInBox(box, deck){
    var counter = 0

    deck.cards.forEach((card) => {
        if(card.box === box){
            counter += 1
        }
    });

    return counter
}

function getCardsByBox(box, deck){
    var cards = []

    deck.cards.forEach((card) => {
        if(card.box === box){
            cards.push(card)
        }
    });

    return cards
}

function shuffle(array){
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}