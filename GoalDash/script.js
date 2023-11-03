class User {
    constructor(name, password) {
        this.name = name
        this.password = password
        this.date = new Date()
    }
}

class Goal {
    constructor(name, milestones) {
        this.name = name
        this.milestones = milestones
        this.year = new Date().getFullYear()
    }
}

class Milestone {
    constructor(name, projects, deadline, status) {
        this.name = name
        this.projects = projects
        this.deadline = deadline
        this.status = status
    }
}

class Project {
    constructor(name, deadline, status) {
        this.name = name
        this.deadline = deadline
        this.status = status
    }
}

var milestoneCounter1 = 3
var milestoneCounter2 = 3
var milestoneCounter3 = 3

var user = 
console.log(user)

function start()
{
    var name = document.getElementById("nameInput").value 
    var password = document.getElementById("passwordInput1").value

    var user = new User(name, password)

    localStorage.setItem("user", JSON.stringify(user))

    window.location = "creation.html"
}

function openLink(p_url)
{
    window.open(p_url, '_blank').focus();
}

function createMilestone(p_area, p_number)
{
    var div = document.createElement("div")
    div.className = "milestone"

    var number = document.createElement("div")
    number.className = "milestoneNumber"

    if(p_number === 1){
        milestoneCounter1 += 1
        number.innerHTML = milestoneCounter1 + "."
    }else if(p_number === 2){
        milestoneCounter2 += 1
        number.innerHTML = milestoneCounter2 + "."
    }else if(p_number === 3){
        milestoneCounter3 += 1
        number.innerHTML = milestoneCounter3 + "."
    }

    var text = document.createElement("div")
    text.className = "milestoneText"

    var textInput = document.createElement("input")
    textInput.className = "goal" + p_number + "text"
    textInput.type = "text"
    textInput.placeholder = "..."
    textInput.maxlength = "40"
    text.append(textInput)

    var deadline = document.createElement("div")
    deadline.className = "milestoneDeadline"

    var deadlineInput = document.createElement("input")
    deadlineInput.className = "goal" + p_number + "date"
    deadlineInput.type = "date"
    deadline.append(deadlineInput)

    var status = document.createElement("div")
    status.className = "milestoneStatus"

    var statusBox = document.createElement("div")
    statusBox.innerHTML = "0"
    statusBox.className = "statusBox noselect"
    statusBox.onclick = function()
    {
        changeStatus(this)
    }
    status.append(statusBox)

    div.append(number)
    div.append(text)
    div.append(deadline)
    div.append(status)

    p_area.append(div)

    textInput.focus()
}

function changeStatus(p_element)
{
    var color = p_element.style.background

    if(color === "gray")
    {
        p_element.style.background = "blue"
    }else if(color === "blue")
    {
        p_element.style.background = "#21c42b"
    }else if(color === "rgb(33, 196, 43)")
    {
        p_element.style.background = "#fdaf44"
    }else if(color === "rgb(253, 175, 68)")
    {
        p_element.style.background = "#de4a62"
    }else if(color === "rgb(222, 74, 98)")
    {
        p_element.style.background = "gray"
    }
}

function finishGoalCreation(p_number)
{
    if(p_number === 1)
    {
        document.getElementsByClassName("goalDiv")[0].style.display = "none"
        document.getElementsByClassName("goalDiv")[1].style.display = ""
    }else if(p_number === 2)
    {
        document.getElementsByClassName("goalDiv")[1].style.display = "none"
        document.getElementsByClassName("goalDiv")[2].style.display = ""
    }
}