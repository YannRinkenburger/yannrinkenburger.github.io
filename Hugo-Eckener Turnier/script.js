document.getElementById("select").onchange = function()
{
    var value = document.getElementById("select").value

    var url = value + ".html"

    window.location.href = url
}