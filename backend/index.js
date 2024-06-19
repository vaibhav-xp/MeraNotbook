const express = require("express")
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")

const userRouter = require('./routes/users.routes')
const userNotes = require('./routes/notes.routes')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT || 5000

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { dbName: 'mera-notebook' })

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected!")
})

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use('/notes', userNotes)
app.get("/", (req, res) => {
    res.json({
        status: "Ok"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = JWT_SECRET;
