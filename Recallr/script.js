var $ = function( id ) { return document.getElementById( id ) }

var cardArray = []
var deckArray = []

var deckInUse
var cardInUse

var learningArray = []
var learningIndex = 0

var streakCounter = 0
const today = new Date().setHours(0,0,0,0)
const year = new Date(today).getFullYear()
const month = new Date(today).getMonth() + 1
const day = new Date(today).getDate()

if(localStorage.getItem("cardArray") != null)
{
    cardArray = JSON.parse(localStorage.getItem("cardArray"))
}

if(localStorage.getItem("deckArray") != null)
{
    deckArray = JSON.parse(localStorage.getItem("deckArray"))
    loadDecks()
}

if(localStorage.getItem("streakCounter") != null){
    streakCounter = parseInt(localStorage.getItem("streakCounter"))
}else{
    localStorage.setItem("streakCounter", streakCounter)
}

if(localStorage.getItem("lastDay") != null){
    var lastDayItem = new Date(localStorage.getItem("lastDay"))
    var lastDay = new Date(lastDayItem.setHours(0,0,0,0))

    if(datediff(lastDay, new Date(today)) === 1){
        streakCounter += 1
    }else{
        if(datediff(lastDay, new Date(today)) !== 0){
            streakCounter = 0
        }
    }

    localStorage.setItem("lastDay", new Date(today))
    localStorage.setItem("streakCounter", streakCounter)
    $("streakCounter").innerHTML = "🔥 " + streakCounter
}else{
    localStorage.setItem("lastDay", new Date())
}

