const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const db = require('./config/db_config')
const {PORT, DB_FORCE, DB_ALTER} = require('./config/server_config')
const apiRoutes = require('./routes/index')
const carbonRoutes = require('./routes/carbonRoutes');

const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true   
// }))

app.use(responseTime())

app.use(express.json()); // this parses incoming JSON
app.use(bodyParser.text()) // application level middleware
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use('/api', apiRoutes); 
app.use('/carbon', carbonRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, async() => {
    console.log("Server for carbon is up")

    if(DB_FORCE === "true"){
      // console.log("FORCE")
      await db.sync({force: true})
    }else if(DB_ALTER === "true"){
      // console.log("ALTER")
      await db.sync({alter: true})
    }else{
      // console.log("SYNC")
      await db.sync()
    }

    console.log('db connected')

})