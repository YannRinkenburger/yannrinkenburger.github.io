var oldBGindex = 0
var oldBGcolor = "white"
var color = "white"
var tagText = ""

var sortMenu = false
var resetBool = false
var tagIsNew = false

var changeTagMenu = false

var changeElement 
var changeID
var changeImportance = false

var toDos = []
var tags = []
var importantArray = []

var editMode = false

class toDo {
    constructor(text, tag, table, important, miliseconds, time, id)
    {
        this.text = text
        this.tag = tag
        this.table = table
        this.important = important
        this.miliseconds = miliseconds
        this.time = time
        this.checked = false
        this.id = id
    }
}

class tag {
    constructor(text, bgColor, color)
    {
        this.text = text
        this.bgColor = bgColor
        this.color = color
    }
}

if(localStorage.getItem("table") != null)
{
    var allToDoTable = localStorage.getItem("table")

    if(allToDoTable == "true"){ allToDoTable = true }
    else{ allToDoTable = false }
}else{
    var allToDoTable = true
    localStorage.setItem("table", allToDoTable)
}

menuNav(allToDoTable)

if(localStorage.getItem("importantArray") != null)
{
    var array = JSON.parse(localStorage.getItem("importantArray"))
    importantArray = array
    loadData(array)
}

const d = new Date()
var day = d.getDay()

if(localStorage.getItem("day") != null && localStorage.getItem("array") != null)
{
    var array = JSON.parse(localStorage.getItem("array"))
    toDos = array

    if(localStorage.getItem("day") != day)
    {
        for(var i = 0; i < toDos.length; i++)
        {
            toDos[i].checked = false
            localStorage.setItem("array", JSON.stringify(toDos))
        }

        localStorage.setItem("day", day)
    }

    loadData(array)
}else
{
    localStorage.setItem("day", day)
}

if(localStorage.getItem("tagArray") != null)
{
    loadTags()
}

