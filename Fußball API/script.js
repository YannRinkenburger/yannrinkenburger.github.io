const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]

if(window.innerWidth < 600)
{
    document.getElementById("removeTableTh1").remove()
    document.getElementById("removeTableTh2").remove()
    document.getElementById("removeTableTh3").remove()
}

const shortNames = [
    //1. Bundesliga

    {id: 40, shortName: "FCB"},
    {id: 7, shortName: "BVB"},
    {id: 80, shortName: "FCU"},
    {id: 1635, shortName: "RBL"},
    {id: 112, shortName: "SCF"},
    {id: 6, shortName: "B04"},
    {id: 91, shortName: "SGE"},
    {id: 81, shortName: "M05"},
    {id: 131, shortName: "VFL"},
    {id: 87, shortName: "BMG"},
    {id: 65, shortName: "KOE"},
    {id: 134, shortName: "SVW"},
    {id: 95, shortName: "FCA"},
    {id: 175, shortName: "TSG"},
    {id: 129, shortName: "BOC"},
    {id: 16, shortName: "VFB"},
    {id: 9, shortName: "S04"},
    {id: 199, shortName: "HDH"},
    {id: 118, shortName: "SVD"},

    //2. Bundesliga

    {id: 9, shortName: "S04"},
    {id: 54, shortName: "BSC"},
    {id: 100, shortName: "HSV"},
    {id: 185, shortName: "F95"},
    {id: 98, shortName: "STP"},
    {id: 31, shortName: "SCP"},
    {id: 76, shortName: "FCK"},
    {id: 104, shortName: "KIE"},
    {id: 105, shortName: "KSC"},
    {id: 115, shortName: "SGF"},
    {id: 55, shortName: "H96"},
    {id: 74, shortName: "EBS"},
    {id: 78, shortName: "FCM"},
    {id: 79, shortName: "FCN"},
    {id: 36, shortName: "OSN"},
    {id: 174, shortName: "WIE"},
    {id: 102, shortName: "FCH"},
    {id: 198, shortName: "ELV"}
]

var dataArray
var leagueTableArray
var allMatchesArray
var lastMatchDayArray
var teamsArray
var goalGetterArray

var lastMatchDay

var opendMatchIndex 

var matchCounter = 0

var league = "bl1"

var loading = true

var year = new Date().getFullYear()

if(localStorage.getItem("activeLeague") !== null)
{
    league = localStorage.getItem("activeLeague") 

    var image = document.getElementById("logo")

    if(league === "bl1")
    {
        image.src = "bundesliga_logo.png"
        image.alt = "Logo der Bundesliga"

        league = "bl1"
    }else
    {
        image.src = "bundesliga2_logo.png"
        image.alt = "Logo der 2. Bundesliga"

        league = "bl2"
    }
}

fetchLastMatchDay()

function fetchLastMatchDay()
{
    var url = "https://api.openligadb.de/getcurrentgroup/" + league

    fetch(url)
        .then(response => response.json())
        .then(data => {lastMatchDayArray = data;})

    document.getElementById("loader").style.display = ""

    setTimeout(setLastMatchDay, 1000)
}

function setLastMatchDay()
{
    if(lastMatchDayArray === undefined)
    {
        fetchLastMatchDay()
    }else
    {
        lastMatchDay = lastMatchDayArray.groupOrderID

        document.getElementById("matchDayText").innerHTML = lastMatchDay + ". Spieltag"

        fetchMatchDay(lastMatchDay, year)
    }
}

function fetchTeams(season)
{
    var url = "https://api.openligadb.de/getavailableteams/" + league + "/" + season 

    fetch(url)
        .then(response => response.json())
        .then(data => {teamsArray = data;})

    document.getElementById("loader").style.display = ""

    setTimeout(showAllTeams, 1000)
}

function fetchGoalGetters(season)
{
    var url = "https://api.openligadb.de/getgoalgetters/" + league + "/" + season 

    fetch(url)
        .then(response => response.json())
        .then(data => {goalGetterArray = data;})

    document.getElementById("loader").style.display = ""

    setTimeout(showGoalGetters, 1000)
}

