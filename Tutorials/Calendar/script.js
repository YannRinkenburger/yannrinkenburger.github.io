var monthLongs = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var month = new Date().getMonth()
var year = new Date().getFullYear()

loadMonth()

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
        dayText.style.fontSize = "20px"

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