function loadData(array)
{
    for(var i = 0; i < array.length; i++)
    {
        var taskText = array[i].text
        var tag = array[i].tag
        var table = array[i].table
        var important = array[i].important
        var miliseconds = array[i].miliseconds
        var time = array[i].time
        var ownID = array[i].id

        var newTableRow = document.createElement("tr")

        var firstCell = document.createElement("td")         //Checkbox 
        var checkbox = document.createElement("button")
        checkbox.id = ownID
        checkbox.className = "checkboxButton hover"
        checkbox.innerText = "X"
        firstCell.append(checkbox)

        var secondCell = document.createElement("td")           //Task name/text
        secondCell.id = ownID + "text"
        
        var text = document.createElement("a")
        text.innerHTML = taskText

        var editButton = document.createElement("img")
        editButton.src = "edit.png"
        editButton.className = "editButton"
        editButton.id = ownID + "edit"

        secondCell.append(text)
        secondCell.append(editButton)

        newTableRow.append(firstCell)
        newTableRow.append(secondCell)

        if(table == "allToDoTable")
        {
            var importantCell = document.createElement("td")

            if(important)
            {
                importantCell.className = "importantselected"
            }else
            {
                importantCell.className = "important"
            }
            
            importantCell.innerHTML = "!"
            importantCell.id = ownID + "importance"

            var dateCell = document.createElement("td")
            dateCell.innerHTML = time
            dateCell.id = miliseconds
            dateCell.className = "dateCell"

            var voidCell2 = document.createElement("td")

            newTableRow.append(dateCell)
            newTableRow.append(voidCell2)
        }else
        {
            var importantCell = document.createElement("td")
            importantCell.innerHTML = "&#10006;"
            importantCell.className = "deleteDailyTask"
            importantCell.id = ownID + "delete"
        }

        var voidCell = document.createElement("td")

        var tagCell = document.createElement("td")            //Tag
            
        newTableRow.className = ownID + "Tag" + " tagRow"

        tagCell.innerHTML = tag.text
        tagCell.style.backgroundColor = tag.bgColor
        tagCell.style.color = tag.color
        tagCell.className = "tag"
        tagCell.id = ownID + "tag"

        newTableRow.append(importantCell)
        newTableRow.append(voidCell)
        newTableRow.append(tagCell)
    
        if(table == "allToDoTable")
        {
            document.getElementById("allToDoTable").append(newTableRow)
        }else
        {
            document.getElementById("dailyToDoTable").append(newTableRow)
        }

        document.getElementById(ownID + "edit").onclick = function()
        {
            var id = this.id.replace("edit", "")

            editFunction(document.getElementById(this.id), id)
        }

        document.getElementById(ownID + "tag").onclick = function()
        {
            var id = this.id.replace("tag", "")

            changeTag(document.getElementById(this.id), id, important)
        }

        if(table == "allToDoTable")
        {
            document.getElementById(ownID).onclick = function()
            {
                var className = this.id

                this.style.border = "1px solid red"
                this.style.color = "red"
                this.innerHTML = "&#10006;"
                setTimeout(function()
                {
                    document.getElementsByClassName(className + "Tag " + "tagRow")[0].remove();
                },300)

                if(importantCell.className == "importantselected")
                {
                    for(var i = 0; i < importantArray.length; i++)
                    {
                        if(importantArray[i].id == className)
                        {
                            var indexInArray = i
                        }
                    }

                    importantArray.splice(indexInArray,1)
                }else
                {
                    var index = getIndex(className)

                    toDos.splice(index,1)
                }

                localStorage.setItem("array", JSON.stringify(toDos))
                localStorage.setItem("importantArray", JSON.stringify(importantArray))
            }

            document.getElementsByClassName(ownID + "Tag")[0].onmouseenter = function()
            {
                if(editMode == false)
                {
                    var id = this.className.replace("Tag tagRow", "")
                    
                    document.getElementById(id + "edit").style.display = ""
                }
            }

            document.getElementsByClassName(ownID + "Tag")[0].onmouseleave = function()
            {
                editHover()
            }

            document.getElementById(ownID + "importance").onclick = function()
            {
                var id = this.id.replace("importance", "")
    
                importanceFunction(document.getElementById(this.id), id)
            }
        }else
        {
            var index = getIndex(ownID)

            if(toDos[index].checked == false)
            {
                document.getElementById(ownID).onclick = function()
                {
                    var index = getIndex(this.id)
                    toDos[index].checked = true
                    localStorage.setItem("array", JSON.stringify(toDos))

                    this.innerHTML = "&#10006;"
                    this.style.border = "2px solid grey"
                    this.style.color = "grey"
                    this.style.fontSize = "12px"

                    var textElement = document.getElementById(this.id + "text")

                    textElement.style.textDecoration = "line-through"
                    textElement.style.color = "grey"
                }
            }else
            {
                checkbox.innerHTML = "&#10006;"
                checkbox.style.border = "2px solid grey"
                checkbox.style.color = "grey"
                checkbox.style.fontSize = "12px"
                secondCell.style.textDecoration = "line-through"
                secondCell.style.color = "grey"
            }

            document.getElementById(ownID + "delete").onclick = function()
            {
                var id = this.id.replace("delete", "")
                var index = getIndex(id)
                toDos.splice(index,1)

                localStorage.setItem("array", JSON.stringify(toDos))

                this.style.backgroundColor = "red"
                this.style.color = "#1b1c1b"

                setTimeout(function()
                {
                    document.getElementsByClassName(id + "Tag")[0].remove()
                },300)
            }
        }
    }

    editHover()
}

function loadTags()
{
    var array = JSON.parse(localStorage.getItem("tagArray"))
    tags = array
    
    for(var i = 0; i < array.length; i++)
    {
        var tagText = array[i].text
        var bgColor = array[i].bgColor
        var color = array[i].color

        var div = document.createElement("div")
        div.className = "givenTag hover"
        div.innerHTML = tagText
        div.style.backgroundColor = bgColor
        div.style.color = color
        div.style.border = "1px solid " + bgColor

        div.onclick = function()
        {
            chooseTag(this.style.backgroundColor, this.style.color, this.innerHTML)
        }

        document.getElementById("flex-container").append(div)

        createSortTag(tagText, bgColor, color)
    }
}

function menuNav(menu)
{
    if(menu == true)              //show all to do´s
    {
        document.getElementById("secondHR").style.display = "none"
        document.getElementById("firstHR").style.display = "inline"

        document.getElementById("allToDoTable").style.display = "table"
        document.getElementById("dailyToDoTable").style.display = "none"

        document.getElementById("sortButton").style.color = "#a8a8a8"

        allToDoTable = true
    }else                           //show daily to do´s
    {
        document.getElementById("secondHR").style.display = "inline"
        document.getElementById("firstHR").style.display = "none"

        document.getElementById("allToDoTable").style.display = "none"
        document.getElementById("dailyToDoTable").style.display = "table"

        document.getElementById("sortButton").style.color = "#1b1c1b"

        allToDoTable = false
    }

    localStorage.setItem("table", allToDoTable)
}

