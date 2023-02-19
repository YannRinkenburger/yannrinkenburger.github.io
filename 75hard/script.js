var goalsText = ["First Workout", "Second Workout", "Take Progress Picture", "10 Pages of Reading", "Drink 1 Gallon of Water", "Follow a Diet", "No Cheat Meals or Alcohol"]

var dayArray = []

var images = []
var imgIndex = 0

var createGoalButtonIndex = 0

var cameraIndex = 2

const d = new Date()
var day = d.getDay()

class goal{
    constructor(text)
    {
        this.text = text
        this.bool = false
    }
}

class textarea{
    constructor(value)
    {
        this.value = value
    }
}

class imageSave{
    constructor(day, image)
    {
        this.day = day
        this.image = image
    }
}

if(localStorage.getItem("dayArray") != null)
{
    loadChallenge()
}

if(localStorage.getItem("goalArray") != null)
{
    goalsText = JSON.parse(localStorage.getItem("goalArray"))
}else{
    localStorage.setItem("goalArray", JSON.stringify(goalsText))
}

function loadChallenge()
{
    document.getElementById("startMenu").style.display = "none"
    document.getElementById("mainMenu").style.display = ""

    loadDays()

    dayArray = JSON.parse(localStorage.getItem("dayArray"))

    for(var i = 0; i < 75; i++)
    {
        var array = dayArray[i]

        var trueBoxes = 0

        for(var index = 0; index < goalsText.length; index++)
        {
            if(array[index].bool == true)
            {
                trueBoxes += 1
            }
        }

        if(trueBoxes == goalsText.length)
        {
            document.getElementsByClassName("dayButtons")[i].style.color = "red"
        }
    }
}

function startChallenge()
{
    document.getElementById("startMenu").style.display = "none"
    document.getElementById("mainMenu").style.display = ""

    loadDays()

    for(var i = 0; i < 75; i++)
    {
        var goalArray = new Array()

        for(var index = 0; index < goalsText.length; index++)
        {
            var newGoal = new goal(goalsText[index])
            goalArray[index] = newGoal
        }

        var newTextarea = new textarea("")
        goalArray[index] = newTextarea

        dayArray.push(goalArray)
    }

    saveArray()
}

if(localStorage.getItem("day") != null)
{
    var oldDay = localStorage.getItem("day")

    if(oldDay == 6)
    {
        if(day != 0 && day != 6)
        {
            createAlert()
        }
    }else if(day > oldDay + 1)
    {
        createAlert()
    }   
}else
{
    localStorage.setItem("day", day)
}

if(localStorage.getItem("images") != null)
{
    images = JSON.parse(localStorage.getItem("images"))
}

function createAlert()
{
    document.getElementById("mainMenu").style.display = "none"
    document.getElementById("alertDiv").style.display = ""

    document.getElementById("alertButton").onclick = function()
    {
        document.getElementById("alertDiv").style.display = "none"
        document.getElementById("mainMenu").style.display = ""
    }

    document.getElementById("failedButton").onclick = function()
    {
        document.getElementById("alertDiv").style.display = "none"
        document.getElementById("failDiv").style.display = ""

        document.getElementById("retryButton").onclick = function()
        {
            reset()
        }
    }
}

function reset()
{
    localStorage.clear()
    location.reload()
}

function loadDays()
{
    for(var i = 0; i < 75; i++)
    {
        var button = document.createElement("button")
        button.className = "dayButtons"
        button.innerHTML = i + 1
        
        document.getElementById("daysMenu").append(button)

        button.onclick = function()
        {
            loadSpecificDay(this.innerHTML)
        }
    }
}

