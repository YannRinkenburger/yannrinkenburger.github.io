function openLink(p_url)
{
    window.open(p_url, '_blank').focus();
}

function createMilestone()
{
    var div = document.createElement("div")
    div.className = "milestone"

    var number = document.createElement("div")
    number.className = "milestoneNumber"
    number.innerHTML = document.getElementsByClassName("milestone").length + 1 + "."

    var text = document.createElement("div")
    text.className = "milestoneText"

    var textInput = document.createElement("input")
    textInput.type = "text"
    textInput.placeholder = "..."
    textInput.maxlength = "40"
    text.append(textInput)

    var deadline = document.createElement("div")
    deadline.className = "milestoneDeadline"

    var deadlineInput = document.createElement("input")
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

    document.getElementById("createMilestonesDiv").append(div)

    textInput.focus()
}

function changeStatus(p_element)
{
    var color = p_element.style.backgroundColor
    console.log(p_element)

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