function fetchMatchDay(matchDay, season)
{
    var url = "https://api.openligadb.de/getmatchdata/" + league + "/" + season + "/" + matchDay

    fetch(url)
        .then(response => response.json())
        .then(data => {dataArray = data;})

    document.getElementById("loader").style.display = ""

    setTimeout(openMatchday, 1000)
}

function fetchLeagueTable(season)
{
    var url = "https://api.openligadb.de/getbltable/" + league + "/" + season

    fetch(url)
        .then(response => response.json())
        .then(data => {leagueTableArray = data;})

    document.getElementById("loader").style.display = ""

    setTimeout(openLeagueTable, 1000)
}

function fetchAllMatchesOfTeam(teamName, season)
{
    var url = "https://api.openligadb.de/getmatchdata/bl1/" + season + "/" + teamName
    
    fetch(url)
        .then(response => response.json())
        .then(data => {allMatchesArray = data;})

    document.getElementById("loader").style.display = ""

    setTimeout(viewAllMatchesOfTeam, 1000)
}

function viewAllMatchesOfTeam()
{
    console.log(allMatchesArray)
    document.getElementById("loader").style.display = "none"

    var div = document.getElementById("allMatchesView")

    if(document.getElementById("allMatchesTable") !== null)
    {
        document.getElementById("allMatchesTable").remove()
    }

    var table = document.createElement("div")
    table.id = "allMatchesTable"
    table.className = "flex-container"

    matchCounter = 0

    for(var i = 0; i < 34; i++)
    {
        var matchDayText = allMatchesArray[i].group.groupName

        const d = new Date(allMatchesArray[i].matchDateTime)
        var day = d.getDay()
        var dayOfMonth = d.getDate()
        var month = monthNames[d.getMonth()]
        var year = d.getFullYear()

        var date = dayNames[day] + " " + dayOfMonth + ". " + month + " " + year

        var matchDiv = createGameDataForAllMatchesView(allMatchesArray, i, matchDayText, date)

        table.append(matchDiv)
        div.append(table)
    }

    document.getElementById("allMatchesView").style.display = ""

    loading = false
}

function createGameDataForAllMatchesView(array, index, matchDay, date)
{
    var gameDiv = document.createElement("div")
    gameDiv.className = "gameDiv"

    var matchDayText = document.createElement("h4")
    matchDayText.innerHTML = matchDay

    var dateText = document.createElement("p")
    dateText.innerHTML = date

    gameDiv.append(matchDayText)
    gameDiv.append(dateText)

    var game = array[index]

    var homeTeamLogo = game.team1.teamIconUrl 
    var awayTeamLogo = game.team2.teamIconUrl 
    
    var homeTeamName = game.team1.teamName
    var awayTeamName = game.team2.teamName

    var matchIsFinished = game.matchIsFinished

    if(matchIsFinished)
    {
        var goalsHomeTeam = game.matchResults[1].pointsTeam1
        var goalsAwayTeam = game.matchResults[1].pointsTeam2
    }

    const gameTime = new Date(game.matchDateTime)
    var minutes = gameTime.getMinutes()
    var hours = gameTime.getHours()

    var time = hours + ":" + minutes

    var gameTable = document.createElement("table")

    var tableHead = document.createElement("tr")
    var tableHead1 = document.createElement("th")
    tableHead1.style.width = "2%"
    var tableHead2 = document.createElement("th")
    tableHead2.style.width = "20%"
    var tableHead3 = document.createElement("th")
    tableHead3.style.width = "2%"

    tableHead.append(tableHead1)
    tableHead.append(tableHead2)
    tableHead.append(tableHead3)

    gameTable.append(tableHead)

    var homeTeamRow = createTeamRow(homeTeamLogo, homeTeamName, goalsHomeTeam, matchIsFinished, true, time)
    var awayTeamRow = createTeamRow(awayTeamLogo, awayTeamName, goalsAwayTeam, matchIsFinished, false, time)

    gameTable.append(homeTeamRow)
    gameTable.append(awayTeamRow)

    gameDiv.append(gameTable)

    return gameDiv
}