function sort()
{
    if(sortMenu)
    {
        for(var i = 0; i < document.getElementsByClassName("sortTag").length; i++)
        {
            document.getElementsByClassName("sortTag")[i].style.display = ""
        }

        document.getElementById("sortMenu").style.display = "none"

        document.getElementById("sortTags").style.display = "none"
        document.getElementsByClassName("sortMenuDiv")[0].style.display = ""
        document.getElementsByClassName("sortMenuDiv")[1].style.display = ""

        sortMenu = false
    }else if(!sortMenu && allToDoTable){
        document.getElementById("sortMenu").style.display = "inline"

        sortMenu = true
    }
}

function sortChoose(index)
{
    if(index == 0)
    {
        document.getElementById("sortTags").style.display = ""
        document.getElementsByClassName("sortMenuDiv")[0].style.display = "none"
        document.getElementsByClassName("sortMenuDiv")[1].style.display = "none"
    }else if(index == 1)
    {
        sortByTime()
    }
}

function getTag(text)
{
    for(var i = 0; i < document.getElementsByClassName("sortTag").length; i++)
    {
        if(!document.getElementsByClassName("sortTag")[i].innerHTML.includes(text))          //if letter is not in the tagname
        {
            document.getElementsByClassName("sortTag")[i].style.display = "none"
        }else
        {
            document.getElementsByClassName("sortTag")[i].style.display = ""
        }
    }
}

function sortNow(text, bgColor, color)
{
    for(var i = 0; i < document.getElementsByClassName("tagRow").length; i++)
    {
        var doc = document.getElementsByClassName("tagRow")[i]
        doc.style.display = "none"

        if(doc.lastChild.innerHTML == text && doc.lastChild.style.backgroundColor == bgColor && doc.lastChild.style.color == color)
        {
            doc.style.display = ""
        }
    }

    document.getElementById("sortMenu").style.display = "none"
    sortMenu = false
    document.getElementById("sortInput").value = ""

    document.getElementById("resetButton").style.color = "#a8a8a8"
    resetBool = true

    document.getElementById("sortTags").style.display = "none"
    document.getElementsByClassName("sortMenuDiv")[0].style.display = ""
    document.getElementsByClassName("sortMenuDiv")[1].style.display = ""
}

function reset()
{
    location.reload()
}

function newTask()
{
    if(localStorage.getItem("taskIndex") === null)
    {
        var taskIndex = 0
    }else{
        var taskIndex = parseInt(localStorage.getItem("taskIndex"))
    }

    taskIndex += 1
    var ownID = "task#" + taskIndex

    var taskText = document.getElementById("taskTextInput").value

    const d = new Date()
    var miliseconds = d.getTime()
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()

    var date = day + ". " + month + ". " + year

    if(tagIsNew)
    {
        tagText = document.getElementById("chooseTagButton").innerHTML

        createSortTag(tagText, oldBGcolor, color)
        addTagToArray(tagText)
    }else{
        tagText = document.getElementById("chooseTagButton").innerHTML
    }

    if(allToDoTable)
    {
        saveTask(taskText, "allToDoTable", ownID, tagText, date, miliseconds)
    }else if(allToDoTable == false)
    {
        saveTask(taskText, "dailyToDoTable", ownID, tagText)
    }

    localStorage.setItem("taskIndex", taskIndex)

    tagIsNew = false
    document.getElementById("createNewTaskMenu").style.display = "none"
    document.getElementById("chooseTagButton").style.border = "1px solid #a8a8a8"
    document.getElementById("chooseTagButton").style.color = "#a8a8a8"
    document.getElementById("chooseTagButton").style.backgroundColor = "#252525"
    document.getElementById("chooseTagButton").innerHTML = "Choose tag"
    document.getElementById("taskTextInput").value = ""

    openPopUp("miniPopUp", "New task created")

    localStorage.setItem("table", allToDoTable)

    location.reload()
}

function saveTask(taskText, table, id, tagText, date, miliseconds)
{
    const newTag = new tag(tagText, document.getElementById("chooseTagButton").style.backgroundColor, document.getElementById("chooseTagButton").style.color)

    const newTask = new toDo(taskText, newTag, table, false, miliseconds, date, id)
    toDos.push(newTask)

    localStorage.setItem("array", JSON.stringify(toDos))
}

