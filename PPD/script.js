var year = new Date().getFullYear()
var month = new Date().getMonth() + 1
var day = new Date().getDate()

var dayOfYear = getDayOfYear()

function getDayOfYear()
{
    var now = new Date()
    var start = new Date(now.getFullYear(), 0, 0)
    var diff = now - start
    var oneDay = 1000 * 60 * 60 * 24

    return(Math.floor(diff / oneDay))
}

var image 

class imageClass{
    constructor(src)
    {
        this.year = year
        this.month = month
        this.day = day
        this.src = src
    }
}

if(localStorage.getItem("image") !== undefined && localStorage.getItem("image") !== null && localStorage.getItem("image") !== "")
{
    image = JSON.parse(localStorage.getItem("image"))

    if(day === image.day && month === image.month && year === image.year)
    {
        document.getElementById("openImageViewButton").style.display = ""
    }
}

if(localStorage.getItem("streak") !== undefined)
{
    var streak = localStorage.getItem("streak")
}

var cameraInput = document.getElementById("cameraInput")
cameraInput.className = "camera"
cameraInput.capture = "user"
cameraInput.accept = "image/*" 
cameraInput.style.display = "none"

function openImageView(p_image)
{
    if(p_image !== undefined)
    {
        image = p_image
    }

    document.getElementById("imageView").style.display = ""
    document.getElementById("home").style.display = "none"

    document.getElementById("imgPlaceholder").src = image.src
}

function saveImage() {
    camera(document.getElementById("cameraInput"), function(newImage) {
        openImageView(newImage)
    })
}

function camera(fileInput, callback) {
    var file = fileInput.files[0]
    var imageType = /image.*/
    var newImage

    if (file != undefined) {
        if (file.type.match(imageType)) {
            var reader = new FileReader()

            reader.onload = function () {
                var img = new Image()
                img.src = reader.result

                newImage = new imageClass(img.src)

                localStorage.setItem("image", JSON.stringify(newImage))
                callback(newImage)
            }

            reader.readAsDataURL(file)
        } else {
            alert("File not supported!")
        }
    }
}

function downloadImage()
{
    var link = document.createElement("a")
    link.href = image.src
    link.download = dayOfYear + "_PicPerDay.png"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function deleteImage()
{
    image = ""
    localStorage.setItem("image", image)
    openHome()
}

function openData()
{
    document.getElementById("data").style.display = ""
    document.getElementById("imageView").style.display = "none"
    document.getElementById("home").style.display = "none"
}

function openHome()
{
    if(image !== "")
    {
        document.getElementById("openImageViewButton").style.display = ""
    }else{
        document.getElementById("openImageViewButton").style.display = "none"
    }

    document.getElementById("data").style.display = "none"
    document.getElementById("imageView").style.display = "none"
    document.getElementById("home").style.display = ""
}