function createGameDayInfo(text, date)
{
    var gameInfoDiv = document.createElement("div")

    var gameName = document.createElement("h3")
    gameName.innerHTML = text

    var dateText = document.createElement("p")
    dateText.innerHTML = date
    dateText.style.margin = "-10px"

    gameInfoDiv.append(gameName)
    gameInfoDiv.append(dateText)

    return gameInfoDiv
}

function openMatchday()
{
    document.getElementById("matchDayView").style.display = ""
    document.getElementById("loader").style.display = "none"
    console.log(dataArray)

    var oldDay 

    var element = document.getElementById("matchDayView")

    var div = document.createElement("div")
    div.id = "matchDayDiv"

    var dayCounter = 1

    for(var i = 0; i < 9; i++) 
    {
        var table = document.createElement("div")    
        table.className = "matchDayTables"

        const d = new Date(dataArray[i].matchDateTime)
        var day = d.getDay()
        var dayOfMonth = d.getDate()
        var month = monthNames[d.getMonth()]
        var year = d.getFullYear()

        //create the ui element, which shows on which day the game takes place

        if(i == 0)
        {
            oldDay = dayOfMonth
            createDayUI(day, dayOfMonth, month, year, table)

            div.append(table)

            var flexContainer = document.createElement("div")
            flexContainer.className = "flex-container"
            flexContainer.id = "matchDayUI" + dayCounter
        }else if(oldDay != dayOfMonth)
        {
            dayCounter += 1

            oldDay = dayOfMonth
            createDayUI(day, dayOfMonth, month, year, table)

            div.append(table)

            var flexContainer = document.createElement("div")
            flexContainer.className = "flex-container"
            flexContainer.id = "matchDayUI" + dayCounter
        }

        createGameData(div, dataArray, flexContainer, i)
    }

    element.append(div)

    loading = false
}

function createGameData(element, array, table, i)
{
    //get all the data we need to display the game with all it´s informations

    var matchID = array[i].matchID
    
    var homeTeamLogo = array[i].team1.teamIconUrl 
    var awayTeamLogo = array[i].team2.teamIconUrl 
    
    var homeTeamName = array[i].team1.teamName
    var awayTeamName = array[i].team2.teamName

    var matchIsFinished = array[i].matchIsFinished

    const gameTime = new Date(array[i].matchDateTime)
    var minutes = gameTime.getMinutes()
    var hours = gameTime.getHours()

    var time = hours + ":" + minutes

    if(matchIsFinished)
    {
        var goalsHomeTeam = array[i].matchResults[1].pointsTeam1
        var goalsAwayTeam = array[i].matchResults[1].pointsTeam2

        matchCounter += 1
    }

    //create the game row with the information we collected

    var gameTable = document.getElementById("cloneTableMatchDay").cloneNode(true)
    gameTable.id = i
    gameTable.className = "gameTable"

    if(matchIsFinished)
    {
        gameTable.onclick = function()
        {
            var index = this.id

            if(document.getElementsByClassName("viewMatchDiv")[0] !== undefined)
            {
                document.getElementsByClassName("viewMatchDiv")[0].remove()
            }

            if(opendMatchIndex !== index)
            {
                var matchArray = array[this.id]
                var goalArray = matchArray.goals

                var logoTeam1 = matchArray.team1.teamIconUrl 
                var logoTeam2 = matchArray.team2.teamIconUrl 

                var goalsHomeTeam = matchArray.matchResults[1].pointsTeam1
                var goalsAwayTeam = matchArray.matchResults[1].pointsTeam2

                viewMatchData(goalArray, table.id, logoTeam1, logoTeam2, index, goalsHomeTeam, goalsAwayTeam)
            }else
            {
                opendMatchIndex = null
            }
        }
    }

    var homeTeamRow = createTeamRow(homeTeamLogo, homeTeamName, goalsHomeTeam, matchIsFinished, true, time)
    var awayTeamRow = createTeamRow(awayTeamLogo, awayTeamName, goalsAwayTeam, matchIsFinished, false, time)

    gameTable.append(homeTeamRow)
    gameTable.append(awayTeamRow)
    table.append(gameTable)

    element.append(table)
}

