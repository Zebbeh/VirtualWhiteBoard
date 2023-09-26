const express = require('express')
const cors = require('cors')
const app = express()
const auth = require('./middleware/auth')
const PORT = process.env.PORT || 3030

app.use(cors())

// behövs för att kunna ta emot JSON i request-bodyn
app.use(express.json())

app.get('/', (req, res) => {
    console.log(`GET request to / from ${req.ip}`)
    res.send('Mainpage!')
})

const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

app.use('/public', express.static(__dirname + '/public'))




// middleware-funktion, validerar jwt
//app.use(auth)

const boardsRouter = require('./routes/boards.js')
app.use('/boards', auth, boardsRouter)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})