function addTagToArray(tagText)
{
    const newTag = new tag(tagText, document.getElementById("chooseTagButton").style.backgroundColor, document.getElementById("chooseTagButton").style.color) 

    tags.push(newTag)

    //create new tag to choose in menu
    var div = document.createElement("div")
    div.className = "givenTag hover"
    div.innerHTML = tagText
    div.style.backgroundColor = document.getElementById("chooseTagButton").style.backgroundColor
    div.style.color = document.getElementById("chooseTagButton").style.color
    div.style.border = "1px solid " + document.getElementById("chooseTagButton").style.backgroundColor

    div.onclick = function()
    {
        chooseTag(this.style.backgroundColor, this.style.color, this.innerHTML)
    }

    document.getElementById("flex-container").append(div)

    localStorage.setItem("tagArray", JSON.stringify(tags))
}

function createSortTag(text, bgColor, color)
{
    var tag = document.createElement("p")
    tag.className = "sortTag hover"
    tag.innerHTML = text
    tag.style.backgroundColor = bgColor
    tag.style.color = color
    tag.style.border = "1px solid " +  bgColor

    tag.onclick = function()
    {
        sortNow(this.innerHTML, this.style.backgroundColor, this.style.color)
    }

    var tagClone = tag.cloneNode(true)
    tagClone.onclick = function()
    {
        changeTagElementNow(this.innerHTML, this.style.backgroundColor, this.style.color)
    }

    document.getElementById("sortTags").append(tag)
    document.getElementById("changeTags").append(tagClone)
}

function chooseTag(tagBGColor, tagColor, tagText)
{
    var area = document.getElementById("chooseTagButton")
    area.style.backgroundColor = tagBGColor
    area.style.border = "1px solid " + tagBGColor
    area.style.color = tagColor
    area.innerHTML = tagText

    displayFunc("chooseTagMenu", "createNewTaskMenu")
}

function chooseBG(newBGindex, newBGcolor)
{
    document.getElementsByClassName("colorbox")[oldBGindex].style.border = "1px solid " + oldBGcolor
    document.getElementsByClassName("colorbox")[newBGindex].style.border = "4px solid black"

    oldBGindex = newBGindex
    oldBGcolor = newBGcolor
}

function chooseColor(isWhite)
{
    if(isWhite){
        document.getElementsByClassName("colorbox")[11].style.border = "1px solid black"
        document.getElementsByClassName("colorbox")[10].style.border = "4px solid black"
        color = "white"
    }else{
        document.getElementsByClassName("colorbox")[10].style.border = "1px solid white"
        document.getElementsByClassName("colorbox")[11].style.border = "4px solid white"
        color = "black"
    }
}

function addTag()
{
    var tagBGColor = oldBGcolor
    var tagColor = color
    var tagText = document.getElementById("tagTextInput").value

    if(tagText != "")
    {
        var area = document.getElementById("chooseTagButton")
        area.style.backgroundColor = tagBGColor
        area.style.border = "1px solid " + tagBGColor
        area.style.color = tagColor
        area.innerHTML = tagText

        document.getElementById("newTagMenu").style.display = "none"
        document.getElementById("createNewTaskMenu").style.display = ""

        tagIsNew = true

        document.getElementById("tagTextInput").value = ""
    }

    openPopUp("miniPopUp", "New tag created")
}

function importanceFunction(importantCell, id)
{           
    if(importantCell.className == "important")
    {
        var index = getIndex(id)
        toDos[index].important = true
        importantCell.className = "importantselected"

        importantArray.push(toDos[index])
        toDos.splice(index,1)
    }else if(importantCell.className == "importantselected")
    {
        importantCell.className = "important"
        
        for(var i = 0; i < importantArray.length; i++)
        {
            if(importantArray[i].id == id)
            {
                var indexInArray = i
            }
        }

        importantArray[indexInArray].important = false

        toDos.push(importantArray[indexInArray])
        importantArray.splice(indexInArray,1)
    }

    localStorage.setItem("array", JSON.stringify(toDos))
    localStorage.setItem("importantArray", JSON.stringify(importantArray))
    location.reload()
}