function createDayUI(day, dayOfMonth, month, year, table)
{
    var dayUIDiv = document.createElement("div")

    var header = document.createElement("h3")
    header.innerHTML = dayNames[day]

    var exactDay = document.createElement("p")
    exactDay.innerHTML = dayOfMonth + ". " + month + " " + year 
    exactDay.style.marginTop = "-10px"
    exactDay.style.fontSize = "15px"

    var br = document.createElement("br")

    dayUIDiv.append(header)
    dayUIDiv.append(exactDay)

    table.append(dayUIDiv)
}

function createTeamRow(logo, name, goals, matchIsFinished, teamIsHome, time)
{
    var row = document.createElement("tr")

    var teamImageContainer = document.createElement("td")

    var teamImage = document.createElement("img")
    teamImage.src = logo
    teamImage.style.width = "30px"

    teamImageContainer.append(teamImage)

    var teamText = document.createElement("td")
    teamText.innerHTML = name

    var teamGoalsText = document.createElement("td")

    if(matchIsFinished)
    {
        teamGoalsText.innerHTML = goals
    }else if(matchIsFinished === false && teamIsHome === false)
    {
       teamGoalsText.innerHTML = time
    }

    row.append(teamImage)
    row.append(teamText)
    row.append(teamGoalsText)

    return row
}

function viewMatchData(goalArray, id, logoTeam1, logoTeam2, index, goalsHomeTeam, goalsAwayTeam)
{
    //view all goals of a match

    opendMatchIndex = index

    goalArray.sort(function(a, b) { return a.matchMinute - b.matchMinute; })

    var viewMatchDiv = document.createElement("div")
    viewMatchDiv.className = "viewMatchDiv"

    var close = document.createElement("p")
    close.innerHTML = "&#10006;"
    close.className = "close"

    viewMatchDiv.append(close)

    var table = document.createElement("table")
    table.id = "viewMatchTable"

    var header1 = document.createElement("th")
    var imgLogoTeam1 = document.createElement("img")
    imgLogoTeam1.src = logoTeam1
    imgLogoTeam1.style.width = "80px"
    header1.append(imgLogoTeam1)

    var score = document.createElement("th")
    score.innerHTML = goalsHomeTeam + "   :   " + goalsAwayTeam
    score.style.fontSize = "40px"

    var header2 = document.createElement("th")
    var imgLogoTeam2 = document.createElement("img")
    imgLogoTeam2.src = logoTeam2
    imgLogoTeam2.style.width = "80px"
    header2.append(imgLogoTeam2)

    table.append(header1)
    table.append(score)
    table.append(header2)

    var flexBox = document.createElement("div")
    flexBox.className = "flex-container center"
    
    if(window.innerWidth > 600)
    {
        var goalTableTeam1 = document.createElement("div")
        goalTableTeam1.style.width = "35%"
        goalTableTeam1.style.textAlign = "left"

        var goalTableTeam2 = document.createElement("div")
        goalTableTeam2.style.width = "35%"
        goalTableTeam2.style.textAlign = "right"
    }else{
        var goalTableTeam1 = document.createElement("div")
        goalTableTeam1.style.width = "45%"
        goalTableTeam1.style.textAlign = "left"
        goalTableTeam1.style.marginLeft = "-20px"

        var goalTableTeam2 = document.createElement("div")
        goalTableTeam2.style.width = "45%"
        goalTableTeam2.style.textAlign = "right"
        goalTableTeam2.style.marginRight = "-20px"
    }
    
    var lastScoreTeam1 = 0
    var lastScoreTeam2 = 0

    for(var i = 0; i < goalArray.length; i++)
    {
        var goal = goalArray[i]
        var goalMinute = goal.matchMinute

        if(goalMinute != null)
        {
            var goalRow = document.createElement("div")

            var voidGoalRow = document.createElement("div")
            voidGoalRow.className = "voidRow"
            voidGoalRow.innerHTML = "-"
            voidGoalRow.style.color = "transparent"

            var goalGetter = goal.goalGetterName
            var isOwnGoal = goal.isOwnGoal
            var isOvertime = goal.isOvertime
            var isPenalty = goal.isPenalty

            var scoreTeam1 = goal.scoreTeam1
            var scoreTeam2 = goal.scoreTeam2

            var goalMinuteText = document.createElement("a")

            var goalGetterText = document.createElement("a")
            goalGetterText.innerHTML = goalGetter

            if(isPenalty)
            {
                goalGetterText.innerHTML = goalGetter + " (p)"
            }

            if(isOwnGoal == true)
            {
                goalRow.style.color = "red"
            }

            if(scoreTeam1 != lastScoreTeam1)
            {
                //goal scored by team 1

                goalMinuteText.innerHTML = goalMinute + "' "

                if(isOvertime)
                {
                    if(goalMinute < 90)
                    {
                        var overtimeMinute = goalMinute - 45
                        goalMinuteText.innerHTML = "45+" + overtimeMinute + "' "
                    }else
                    {
                        var overtimeMinute = goalMinute - 90
                        goalMinuteText.innerHTML = "90+" + overtimeMinute + "' "
                    }
                }

                goalRow.append(goalMinuteText)
                goalRow.append(goalGetterText)

                goalTableTeam1.append(goalRow)
                goalTableTeam2.append(voidGoalRow)
                lastScoreTeam1 += 1
            }else if(scoreTeam2 != lastScoreTeam2)
            {
                //goal scored by team 2

                goalMinuteText.innerHTML = " " + goalMinute + "'"

                if(isOvertime)
                {
                    if(goalMinute < 90)
                    {
                        var overtimeMinute = goalMinute - 45
                        goalMinuteText.innerHTML = " 45+" + overtimeMinute + "'"
                    }else
                    {
                        var overtimeMinute = goalMinute - 90
                        goalMinuteText.innerHTML = " 90+" + overtimeMinute + "'"
                    }
                }

                goalRow.append(goalGetterText)
                goalRow.append(goalMinuteText)

                goalTableTeam2.append(goalRow)
                goalTableTeam1.append(voidGoalRow)
                lastScoreTeam2 += 1
            }

            flexBox.append(goalTableTeam1)
            flexBox.append(goalTableTeam2)
        }   
    }

    close.onclick = function()
    {
        viewMatchDiv.remove()
        opendMatchIndex = null
    }
    
    viewMatchDiv.append(table)
    viewMatchDiv.append(flexBox)

    //document.getElementById(index).parentNode.insertBefore(viewMatchDiv, document.getElementById(index).nextSibling)

    if(window.innerWidth > 600)
    {
        document.getElementById(id).parentNode.insertBefore(viewMatchDiv, document.getElementById(id).nextSibling)
    }else{
        document.getElementById(index).parentNode.insertBefore(viewMatchDiv, document.getElementById(index).nextSibling)
    }
}

