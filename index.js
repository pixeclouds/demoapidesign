require("dotenv").config()
const express = require('express');
const app = express();
const { v4 } = require("uuid")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./logs.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())

// generate unique id for  a new user
app.post("/user", (req, res) => {
    let {name} = req.body

    if (name.length < 1){
        res.status(400).json({
            "error": "missing required field"
        })
    }
    let newUser = {
        "name": name,
        "user_id": v4()
    }
    
    res.status(201).json(newUser)
})

// rereoute from the home page to the docs page
app.get("/", (req, res) => {
    let port = process.env.PORT
    let host = process.env.HOST

    let docsurl = `${host}:${port}/api-docs`
    res.redirect(docsurl)
})

app.listen(3000, () => {
    console.log("app running on port 3000")
})