var lightImg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTg4IiBoZWlnaHQ9IjQwOCIgdmlld0JveD0iMCAwIDU4OCA0MDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjIwNCIgY3k9IjIwNCIgcj0iMTgxLjUiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQ1Ii8+CjxjaXJjbGUgY3g9IjM4NCIgY3k9IjIwNCIgcj0iMjA0IiBmaWxsPSIjMTYxNjE4Ii8+Cjwvc3ZnPgo="
var darkImg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTg4IiBoZWlnaHQ9IjQwOCIgdmlld0JveD0iMCAwIDU4OCA0MDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjIwNCIgY3k9IjIwNCIgcj0iMTgxLjUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNDUiLz4KPGNpcmNsZSBjeD0iMzg0IiBjeT0iMjA0IiByPSIyMDQiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

var button = document.getElementById("imgToggle")
button.src = lightImg
button.alt = "lightMode"

setDarkMode()

function changeMode()
{
    if(button.alt === "lightMode"){
        setDarkMode()
    }else{
        setLightMode()
    }
}

function setLightMode()
{
    document.documentElement.style.setProperty("--background", "white")    
    document.documentElement.style.setProperty("--forground", "#a7a7a7")
    document.documentElement.style.setProperty("--main", "black")
    document.documentElement.style.setProperty("--hr", "#dfdfdf")

    button.src = lightImg
    button.alt = "lightMode"
}

function setDarkMode()
{
    document.documentElement.style.setProperty("--background", "#161618")
    document.documentElement.style.setProperty("--forground", "#282828")
    document.documentElement.style.setProperty("--main", "white")
    document.documentElement.style.setProperty("--hr", "#454545")

    button.src = darkImg
    button.alt = "darkMode"
}