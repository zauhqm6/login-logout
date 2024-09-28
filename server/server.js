require('dotenv').config({ path: './utils/.env' })
const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express()
const port = 5000
const authRouter = require('./router/auth-router')
const contactRouter = require('./router/contact-router')
const serviceRouter = require('./router/service-router')
const connectDB = require('./utils/db');
const errorMmiddleware = require('./middleware/error-middleware');
const adminRoute = require('./router/admin-router')




var corsOptions = {
    origin: 'https://login-logout-3jsjjqouz-zauhqm6s-projects.vercel.app/',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))


app.use(bodyParser.json());
app.use('/api/auth', authRouter)
app.use('/api/form', contactRouter)
app.use('/api/data', serviceRouter)
app.use('/api/admin', adminRoute)
app.use(errorMmiddleware)




app.get('/', (req, res) => {
    res.json("hello")
})


connectDB().then(() => {
    app.listen(port, () => console.log(`App running on port ${port}!`))
})