function loadSpecificDay(index)
{
    document.getElementById("mainMenu").style.display = "none"
    document.getElementById("viewDay").style.display = ""

    document.getElementById("dayText").innerHTML = "Day " + index

    //load goals

    var array = dayArray[index-1]
    console.log(array)

    var area = document.getElementById("viewDay")

    var div = document.createElement("div")
    div.id = "viewDayDiv"

    for(var i = 0; i < array.length - 1; i++)
    {
        var row = document.createElement("div")
        row.className = "goalRow"

        var checkButton = document.createElement("button")
        checkButton.innerHTML = "f"
        checkButton.className = "checkButton"
        checkButton.id = i

        var goalText = document.createElement("a")
        goalText.className = "goalText"
        goalText.innerHTML = array[i].text

        var hr = document.createElement("hr")

        row.append(checkButton)
        row.append(goalText)

        if(array[i].text == "Take Progress Picture" && array[i].bool == false)
        {
            cameraIndex = i

            var cameraLabel = document.createElement("label")
            cameraLabel.htmlFor = "cameraInput"
            cameraLabel.innerHTML = "<img src='camera.png' alt='camera'>"
            cameraLabel.className = "cameraLable"

            var cameraInput = document.createElement("input")
            cameraInput.type = "file"
            cameraInput.id = "cameraInput"
            cameraInput.className = "camera"
            cameraInput.capture = "user"
            cameraInput.accept = "image/*" 
            cameraInput.style.display = "none"

            row.append(cameraLabel)
            row.append(cameraInput)

            checkPosition(i, cameraLabel)
        }

        row.append(hr)
        div.append(row)

        if(array[i].bool == true)
        {
            checkButton.style.backgroundColor = "red"
            checkButton.style.border = "1px solid red"
            checkButton.style.color = "white"
            checkButton.style.fontSize = "15px"
            checkButton.innerHTML = "&check;"

            goalText.style.textDecoration = "line-through"
            goalText.style.color = "grey"
        }

        checkButton.onclick = function()
        {
            clickOnGoal(this.id, array, this)
        }

        if(array[i].text == "Take Progress Picture" && array[i].bool == true)
        {
            checkButton.onclick = ""
        }
    }

    var saveButton = document.createElement("button")
    saveButton.innerHTML = "Save Changes"
    saveButton.className = "saveButton"

    saveButton.onclick = function()
    {
        if(document.getElementById("cameraInput") != null)
        {
            camera(document.getElementById("cameraInput"), array, index)
        }

        var trueBoxes = 0

        for(var i = 0; i < document.getElementsByClassName("goalRow").length; i++)
        {
            var element = document.getElementsByClassName("checkButton")[i]

            if(element.innerHTML == "f")
            {
                array[i].bool = false
            }else
            {
                array[i].bool = true
                trueBoxes += 1
            }
        }

        if(trueBoxes == document.getElementsByClassName("goalRow").length)
        {
            document.getElementsByClassName("dayButtons")[index-1].style.color = "red"
        }else
        {
            document.getElementsByClassName("dayButtons")[index-1].style.color = "white"
        }

        if(textarea.value != "")
        {
            array[i].value = textarea.value
        }else
        {
            array[i].value = ""
        }

        console.log(array)
        console.log(index)

        dayArray.splice((index-1), 1, array)
        saveArray()

        document.getElementById("viewDayDiv").remove()
        document.getElementById("mainMenu").style.display = ""
        document.getElementById("viewDay").style.display = "none"
    }

    var textarea = document.createElement("textarea")
    textarea.placeholder = "Take notes here..."
    textarea.maxLength = "120"

    if(array[i].value != "")
    {
        textarea.innerHTML = array[i].value
    }

    div.append(saveButton)
    div.append(textarea)
    area.append(div)
}

function checkPosition(index, element)
{
    if(index == 0)
    {
        element.style.top = "80px"
    }else if(index == 1)
    {
        element.style.top = "142px"
    }else if(index == 2)
    {
        element.style.top = "204px"
    }else if(index == 3)
    {
        element.style.top = "266px" 
    }else if(index == 4)
    {
        element.style.top = "328px"
    }else if(index == 5)
    {
        element.style.top = "390px"
    }else if(index == 6)
    {
        element.style.top = "452px"
    }
}

function clickOnGoal(index, array, checkButton)
{
    var goalBool = array[index].bool

    var goalText = document.getElementsByClassName("goalText")[index]

    if(goalBool == true)
    {
        goalBool = false
        array[index].bool = false

        checkButton.style.backgroundColor = "transparent"
        checkButton.style.color = "transparent"
        checkButton.style.border = "1px solid red"
        checkButton.innerHTML = "f"

        goalText.style.textDecoration = "none"
        goalText.style.color = "white"
    }else
    {
        goalBool = true
        array[index].bool = true

        checkButton.style.backgroundColor = "red"
        checkButton.style.border = "1px solid red"
        checkButton.style.color = "white"
        checkButton.style.fontSize = "15px"
        checkButton.innerHTML = "&check;"

        goalText.style.textDecoration = "line-through"
        goalText.style.color = "grey"
    }
}