function openLeagueTable()
{
    document.getElementById("loader").style.display = "none"
    console.log(leagueTableArray)

    document.getElementById("leagueTableView").style.display = ""

    for(var i = 0; i < 18; i++) 
    {
        var gamesLost = leagueTableArray[i].lost
        var gamesWon = leagueTableArray[i].won
        var gamesDraw = leagueTableArray[i].draw
        var totalGames = leagueTableArray[i].matches
        var goalDiff = leagueTableArray[i].goalDiff
        var totalPoints = leagueTableArray[i].points
        var teamName = leagueTableArray[i].teamName
        var teamIcon = leagueTableArray[i].teamIconUrl

        var teamRow = document.createElement("tr")
        teamRow.className = "teamRow"
        teamRow.id = "team:" + teamName

        var placementColor = document.createElement("td")
        
        var colorDiv = document.createElement("div")
        colorDiv.className = "placementColor"
        colorDiv.innerHTML = "0"

        var color = getColor(i)

        colorDiv.style.background = color
        colorDiv.style.color = color

        placementColor.append(colorDiv)

        var placement = document.createElement("td")
        placement.innerHTML = i + 1 + "."

        var icon = document.createElement("td")
        var iconImage = document.createElement("img")
        iconImage.src = teamIcon
        iconImage.style.width = "20px"

        icon.append(iconImage)

        var name = document.createElement("td")
        name.innerHTML = teamName
        name.className = "teamName"

        var games = document.createElement("td")
        games.innerHTML = totalGames

        var goalDifference = document.createElement("td")
        goalDifference.innerHTML = goalDiff

        var points = document.createElement("td")
        points.innerHTML = totalPoints

        teamRow.append(placementColor)
        teamRow.append(placement)
        teamRow.append(icon)
        teamRow.append(name)
        teamRow.append(games)

        if(window.innerWidth > 600)
        {
            var wins = document.createElement("td")
            wins.innerHTML = gamesWon

            var draws = document.createElement("td")
            draws.innerHTML = gamesDraw

            var losts = document.createElement("td")
            losts.innerHTML = gamesLost

            teamRow.append(wins)
            teamRow.append(draws)
            teamRow.append(losts)
        }

        teamRow.append(goalDifference)
        teamRow.append(points)

        document.getElementById("leagueTable").append(teamRow)

        document.getElementById("team:" + teamName).onclick = function()
        {
            var id = this.id.replace("team:", "")

            menu(2)
            openAllTeamMatches(id)
        }
    }

    loading = false
}