function datediff(date1, date2) { 
    var Difference_In_Time = date2.getTime() - date1.getTime()

    return Math.round(Difference_In_Time / (1000 * 3600 * 24))
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

function Deck(id, name, date) {
    this.id = id;
    this.name = name;
    this.cards = [];
    this.is_liked = false;
    this.date = date
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

    var newDeck = new Deck(crypto.randomUUID(), $("deckNameInput").value, $("dateInput").value)
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
    if(deckArray.length === 1){
        $("deckCounter").innerHTML = deckArray.length + " Deck"
    }else{
        $("deckCounter").innerHTML = deckArray.length + " Decks"
    }

    $("deckHolder").remove()

    var newDeckHolder = document.createElement("div")
    newDeckHolder.id = "deckHolder"

    $("deckContainer").append(newDeckHolder)

    var markedDecks = []
    var restDecks = []

    deckArray.forEach((deck) => {
        if(deck.is_liked === true){
            markedDecks.push(deck)
        }else{
            restDecks.push(deck)
        }
    })

    markedDecks.forEach(deck => {
        createDeckDiv(deck)
    })

    restDecks.forEach(deck => {
        createDeckDiv(deck)
    })
}

function createDeckDiv(deck){
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
    flexContainerDiv.className = "flex-container deckCounters"
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

    var timeText = document.createElement("button")
    timeText.innerHTML = new Date(deck.date).getDate() + "." + (new Date(deck.date).getMonth() + 1) + "." + new Date(deck.date).getFullYear()
    timeText.className = "boxCounters"
    timeText.style.background = "rgb(62, 62, 62)"
    timeText.style.color = "var(--gray)"
    timeText.style.marginLeft = "30px"
    
    var daysToGo = datediff(new Date(today), new Date(deck.date))

    var color = "var(--green)"
    var background = "#2b361a"
    if(daysToGo <= 3){
        color = "var(--red)"
        background = "#351f21"
    }else if(daysToGo <= 7){
        color = "var(--orange)"
        background = "#403721"
    }

    var timeTextCounter = document.createElement("button")
    timeTextCounter.innerHTML = "in " + daysToGo + " Tag(en)"
    timeTextCounter.className = "boxCounters"
    timeTextCounter.style.background = background
    timeTextCounter.style.color = color

    flexContainerDiv.append(discoverBoxCounter)
    flexContainerDiv.append(practiceBoxCounter)
    flexContainerDiv.append(perfectBoxCounter)
    flexContainerDiv.append(counter)
    flexContainerDiv.append(timeText)
    flexContainerDiv.append(timeTextCounter)

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

function openEditCardView(card)
{
    openPage("deckView", "cardEdit")

    $("termTextEdit").value = card.term
    $("definitionTextEdit").value = card.definition

    if(card.termImg !== ""){
        $("termImgEdit").src = card.termImg
        $("termImgEdit").style.display = "block"
        $("termImgActionsEdit").style.display = ""
        $("addTermImgButtonEdit").style.display = "none"
    }else{
        $("termImgEdit").src = ""
        $("termImgEdit").style.display = "none"
        $("termImgActionsEdit").style.display = "none"
        $("addTermImgButtonEdit").style.display = "block"
    }

    if(card.definitionImg !== ""){
        $("definitionImgEdit").src = card.definitionImg
        $("definitionImgEdit").style.display = "block"
        $("definitionImgActionsEdit").style.display = ""
        $("addDefinitionImgButtonEdit").style.display = "none"
    }else{
        $("definitionImgEdit").src = ""
        $("definitionImgEdit").style.display = "none"
        $("definitionImgActionsEdit").style.display = "none"
        $("addDefinitionImgButtonEdit").style.display = "block"
    }

    $("deleteCardButton").onclick = function(){deleteCard(card.id)}
    $("saveCardButton").onclick = function(){saveCard(card.id)}
}

function createImage(index, button){
    openModal($('imgCreationModal'))

    $("saveImageButton").onclick = function(){
        var url = $("canvas").toDataURL()

        var img
        if($("cardEdit").style.display === "none"){
            if(index === 0){
                img = $("termImg")
                $("termImgActions").style.display = ""
            }else{
                img = $("definitionImg")
                $("definitionImgActions").style.display = ""
            }
        }else{
            if(index === 0){
                img = $("termImgEdit")
                $("termImgActionsEdit").style.display = ""
            }else{
                img = $("definitionImgEdit")
                $("definitionImgActionsEdit").style.display = ""
            }
        }

        img.src = url
        img.style.display = "block"

        button.style.display = "none"

        closeModal($('imgCreationModal'))
    }
}

function removeImage(index){
    if(index === 0){
        $("termImg").src = ""
        $("termImg").style.display = "none"
        $("termImgActions").style.display = "none"
        $("addTermImgButton").style.display = "block"
    }else{
        $("definitionImg").src = ""
        $("definitionImg").style.display = "none"
        $("definitionImgActions").style.display = "none"
        $("addDefinitionImgButton").style.display = "block"
    }
}

function removeImageEdit(index){
    if(index === 0){
        $("termImgEdit").src = ""
        $("termImgEdit").style.display = "none"
        $("termImgActionsEdit").style.display = "none"
        $("addTermImgButtonEdit").style.display = "block"
    }else{
        $("definitionImgEdit").src = ""
        $("definitionImgEdit").style.display = "none"
        $("definitionImgActionsEdit").style.display = "none"
        $("addDefinitionImgButtonEdit").style.display = "block"
    }
}

function editImage(index, button, source){
    createImage(index, button)

    var canvas = $("canvas")
    var context = canvas.getContext('2d');

    var img = new Image();
    img.src = source.src;
    img.onload = function(){
        context.drawImage(img, 0, 0);
    }
}

function createNewCard(){
    if($("termInput").value !== "" && $("definitionInput").value !== ""){
        var newCard = new Card(crypto.randomUUID(), $("termInput").value, $("definitionInput").value, $("termImg").src, $("definitionImg").src)

        if(!$("termImg").src.startsWith("data")){
            newCard.termImg = ""
        }

        if(!$("definitionImg").src.startsWith("data")){
            newCard.definitionImg = ""
        }

        deckInUse.cards.push(newCard)

        saveDecks()
        openPage('cardCreation', 'deckView')

        openDeckView(deckInUse)
    }
}

function saveCard(id){
    if($("termTextEdit").value !== "" && $("definitionTextEdit").value !== ""){
        var newCard = new Card(crypto.randomUUID(), $("termTextEdit").value, $("definitionTextEdit").value, $("termImgEdit").src, $("definitionImgEdit").src)

        if(!$("termImgEdit").src.startsWith("data")){
            newCard.termImg = ""
        }

        if(!$("definitionImgEdit").src.startsWith("data")){
            newCard.definitionImg = ""
        }

        deckInUse.cards.push(newCard)

        saveDecks()
    }

    deleteCard(id)
}

function deleteCard(id){
    var index = deckInUse.cards.findIndex(card => card.id === id)
    deckInUse.cards.splice(index, 1)

    saveDecks()
    openDeckView(deckInUse)
    openPage('cardEdit', 'deckView')
}

function loadCards(){
    $("cardHolder").remove()

    var newCardHolder = document.createElement("div")
    newCardHolder.id = "cardHolder"

    $("cardList").append(newCardHolder)

    getCardsByBox(0, deckInUse).forEach(card => {
        createCard(card, "var(--red)", newCardHolder)
    })

    getCardsByBox(1, deckInUse).forEach(card => {
        createCard(card, "var(--orange)", newCardHolder)
    })

    getCardsByBox(2, deckInUse).forEach(card => {
        createCard(card, "var(--green)", newCardHolder)
    })
}

function createCard(card, color, cardHolder) {
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
    editText.innerHTML = "✏️"
    
    flexContainer.appendChild(editText);
    flexContainer.appendChild(boxColor);
    flexContainer.append(starText)
    
    let term = document.createElement("p");
    if(card.termImg !== "" ){
        term.textContent = "📷 " + card.term;
    }else{term.textContent = card.term;}
    
    let definition = document.createElement("p");
    definition.className = "grayText";
    if(card.definitionImg !== "" ){
        definition.textContent = "📷 " + card.definition;
    }else{definition.textContent = card.definition;}
    
    cardDiv.appendChild(flexContainer);
    cardDiv.appendChild(term);
    cardDiv.appendChild(definition);
    
    cardHolder.appendChild(cardDiv);

    starText.onclick = function(){toggleCardStar(card.id)}
    editText.onclick = function(){openEditCardView(card)}
}

function revealCard(){
    $("definitionDiv").style.display = ""
    $("cardLearningButtons").style.display = ""
}

function openCardLearning(array){
    openPage('deckView', 'cardLearning')

    $("cardsLearned").innerHTML = "0"
    $("cardsToLearn").innerHTML = "/ " + array.length
    $("progress-bar-filler").style.width = "0%"
    $("definitionDiv").style.display = "none"
    $("cardLearningButtons").style.display = "none"

    learningArray = []
    array.forEach(card => {
        learningArray.push(card)
    })
    shuffle(learningArray)
    learningIndex = 0

    loadNextLearningCard()
}

function repeatAllCards(){
    openCardLearning(deckInUse.cards)
}

function repeatMarkedCards(){
    var markedCards = []

    deckInUse.cards.forEach((card) => {
        if(card.is_liked === true){
            markedCards.push(card)
        }
    })

    openCardLearning(markedCards)
}

function repeatCardsByBox(box){
    var cards = getCardsByBox(box, deckInUse)

    openCardLearning(cards)
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
    var index = deckInUse.cards.findIndex(card => card.id === learningArray[learningIndex].id)
    deckInUse.cards[index].box = 0

    learningIndex += 1
    loadNextLearningCard()
}

function moveCardToPractice(){
    var index = deckInUse.cards.findIndex(card => card.id === learningArray[learningIndex].id)
    deckInUse.cards[index].box = 1

    learningIndex += 1
    loadNextLearningCard()
}

function moveCardToPerfect(){
    var index = deckInUse.cards.findIndex(card => card.id === learningArray[learningIndex].id)
    deckInUse.cards[index].box = 2

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

function editDeck(){
    $("deckNameInputEdit").value = deckInUse.name
    $("dateInputEdit").value = deckInUse.date
}

function saveDeck(){
    deckInUse.name = $("deckNameInputEdit").value 
    deckInUse.date = $("dateInputEdit").value

    saveDecks()

    closeModal($("editDeckModal"))
    $("deckname").innerHTML = deckInUse.name
}

function deleteDeck(){
    var index = deckArray.findIndex(deck => deck.id === deckInUse.id)

    deckArray.splice(index, 1)

    saveDecks()
    openPage('deckView', 'home')
    closeModal($("editDeckModal"))
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function downloadAllData(){
    download(JSON.stringify(deckArray), 'allData.json', 'text/plain')
}

function uploadAllData(){
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
        return;
    }
    
    var fr = new FileReader();
    fr.onload = function(e) { 
        var result = JSON.parse(e.target.result);
        deckArray = result
        saveDecks()
    } 

    fr.readAsText(files.item(0));

    closeModal($("uploadDataModal"))
}

function openDownloadDeckModal(){
    var elements = document.getElementsByClassName("options")

    while(elements.length > 0){
        elements[0].remove()
    }

    openModal($('downloadDeckModal'))

    deckArray.forEach(deck => {
        var option = document.createElement("option")
        option.innerHTML = deck.name
        option.value = deck.id
        option.className = "options"

        $("selectDeck").append(option)
    });
}

function downloadDeckData(){
    var index = deckArray.findIndex(deck => deck.id === $("selectDeck").value)

    var deckToDownload = [deckArray[index]]

    download(JSON.stringify(deckToDownload), deckArray[index].name + '.json', 'text/plain')

    closeModal($('downloadDeckModal'))
}

function uploadDeckData(){
    var files = document.getElementById('selectDeckFile').files;
    if (files.length <= 0) {
        return;
    }

    var fr = new FileReader();
    fr.onload = function(e) { 
        var result = JSON.parse(e.target.result);
        deckArray.push(result[0])
        saveDecks()
    } 

    fr.readAsText(files.item(0));

    closeModal($("uploadDeckModal"))
}