var goalsText = ["First Workout", "Second Workout", "Take Progress Picture", "10 Pages of Reading", "Drink 1 Gallon of Water", "Follow a Diet", "No Cheat Meals or Alcohol"]

var dayArray = []

var images = []

const d = new Date();
var day = d.getDay()

class goal{
    constructor(text)
    {
        this.text = text
        this.bool = false
    }
}

class imageSave{
    constructor(day, image)
    {
        this.day = day
        this.image = image
    }
}

loadDays()

if(localStorage.getItem("day") != null)
{
    var oldDay = localStorage.getItem("day")

    if(oldDay == 6 )
    {
        if(oldDay - 6 != day)
        {
            //create alert
            createAlert()
        }
    }else if(oldDay > day + 1)
    {
        //create alert
        createAlert()
    }
}else
{
    localStorage.setItem("day", day)
}

function createAlert()
{
    document.getElementById("mainMenu").style.display = "none"
    document.getElementById("alertDiv").style.display = ""

    document.getElementById("alertButton").onclick = function()
    {

    }

    document.getElementById("failedButton").onclick = function()
    {
        document.getElementById("alertDiv").style.display = "none"
        document.getElementById("failDiv").style.display = ""

        document.getElementById("retryButton").onclick = reset()
    }
}

function reset()
{
    //reset the challenge
}

if(localStorage.getItem("dayArray") != null)
{
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
}else
{
    for(var i = 0; i < 75; i++)
    {
        var goalArray = new Array()

        for(var index = 0; index < goalsText.length; index++)
        {
            var newGoal = new goal(goalsText[index])
            goalArray[index] = newGoal
        }

        dayArray.push(goalArray)
    }

    saveArray()
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

    for(var i = 0; i < array.length; i++)
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

        if(i == 2 && array[2].bool == false)
        {
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
    }

    var saveButton = document.createElement("button")
    saveButton.innerHTML = "Save Changes"
    saveButton.className = "saveButton"

    saveButton.onclick = function()
    {
        if(document.getElementById("cameraInput") != null)
        {
            camera(document.getElementById("cameraInput"), array)
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

        console.log(array)
        console.log(index)

        dayArray.splice((index-1), 1, array)
        saveArray()

        document.getElementById("viewDayDiv").remove()
        document.getElementById("mainMenu").style.display = ""
        document.getElementById("viewDay").style.display = "none"
    }

    div.append(saveButton)
    area.append(div)
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
        checkButton.style.border = "1px solid white"
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
    var fileDisplayArea = document.getElementById("fileDisplayArea")
                
    var file = fileInput.files[0]
    var imageType = /image.*/

    if(file != undefined)
    {
        if(file.type.match(imageType)) 
        {
            var reader = new FileReader()

            reader.onload = function()
            {
                fileDisplayArea.innerHTML = ""

                var img = new Image()
                img.src = reader.result

                var image = new imageSave(day, img.src)
                images.push(image)

                fileDisplayArea.appendChild(img)
            }

            reader.readAsDataURL(file)

            var goalText = document.getElementsByClassName("goalText")[2]
            var checkButton = document.getElementsByClassName("checkButton")[2]

            array[2].bool = true

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
    document.getElementById("mainMenu").style.display = "none"
    document.getElementById("viewImages").style.display = ""

    for(var i = 0; i < images.length; i++)
    {
        var element = images[i]

        var div = document.createElement("div")
        div.className = "imageDiv"
        
        var image = document.createElement("img")
        image.src = element.image

        div.append(image)

        document.getElementById("viewImages").append(div)
    }
}