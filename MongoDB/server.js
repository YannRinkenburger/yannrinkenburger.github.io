const express = require("express")
const bodyParser =  require("body-parser")
const mongoose = require("mongoose")
const User = require("./User")
const app = express()

//connect to the server

const port = 3000

const url = "mongodb+srv://Yann:yann07042005@unicornidea.usxr1jn.mongodb.net/?retryWrites=true&w=majority"

async function connect()
{
    try{
        await mongoose.connect(url)
        console.log("Connected")
    } catch (error)
    {
        console.log(error)
    }
}

connect()

//server connected

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, function()
{
    console.log("Server startet on port " + port)
})

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/index.html")
})

app.get("/signIn.html", function(req, res)
{
    res.sendFile(__dirname + "/signIn.html")

    app.post("/signIn", bodyParser.json(), async function(req, res)
    {
        var firstname = req.body.firstname
        var lastname = req.body.lastname
        var username = req.body.username
        var email = req.body.email
        var password = req.body.password

        var check = await checkUsernameAndEmail(username, email)

        if(check)
        {
            createUser(firstname, lastname, username, email, password)
            res.sendFile(__dirname + "/index.html")
        }else
        {
            console.log("E-Mail or Username already used")
            res.redirect("/")
        }
    })
})

app.get("/logIn.html", function(req, res)
{
    res.sendFile(__dirname + "/logIn.html")

    app.post("/logIn", bodyParser.json(), async function(req, res)
    {
        var username = req.body.username
        var password = req.body.password

        var check = await checkIfPasswordMatches(username, password)

        console.log(check)

        if(check)
        {
            console.log("Login succesfully")
            res.sendFile(__dirname + "/index.html")
        }else
        {
            console.log("E-Mail or Username are false")
            res.redirect("/")
        }
    })
})

async function createUser(p_firstname, p_lastname, p_username, p_email, p_password)
{
	const user = new User({ firstname : p_firstname, lastname : p_lastname, username: p_username, email : p_email, password : p_password})
	await user.save()
	console.log(user)
}

async function getUser()
{
	const user = await User.find({ name : "Yann" })
	console.log(user)
}

async function checkUsernameAndEmail(p_username, p_email)
{
	const countUsername = await User.countDocuments({ username : p_username})
    const countEmail = await User.countDocuments({ email : p_email})

    var count = countEmail + countUsername

    if(count > 0)
    {
        return false
    }else
    {
        return true
    }
}

async function checkIfPasswordMatches(p_username, p_password)
{
    const count = await User.countDocuments({ username : p_username, password : p_password})

    if(count > 0)
    {
        return true
    }else
    {
        return false
    }
}