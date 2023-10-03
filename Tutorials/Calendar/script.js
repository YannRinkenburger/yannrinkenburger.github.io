var monthLongs = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

loadMonth()

var month =  new Date().getMonth()
var year =  new Date().getFullYear()

function loadMonth()
{
    var today = new Date().getDate()
    var todayMonth = new Date().getMonth()
    var todayYear = new Date().getFullYear()

    var daysInMonth = new Date(todayYear, todayMonth + 1, 0).getDate()

    var firstDayOfMonth = new Date(todayYear, todayMonth, 1)
    var firstDayOfWeek = firstDayOfMonth.getDay()

    document.getElementById("calendarArea").remove()

    var area = document.createElement("div")
    area.id = "calendarArea"
    area.className = "flex-container"
    area.style.width = "100%"

    document.getElementById("calendar").append(area)

    document.getElementById("monthText").innerHTML = monthLongs[todayMonth]
    document.getElementById("yearText").innerHTML = todayYear

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
        dayText.style.fontSize = "20px"

        if(i + 1 === today && month === todayMonth && year === todayYear)
        {
            dayText.style.color = "green"
            dayText.style.fontWeight = "bold"
        }

        var infoPoint = document.createElement("p")
        infoPoint.innerHTML = "&#x2027;"
        infoPoint.className = "infoPoint"

        dayDiv.append(dayText)
        dayDiv.append(infoPoint)
        area.append(dayDiv)
    }

    for(var i = 0; i < events.length; i++)
    {
        var date = events[i].date
        var day = date.slice(7)

        document.getElementsByClassName("infoPoint")[day - 1].style.color = "#3eb1be"

        document.getElementsByClassName("realDayDiv")[day - 1].onclick = function()
        {
            showEventsByDay(this.id, events)
            this.style.background = "#3eb1be"
        }
    }
}