function saveArray()
{
    localStorage.setItem("dayArray", JSON.stringify(dayArray))
}

function camera(fileInput, array, day)
{
    var file = fileInput.files[0]
    var imageType = /image.*/

    if(file != undefined)
    {
        if(file.type.match(imageType)) 
        {
            var reader = new FileReader()

            reader.onload = function()
            {
                var img = new Image()
                img.src = reader.result

                var image = new imageSave(day, img.src)
                images.unshift(image)
                
                saveImages()
            }

            reader.readAsDataURL(file)

            var goalText = document.getElementsByClassName("goalText")[cameraIndex]
            var checkButton = document.getElementsByClassName("checkButton")[cameraIndex]

            array[cameraIndex].bool = true

            checkButton.style.backgroundColor = "red"
            checkButton.style.border = "1px solid red"
            checkButton.style.color = "white"
            checkButton.style.fontSize = "15px"
            checkButton.innerHTML = "&check;"

            goalText.style.textDecoration = "line-through"
            goalText.style.color = "grey"

            document.getElementsByClassName("cameraLable")[0].remove()
        }else
        {
            alert("File not supported!")
        }
    }
}

function showImages()
{
    if(images.length != 0)
    {
        if(images.length == 1)
        {
            document.getElementById("imgUp").style.color = "#252525"
            document.getElementById("imgDown").style.color = "#252525"
        }else
        {
            document.getElementById("imgUp").style.color = "white"
            document.getElementById("imgDown").style.color = "#252525"
        }

        document.getElementById("mainMenu").style.display = "none"
        document.getElementById("viewImages").style.display = ""

        var element = images[imgIndex]
        
        document.getElementById("imgPlaceholder").src = element.image

        document.getElementById("imgDayText").innerHTML = "Tag " + images.length
    }else
    {
        showAlert("You haven't taken a picture yet.")
    }
}

function imgUp()
{
    if(imgIndex + 1 != images.length)
    {
        imgIndex += 1
        
        if(imgIndex == images.length - 1)
        {
            document.getElementById("imgUp").style.color = "#252525"
            document.getElementById("imgDown").style.color = "white"
        }else
        {
            document.getElementById("imgUp").style.color = "white"
            document.getElementById("imgDown").style.color = "white"
        }

        var element = images[imgIndex]
        
        document.getElementById("imgPlaceholder").src = element.image

        document.getElementById("imgDayText").innerHTML = "Tag " + element.day
    }
}

function imgDown()
{
    if(imgIndex != 0)
    {
        imgIndex -= 1

        if(imgIndex == 0)
        {
            document.getElementById("imgDown").style.color = "#252525"
            document.getElementById("imgUp").style.color = "white"
        }else
        {
            document.getElementById("imgUp").style.color = "white"
            document.getElementById("imgDown").style.color = "white"
        }

        var element = images[imgIndex]
        
        document.getElementById("imgPlaceholder").src = element.image

        document.getElementById("imgDayText").innerHTML = "Tag " + element.day
    }
    
}

function saveImages()
{
    localStorage.setItem("images", JSON.stringify(images))
}

function backToMenu()
{
    document.getElementById("viewImages").style.display = "none"
    document.getElementById("viewDay").style.display = "none"
    document.getElementById("startMenu").style.display = "none"
    document.getElementById("alertDiv").style.display = "none"
    document.getElementById("modal").style.display = "none"
    document.getElementById("failDiv").style.display = "none"
    document.getElementById("viewGoals").style.display = "none"
    
    document.getElementById("mainMenu").style.display = ""
}

