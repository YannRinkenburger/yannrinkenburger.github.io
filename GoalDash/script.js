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

var user = "Yann"

var hour = new Date().getHours()

var monthLongs = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var month = new Date().getMonth()
var year = new Date().getFullYear()

loadMonth()

function startDashboard()
{
    if(hour <= 10)
    {
        document.getElementById("timeText").innerHTML = "Guten Morgen, " + user + "!"
    }else if(hour > 17)
    {
        document.getElementById("timeText").innerHTML = "Guten Abend, " + user + "!"
    }else
    {
        document.getElementById("timeText").innerHTML = "Guten Mittag, " + user + "!"
    }

    startTime()
}

function startTime() 
{
    const today = new Date()
    let h = today.getHours()
    let m = today.getMinutes()
    m = checkTime(m)
    document.getElementById("time").innerHTML =  h + ":" + m
    setTimeout(startTime, 1000)
}
  
function checkTime(i) 
{
    if (i < 10){
        i = "0" + i
    }
    return i
}

function start()
{
    var name = document.getElementById("nameInput").value 
    var password = document.getElementById("passwordInput1").value

    var user = new User(name, password)

    localStorage.setItem("user", JSON.stringify(user))

    window.location = "dashboard.html"
}

function loadMonth()
{
    var today = new Date().getDate()
    var todayMonth = new Date().getMonth()
    var todayYear = new Date().getFullYear()

    var daysInMonth = new Date(year, month + 1, 0).getDate()

    var firstDayOfMonth = new Date(year, month, 1)
    var firstDayOfWeek = firstDayOfMonth.getDay()

    document.getElementById("calendarArea").remove()

    var area = document.createElement("div")
    area.id = "calendarArea"
    area.className = "flex-container"
    area.style.width = "100%"

    document.getElementById("calendarContent").append(area)

    document.getElementById("monthText").innerHTML = monthLongs[month]
    document.getElementById("yearText").innerHTML = year

    if(firstDayOfWeek === 0){
        firstDayOfWeek = 7
    }

    for(var i = 1; i < firstDayOfWeek; i++)
    {
        var dayDiv = document.createElement("div")
        dayDiv.className = "dayDiv"
        area.append(dayDiv)
    }

    for(var i = 0; i < daysInMonth; i++)
    {
        var dayDiv = document.createElement("div")
        dayDiv.id = i + 1
        dayDiv.className = "realDayDiv"

        var dayText = document.createElement("p")
        dayText.innerHTML = (i + 1)
        dayText.style.fontSize = "15px"

        if(i + 1 === today && month === todayMonth && year === todayYear)
        {
            dayText.id = "today"
        }

        dayDiv.append(dayText)
        area.append(dayDiv)
    }
}

function monthUp()
{
    if(month === 11)
    {
        year++
        month = 0
    }else{
        month++
    }

    loadMonth()
}

function monthDown()
{
    if(month === 0)
    {
        year--
        month = 11
    }else{
        month--
    }

    loadMonth()
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

function changeRedButton(p_element)
{
    if(p_element.style.background === "red")
    {
        p_element.style.background = "gray"

        stopTimer()
    }else{
        p_element.style.background = "red"

        startTimer()
    }
}

var hoursLabel = document.getElementById("hours")
var minutesLabel = document.getElementById("minutes")
var secondsLabel = document.getElementById("seconds")
var totalSeconds = 0
var interval

function startTimer()
{
    document.getElementById("timerDiv").style.display = ""

    totalSeconds = 0

    interval = setInterval(setTime, 1000)

    function setTime()
    {
        ++totalSeconds
        secondsLabel.innerHTML = pad(totalSeconds%60)
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60))
        hoursLabel.innerHTML = pad(parseInt(totalSeconds/3600))
    }

    function pad(val)
    {
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
}

function stopTimer()
{
    hoursLabel.innerHTML = "00"
    minutesLabel.innerHTML = "00"
    secondsLabel.innerHTML = "00"

    clearInterval(interval)

    document.getElementById("timerDiv").style.display = "none"
}