function openAllTeamMatches(id)
{
    for(var index = 0; index < document.getElementsByClassName("teamDiv").length; index++)
    {
        document.getElementsByClassName("teamDiv")[index].style.background = "#303030"
    }

    document.getElementById(id).style.background = "#808080"

    if(document.getElementById("allMatchesTable") != null)
    {
        document.getElementById("allMatchesTable").remove()
        document.getElementById("loader").style.display = ""
    }

    loading = true

    fetchAllMatchesOfTeam(id, year)
}

function getColor(index)
{
    var color

    if(league === "bl1")
    {
        if(index < 1)
        {
            color = "#0dd70d"
        }else if(index < 4)
        {
            color = "green"
        }else if(index < 5)
        {
            color = "aqua"
        }else if(index < 6)
        {
            color = "blue"
        }else if(index < 15)
        {
            color = "252525"
        }else if(index < 16)
        {
            color = "orange"
        }else
        {
            color = "red"
        }
    }else
    {
        if(index < 2)
        {
            color = "green"
        }else if(index < 3)
        {
            color = "yellow"
        }else if(index < 15)
        {
            color = "252525"
        }else if(index < 16)
        {
            color = "orange"
        }else
        {
            color = "red"
        }
    }

    return color
}

function showAllTeams()
{
    document.getElementById("loader").style.display = "none"

    console.log(teamsArray)

    for(var i = 0; i < teamsArray.length; i++)
    {
        var teamID = teamsArray[i].teamId
        var teamName = teamsArray[i].teamName
        var teamIcon = teamsArray[i].teamIconUrl

        var shortName = getShortName(teamID)

        var teamDiv = document.createElement("div")
        teamDiv.className = "teamDiv"
        teamDiv.id = teamName 

        var teamIconImage = document.createElement("img")
        teamIconImage.src = teamIcon
        teamIconImage.style.width = "40px"

        if(shortName === "SVW")             //downsize logo
        {
            teamIconImage.style.width = "25px"
        }else if(shortName === "KOE")       //downsize logo
        {
            teamIconImage.style.width = "35px"
        }else if(shortName === "B04")       //upsize logo
        {
            teamIconImage.style.width = "47px"
        }

        var teamNameText = document.createElement("h4")
        teamNameText.innerHTML = shortName

        teamDiv.onclick = function()
        {
            openAllTeamMatches(this.id)
        }

        teamDiv.append(teamIconImage)
        teamDiv.append(teamNameText)

        document.getElementById("allTeams").append(teamDiv)
    }
    
    loading = false

    document.getElementById("allTeams").style.display = ""
}

