var emojiArray
var categories

fetch("https://emoji-api.com/emojis?access_key=f9acf6863f756cb50f1bbaf8e9f5679a068be895")
    .then(res => res.json())
    .then(data => emojiArray = data)
    .then(data => loadCategorie("recent", "Recently Used"))

fetch("https://emoji-api.com/categories?access_key=f9acf6863f756cb50f1bbaf8e9f5679a068be895")
    .then(res => res.json())
    .then(data => categories = data)

function createEmoji(p_emoji)
{
    var div = document.createElement("div")
    div.textContent = p_emoji.character
    div.className = "noselect"
    div.setAttribute("name", p_emoji.slug)

    document.getElementById("emojiList").append(div)

    div.onclick = function()
    {
        document.getElementById("messageTextInput").value = document.getElementById("messageTextInput").value + div.innerHTML

        saveEmoji(p_emoji)
    }
}

function openEmojiDiv()
{
    if(document.getElementById("emojiPicker").style.display === "none")
    {
        document.getElementById("emojiPicker").style.display = ""
    }else{
        document.getElementById("emojiPicker").style.display = "none"
    }
}

function searchEmoji(p_value)
{
    for(var i = 0; i < document.getElementsByClassName("emojiListImg").length; i++)
    {
        document.getElementsByClassName("emojiListImg")[i].style.background = "none"
    }

    document.getElementById("infoText").innerHTML = ""

    if(p_value !== "")
    {
        document.querySelectorAll("#emojiList div").forEach(emoji => {
            emoji.remove()
        })

        emojiArray.forEach(emoji => {
            if(emoji.slug.toLowerCase().includes(p_value.toLowerCase()))
            {
                createEmoji(emoji)
            }
        })
    }else{
        loadCategorie("recent", "Recently Used")
    }
}

function loadCategorie(p_index, p_text)
{
    for(var i = 0; i < document.getElementsByClassName("emojiListImg").length; i++)
    {
        document.getElementsByClassName("emojiListImg")[i].style.background = "none"
    }

    document.getElementById("emojiList").remove()
    document.getElementById("infoText").remove()
    document.getElementById("searchEmoji").value = ""

    var emojiList = document.createElement("div")
    emojiList.id = "emojiList"
    emojiList.scrollTop = 0

    var infoText = document.createElement("p")
    infoText.id = "infoText"
    infoText.innerHTML = p_text

    document.getElementById("emojiListArea").append(infoText)
    document.getElementById("emojiListArea").append(emojiList)

    if(p_index === "recent")
    {
        displayRecentEmojis()
        document.getElementsByClassName("emojiListImg")[0].style.background = "#3eb1be"
    }
    else if(p_index === 0)
    {
        for(var i = 0; i < 3; i++)
        {
            displayCategorie(i)
        }

        document.getElementsByClassName("emojiListImg")[p_index + 1].style.background = "#3eb1be"
    }else{
        displayCategorie(p_index + 2)
        document.getElementsByClassName("emojiListImg")[p_index + 1].style.background = "#3eb1be"
    }
}

function displayCategorie(i)
{
    var length = categories[i].subCategories.length

    for(var ii = 0; ii < length; ii++)
    {
        var subCategories = categories[i].subCategories[ii]
        
        emojiArray.forEach(emoji => {
            if(emoji.subGroup === subCategories)
            {
                createEmoji(emoji)
            }
        })
    }
}

function saveEmoji(p_emoji)
{
    var recentEmojis = JSON.parse(localStorage.getItem("emojis"))
    
    if(recentEmojis.some(e => e.slug === p_emoji.slug))
    {
        var index = recentEmojis.findIndex(e => e.slug === p_emoji.slug)

        recentEmojis.splice(index, 1)
    }

    recentEmojis.push(p_emoji)

    localStorage.setItem("emojis", JSON.stringify(recentEmojis))
}

function displayRecentEmojis()
{
    var recentEmojis = JSON.parse(localStorage.getItem("emojis"))

    recentEmojis.forEach(emoji => {
        createEmoji(emoji)
    })
}