const express = require("express")
const router = express.Router()
const Users = require('../models/user.model')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/user.model")
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser = require('../middleware/fetchuser')

router.post("/create-user",
    [
        body('name', "Enter name").isLength({ min: 3 }),
        body('email', "Enter a valid eamil address").isEmail(),
        body('password', "Password must be atleast 5 character").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check whether user exist or not, if yes then save it to database.
        try {
            const users = await Users.findOne({ email: req.body.email })
            if (users) {
                console.log("failed")
                return res.status(400).json({ error: "Sorry a user with this email already exists." })
            }
            const salt = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(req.body.password, salt)

            const user = await Users.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            console.log("success")
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    })

router.post("/login",
    [
        body('email', "Enter a valid eamil address").isEmail(),
        body('password', "password can't be blank").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            const passCompare = await bcrypt.compare(password, user.password)
            if (!passCompare) {
                return res.json(400).json({ error: "Please try to login with correct credentials" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    }
)

// ROUTE 3: Get loggedin user deatils using: POST '/api/fetchuser'. Login required

router.get('/fetchuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Internal Server Error");
    }
})
module.exports = router