function editGoals()
{
    document.getElementById("startMenu").style.display = "none"
    document.getElementById("viewGoals").style.display = ""

    var goalsDiv = document.createElement("div")
    goalsDiv.id = "goalsDiv"

    for(var i = 0; i < goalsText.length; i++)
    {
        var div = document.createElement("div")
        div.className = "goalDiv"
        div.id = "div" + i

        var deleteButton = document.createElement("button")
        deleteButton.className = "deleteButton"
        deleteButton.innerHTML = "&#x2716;"
        deleteButton.id = i

        var goalText = document.createElement("a")
        goalText.innerHTML = goalsText[i]
        goalText.className = "editGoalText"

        var hr = document.createElement("hr")

        div.append(deleteButton)
        div.append(goalText)
        div.append(hr)

        goalsDiv.append(div)

        deleteButton.onclick = function()
        {
            document.getElementById("div" + this.id).remove()

            createNewGoalButton()
        }
        
        if(goalsText[i] == "Take Progress Picture")      //the goal "take progres picture" shouldn´t be clickable
        {
            deleteButton.onclick = ""
            deleteButton.style.color = "transparent"
            deleteButton.style.cursor = "default"
        }
    }

    document.getElementById("goalsArea").append(goalsDiv)
}

function createNewGoalButton()
{
    createGoalButtonIndex += 1

    if(createGoalButtonIndex == 1)
    {
        var button = document.createElement("button")
        button.innerHTML = "Create New Goal"
        button.id = "createNewGoalButton"
        button.onclick = function()
        {
            if(createGoalButtonIndex > 0)
            {
                var div = document.createElement("div")
                div.className = "goalDiv"

                var checkButton = document.createElement("button")
                checkButton.className = "checkGoalButton"
                checkButton.innerHTML = "&check;"

                var goalTextInput = document.createElement("input")
                goalTextInput.placeholder = "Goal text..."

                var hr = document.createElement("hr")

                div.append(checkButton)
                div.append(goalTextInput)
                div.append(hr)

                document.getElementById("goalsDiv").append(div)

                checkButton.onclick = function()
                {
                    if(goalTextInput.value != "" && goalsText.includes(goalTextInput.value) == false)
                    {
                        hr.remove()

                        var deleteButton = document.createElement("button")
                        deleteButton.className = "deleteButton"
                        deleteButton.innerHTML = "&#x2716;"

                        var goalText = document.createElement("a")
                        goalText.innerHTML = goalTextInput.value
                        goalText.className = "editGoalText"

                        var newhr = document.createElement("hr")

                        div.append(deleteButton)
                        div.append(goalText)
                        div.append(newhr)

                        checkButton.remove()
                        goalTextInput.remove()

                        deleteButton.onclick = function()
                        {
                            div.remove()

                            createNewGoalButton()
                        }

                        goalsText.push(goalTextInput.value)
                    }
                }

                createGoalButtonIndex -= 1
            }

            if(createGoalButtonIndex > 1)
            {
                document.getElementById("createNewGoalButton").innerHTML = "Create New Goal [" + createGoalButtonIndex + "]"
            }else if(createGoalButtonIndex == 0)
            {
                document.getElementById("createNewGoalButton").remove()
            }else
            {
                document.getElementById("createNewGoalButton").innerHTML = "Create New Goal"
            }
        }

        document.getElementById("goalsArea").append(button)
    }else
    {
        document.getElementById("createNewGoalButton").innerHTML = "Create New Goal [" + createGoalButtonIndex + "]"
    }
}

function saveGoals()
{
    if(document.getElementsByClassName("goalDiv").length == 7 && document.getElementsByClassName("deleteButton").length == 7)
    {
        document.getElementById("startMenu").style.display = ""
        document.getElementById("viewGoals").style.display = "none"

        goalsText = []

        for(var i = 0; i < 7; i++)
        {
            goalsText.push(document.getElementsByClassName("editGoalText")[i].innerHTML)
        }

        localStorage.setItem("goalArray", JSON.stringify(goalsText))

        document.getElementById("goalsDiv").remove()
    }else
    {
        showAlert("You have to set 7 goals to continue.")
    }
}

function showAlert(text)
{
    document.getElementById("alertText").innerHTML = text

    var modal = document.getElementById("modal")

    var closeBtn = document.getElementsByClassName("close")[0]

    modal.style.display = "block"

    closeBtn.onclick = function() 
    {
        modal.style.display = "none"
    }

    window.onclick = function(event) 
    {
        if(event.target == modal) 
        {
            modal.style.display = "none";
        }
    } 
}