function showGoalGetters()
{
    document.getElementById("loader").style.display = "none"

    document.getElementById("viewStatistics").style.display = ""

    var headline = document.createElement("h3")
    headline.innerHTML = "Torschützen"
    headline.style.marginBottom = "-5px"

    document.getElementById("viewStatistics").append(headline)

    var table = document.getElementById("goalGetterTable")

    var length = goalGetterArray.length

    if(length > 20)
    {
        length = 20
    }

    for(var i = 0; i < length; i++)
    {
        var name = goalGetterArray[i].goalGetterName
        var goals = goalGetterArray[i].goalCount

        var row = document.createElement("tr")
        row.className = "statisticRow"

        var placementColor = document.createElement("td")

        var placementColorDiv = document.createElement("div")
        placementColorDiv.innerHTML = 0
        placementColorDiv.className = "placementColor"

        var color = "#252525"

        if(i === 0)
        {
            color = "gold"
        }else if(i === 1)
        {
            color = "silver"
        }else if(i === 2)
        {
            color = "#cd7f32"
        }

        placementColorDiv.style.background = color
        placementColorDiv.style.color = color

        placementColor.append(placementColorDiv)

        var posText = document.createElement("td")
        posText.innerHTML = i + 1 + "."

        var voidCell = document.createElement("td")

        var nameText = document.createElement("td")
        nameText.innerHTML = name
        nameText.className = "playerName"

        var goalsText = document.createElement("td")
        goalsText.innerHTML = goals

        row.append(placementColor)
        row.append(posText)
        row.append(voidCell)
        row.append(nameText)
        row.append(goalsText)

        table.append(row)
    }

    document.getElementById("viewStatistics").append(table)

    loading = false
}

function menu(index)
{
    if(!loading)
    {
        for(var i = 0; i < document.getElementsByClassName("menuButton").length; i++)
        {
            document.getElementsByClassName("menuButton")[i].style.color = "white"
            document.getElementsByClassName("menuButton")[i].style.background = "none"
        }

        document.getElementsByClassName("menuButton")[index].style.color = "black"
        document.getElementsByClassName("menuButton")[index].style.background = "white"

        document.getElementById("matchDayView").style.display = "none"
        document.getElementById("leagueTableView").style.display = "none"
        document.getElementById("allMatchesView").style.display = "none"
        document.getElementById("allTeams").style.display = "none"
        document.getElementById("viewStatistics").style.display = "none"

        if(index === 0)
        {
            loading = true

            if(document.getElementsByClassName("matchDayTables").length === 0)
            {
                fetchLastMatchDay()
            }else
            {
                document.getElementById("matchDayView").style.display = ""
                loading = false
            }
        }else if(index === 1)
        {
            loading = true

            if(document.getElementsByClassName("teamRow").length === 0)
            {
                fetchLeagueTable(year)
            }else
            {
                document.getElementById("leagueTableView").style.display = ""
                loading = false
            }
        }else if(index === 2)
        {
            loading = true

            if(document.getElementsByClassName("teamDiv").length === 0)
            {
                fetchTeams(year)
            }else
            {
                document.getElementById("allTeams").style.display = ""
                document.getElementById("allMatchesView").style.display = ""
                loading = false
            }  
        }else if(index === 3)
        {
            loading = true

            if(document.getElementsByClassName("statisticRow").length === 0)
            {
                fetchGoalGetters(year)
            }else
            {
                document.getElementById("viewStatistics").style.display = ""
                loading = false
            }          
        }
    }
}

function switchLeague(image)
{
    if(league === "bl1")
    {
        image.src = "bundesliga2_logo.png"
        image.alt = "Logo der 2. Bundesliga"

        league = "bl2"
    }else
    {
        image.src = "bundesliga_logo.png"
        image.alt = "Logo der Bundesliga"

        league = "bl1"
    }

    localStorage.setItem("activeLeague", league)

    location.reload()
}

function minusMatchDay()
{
    if(lastMatchDay - 1 > 0 && loading === false)
    {
        lastMatchDay -= 1

        document.getElementById("matchDayText").innerHTML = lastMatchDay + ". Spieltag"

        document.getElementById("matchDayDiv").remove()

        loading = true

        fetchMatchDay(lastMatchDay, year)
    }
}

function plusMatchDay()
{
    if(lastMatchDay + 1 < 35 && loading === false)
    {
        lastMatchDay += 1

        document.getElementById("matchDayText").innerHTML = lastMatchDay + ". Spieltag"

        document.getElementById("matchDayDiv").remove()

        loading = true

        fetchMatchDay(lastMatchDay, year)
    }
}

function getShortName(teamID)
{
    for(var i = 0; i < shortNames.length; i++)
    {
        if(shortNames[i].id === teamID)
        {
            return shortNames[i].shortName
        }
    }
}