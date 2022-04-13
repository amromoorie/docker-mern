// CORS for cross origin allowance
import cors from 'cors'
// start up an instance of app
import express from 'express'
import './forceLoadEnvConfig.js'
// require weather route
import mongoose from 'mongoose'
import posts from './routes/posts.js'

// run express
const app = express()

// CORS
app.use(cors())

// database configs


const DB_CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yzfyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`





main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB_CONNECTION_URL);
  console.log('connected to DADABASE')
}


app.use(express.json({ limit: '50mb', extend: true}))
// middleware for handling urlencoded form
app.use(express.urlencoded({ limit:'30mb', extended: true }))

// ROUTES
app.use('/api/posts', posts)
// app.use('/fetch-weather-info', weather)

// designates what port the app will listen to for incoming requests
const PORT =  process.env.PORT
app.listen(PORT, (err) => {
  if (err) throw new Error(err)
  console.log(`Server is listening on port ${PORT}!`)
})

app.get('/', function (req, res) {
  res.send('<h1>hello</h1>')
})