function editFunction(element, id)
{
    editMode = true 

    element.remove()

    var area = document.getElementById(id + "text")
    var oldText = area.getElementsByTagName("a")[0].innerHTML
    area.innerHTML = ""

    var input = document.createElement("input")
    input.className = "editInput"
    input.type = "text"
    input.maxLength = "40"
    input.size = "35"
    input.value = oldText

    var button = document.createElement("button")
    button.className = "sendButton"
    button.innerHTML = "&#9745;"

    area.append(input)
    area.append(button)

    button.onclick = function()
    {
        var index = getIndex(id)
        
        if(index == undefined)
        {
            for(var i = 0; i < importantArray.length; i++)
            {
                if(importantArray[i].id == id)
                {
                    var indexInArray = i
                }
            }

            importantArray[indexInArray].text = input.value
            
            localStorage.setItem("importantArray", JSON.stringify(importantArray))
        }else
        {
            toDos[index].text = input.value

            localStorage.setItem("array", JSON.stringify(toDos))
        }

        area.innerHTML = ""

        var text = document.createElement("a")
        text.innerHTML = input.value

        var editButton = document.createElement("img")
        editButton.src = "edit.png"
        editButton.className = "editButton"
        editButton.id = id + "edit"

        area.append(text)
        area.append(editButton)
        
        editMode = false

        editButton.onclick = function()
        {
            var id = this.id.replace("edit", "")

            editFunction(document.getElementById(this.id), id)
        }
    }
}

function changeTag(element, id, important)
{
    if(changeTagMenu == false)
    {
        changeTagMenu = true

        var top = element.getBoundingClientRect().top

        document.getElementById("changeMenu").style.top = top + 40 + "px"
        document.getElementById("changeMenu").style.display = ""

        changeElement = element
        changeID = id
        
        if(important == true)
        {
            changeImportance = true
        }else
        {
            changeImportance = false
        }
    }else
    {
        document.getElementById("changeMenu").style.display = "none"

        changeTagMenu = false
    }
}

function changeTagElementNow(newText, newBackgroundColor, newColor)
{
    changeElement.innerHTML = newText
    changeElement.style.backgroundColor = newBackgroundColor
    changeElement.style.color = newColor

    if(changeImportance == true)
    {
        for(var i = 0; i < importantArray.length; i++)
        {
            if(importantArray[i].id == changeID)
            {
                var indexInArray = i
            }
        }

        importantArray[indexInArray].tag.text = newText
        importantArray[indexInArray].tag.bgColor = newBackgroundColor
        importantArray[indexInArray].tag.color = newColor
            
        localStorage.setItem("importantArray", JSON.stringify(importantArray))
    }else
    {
        var index = getIndex(changeID)

        toDos[index].tag.text = newText
        toDos[index].tag.bgColor = newBackgroundColor
        toDos[index].tag.color = newColor

        localStorage.setItem("array", JSON.stringify(toDos))
    }

    document.getElementById("changeMenu").style.display = "none"

    changeTagMenu = false
}

function closeChangeMenu()
{
    document.getElementById("changeMenu").style.display = "none"
    changeTagMenu = false
}

function editHover()
{
    for(var i = 0; i < document.getElementsByClassName("editButton").length; i++)
    {
        document.getElementsByClassName("editButton")[i].style.display = "none" 
    }
}

function getIndex(id)
{
    for(var i = 0; i < toDos.length; i++)
    {
        if(toDos[i].id == id)
        {
            return i
        }
    }
}

function openNewTaskMenu()
{
    if(document.getElementById("createNewTaskMenu").style.display == "none" && document.getElementById("chooseTagMenu").style.display == "none" && document.getElementById("newTagMenu").style.display == "none")
    {
        document.getElementById("createNewTaskMenu").style.display = ""
        document.getElementById("taskTextInput").focus()

        document.getElementById("changeMenu").style.display = "none"

        changeTagMenu = false
    }else{
        document.getElementById("createNewTaskMenu").style.display = "none"
        document.getElementById("chooseTagMenu").style.display = "none"
        document.getElementById("newTagMenu").style.display = "none"
    }
}

function displayFunc(oldDiv, newDiv)
{
    document.getElementById(oldDiv).style.display = "none"
    document.getElementById(newDiv).style.display = ""
}

function openPopUp(element, text)
{
    document.getElementById(element).style.display = ""
    document.getElementById(element + "Text").innerHTML = text
    document.getElementById(element).style.animation = "fadeIn 2s"
    
    setTimeout(function()
    {
        document.getElementById(element).style.animation = "fadeOut 2s"

        setTimeout(function()
        {
            document.getElementById(element).style.display = "none"
        },2000)    
    },3000)
}

function sortByTime()
{
    var bothArrays = toDos.concat(importantArray)
    
    bothArrays.sort(function(a, b) { return b.miliseconds - a.miliseconds; })

    var length = document.getElementsByClassName("tagRow").length - 1

    for(var i = length; i >= 0; i--)
    {
        document.getElementsByClassName("tagRow")[i].remove()
    }

    loadData(bothArrays)

    document.getElementById("resetButton").style.color = "#a8a8a8"
    resetBool = true

    document.getElementById("sortMenu").style.display = "none"
    sortMenu = false
}